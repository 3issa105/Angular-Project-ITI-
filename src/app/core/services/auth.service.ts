/**
 * @file auth.service.ts
 * @description Signal-driven authentication service for StudyMate AI.
 *
 * Uses Angular Signals exclusively for reactive state management.
 * Handles Firebase Auth lifecycle including browser-refresh resolution
 * and supports the built-in Faculty Administrator account.
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { UserProfile } from '../models';

/**
 * Built-in Master Admin account credentials & profile.
 * Credentials provided by institution:
 * Email: admin.user@exuni.com | Pass: Admin999
 */
export const BUILTIN_ADMIN = {
  email: 'admin.user@exuni.com',
  password: 'Admin999',
  profile: {
    uid: 'admin-user-exuni',
    name: 'Admin Faculty',
    email: 'admin.user@exuni.com',
    role: 'admin' as const,
    nationalId: '99999999999999',
    studentCode: 'ADMIN01',
    university: 'Example University',
    faculty: 'Computer Science',
    createdAt: 1711111111000,
  } as UserProfile,
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  // ─── Writable Signals ───────────────────────────────────────────────────────

  /**
   * The currently authenticated user profile, or null when unauthenticated.
   * Populated by the onAuthStateChanged listener after Firestore profile fetch
   * or by built-in admin login.
   */
  readonly currentUser = signal<UserProfile | null>(null);

  /**
   * True while the initial auth state resolution is in-flight (e.g., page refresh).
   * Guards must await this becoming false before making redirect decisions.
   */
  readonly authLoading = signal<boolean>(true);

  // ─── Computed Derived State ─────────────────────────────────────────────────

  /** True when a user is authenticated (currentUser is non-null). */
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  /** True when the authenticated user holds the 'admin' role. */
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  /** True when the authenticated user holds the 'student' role. */
  readonly isStudent = computed(() => this.currentUser()?.role === 'student');

  /** The role string of the current user, or null when unauthenticated. */
  readonly userRole = computed(() => this.currentUser()?.role ?? null);

  /** The display name of the current user, or null when unauthenticated. */
  readonly userName = computed(() => this.currentUser()?.name ?? null);

  // ─── Constructor – Auth State Listener ─────────────────────────────────────

  constructor() {
    // 1. Check if an active built-in admin session is preserved in localStorage
    try {
      const savedAdmin = localStorage.getItem('sm_admin_user');
      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin) as UserProfile;
        if (parsed && parsed.role === 'admin') {
          this.currentUser.set(parsed);
          this.authLoading.set(false);
        }
      }
    } catch {
      // Ignore storage read error
    }

    /**
     * 2. Subscribe to Firebase Auth state changes.
     */
    onAuthStateChanged(auth, async (firebaseUser) => {
      // If we already have the built-in admin active and no other Firebase user, preserve it
      if (!firebaseUser && this.currentUser()?.email?.toLowerCase() === BUILTIN_ADMIN.email.toLowerCase()) {
        this.authLoading.set(false);
        return;
      }

      if (firebaseUser) {
        try {
          const profileSnap: DocumentSnapshot<DocumentData> = await getDoc(
            doc(db, 'users', firebaseUser.uid)
          );
          if (profileSnap.exists()) {
            this.currentUser.set(profileSnap.data() as UserProfile);
          } else {
            // If the Firebase account matches the admin email, set admin profile
            if (firebaseUser.email?.toLowerCase() === BUILTIN_ADMIN.email.toLowerCase()) {
              this.currentUser.set({
                ...BUILTIN_ADMIN.profile,
                uid: firebaseUser.uid,
              });
            } else {
              this.currentUser.set(null);
            }
          }
        } catch {
          if (firebaseUser.email?.toLowerCase() === BUILTIN_ADMIN.email.toLowerCase()) {
            this.currentUser.set({
              ...BUILTIN_ADMIN.profile,
              uid: firebaseUser.uid,
            });
          } else {
            this.currentUser.set(null);
          }
        }
      } else {
        if (this.currentUser()?.email?.toLowerCase() !== BUILTIN_ADMIN.email.toLowerCase()) {
          this.currentUser.set(null);
        }
      }

      this.authLoading.set(false);
    });
  }

  // ─── Public Auth Methods ────────────────────────────────────────────────────

  /**
   * Signs in an existing user with email and password.
   * If credentials match the built-in Admin account, authenticates as Administrator.
   * Otherwise uses Firebase Authentication.
   *
   * @param email    The user's email address.
   * @param password The user's password.
   * @returns        UserCredential or void on success.
   * @throws         Re-throws Firebase Auth errors for the component to handle.
   */
  async login(email: string, password: string): Promise<UserCredential | void> {
    const normalizedEmail = email.trim().toLowerCase();

    // ── Check for Master Administrator Credentials ─────────────────────────
    if (normalizedEmail === BUILTIN_ADMIN.email.toLowerCase()) {
      if (password !== BUILTIN_ADMIN.password) {
        const error = new Error('Incorrect password. Please try again.');
        (error as { code?: string }).code = 'auth/wrong-password';
        throw error;
      }

      // Valid Admin credentials! Persist session
      try {
        localStorage.setItem('sm_admin_user', JSON.stringify(BUILTIN_ADMIN.profile));
      } catch {
        // storage fallback
      }

      this.currentUser.set(BUILTIN_ADMIN.profile);
      this.authLoading.set(false);

      // Silently sync with Firebase in background if possible
      signInWithEmailAndPassword(auth, email, password)
        .catch(() => createUserWithEmailAndPassword(auth, email, password))
        .catch(() => { /* silent fallback */ });

      return;
    }

    // ── Regular Student / User Login via Firebase ──────────────────────────
    try {
      localStorage.removeItem('sm_admin_user');
    } catch {
      // ignore
    }

    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Registers a new student account.
   *
   * @param name         Full display name.
   * @param email        University email address.
   * @param password     Strong password.
   * @param nationalId   Must match ^[0-9]{14}$ (14 numeric digits).
   * @param studentCode  University student code (e.g. cs03630).
   * @returns            Void on success.
   */
  async register(
    name: string,
    email: string,
    password: string,
    nationalId: string,
    studentCode: string
  ): Promise<void> {
    const credential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = credential.user.uid;
    await updateProfile(credential.user, { displayName: name });

    const isAdmin = email.trim().toLowerCase() === BUILTIN_ADMIN.email.toLowerCase();

    const profile: UserProfile = {
      uid,
      name,
      email,
      role: isAdmin ? 'admin' : 'student',
      nationalId,
      studentCode,
      university: 'Example University',
      faculty: 'Computer Science',
      createdAt: Date.now(),
    };

    await setDoc(doc(db, 'users', uid), profile);
  }

  /**
   * Signs out the current user and navigates to the landing page.
   * Clears both signals and local storage sessions.
   */
  async logout(): Promise<void> {
    try {
      localStorage.removeItem('sm_admin_user');
    } catch {
      // ignore
    }

    this.currentUser.set(null);
    await signOut(auth).catch(() => {});
    await this.router.navigate(['/']);
  }
}
