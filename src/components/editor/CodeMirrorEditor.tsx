import { useEffect } from 'react';
import { markdown } from '@codemirror/lang-markdown';
import { tags as t } from '@lezer/highlight';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';

const katexDelim = {
  resolve: 'Katex',
  mark: 'KatexMark',
};

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  cursorPosition,
  className,
  onChange,
  onSelectionChange,
  extensions = [],
}): JSX.Element => {
  const { ref, view } = useCodeEditor({
    value,
    onChange,
    onSelectionChange,
    extensions: [
      ...extensions,
      markdown({
        extensions: [
          // Custom katex highlighting.
          {
            defineNodes: [
              {
                name: 'Katex',
                style: { 'Katex/...': t.atom },
              },
              {
                name: 'KatexMark',
                style: t.processingInstruction,
              },
            ],
            parseInline: [
              {
                name: 'Katex',
                parse: (cx, next, pos) => {
                  const character: number = 36; // $
                  if (next !== character) {
                    return -1;
                  }

                  return cx.addDelimiter(katexDelim, pos, pos + 1, true, true);
                },
              },
            ],
          },
        ],
      }),
    ],
  });

  useEffect(() => {
    if (view) {
      // TODO: Is there a more effective way to dispatch this effect?
      // view.dispatch({
      //   effects: StateEffect.reconfigure.of([
      //     ...defaultExtensions,
      //     ...extensions,
      //     markdown(),
      //   ]),
      // });
    }
  }, [extensions]);

  useEffect(() => {
    if (view) {
      view.focus();
      view!.dispatch({
        selection: {
          anchor: cursorPosition,
          head: cursorPosition,
        },
      });
    }
  }, [view]);

  return <div ref={ref} className={className} />;
};
