import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
// @ts-ignore
import { renderMarkdown } from 'monaco-editor/esm/vs/base/browser/markdownRenderer';
import { Editor } from './components/editor/Editor';
import { Toolbar } from './components/Toolbar';
import { ThemeType, useDarkMode } from './hooks/useDarkMode';
import { useEffect, useRef, useState } from 'react';
import { monaco } from './monaco';
import { useKeyPress } from './hooks/useKeyPress';

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

  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [cachedEditorContent, setCachedEditorContent] = useState<string | null>(
    null,
  );

  const renderPreviewContent = (): void => {
    if (!codeEditorRef.current || previewContent) {
      return;
    }

    setCachedEditorContent(codeEditorRef.current.getValue());

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

    setPreviewContent(htmlResult.innerHTML);
  };

  const renderEditorContent = (): void => {
    setPreviewContent(null);

    if (cachedEditorContent && codeEditorRef.current) {
      codeEditorRef.current.setValue(cachedEditorContent);
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

  return (
    <div className="relative antialiased">
      <Toolbar
        onClickEditor={renderEditorContent}
        onClickPreview={renderPreviewContent}
        onThemeChange={handleThemeChange}
      />
      <div className="relative w-full h-screen max-w-6xl m-auto">
        {!previewContent ? (
          <Editor
            value={cachedEditorContent}
            onSetupFinished={(editor) => (codeEditorRef.current = editor)}
          />
        ) : (
          <div
            className="pt-24 mx-20 text-white markdown"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default App;
