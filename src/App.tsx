import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import { Editor } from './components/editor/Editor';
import { Toolbar } from './components/Toolbar';
import { ThemeType, useDarkMode } from './hooks/useDarkMode';
import { useCallback, useRef } from 'react';
import { monaco } from './monaco';

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

  const renderPreview = useCallback((): void => {
    if (codeEditorRef.current) {
      renderMathInElement(codeEditorRef.current.getContainerDomNode(), {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: true,
      });
    }
  }, [codeEditorRef]);

  return (
    <div className="relative antialiased">
      <Toolbar
        onClickPreview={renderPreview}
        onThemeChange={handleThemeChange}
      />
      <div className="relative w-full h-screen max-w-6xl m-auto">
        <Editor
          onSetupFinished={(editor) => (codeEditorRef.current = editor)}
        />
      </div>
    </div>
  );
};

export default App;
