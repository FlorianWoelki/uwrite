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
    if (!ref.current) {
      return;
    }

    const view = new EditorView({
      extensions: [...defaultExtensions, ...extensions],
      parent: ref.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(null);
    };
  }, [ref.current]);

  return { ref, view };
};
