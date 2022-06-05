type CodeColorKey = 'keyword' | 'number' | 'string' | 'function';

type ColorTheme = { [K in CodeColorKey]: string };

const githubDarkColors: ColorTheme = {
  keyword: '#ff7b72',
  number: '#79c0ff',
  string: '#a5d6ff',
  function: '#d2a8ff',
};

const githubLightColors: ColorTheme = {
  keyword: '#d73a49',
  number: '#005cc5',
  string: '#032f62',
  function: '#6f42c1',
};

export const getCodeColor = (
  isDarkMode: boolean,
  key: CodeColorKey,
): string => {
  return isDarkMode ? githubDarkColors[key] : githubLightColors[key];
};
