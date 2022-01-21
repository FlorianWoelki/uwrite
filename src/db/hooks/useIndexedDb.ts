import { useEffect } from 'react';
import IndexedDb from '../indexedDb';

export const useIndexedDb = (
  didFinishConnecting: (indexedDb: IndexedDb) => void,
) => {
  const indexedDb = new IndexedDb('uwrite');

  useEffect(() => {
    (async (): Promise<void> => {
      await indexedDb.createObjectStore(['file']);
      didFinishConnecting(indexedDb);
    })();
  }, []);

  return indexedDb;
};
