import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  doc,
  getDocFromServer,
  setLogLevel,
} from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import firebaseConfigJson from "../../firebase-applet-config.json";

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

const env = (import.meta as any).env || {};

/*
 * PREMIUM STORE FIREBASE CONFIG
 *
 * IMPORTANT:
 * authDomain MUST be the Firebase domain.
 * DO NOT use the Vercel domain here.
 */

const firebaseConfig: FirebaseConfig = {
  apiKey:
    env.VITE_FIREBASE_API_KEY ||
    firebaseConfigJson?.apiKey ||
    "",

  // FORCE CORRECT FIREBASE AUTH DOMAIN
  authDomain: "premium-store-9c496.firebaseapp.com",

  projectId:
    env.VITE_FIREBASE_PROJECT_ID ||
    firebaseConfigJson?.projectId ||
    "premium-store-9c496",

  storageBucket:
    env.VITE_FIREBASE_STORAGE_BUCKET ||
    firebaseConfigJson?.storageBucket ||
    "premium-store-9c496.firebasestorage.app",

  messagingSenderId:
    env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    firebaseConfigJson?.messagingSenderId ||
    "551513949790",

  appId:
    env.VITE_FIREBASE_APP_ID ||
    firebaseConfigJson?.appId ||
    "1:551513949790:web:435e77948358c8657c56cf",

  firestoreDatabaseId:
    env.VITE_FIREBASE_DATABASE_ID ||
    firebaseConfigJson?.firestoreDatabaseId ||
    "G-273J1BRTRF",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

let isFirebaseConfigured = false;
let firebaseInitError: string | null = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {

    /*
     * Initialize Firebase only once
     */
    if (!getApps().length) {
      app = initializeApp({
        apiKey: firebaseConfig.apiKey,
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket,
        messagingSenderId: firebaseConfig.messagingSenderId,
        appId: firebaseConfig.appId,
      });
    } else {
      app = getApp();
    }

    /*
     * Firebase Authentication
     */
    auth = getAuth(app);

    /*
     * Debug information
     * This will help us verify the production configuration.
     */
    console.log("========================================");
    console.log("PREMIUM STORE FIREBASE CONFIG");
    console.log("========================================");
    console.log("Website Origin:", window.location.origin);
    console.log("Firebase Project ID:", auth.app.options.projectId);
    console.log("Firebase Auth Domain:", auth.app.options.authDomain);
    console.log("Firebase App ID:", auth.app.options.appId);
    console.log("========================================");

    /*
     * Reduce Firebase console logs
     */
    try {
      setLogLevel("error");
    } catch {
      // Ignore logging errors
    }

    /*
     * Firestore
     */
    const databaseId =
      firebaseConfig.firestoreDatabaseId &&
      firebaseConfig.firestoreDatabaseId !== "(default)"
        ? firebaseConfig.firestoreDatabaseId
        : undefined;

    try {
      if (databaseId) {
        db = initializeFirestore(
          app,
          {
            experimentalAutoDetectLongPolling: true,
          },
          databaseId
        );
      } else {
        db = initializeFirestore(app, {
          experimentalAutoDetectLongPolling: true,
        });
      }
    } catch {
      db = databaseId
        ? getFirestore(app, databaseId)
        : getFirestore(app);
    }

    /*
     * Firebase Storage
     */
    storage = getStorage(app);

    isFirebaseConfigured = true;

  } else {
    firebaseInitError = "Firebase credentials are missing.";
    console.error(firebaseInitError);
  }

} catch (error: any) {
  console.error("Firebase initialization error:", error);

  firebaseInitError =
    error?.message || "Failed to initialize Firebase";

  isFirebaseConfigured = false;
}

/*
 * Firestore operation types
 */
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

/*
 * Firestore error information
 */
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;

  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;

    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/*
 * Firestore error handler
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {

  const errInfo: FirestoreErrorInfo = {
    error:
      error instanceof Error
        ? error.message
        : String(error),

    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified:
        auth?.currentUser?.emailVerified || null,
      isAnonymous:
        auth?.currentUser?.isAnonymous || null,
      tenantId:
        auth?.currentUser?.tenantId || null,

      providerInfo:
        auth?.currentUser?.providerData?.map(
          (provider) => ({
            providerId: provider.providerId,
            email: provider.email,
          })
        ) || [],
    },

    operationType,
    path,
  };

  console.warn(
    "Firestore Error Info:",
    JSON.stringify(errInfo)
  );

  throw new Error(JSON.stringify(errInfo));
}

/*
 * Test Firebase connection
 */
export async function testConnection() {

  if (!db) {
    console.warn("Firestore is not initialized.");
    return false;
  }

  try {

    await getDocFromServer(
      doc(db, "test", "connection")
    );

    return true;

  } catch (error: any) {

    if (
      error?.message?.includes("offline") ||
      error?.message?.includes("unavailable") ||
      error?.code === "unavailable"
    ) {
      console.warn(
        "Firebase connection check: backend unavailable."
      );
    }

    return false;
  }
}

/*
 * Get currently logged-in user
 */
export function getCurrentUser() {
  return auth?.currentUser || null;
}

/*
 * Register user
 */
export async function registerUser(
  email: string,
  pass: string,
  name: string
) {
  const {
    registerWithEmailPassword,
  } = await import("../services/firebaseService");

  return registerWithEmailPassword(
    email,
    pass,
    name
  );
}

/*
 * Login user
 */
export async function loginUser(
  email: string,
  pass: string
) {
  const {
    loginWithEmailPassword,
  } = await import("../services/firebaseService");

  return loginWithEmailPassword(
    email,
    pass
  );
}

/*
 * Google Login
 */
export async function loginWithGoogle() {

  const {
    signInWithGoogle,
  } = await import("../services/firebaseService");

  return signInWithGoogle();
}

/*
 * Logout
 */
export async function logoutUser() {

  const {
    signOutUser,
  } = await import("../services/firebaseService");

  return signOutUser();
}

/*
 * Export Firebase services
 */
export {
  app,
  auth,
  db,
  storage,
  isFirebaseConfigured,
  firebaseInitError,
};