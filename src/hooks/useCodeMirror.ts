import { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { Extension } from '@codemirror/state';

export const defaultExtensions: Extension[] = [
  basicSetup,
  EditorView.lineWrapping,
];

export const useCodeMirror = (extensions: Extension[]) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<EditorView | null>(null);

  useEffect(() => {
    const newView = createNewView();

    return () => {
      newView?.destroy();
      view?.destroy();
      setView(null);
    };
  }, [ref.current]);

  const createNewView = (): EditorView | undefined => {
    if (!ref.current) {
      return undefined;
    }

    const newView = new EditorView({
      extensions: [...defaultExtensions, ...extensions],
      parent: ref.current,
    });

    setView(newView);
    return newView;
  };

  const recreate = (): void => {
    if (!view) {
      return;
    }

    view.destroy();
    createNewView();
  };

  return { ref, view, recreate };
};
