import { useEffect } from 'react';
import { vim } from '@replit/codemirror-vim';
import { markdown } from '@codemirror/lang-markdown';
import { uwriteDark, uwriteLight } from './theme/uwrite';
import { useCodeEditor } from '../../hooks/useCodeEditor';
import './CodeMirrorEditor.css';
import { mathExtensions } from './extensions';
import { useSelector } from 'react-redux';
import { selectIsVimActive } from '../../store';

export const CodeMirrorEditor: React.FC<any> = ({
  value,
  cursorPosition,
  className,
  onChange,
  onSelectionChange,
  theme,
  extensions = [],
}): JSX.Element => {
  const isVimActive = useSelector(selectIsVimActive);

  const { ref, view, recreate } = useCodeEditor({
    value,
    onChange,
    onSelectionChange,
    extensions: [
      isVimActive ? vim() : [],
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

    // TODO: Possible to only update certain extensions?
    recreate();
  }, [theme, isVimActive]);

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
