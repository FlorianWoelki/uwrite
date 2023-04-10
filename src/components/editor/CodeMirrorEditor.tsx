import { useEffect } from 'react';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';

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
