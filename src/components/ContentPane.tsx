import 'katex/dist/katex.min.css';
import { Position } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useKeyPress } from '../hooks/useKeyPress';
import { useSaveContent } from '../hooks/useSaveContent';
import { monaco } from '../monaco';
import { selectCurrentFile } from '../store';
import { MonacoEditor } from './editor/MonacoEditor';
import { renderPreview } from './util';
import { CodeMirrorEditor } from './editor/CodeMirrorEditor';

interface ContentPaneProps {
  shouldRenderPreview: boolean;
  toggleRender: () => void;
}

const useCodeMirrorEditor = true;

export const ContentPane: React.FC<ContentPaneProps> = ({
  shouldRenderPreview,
  toggleRender,
}): JSX.Element => {
  const codeEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [renderedPreviewContent, setRenderedPreviewContent] = useState<
    string | null
  >(null);
  const [editorPosition, setEditorPosition] = useState<Position | null>();

  const currentFile = useSelector(selectCurrentFile);
  const [_, saveContent] = useSaveContent();

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
    saveContent({
      ...currentFile!,
      value: codeEditorRef.current.getValue(),
    });
    setRenderedPreviewContent(renderPreview(codeEditorRef.current.getValue()));
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
    useCodeMirrorEditor ? (
      <CodeMirrorEditor
        value={currentFile?.value ?? ''}
        onChange={(value: string) => setNewValue(value)}
      />
    ) : (
      <MonacoEditor
        value={currentFile?.value ?? ''}
        ref={codeEditorRef}
        onCtrlCmdE={toggleRender}
        onChange={(value) => setNewValue(value)}
      />
    )
  ) : (
    <div
      className="mx-20 markdown text-iron-700 dark:text-white"
      dangerouslySetInnerHTML={{ __html: renderedPreviewContent }}
    ></div>
  );
};
