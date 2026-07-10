import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkModeSlice";
import invoiceReducer from "./slices/invoiceSlice";
import sidebarReducer from "./slices/sidebarSlice";
import timeIntervalReducer from "./slices/timeIntervalSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    darkMode: darkModeReducer,
    invoice: invoiceReducer,
    sidebar: sidebarReducer,
    timeInterval: timeIntervalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/googleSignIn/fulfilled",
          "auth/emailSignIn/fulfilled",
        ],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
