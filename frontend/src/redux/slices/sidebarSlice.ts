import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isCollapsed: boolean;
  width: number;
}

const initialState: SidebarState = {
  isCollapsed: false,
  width: 0,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { setCollapsed, setWidth } = sidebarSlice.actions;
export default sidebarSlice.reducer;
