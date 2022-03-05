import { configureStore } from '@reduxjs/toolkit';
import currentFileSlice from './features/currentFile';

const store = configureStore({
  reducer: {
    currentFile: currentFileSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectCurrentFile = (state: RootState) => state.currentFile;

export default store;
