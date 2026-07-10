// Ambient type augmentation for Express Request
// No top-level imports - must be purely ambient for global application

declare namespace Express {
  interface Request {
    user?: {
      uid: string;
      email: string;
      emailVerified?: boolean;
      name?: string | null;
      picture?: string | null;
    };
  }
}
