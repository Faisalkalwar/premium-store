import {
  initializeApp,
  getApps,
  getApp,
  FirebaseApp,
} from 'firebase/app';

import {
  getAuth,
  Auth,
} from 'firebase/auth';

import {
  initializeFirestore,
  getFirestore,
  Firestore,
  doc,
  getDocFromServer,
  setLogLevel,
} from 'firebase/firestore';

import {
  getStorage,
  FirebaseStorage,
} from 'firebase/storage';

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

// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

const env = (import.meta as any).env || {};

const targetProjectId =
  env.VITE_FIREBASE_PROJECT_ID &&
  env.VITE_FIREBASE_PROJECT_ID.trim()
    ? env.VITE_FIREBASE_PROJECT_ID.trim()
    : firebaseConfigJson?.projectId || 'premium-store-9c496';

// ============================================================
// AUTH DOMAIN
// ============================================================

let targetAuthDomain =
  env.VITE_FIREBASE_AUTH_DOMAIN &&
  env.VITE_FIREBASE_AUTH_DOMAIN.trim()
    ? env.VITE_FIREBASE_AUTH_DOMAIN.trim()
    : firebaseConfigJson?.authDomain;

if (
  !targetAuthDomain ||
  targetAuthDomain.includes('vercel.app') ||
  targetAuthDomain.startsWith('http')
) {
  targetAuthDomain = `${targetProjectId}.firebaseapp.com`;
}

// ============================================================
// FIREBASE CONFIG
// ============================================================

const rawConfig: FirebaseConfig = {
  apiKey:
    (env.VITE_FIREBASE_API_KEY &&
      env.VITE_FIREBASE_API_KEY.trim()) ||
    firebaseConfigJson?.apiKey,

  authDomain: targetAuthDomain,

  projectId: targetProjectId,

  storageBucket:
    (env.VITE_FIREBASE_STORAGE_BUCKET &&
      env.VITE_FIREBASE_STORAGE_BUCKET.trim()) ||
    firebaseConfigJson?.storageBucket,

  messagingSenderId:
    (env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
      env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim()) ||
    firebaseConfigJson?.messagingSenderId,

  appId:
    (env.VITE_FIREBASE_APP_ID &&
      env.VITE_FIREBASE_APP_ID.trim()) ||
    firebaseConfigJson?.appId,

  firestoreDatabaseId:
    (env.VITE_FIREBASE_DATABASE_ID &&
      env.VITE_FIREBASE_DATABASE_ID.trim()) ||
    firebaseConfigJson?.firestoreDatabaseId,
};

// ============================================================
// FIREBASE SERVICES
// ============================================================

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

let isFirebaseConfigured = false;
let firebaseInitError: string | null = null;

// ============================================================
// INITIALIZE FIREBASE
// ============================================================

try {
  if (rawConfig.apiKey && rawConfig.projectId) {
    // ----------------------------------------------------------
    // Initialize Firebase App
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // Firebase Authentication
    // ----------------------------------------------------------

    auth = getAuth(app);

    // ==========================================================
    // FIREBASE RUNTIME DEBUG
    // ==========================================================

    console.log('🔥 FIREBASE RUNTIME CHECK', {
      origin:
        typeof window !== 'undefined'
          ? window.location.origin
          : 'server',

      projectId: auth.app.options.projectId,

      authDomain: auth.app.options.authDomain,

      apiKey: auth.app.options.apiKey,
    });

    // ----------------------------------------------------------
    // Reduce Firebase console logs
    // ----------------------------------------------------------

    try {
      setLogLevel('error');
    } catch {
      // Ignore logging configuration errors
    }

    // ----------------------------------------------------------
    // Firestore
    // ----------------------------------------------------------

    const databaseId =
      rawConfig.firestoreDatabaseId &&
      rawConfig.firestoreDatabaseId !== '(default)'
        ? rawConfig.firestoreDatabaseId
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

    // ----------------------------------------------------------
    // Firebase Storage
    // ----------------------------------------------------------

    storage = getStorage(app);

    isFirebaseConfigured = true;
  } else {
    firebaseInitError =
      'Firebase credentials missing in config.';
  }
} catch (error: any) {
  console.warn(
    'Firebase initialization warning:',
    error
  );

  firebaseInitError =
    error?.message ||
    'Failed to initialize Firebase';

  isFirebaseConfigured = false;
}

// ============================================================
// FIRESTORE ERROR TYPES
// ============================================================

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// ============================================================
// FIRESTORE ERROR INFO
// ============================================================

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

// ============================================================
// FIRESTORE ERROR HANDLER
// ============================================================

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
      userId:
        auth?.currentUser?.uid || null,

      email:
        auth?.currentUser?.email || null,

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
    'Firestore Error Info:',
    JSON.stringify(errInfo)
  );

  throw new Error(
    JSON.stringify(errInfo)
  );
}

// ============================================================
// FIREBASE CONNECTION TEST
// ============================================================

export async function testConnection() {
  if (!db) {
    return false;
  }

  try {
    await getDocFromServer(
      doc(db, 'test', 'connection')
    );

    return true;
  } catch (error: any) {
    if (
      error?.message?.includes('offline') ||
      error?.message?.includes('unavailable') ||
      error?.code === 'unavailable'
    ) {
      console.warn(
        'Firebase connection check: client is offline or backend unavailable.'
      );
    }

    return false;
  }
}

// ============================================================
// AUTHENTICATION HELPERS
// ============================================================

export function getCurrentUser() {
  return auth?.currentUser || null;
}

// ============================================================
// REGISTER USER
// ============================================================

export async function registerUser(
  email: string,
  pass: string,
  name: string
) {
  const {
    registerWithEmailPassword,
  } = await import(
    '../services/firebaseService'
  );

  return registerWithEmailPassword(
    email,
    pass,
    name
  );
}

// ============================================================
// LOGIN USER
// ============================================================

export async function loginUser(
  email: string,
  pass: string
) {
  const {
    loginWithEmailPassword,
  } = await import(
    '../services/firebaseService'
  );

  return loginWithEmailPassword(
    email,
    pass
  );
}

// ============================================================
// GOOGLE LOGIN
// ============================================================

export async function loginWithGoogle() {
  const {
    signInWithGoogle,
  } = await import(
    '../services/firebaseService'
  );

  return signInWithGoogle();
}

// ============================================================
// LOGOUT
// ============================================================

export async function logoutUser() {
  const {
    signOutUser,
  } = await import(
    '../services/firebaseService'
  );

  return signOutUser();
}

// ============================================================
// EXPORTS
// ============================================================

export {
  app,
  auth,
  db,
  storage,
  isFirebaseConfigured,
  firebaseInitError,
};