import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
  isDark: string;
}

const initialState: DarkModeState = {
  isDark: "",
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>) => {
      state.isDark = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
