import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File, FileContent } from '../../db/indexedDb';

interface CurrentFileState {
  file?: File;
}

const initialState: CurrentFileState = {};

const currentFileSlice = createSlice({
  name: 'currentFile',
  initialState,
  reducers: {
    setCurrentFilename: (state, action: PayloadAction<string>) => {
      if (!state.file) {
        return;
      }

      state.file.filename = action.payload;
    },
    setCurrentFileValue: (state, action: PayloadAction<string>) => {
      if (!state.file) {
        return;
      }

      state.file.value = action.payload;
    },
    setCurrentFileContent: (state, action: PayloadAction<FileContent>) => {
      if (!state.file) {
        return;
      }

      state.file.filename = action.payload.filename;
      state.file.value = action.payload.value;
    },
    setCurrentFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
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
