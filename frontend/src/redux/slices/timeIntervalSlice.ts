import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TimeIntervalState {
  timeInterval: string;
}

const initialState: TimeIntervalState = {
  timeInterval: "weekly",
};

export const timeIntervalSlice = createSlice({
  name: "timeInterval",
  initialState,
  reducers: {
    setTimeInterval: (state, action: PayloadAction<string>) => {
      state.timeInterval = action.payload;
    },
  },
});

export const { setTimeInterval } = timeIntervalSlice.actions;
export default timeIntervalSlice.reducer;
