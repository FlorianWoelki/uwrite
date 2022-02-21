import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
// @ts-ignore
import { renderMarkdown } from 'monaco-editor/esm/vs/base/browser/markdownRenderer';
import { cachedEditorReducer, Editor } from '../components/editor/Editor';
import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode } from '../hooks/useDarkMode';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { monaco } from '../monaco';
import { useKeyPress } from '../hooks/useKeyPress';
import { useIndexedDb } from '../db/hooks/useIndexedDb';
import { debounce } from '../util/effects';
import { File } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from './useEditorPageParams';

export const EditorPage: React.FC = (): JSX.Element => {
  const { id } = useEditorPageParams();

  const [_, setTheme] = useDarkMode();

  const handleThemeChange = async (themeType: ThemeType): Promise<void> => {
    if (themeType === 'system') {
      if (window.theme) {
        await window.theme.setTheme('system');
      } else {
        setTheme('system');
      }
    } else {
      if (window.theme) {
        await window.theme.setTheme(themeType);
      } else {
        setTheme(themeType);
      }
    }
  };

  const codeEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<ToolbarTab>(ToolbarTab.EditorView);

  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [cachedEditor, cachedEditorDispatch] = useReducer(cachedEditorReducer, {
    content: '',
    position: null,
  });

  const [isLoading, setLoading] = useState<boolean>(true);

  const renderPreviewContent = (): void => {
    if (!codeEditorRef.current || previewContent) {
      return;
    }

    cachedEditorDispatch({
      content: codeEditorRef.current.getValue(),
      position: codeEditorRef.current.getPosition(),
    });

    const htmlResult = renderMarkdown({
      value: codeEditorRef.current.getValue(),
    }).element;

    renderMathInElement(htmlResult, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: true,
    });

    setActiveTab(2);
    setPreviewContent(htmlResult.innerHTML);
  };

  const renderEditorContent = (): void => {
    setActiveTab(0);
    setPreviewContent(null);

    if (!codeEditorRef.current) {
      return;
    }

    if (cachedEditor.content && cachedEditor.position) {
      codeEditorRef.current.setValue(cachedEditor.content);
      codeEditorRef.current.setPosition(cachedEditor.position);
    }
  };

  useKeyPress(
    ['e'],
    () => {
      if (previewContent) {
        renderEditorContent();
      } else {
        renderPreviewContent();
      }
    },
    true,
  );

  useEffect(() => {
    if (!codeEditorRef.current) {
      return;
    }

    codeEditorRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE,
      () => {
        if (previewContent) {
          renderEditorContent();
        } else {
          renderPreviewContent();
        }
      },
    );
  }, [previewContent]);

  const indexedDb = useIndexedDb(cachedEditor.content);
  useEffect(() => {
    if (!indexedDb) {
      return;
    }

    (async () => {
      const file = await indexedDb.getValue<File>('file', id);
      if (!file) {
        return;
      }

      if (!codeEditorRef.current) {
        return;
      }

      codeEditorRef.current.setValue(file.value);

      cachedEditorDispatch({ content: file.value, position: null });
      setLoading(false);
      codeEditorRef.current.focus();
      codeEditorRef.current.onDidChangeModelContent(
        handleMonacoChangeModelContent(),
      );
    })();
  }, [indexedDb]);

  const monacoSetupFinished = (
    editor: monaco.editor.IStandaloneCodeEditor,
  ): void => {
    codeEditorRef.current = editor;
    codeEditorRef.current.focus();
    codeEditorRef.current.onDidChangeModelContent(
      handleMonacoChangeModelContent(),
    );
  };

  const handleMonacoChangeModelContent = useCallback(() => {
    return debounce(async () => {
      if (!codeEditorRef.current || !indexedDb) {
        return;
      }

      await indexedDb.putValue(
        'file',
        {
          value: codeEditorRef.current.getValue(),
        },
        id,
      );
    });
  }, [indexedDb]);

  return (
    <div className="relative antialiased">
      <Toolbar
        activeTab={activeTab}
        onClickEditor={renderEditorContent}
        onClickPreview={renderPreviewContent}
        onThemeChange={handleThemeChange}
      />
      {isLoading && (
        <div className="absolute m-auto flex h-screen w-full items-center justify-center">
          <LoadingIndicator className="z-50 h-8 w-8 text-gray-500" />
        </div>
      )}
      <div
        className={`relative m-auto h-screen w-full max-w-6xl ${
          isLoading ? 'hidden' : ''
        }`}
      >
        {!previewContent ? (
          <Editor
            cachedState={cachedEditor}
            onSetupFinished={monacoSetupFinished}
          />
        ) : (
          <div
            className="markdown mx-20 pt-24 text-white"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          ></div>
        )}
      </div>
    </div>
  );
};
