import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {
  private database: string;
  private db: IDBPDatabase<unknown> | undefined;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(
    tableNames: string[],
  ): Promise<false | undefined> {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }

            db.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: 'id',
            });
          }
        },
      });
    } catch (error) {
      return false;
    }
  }

  public async getValue<T>(
    tableName: string,
    id: number,
  ): Promise<T | undefined> {
    if (!this.db) {
      console.log('Try to get data: `this.db` is not defined');
      return undefined;
    }

    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log('Get data', JSON.stringify(result));
    return result as T;
  }

  public async getAllValue<T>(tableName: string): Promise<T[]> {
    if (!this.db) {
      console.log('Try to get all data: `this.db` is not defined');
      return [];
    }

    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log('Get all data', JSON.stringify(result));
    return result as T[];
  }

  public async putValue<T>(tableName: string, value: T): Promise<IDBValidKey> {
    if (!this.db) {
      console.log('Try to put value: `this.db` is not defined');
      return [];
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    console.log('Put data', JSON.stringify(result));
    return result;
  }

  public async putBulkValue<T>(tableName: string, values: T[]): Promise<T[]> {
    if (!this.db) {
      console.log('Try to put bulk value: `this.db` is not defined');
      return [];
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
      console.log('Put bulk data', JSON.stringify(result));
    }

    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number): Promise<number> {
    if (!this.db) {
      console.log('Try to delete value: `this.db` is not defined');
      return -1;
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log('Id not found', id);
      return -1;
    }

    await store.delete(id);
    console.log('Deleted data', id);
    return id;
  }
}

export default IndexedDb;
