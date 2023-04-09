import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  className,
  onChange,
  extensions = [],
}): JSX.Element => {
  const ref = useCodeEditor({ value, onChange, extensions });

  return <div ref={ref} className={className} />;
};
