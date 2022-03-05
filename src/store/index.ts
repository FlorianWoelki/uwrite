import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentFileState {
  id: number;
  filename: string;
  value: string;
}

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
    setCurrentFileContent: (state, action: PayloadAction<CurrentFileState>) => {
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

const store = configureStore({
  reducer: {
    currentFile: currentFileSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectCurrentFile = (state: RootState) => state.currentFile;

export default store;
