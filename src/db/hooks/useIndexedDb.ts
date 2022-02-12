import { useEffect } from 'react';
import IndexedDb from '../indexedDb';

export const useIndexedDb = (
  defaultContentValue: string,
  callback: () => void,
) => {
  const indexedDb = new IndexedDb('uwrite');

  useEffect(() => {
    (async (): Promise<void> => {
      await indexedDb.createObjectStore(['file']);

      if (indexedDb.didFreshlyCreatedTables()) {
        indexedDb.putValue('file', { value: defaultContentValue }, 0);
      }

      callback();
    })();
  }, []);

  return indexedDb;
};
