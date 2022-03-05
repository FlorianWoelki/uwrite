import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from '../../db/indexedDb';

interface FilesState {
  files: File[];
}

const initialState: FilesState = {
  files: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    updateFile: (state) => {},
    addFile: (state) => {},
  },
});

export const { setFiles, updateFile } = filesSlice.actions;

export default filesSlice;
