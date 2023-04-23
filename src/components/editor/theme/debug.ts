import { EditorView } from 'codemirror';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t, Tag } from '@lezer/highlight';

const debugTheme = EditorView.theme({
  '.cm-line span': {
    position: 'relative',
  },
  '.cm-line span:hover::after': {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    background: 'black',
    color: 'white',
    border: 'solid 2px',
    borderRadius: '5px',
    content: 'var(--tags)',
    width: `max-content`,
    padding: '1px 4px',
    zIndex: 10,
    pointerEvents: 'none',
  },
});

const styledTags = Object.entries(t).map(([key, value]) => {
  return { tag: value as Tag, '--tags': `"tag.${key}"` };
});
const debugHighlightStyle = HighlightStyle.define(styledTags);

// This extension can be used for getting the lezer tag of a specific word in the editor.
const debug = [debugTheme, syntaxHighlighting(debugHighlightStyle)];

export { debug, debugTheme, debugHighlightStyle };
