/**
 * @file firebase.config.ts
 * @description Firebase singleton initialisation for StudyMate AI.
 * Exports pre-initialised `auth`, `db`, and `storage` instances for use
 * throughout the application via Angular DI or direct import.
 *
 * IMPORTANT: Replace the placeholder values below with your actual
 * Firebase project configuration from the Firebase Console.
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ─── Firebase Project Configuration ──────────────────────────────────────────
// TODO: Replace with your actual Firebase project credentials.
// These values are safe to expose client-side (Firebase handles auth).
const firebaseConfig = {
  apiKey: "AIzaSyC94L2BZHs8Nn84VIjApfx-1mOXIfpajZY",
  authDomain: "angular-project-9cb7a.firebaseapp.com",
  projectId: "angular-project-9cb7a",
  storageBucket: "angular-project-9cb7a.firebasestorage.app",
  messagingSenderId: "382994168687",
  appId: "1:382994168687:web:f39df95d672821de8c069a",
  measurementId: "G-68WFWPTCJ2"
};
// cloudinaryConfig
export const cloudinaryConfig = {
  cloudName: 'uwciur9z',
  uploadPreset: 'StudyMate AI',
};

// ─── Singleton Initialisation ─────────────────────────────────────────────────

/** The root Firebase application instance. */
const app: FirebaseApp = initializeApp(firebaseConfig);

/**
 * Firebase Authentication singleton.
 * Used by AuthService for all sign-in / sign-up / sign-out operations.
 */
export const auth: Auth = getAuth(app);

/**
 * Firestore database singleton.
 * All Firestore reads / writes go through this reference.
 */
export const db: Firestore = getFirestore(app);

/**
 * Firebase Storage singleton.
 * Used for PDF upload operations (admin-only, enforced by storage.rules).
 */
export const storage: FirebaseStorage = getStorage(app);
