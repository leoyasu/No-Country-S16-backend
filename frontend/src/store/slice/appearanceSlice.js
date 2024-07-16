import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', 
};

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = appearanceSlice.actions;
export default appearanceSlice.reducer;