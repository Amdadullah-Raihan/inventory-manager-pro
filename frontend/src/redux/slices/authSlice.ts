import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

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

// ---- Thunks ----

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/user/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      return data as { token: string; user: AuthUser };
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Registration failed";
      return rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      return data as { token: string; user: AuthUser };
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Login failed";
      return rejectWithValue(message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token");

      const { data } = await axios.get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { token, user: data.user as AuthUser };
    } catch {
      localStorage.removeItem("token");
      return rejectWithValue("Session expired");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    {
      currentPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/user/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Password update failed";
      return rejectWithValue(message);
    }
  },
);

// ---- Slice ----

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user as unknown as Record<string, unknown>;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user as unknown as Record<string, unknown>;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch current user (app init)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user as unknown as Record<string, unknown>;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = {};
        state.token = null;
        state.isLoading = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.token = null;
        state.isLoading = false;
      })
      // Change Password
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;
