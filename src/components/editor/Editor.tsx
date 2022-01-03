import { useEffect, useRef } from 'react';
import './theme/font/font.css';
import './editor.css';
import * as monaco from 'monaco-editor';
import { VimMode, initVimMode } from 'monaco-vim';
import { getEditorThemeColors } from './theme/colors';
import { getEditorThemeRules } from './theme/rules';

const createEditor = (editorEl: HTMLDivElement, statusEl: HTMLDivElement) => {
  const editor = monaco.editor.create(editorEl, {
    value: 'This is a little **test**',
    language: 'markdown',
    ariaLabel: 'Markdown Editor',
    codeLens: false,
    contextmenu: false,
    copyWithSyntaxHighlighting: false,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    cursorSurroundingLines: 3,
    cursorWidth: 3,
    fontFamily: 'iA Writer Duo',
    fontSize: 20,
    fontWeight: '450',
    glyphMargin: false,
    lineHeight: 40,
    lineNumbers: 'relative',
    minimap: {
      enabled: false,
    },
    padding: {
      top: 96,
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

export const Editor = (): JSX.Element => {
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
      editorRef.current,
      statusRef.current,
    );

    editor.focus();

    return () => {
      editor.dispose();
      vimMode.dispose();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full" ref={editorRef}></div>
      <div
        className="absolute inset-x-0 bottom-0 px-4 py-2 vim-status"
        ref={statusRef}
      ></div>
    </>
  );
};
