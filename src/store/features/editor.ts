import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const localStorageKey = 'isVimActive';

interface EditorState {
  isVimActive: boolean;
}

const initialState: EditorState = {
  isVimActive:
    JSON.parse(localStorage.getItem(localStorageKey) ?? 'null') ?? false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleVim: (state, action: PayloadAction<boolean>) => {
      state.isVimActive = action.payload;
      localStorage.setItem(localStorageKey, String(state.isVimActive));
    },
  },
});

export const { toggleVim } = editorSlice.actions;

export default editorSlice;
