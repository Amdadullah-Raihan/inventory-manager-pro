import jwt from "jsonwebtoken";
import https from "https";

const CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

interface Certs {
  [kid: string]: string;
}

let cachedCerts: Certs | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000;

function fetchCerts(): Promise<Certs> {
  return new Promise((resolve, reject) => {
    https
      .get(CERTS_URL, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

async function getCerts(): Promise<Certs> {
  if (cachedCerts && Date.now() - cacheTime < CACHE_TTL) return cachedCerts;
  cachedCerts = await fetchCerts();
  cacheTime = Date.now();
  return cachedCerts;
}

export interface FirebaseTokenPayload {
  aud: string;
  iss: string;
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  uid: string;
  iat: number;
  exp: number;
}

export async function verifyFirebaseToken(
  idToken: string,
): Promise<FirebaseTokenPayload> {
  const projectId =
    process.env.FIREBASE_PROJECT_ID || "inventory-management-app-efc75";

  const decoded = jwt.decode(idToken, { complete: true });
  if (!decoded || typeof decoded === "string")
    throw new Error("Invalid token format");

  const certs = await getCerts();
  const publicKey = certs[decoded.header.kid!];
  if (!publicKey) throw new Error(`Unknown key: ${decoded.header.kid}`);

  return jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  }) as FirebaseTokenPayload;
}
