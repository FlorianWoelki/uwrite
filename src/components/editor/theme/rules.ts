import { monaco } from '../../../monaco';
import { getCodeColor } from './codeColors';

type Rule = monaco.editor.ITokenThemeRule;

const colors = {
  red: '#dc2626',
  blue1: '#9ECBFF',
  blue2: '#79B8FF',
  purple: '#B392F0',
  gray: '#6A737D',
  orange: '#FFAB70',
  green: '#85E89D',

  text: '#d1d5da',
  lightText: '#2b3036',
  keyword: '#f97583',
  lightKeyword: '#d73a49',
};

export const getEditorThemeRules = (isDarkMode: boolean): Rule[] => {
  const rules: Rule[] = [];

  rules.push(
    { token: '', foreground: isDarkMode ? colors.text : colors.lightText },
    { token: 'invalid', foreground: colors.red },
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
  );

  rules.push(
    { token: 'comment.md', foreground: colors.gray },
    {
      token: 'keyword.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
      fontStyle: 'bold',
    },
    {
      token: 'keyword.table.header.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'keyword.table.middle.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'keyword.table.left.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'keyword.table.right.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'string.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'string.link.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
    },
    {
      token: 'variable.md',
      foreground: isDarkMode ? colors.text : colors.lightText,
      background: isDarkMode ? colors.text : colors.lightText,
    },
  );

  rules.push(
    {
      token: 'keyword',
      foreground: getCodeColor(isDarkMode, 'keyword'),
    },
    {
      token: 'string',
      foreground: getCodeColor(isDarkMode, 'string'),
    },
    {
      token: 'identifier',
      foreground: getCodeColor(isDarkMode, 'function'),
    },
    { token: 'type.identifier', foreground: colors.orange },
    { token: 'comment', foreground: colors.gray },
    {
      token: 'number',
      foreground: getCodeColor(isDarkMode, 'number'),
    },
    { token: 'tag', foreground: colors.green },
    { token: 'tag.css', foreground: colors.purple },
    { token: 'attribute.name', foreground: colors.purple },
    { token: 'attribute.value', foreground: colors.orange },
    { token: 'string.key', foreground: colors.purple },
  );

  return rules;
};
