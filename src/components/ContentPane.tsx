import 'katex/dist/katex.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useKeyPress } from '../hooks/useKeyPress';
import { useSaveContent } from '../hooks/useSaveContent';
import { selectCurrentFile } from '../store';
import { renderPreview } from './util';
import { CodeMirrorEditor } from './editor/CodeMirrorEditor';
import { ThemeType } from '../hooks/useDarkMode';
import { uwriteDark, uwriteLight } from './editor/theme/uwrite';

interface ContentPaneProps {
  theme: ThemeType;
  shouldRenderPreview: boolean;
  toggleRender: () => void;
}

export const ContentPane: React.FC<ContentPaneProps> = ({
  theme,
  shouldRenderPreview,
  toggleRender,
}): JSX.Element => {
  const [renderedPreviewContent, setRenderedPreviewContent] = useState<
    string | null
  >(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const currentFile = useSelector(selectCurrentFile);
  const [_, saveContent] = useSaveContent();

  useEffect(() => {
    if (!shouldRenderPreview) {
      setRenderedPreviewContent(null);
      return;
    }

    saveContent({
      ...currentFile!,
    });
    setRenderedPreviewContent(renderPreview(currentFile?.value ?? ''));
  }, [shouldRenderPreview]);

  useKeyPress(
    ['e'],
    () => {
      toggleRender();
    },
    true,
  );

  const [newValue, setNewValue] = useState<string>(currentFile?.value ?? '');

  useEffect(() => {
    saveContent({ ...currentFile!, value: newValue });
  }, [newValue]);

  return !shouldRenderPreview || !renderedPreviewContent ? (
    <CodeMirrorEditor
      className="px-11"
      cursorPosition={cursorPosition}
      value={currentFile?.value ?? ''}
      onChange={(value: string) => setNewValue(value)}
      onSelectionChange={(cursorPosition: number) =>
        setCursorPosition(cursorPosition)
      }
      extensions={[theme === 'dark' ? uwriteDark : uwriteLight]}
    />
  ) : (
    <div
      className="mx-20 markdown text-iron-700 dark:text-white"
      dangerouslySetInnerHTML={{ __html: renderedPreviewContent }}
    ></div>
  );
};
