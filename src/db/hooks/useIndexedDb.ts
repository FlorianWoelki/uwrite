import { useEffect } from 'react';
import IndexedDb from '../indexedDb';

export const useIndexedDb = () => {
  const indexedDb = new IndexedDb('uwrite');
  useEffect(() => {
    (async (): Promise<void> => {
      // await indexedDb.createObjectStore(['']);
    })();
  }, []);

  return indexedDb;
};
