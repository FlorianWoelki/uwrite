import { app } from 'electron';
import path from 'path';
import fs from 'fs';

interface StoreData {
  windowBounds: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  };
}

type StoreOptionsDefaults = StoreData;

interface StoreOptions {
  configName: string;
  defaults: StoreOptionsDefaults;
}

export default class Store {
  private path: string;
  private data: StoreData;

  constructor(options: StoreOptions) {
    const userDataPath = app.getPath('userData');
    this.path = path.join(userDataPath, `${options.configName}.json`);
    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key: keyof StoreData): StoreData[keyof StoreData] {
    return this.data[key];
  }

  set(key: keyof StoreData, val: StoreData[keyof StoreData]): void {
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
