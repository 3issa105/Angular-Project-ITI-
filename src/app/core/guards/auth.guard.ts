/**
 * @file auth.guard.ts
 * @description Functional route guard that protects authenticated-only routes.
 *
 * Race-condition safe: awaits `authLoading` to resolve before making any
 * redirect decision, preventing premature redirects on browser refresh.
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Protects routes that require the user to be authenticated.
 *
 * Behaviour:
 *   - Waits for `authLoading` to be false before making any routing decision.
 *   - If authenticated → allows activation.
 *   - If unauthenticated → redirects to `/login`.
 */
export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // ── Wait for auth state resolution ──────────────────────────────────────────
  // Convert the `authLoading` signal to an Observable so we can use firstValueFrom
  // with a `filter` predicate. This correctly awaits the initial Firebase
  // onAuthStateChanged callback on page refresh before deciding.
  const loading$ = toObservable(authService.authLoading);
  await firstValueFrom(loading$.pipe(filter((loading) => !loading)));

  // ── Make routing decision ────────────────────────────────────────────────────
  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
