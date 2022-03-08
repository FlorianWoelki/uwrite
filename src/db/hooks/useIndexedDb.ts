import { useEffect, useState } from 'react';
import IndexedDb from '../indexedDb';

let cachedIndexedDb: IndexedDb | null = null;

export const useIndexedDb = () => {
  const [indexedDb, setIndexedDb] = useState<IndexedDb | null>(null);

  useEffect(() => {
    if (cachedIndexedDb !== null) {
      setIndexedDb(cachedIndexedDb);
      return;
    }

    const indexedDb = new IndexedDb('uwrite');
    (async (): Promise<void> => {
      await indexedDb.createObjectStore(['file']);

      if (indexedDb.didFreshlyCreatedTables()) {
        indexedDb.putValue(
          'file',
          { filename: 'Hello World', value: '# Hello World' },
          0,
        );
      }

      cachedIndexedDb = indexedDb;
      setIndexedDb(indexedDb);
    })();
  }, []);

  return cachedIndexedDb ? cachedIndexedDb : indexedDb;
};
