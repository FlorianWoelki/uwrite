import { useEffect } from 'react';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  className,
  onChange,
  onModE,
  extensions = [],
}): JSX.Element => {
  const { ref, view } = useCodeEditor({ value, onChange, onModE, extensions });

  useEffect(() => {
    if (view) {
      view.focus();
    }
  }, [view]);

  return <div ref={ref} className={className} />;
};
