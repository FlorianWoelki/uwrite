import { useEffect } from 'react';
import { markdown } from '@codemirror/lang-markdown';
import { uwriteDark, uwriteLight } from './theme/uwrite';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';
import { mathExtensions } from './extensions';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  cursorPosition,
  className,
  onChange,
  onSelectionChange,
  theme,
  extensions = [],
}): JSX.Element => {
  const { ref, view, recreate } = useCodeEditor({
    value,
    onChange,
    onSelectionChange,
    extensions: [
      ...extensions,
      theme === 'dark' ? uwriteDark : uwriteLight,
      markdown({
        extensions: mathExtensions,
      }),
    ],
  });

  useEffect(() => {
    if (!ref.current || !view) {
      return;
    }

    recreate();
  }, [theme]);

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
