import admin from "firebase-admin";

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Option 1: Base64-encoded service account JSON (production)
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString(
        "utf-8",
      ),
    );
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Option 2: Path to service account JSON file
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    // Option 3: Project ID only — uses ADC (gcloud/auth) or emulator
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      credential: admin.credential.applicationDefault(),
    });
  } else {
    console.warn(
      "Firebase Admin: No credentials found. Set FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS.",
    );
    // Initialize with just projectId so the SDK loads (will fail on auth calls)
    admin.initializeApp({ projectId: "inventory-management-app-efc75" });
  }
}

// Helper to safely get auth — throws a clear error if not configured
export function getAuth() {
  try {
    return admin.auth();
  } catch {
    throw new Error(
      "Firebase Admin is not configured. Set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file, " +
        "or set FIREBASE_SERVICE_ACCOUNT to a base64-encoded service account JSON.",
    );
  }
}

export default admin;
