import { useCodeEditor } from '../../hooks/useCodeEditor';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  onChange,
  extensions = [],
}): JSX.Element => {
  const ref = useCodeEditor({ value, onChange, extensions });

  return <div ref={ref} />;
};
