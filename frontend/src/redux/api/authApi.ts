import { baseApi } from "./baseApi";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** POST /api/user/send-otp — send OTP to email for registration */
    sendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/api/user/send-otp",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/user/register — create a new account (requires OTP) */
    register: builder.mutation<
      AuthResponse,
      { name: string; email: string; password: string; otp: string }
    >({
      query: (body) => ({
        url: "/api/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /** POST /api/user/login — sign in with email + password */
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /** GET /api/user/me — fetch current user from stored JWT token */
    getMe: builder.query<MeResponse, void>({
      query: () => "/api/user/me",
      providesTags: ["User"],
    }),

    /** PUT /api/user/change-password — update the current user's password */
    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/api/user/change-password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = authApi;
