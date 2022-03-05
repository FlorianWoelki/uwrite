import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File, FileContent } from '../../db/indexedDb';

type CurrentFileState = File;

const initialState: CurrentFileState = {
  id: 0,
  filename: 'Hello World',
  value: '# Hello World',
};

const currentFileSlice = createSlice({
  name: 'currentFile',
  initialState,
  reducers: {
    setCurrentFilename: (state, action: PayloadAction<string>) => {
      state.filename = action.payload;
    },
    setCurrentFileValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setCurrentFileContent: (state, action: PayloadAction<FileContent>) => {
      state.filename = action.payload.filename;
      state.value = action.payload.value;
    },
    setCurrentFile: (state, action: PayloadAction<CurrentFileState>) => {
      state.id = action.payload.id;
      state.filename = action.payload.filename;
      state.value = action.payload.value;
    },
  },
});

export const {
  setCurrentFile,
  setCurrentFileValue,
  setCurrentFileContent,
  setCurrentFilename,
} = currentFileSlice.actions;

export default currentFileSlice;
