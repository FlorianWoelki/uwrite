import { useEffect } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { useCodeMirror } from './useCodeMirror';
import { Extension } from '@codemirror/state';

type OnChange = (value: string, viewUpdate: ViewUpdate) => void;
type OnSelectionChange = (cursorPosition: number) => void;

const onUpdate = (onChange: OnChange, onSelectionChange: OnSelectionChange) => {
  return EditorView.updateListener.of((viewUpdate) => {
    if (
      viewUpdate.selectionSet &&
      viewUpdate.view.state.selection.ranges.length > 0
    ) {
      const from = viewUpdate.view.state.selection.ranges[0].from;
      if (from !== 0) {
        onSelectionChange(from);
      }
    }
    if (viewUpdate.docChanged) {
      const doc = viewUpdate.state.doc;
      const value = doc.toString();
      onChange(value, viewUpdate);
    }
  });
};

interface Options {
  value: string;
  onChange: OnChange;
  onSelectionChange: OnSelectionChange;
  extensions: Extension[];
}

export const useCodeEditor = ({
  value,
  onChange,
  onSelectionChange,
  extensions,
}: Options) => {
  const { ref, view } = useCodeMirror([
    onUpdate(onChange, onSelectionChange),
    ...extensions,
  ]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();
      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value ?? '',
          },
        });
      }
    }
  }, [value, view]);

  return { view, ref };
};
