import { useEffect, useState } from 'react';
import IndexedDb from '../indexedDb';

export const useIndexedDb = (defaultContentValue: string) => {
  const [indexedDb, setIndexedDb] = useState<IndexedDb | null>(null);

  useEffect(() => {
    const indexedDb = new IndexedDb('uwrite');
    (async (): Promise<void> => {
      await indexedDb.createObjectStore(['file']);

      if (indexedDb.didFreshlyCreatedTables()) {
        indexedDb.putValue('file', { value: defaultContentValue }, 0);
      }

      setIndexedDb(indexedDb);
    })();
  }, []);

  return indexedDb;
};
