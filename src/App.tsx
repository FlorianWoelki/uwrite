import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
// @ts-ignore
import { renderMarkdown } from 'monaco-editor/esm/vs/base/browser/markdownRenderer';
import { cachedEditorReducer, Editor } from './components/editor/Editor';
import { Toolbar, ToolbarTab } from './components/Toolbar';
import { ThemeType, useDarkMode } from './hooks/useDarkMode';
import { useEffect, useReducer, useRef, useState } from 'react';
import { monaco } from './monaco';
import { useKeyPress } from './hooks/useKeyPress';
import { useIndexedDb } from './db/hooks/useIndexedDb';
import { debounce } from './util/effects';
import { File } from './db/indexedDb';

const App = (): JSX.Element => {
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
    content: `# Hello World

This is your first document in uwrite.`,
    position: null,
  });

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

  const indexedDb = useIndexedDb(cachedEditor.content, async () => {
    const file = await indexedDb.getValue<File>('file', 0);
    if (!file) {
      return;
    }

    codeEditorRef.current!.setValue(file.value);
    cachedEditorDispatch({ content: file.value, position: null });
  });

  useEffect(() => {
    if (!codeEditorRef.current) {
      return;
    }

    codeEditorRef.current.onDidChangeModelContent(
      debounce(async () => {
        if (!codeEditorRef.current) {
          return;
        }

        await indexedDb.putValue(
          'file',
          {
            value: codeEditorRef.current.getValue(),
          },
          0,
        );
      }),
    );
  }, []);

  return (
    <div className="relative antialiased">
      <Toolbar
        activeTab={activeTab}
        onClickEditor={renderEditorContent}
        onClickPreview={renderPreviewContent}
        onThemeChange={handleThemeChange}
      />
      <div className="relative m-auto h-screen w-full max-w-6xl">
        {!previewContent ? (
          <Editor
            cachedState={cachedEditor}
            onSetupFinished={(editor) => (codeEditorRef.current = editor)}
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

export default App;
