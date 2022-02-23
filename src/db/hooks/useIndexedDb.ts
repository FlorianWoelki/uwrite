import { useEffect, useState } from 'react';
import IndexedDb from '../indexedDb';

export const useIndexedDb = () => {
  const [indexedDb, setIndexedDb] = useState<IndexedDb | null>(null);

  useEffect(() => {
    const indexedDb = new IndexedDb('uwrite');
    (async (): Promise<void> => {
      await indexedDb.createObjectStore(['file']);

      if (indexedDb.didFreshlyCreatedTables()) {
        indexedDb.putValue('file', { value: '# Hello World' }, 0);
      }

      setIndexedDb(indexedDb);
    })();
  }, []);

  return indexedDb;
};
