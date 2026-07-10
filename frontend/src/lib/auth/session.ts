import { auth } from "./firebase";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://inventory-management-server-cx01ppgc0.vercel.app");

/**
 * After Firebase login, send the ID token to the backend to create a session cookie.
 * This enables server-side auth checks via middleware.
 */
export async function createSession(): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const idToken = await user.getIdToken();

    const res = await fetch(`${API_URL}/api/auth/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      credentials: "include",
    });

    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Clear the session cookie by calling the logout endpoint.
 */
export async function destroySession(): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/session`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    // Silently fail — cookie will expire anyway
  }
}

/**
 * Get the ID token for API requests.
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}
