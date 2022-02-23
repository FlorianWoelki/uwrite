import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { language } from '../../monaco/custom-markdown';
import './theme/font/font.css';
import './editor.css';
import { monaco } from '../../monaco';
import { VimMode, initVimMode } from 'monaco-vim';
import { getEditorThemeColors } from './theme/colors';
import { getEditorThemeRules } from './theme/rules';
import { debounce } from '../../util/effects';

const createEditor = (
  value: string,
  editorEl: HTMLDivElement,
  statusEl: HTMLDivElement,
) => {
  monaco.languages.register({ id: 'custom-markdown' });

  monaco.languages.setMonarchTokensProvider('custom-markdown', {
    ...language,
  });

  const editor = monaco.editor.create(editorEl, {
    value,
    language: 'custom-markdown',
    ariaLabel: 'Markdown Editor',
    codeLens: false,
    contextmenu: false,
    copyWithSyntaxHighlighting: false,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    cursorSurroundingLines: 3,
    cursorWidth: 3,
    fontSize: 20,
    fontWeight: '450',
    glyphMargin: false,
    lineHeight: 40,
    lineNumbers: 'relative',
    minimap: {
      enabled: false,
    },
    quickSuggestions: false,
    roundedSelection: false,
    selectionHighlight: false,
    automaticLayout: true,
    smoothScrolling: true,
    snippetSuggestions: 'none',
    suggestOnTriggerCharacters: false,
    wordBasedSuggestions: false,
    wordWrap: 'bounded',
    wordWrapColumn: 80,
    occurrencesHighlight: false,
    renderLineHighlight: 'none',
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    scrollbar: {
      horizontal: 'hidden',
      verticalSliderSize: 5,
      useShadows: false,
    },
  });

  const vimMode = initVimMode(editor, statusEl);

  const { Vim } = VimMode;
  Vim.map('jj', '<Esc>', 'insert');
  Vim.map('jk', '<Esc>', 'insert');

  return {
    editor,
    vimMode,
  };
};

const defineTheme = () => {
  monaco.editor.defineTheme('uwrite', {
    base: 'vs-dark',
    inherit: false,
    colors: getEditorThemeColors(),
    rules: getEditorThemeRules(),
  });
  monaco.editor.setTheme('uwrite');
};

interface MonacoEditorProps {
  value: string;
  onCtrlCmdE: () => void;
  onChange: (value: string) => void;
}

export const MonacoEditor = forwardRef<
  monaco.editor.IStandaloneCodeEditor,
  MonacoEditorProps
>(({ value, onCtrlCmdE, onChange }, ref): JSX.Element => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorRef.current || !statusRef.current) {
      return;
    }

    document.fonts.ready.then(() => {
      monaco.editor.remeasureFonts();
    });

    defineTheme();

    const { editor, vimMode } = createEditor(
      value,
      editorRef.current,
      statusRef.current,
    );

    editor.onDidLayoutChange(() => {
      editor.focus();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE, () =>
      onCtrlCmdE(),
    );
    editor.onDidChangeModelContent(
      debounce(() => {
        if (editor.hasTextFocus()) {
          onChange(editor.getValue());
        }
      }),
    );

    (ref as MutableRefObject<monaco.editor.IStandaloneCodeEditor>).current =
      editor;

    return () => {
      editor.dispose();
      vimMode.dispose();
    };
  }, []);

  return (
    <>
      <div
        className="h-full w-full"
        style={{ paddingBottom: '138px' }}
        ref={editorRef}
      ></div>
      <div
        className="vim-status absolute inset-x-0 bottom-0 px-4 py-2 font-mono text-base"
        ref={statusRef}
      ></div>
    </>
  );
});