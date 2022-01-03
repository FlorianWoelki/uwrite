import { app } from 'electron';
import path from 'path';
import fs from 'fs';

type StoreOptionsDefaults = Record<string, any>;

interface StoreOptions {
  configName: string;
  defaults: StoreOptionsDefaults;
}

export default class Store {
  private path: string;
  private data: Record<string, any>;

  constructor(options: StoreOptions) {
    const userDataPath = app.getPath('userData');
    this.path = path.join(userDataPath, `${options.configName}.json`);
    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key: string): any {
    return this.data[key];
  }

  set(key: string, val: any): void {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

const parseDataFile = (
  filePath: string,
  defaults: StoreOptionsDefaults,
): StoreOptionsDefaults => {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    return defaults;
  }
};
