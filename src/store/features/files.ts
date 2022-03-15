import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File, FileContent } from '../../db/indexedDb';

interface FilesState {
  files: File[];
}

interface UpdateFilePayload {
  id: number;
  content: Partial<FileContent>;
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
    updateFile: (state, action: PayloadAction<UpdateFilePayload>) => {
      state.files = state.files.map((file) => {
        if (file.id === action.payload.id) {
          return {
            ...file,
            ...action.payload.content,
          };
        }

        return file;
      });
    },
    addFile: (state) => {
      let lastId = 0;
      if (state.files.length > 0) {
        lastId = state.files[state.files.length - 1].id + 1;
      }
      state.files = [
        ...state.files,
        { id: lastId ? lastId + 1 : 0, filename: 'Unnamed', value: '' },
      ];
    },
  },
});

export const { setFiles, updateFile, addFile } = filesSlice.actions;

export default filesSlice;
