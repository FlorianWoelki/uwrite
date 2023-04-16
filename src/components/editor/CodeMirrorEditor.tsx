import { useEffect } from 'react';
import { markdown } from '@codemirror/lang-markdown';
import { StateEffect } from '@codemirror/state';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';
import { defaultExtensions } from '../../hooks/useCodeMirror';

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
    extensions: [...extensions, markdown()],
  });

  useEffect(() => {
    if (view) {
      // TODO: Is there a more effective way to dispatch this effect?
      view.dispatch({
        effects: StateEffect.reconfigure.of([
          ...defaultExtensions,
          ...extensions,
          markdown(),
        ]),
      });
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
