import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import firebaseConfigJson from '../../firebase-applet-config.json';

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

// Resolution logic: Prefer VITE_FIREBASE_* env vars, fallback to firebase-applet-config.json
const env = (import.meta as any).env || {};

const rawConfig: FirebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || firebaseConfigJson?.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigJson?.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || firebaseConfigJson?.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigJson?.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson?.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || firebaseConfigJson?.appId,
  firestoreDatabaseId: env.VITE_FIREBASE_DATABASE_ID || firebaseConfigJson?.firestoreDatabaseId,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let isFirebaseConfigured = false;
let firebaseInitError: string | null = null;

try {
  if (rawConfig.apiKey && rawConfig.projectId) {
    if (!getApps().length) {
      app = initializeApp({
        apiKey: rawConfig.apiKey,
        authDomain: rawConfig.authDomain,
        projectId: rawConfig.projectId,
        storageBucket: rawConfig.storageBucket,
        messagingSenderId: rawConfig.messagingSenderId,
        appId: rawConfig.appId,
      });
    } else {
      app = getApp();
    }

    auth = getAuth(app);

    // If custom firestore database ID is set, pass it to getFirestore
    const databaseId = rawConfig.firestoreDatabaseId && rawConfig.firestoreDatabaseId !== '(default)'
      ? rawConfig.firestoreDatabaseId
      : undefined;

    if (databaseId) {
      db = getFirestore(app, databaseId);
    } else {
      db = getFirestore(app);
    }

    storage = getStorage(app);
    isFirebaseConfigured = true;
  } else {
    firebaseInitError = 'Firebase credentials missing in config.';
  }
} catch (error: any) {
  console.warn('Firebase initialization warning:', error);
  firebaseInitError = error?.message || 'Failed to initialize Firebase';
  isFirebaseConfigured = false;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Error Info:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error?.message?.includes('offline') || error?.message?.includes('unavailable') || error?.code === 'unavailable') {
      console.warn('Firebase connection check: client is offline or backend unavailable.');
    }
    return false;
  }
}

// Reusable Authentication Helpers
export function getCurrentUser() {
  return auth?.currentUser || null;
}

export async function registerUser(email: string, pass: string, name: string) {
  const { registerWithEmailPassword } = await import('../services/firebaseService');
  return registerWithEmailPassword(email, pass, name);
}

export async function loginUser(email: string, pass: string) {
  const { loginWithEmailPassword } = await import('../services/firebaseService');
  return loginWithEmailPassword(email, pass);
}

export async function loginWithGoogle() {
  const { signInWithGoogle } = await import('../services/firebaseService');
  return signInWithGoogle();
}

export async function logoutUser() {
  const { signOutUser } = await import('../services/firebaseService');
  return signOutUser();
}

export { app, auth, db, storage, isFirebaseConfigured, firebaseInitError };

