import {
  forwardRef,
  MutableRefObject,
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
import { useSelector } from 'react-redux';
import { selectCurrentFile } from '../../store';
import { editor, KeyCode } from 'monaco-editor';

const registerRules = (): void => {
  monaco.languages.setLanguageConfiguration('custom-markdown', {
    indentationRules: {
      decreaseIndentPattern: /^\**.+$/,
      increaseIndentPattern: /^\**.+$/,
    },
    onEnterRules: [
      {
        beforeText: /\*.+$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: '* ',
        },
      },
      {
        beforeText: /-.+$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: '- ',
        },
      },
    ],
    autoClosingPairs: [
      {
        open: '$',
        close: '$',
      },
    ],
  });
};

const createEditor = (
  value: string,
  editorEl: HTMLDivElement,
  statusEl: HTMLDivElement,
) => {
  monaco.languages.register({ id: 'custom-markdown' });

  monaco.languages.setMonarchTokensProvider('custom-markdown', {
    ...language,
  });

  registerRules();

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

  editor.addAction({
    id: 'markdown.extension.editing.onTabKey',
    label: '',
    keybindings: [KeyCode.Tab],
    run(_: editor.ICodeEditor): void | Promise<void> {
      return editor.getAction('editor.action.indentLines').run();
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

export const updateTheme = (theme: 'uwrite-dark' | 'uwrite-light'): void => {
  defineTheme();
  monaco.editor.setTheme(theme);
};

const defineTheme = () => {
  monaco.editor.defineTheme('uwrite-dark', {
    base: 'vs-dark',
    inherit: false,
    colors: getEditorThemeColors(true),
    rules: getEditorThemeRules(true),
  });
  monaco.editor.defineTheme('uwrite-light', {
    base: 'vs',
    inherit: false,
    colors: getEditorThemeColors(false),
    rules: getEditorThemeRules(false),
  });
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
  const currentFile = useSelector(selectCurrentFile);

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

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
    setEditor(editor);

    editor.onDidLayoutChange(() => {
      editor.focus();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE, () =>
      onCtrlCmdE(),
    );

    (ref as MutableRefObject<monaco.editor.IStandaloneCodeEditor>).current =
      editor;

    return () => {
      editor.dispose();
      vimMode.dispose();
    };
  }, [currentFile?.id]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.onDidChangeModelContent(
      debounce(() => {
        if (editor.hasTextFocus()) {
          onChange(editor.getValue());
        }
      }),
    );
  }, [editor]);

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
