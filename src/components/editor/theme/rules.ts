import { monaco } from '../../../monaco';

type Rule = monaco.editor.ITokenThemeRule;

const colors = {
  red: '#dc2626',
  blue1: '#9ECBFF',
  blue2: '79B8FF',
  purple: '#B392F0',
  gray: '#6A737D',
  orange: '#FFAB70',
  green: '#85E89D',

  text: '#d1d5da',
};

export const getEditorThemeRules = (): Rule[] => {
  const rules: Rule[] = [];

  rules.push(
    { token: '', foreground: colors.text },
    { token: 'invalid', foreground: colors.red },
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
  );

  rules.push(
    { token: 'comment.md', foreground: colors.text },
    { token: 'keyword.md', foreground: colors.text, fontStyle: 'bold' },
    { token: 'keyword.table.header.md', foreground: colors.text },
    { token: 'keyword.table.middle.md', foreground: colors.text },
    { token: 'keyword.table.left.md', foreground: colors.text },
    { token: 'keyword.table.right.md', foreground: colors.text },
    { token: 'string.md', foreground: colors.text },
    { token: 'string.link.md', foreground: colors.text },
    { token: 'variable.md', foreground: colors.text, background: colors.text },
  );

  rules.push(
    { token: 'keyword', foreground: colors.red },
    { token: 'string', foreground: colors.blue1 },
    { token: 'identifier', foreground: colors.purple },
    { token: 'type.identifier', foreground: colors.orange },
    { token: 'comment', foreground: colors.gray },
    { token: 'number', foreground: colors.blue2 },
    { token: 'tag', foreground: colors.green },
    { token: 'tag.css', foreground: colors.purple },
    { token: 'attribute.name', foreground: colors.purple },
    { token: 'attribute.value', foreground: colors.orange },
    { token: 'string.key', foreground: colors.purple },
  );

  return rules;
};
