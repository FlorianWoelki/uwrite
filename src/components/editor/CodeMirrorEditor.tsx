import { useEffect } from 'react';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';
import { StateEffect } from '@codemirror/state';
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
    extensions,
  });

  useEffect(() => {
    if (view) {
      view.dispatch({
        effects: StateEffect.reconfigure.of([
          ...defaultExtensions,
          ...extensions,
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
