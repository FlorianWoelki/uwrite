import { useEffect } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { useCodeMirror } from './useCodeMirror';
import { Extension } from '@codemirror/state';

type OnChange = (value: string, viewUpdate: ViewUpdate) => void;

const onUpdate = (onChange: OnChange) => {
  return EditorView.updateListener.of((viewUpdate) => {
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
  extensions: Extension[];
}

export const useCodeEditor = ({ value, onChange, extensions }: Options) => {
  const { ref, view } = useCodeMirror([onUpdate(onChange), ...extensions]);

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

  return ref;
};
