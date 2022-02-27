import 'katex/dist/katex.min.css';
import { Position } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { useKeyPress } from '../hooks/useKeyPress';
import { monaco } from '../monaco';
import { MonacoEditor } from './editor/MonacoEditor';
import { renderPreview } from './util';

interface ContentPaneProps {
  fileValue: string;
  shouldRenderPreview: boolean;
  toggleRender: () => void;
  onSave: (value: string) => void;
}

export const ContentPane: React.FC<ContentPaneProps> = ({
  fileValue,
  shouldRenderPreview,
  toggleRender,
  onSave,
}): JSX.Element => {
  const codeEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [renderedPreviewContent, setRenderedPreviewContent] = useState<
    string | null
  >(null);
  const [editorPosition, setEditorPosition] = useState<Position | null>();

  useEffect(() => {
    if (!codeEditorRef.current) {
      return;
    }

    if (!shouldRenderPreview) {
      setRenderedPreviewContent(null);
      if (editorPosition) {
        codeEditorRef.current.setPosition(editorPosition);
      }

      return;
    }

    setEditorPosition(codeEditorRef.current.getPosition());
    onSave(codeEditorRef.current.getValue());
    setRenderedPreviewContent(renderPreview(codeEditorRef.current.getValue()));
  }, [shouldRenderPreview]);

  useKeyPress(
    ['e'],
    () => {
      toggleRender();
    },
    true,
  );

  return !shouldRenderPreview || !renderedPreviewContent ? (
    <MonacoEditor
      value={fileValue}
      ref={codeEditorRef}
      onCtrlCmdE={toggleRender}
      onChange={onSave}
    />
  ) : (
    <div
      className="markdown mx-20 text-iron-700 dark:text-white"
      dangerouslySetInnerHTML={{ __html: renderedPreviewContent }}
    ></div>
  );
};
