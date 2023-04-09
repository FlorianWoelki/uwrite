import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import {
  HighlightStyle,
  TagStyle,
  syntaxHighlighting,
} from '@codemirror/language';
import { StyleSpec } from 'style-mod';

export interface CreateThemeOptions {
  settings: Settings;
  styles: TagStyle[];
}

export interface Settings {
  background?: string;
  foreground?: string;
  caret?: string;
  selection?: string;
  selectionMatch?: string;
  lineHighlight?: string;
  gutterBackground?: string;
  gutterForeground?: string;
  gutterActiveForeground?: string;
  gutterBorder?: string;
  fontFamily?: string;
  lineHeight?: string;
  fontSize?: string;
}

export const createTheme = ({
  settings = {},
  styles = [],
}: CreateThemeOptions): Extension => {
  const themeOptions: Record<string, StyleSpec> = {
    '.cm-gutters': {},
    '&.cm-focused': {
      outline: 'none',
    },
  };
  const baseStyle: any = {};
  if (settings.background) {
    baseStyle.backgroundColor = settings.background;
  }
  if (settings.foreground) {
    baseStyle.color = settings.foreground;
  }
  if (settings.background || settings.foreground) {
    themeOptions['&'] = baseStyle;
  }

  if (settings.fontSize) {
    themeOptions['&.cm-editor .cm-scroller'] = {
      fontSize: settings.fontSize,
    };
  }
  if (settings.lineHeight) {
    themeOptions['&.cm-editor .cm-scroller'] = {
      ...themeOptions['&.cm-editor .cm-scroller'],
      lineHeight: settings.lineHeight,
    };
  }
  if (settings.fontFamily) {
    themeOptions['&.cm-editor .cm-scroller'] = {
      ...themeOptions['&.cm-editor .cm-scroller'],
      fontFamily: settings.fontFamily,
    };
  }
  if (settings.gutterBackground) {
    themeOptions['.cm-gutters'].backgroundColor = settings.gutterBackground;
  }
  if (settings.gutterForeground) {
    themeOptions['.cm-gutters'].color = settings.gutterForeground;
  }
  if (settings.gutterBorder) {
    themeOptions['.cm-gutters'].borderRightColor = settings.gutterBorder;
  }

  if (settings.caret) {
    themeOptions['.cm-content'] = {
      caretColor: settings.caret,
    };
    themeOptions['.cm-cursor, .cm-dropCursor'] = {
      borderLeftColor: settings.caret,
      borderLeftWidth: '2px',
    };
  }
  let activeLineGutterStyle: any = {};
  if (settings.gutterActiveForeground) {
    activeLineGutterStyle.color = settings.gutterActiveForeground;
  }
  if (settings.lineHighlight) {
    themeOptions['.cm-activeLine'] = {
      backgroundColor: settings.lineHighlight,
    };
    activeLineGutterStyle.backgroundColor = settings.lineHighlight;
  }
  themeOptions['.cm-activeLineGutter'] = activeLineGutterStyle;

  if (settings.selection) {
    themeOptions[
      '&.cm-focused .cm-selectionBackground, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection'
    ] = {
      backgroundColor: settings.selection,
    };
  }
  if (settings.selectionMatch) {
    themeOptions['& .cm-selectionMatch'] = {
      backgroundColor: settings.selectionMatch,
    };
  }
  const themeExtension = EditorView.theme(themeOptions, {
    dark: true,
  });

  const highlightStyle = HighlightStyle.define(styles);
  const extension = [themeExtension, syntaxHighlighting(highlightStyle)];

  return extension;
};

export default createTheme;
