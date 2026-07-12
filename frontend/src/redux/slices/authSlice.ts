import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  type User,
} from "firebase/auth";
import initializeAuthentication from "@/services/firebase/firebase.init";

interface AuthState {
  user: Record<string, unknown>;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: {},
  isLoading: true,
  error: "",
};

// Initialize Firebase auth
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

/**
 * Extract only serializable fields from a Firebase User object.
 * Firebase UserImpl contains non-serializable internals (methods, circular refs)
 * that Redux cannot store. This extracts the plain data we actually need.
 */
const serializeUser = (firebaseUser: User | null): Record<string, unknown> => {
  if (!firebaseUser) return {};
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
    phoneNumber: firebaseUser.phoneNumber,
  };
};

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return serializeUser(result.user);
});

export const emailSignIn = createAsyncThunk(
  "auth/emailSignIn",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return serializeUser(result.user);
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (newPassword: string) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
  },
);

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
      // Google Sign In
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google sign-in failed";
      })
      // Email Sign In
      .addCase(emailSignIn.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(emailSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(emailSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Email sign-in failed";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
      })
      // Change Password
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.error.message || "Password update failed";
      });
  },
});

export const { setUser, setLoading, clearError } = authSlice.actions;

// Auth state listener - should be called once at app init
export const initAuthListener = () => (dispatch: AppDispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    dispatch(setUser(serializeUser(user)));
    dispatch(setLoading(false));
  });
  return unsubscribe;
};

export default authSlice.reducer;

// Import at bottom to avoid circular dependency
import type { AppDispatch } from "../store";
