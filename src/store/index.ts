import { configureStore } from '@reduxjs/toolkit';
import currentFileSlice from './features/currentFile';
import filesSlice from './features/files';

const store = configureStore({
  reducer: {
    currentFile: currentFileSlice.reducer,
    files: filesSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectCurrentFile = (state: RootState) => state.currentFile;
export const selectAllFiles = (state: RootState) => state.files.files;

export default store;
