import { configureStore } from '@reduxjs/toolkit';
import currentFileSlice from './features/currentFile';
import editorSlice from './features/editor';
import filesSlice from './features/files';

const store = configureStore({
  reducer: {
    currentFile: currentFileSlice.reducer,
    files: filesSlice.reducer,
    editor: editorSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectCurrentFile = (state: RootState) => state.currentFile.file;
export const selectAllFiles = (state: RootState) => state.files.files;
export const selectIsVimActive = (state: RootState) => state.editor.isVimActive;

export default store;
