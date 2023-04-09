import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  className,
  onChange,
  onModE,
  extensions = [],
}): JSX.Element => {
  const ref = useCodeEditor({ value, onChange, onModE, extensions });

  return <div ref={ref} className={className} />;
};
