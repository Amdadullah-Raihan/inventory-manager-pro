import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Record<string, unknown>;
  token: string | null;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: {},
  token: null,
  isLoading: true,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, setLoading, setError, clearError, logout } =
  authSlice.actions;

export default authSlice.reducer;
