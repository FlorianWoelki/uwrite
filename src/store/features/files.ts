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
    addFile: (state) => {},
  },
});

export const { setFiles, updateFile } = filesSlice.actions;

export default filesSlice;
