import { tags as t } from '@lezer/highlight';
import { createTheme, CreateThemeOptions } from './theme';

const defaultSettingsUwriteDark: CreateThemeOptions['settings'] = {
  background: '#2b3036',
  gutterBackground: '#2b3036',
  gutterActiveForeground: '#c6c6c6',
  gutterForeground: '#858585',
  foreground: '#d1d5da',
  caret: '#bababa',
  selection: '#195081',
  selectionMatch: '#195081',
  lineHighlight: 'transparent',
  fontSize: '20px',
  lineHeight: '40px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
};

const defaultSettingsUwriteLight: CreateThemeOptions['settings'] = {
  background: '#eaeaeb',
  gutterBackground: '#eaeaeb',
  gutterActiveForeground: '#0b216f',
  gutterForeground: '#237893',
  foreground: '#2b3036',
  caret: '#bababa',
  selection: 'rgba(201, 228, 255, 0.6)',
  selectionMatch: 'rgba(201, 228, 255, 0.6)',
  lineHighlight: 'transparent',
  fontSize: '20px',
  lineHeight: '40px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
};

export const uwriteLightInit = () => {
  return createTheme({
    settings: {
      ...defaultSettingsUwriteLight,
    },
    styles: [
      { tag: [t.standard(t.tagName), t.tagName], color: '#7ee787' },
      { tag: [t.comment, t.bracket], color: '#8b949e' },
      { tag: [t.className, t.propertyName], color: '#d2a8ff' },
      {
        tag: [t.variableName, t.attributeName, t.number, t.operator],
        color: '#79c0ff',
      },
      {
        tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
        color: '#ff7b72',
      },
      { tag: [t.string, t.meta, t.regexp], color: '#3b82f6' },
      { tag: [t.name, t.quote], color: '#3b82f6' },
      { tag: [t.heading], color: '#8b5cf6', fontWeight: 'bold' },
      { tag: [t.emphasis], color: '#e879f9', fontStyle: 'italic' },
      { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#d97706' },
      { tag: t.link, textDecoration: 'underline' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.invalid, color: '#f97583' },
    ],
  });
};

export const uwriteDarkInit = () => {
  return createTheme({
    settings: {
      ...defaultSettingsUwriteDark,
    },
    styles: [
      { tag: [t.standard(t.tagName), t.tagName], color: '#7ee787' },
      { tag: [t.comment, t.bracket], color: '#8b949e' },
      { tag: [t.className, t.propertyName], color: '#d2a8ff' },
      {
        tag: [t.variableName, t.attributeName, t.number, t.operator],
        color: '#79c0ff',
      },
      {
        tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
        color: '#ff7b72',
      },
      {
        tag: [t.string, t.meta, t.regexp, t.monospace],
        color: '#a5d6ff',
      },
      { tag: [t.name, t.quote], color: '#7ee787' },
      { tag: [t.heading], color: '#d2a8ff', fontWeight: 'bold' },
      { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
      { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab70' },
      { tag: t.link, textDecoration: 'underline' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.invalid, color: '#f97583' },
    ],
  });
};

export const uwriteDark = uwriteDarkInit();
export const uwriteLight = uwriteLightInit();
