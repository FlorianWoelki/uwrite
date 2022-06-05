import { monaco } from '../../../monaco';

type Rule = monaco.editor.ITokenThemeRule;

const githubDarkColors = {
  keyword: '#ff7b72',
  number: '#79c0ff',
  string: '#a5d6ff',
  function: '#d2a8ff',
};

const githubLightColors = {
  keyword: '#d73a49',
  number: '#005cc5',
  string: '#032f62',
  function: '#6f42c1',
};

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
      foreground: isDarkMode
        ? githubDarkColors.keyword
        : githubLightColors.keyword,
    },
    {
      token: 'string',
      foreground: isDarkMode
        ? githubDarkColors.string
        : githubLightColors.string,
    },
    {
      token: 'identifier',
      foreground: isDarkMode
        ? githubDarkColors.function
        : githubLightColors.function,
    },
    { token: 'type.identifier', foreground: colors.orange },
    { token: 'comment', foreground: colors.gray },
    {
      token: 'number',
      foreground: isDarkMode
        ? githubDarkColors.number
        : githubLightColors.number,
    },
    { token: 'tag', foreground: colors.green },
    { token: 'tag.css', foreground: colors.purple },
    { token: 'attribute.name', foreground: colors.purple },
    { token: 'attribute.value', foreground: colors.orange },
    { token: 'string.key', foreground: colors.purple },
  );

  return rules;
};
