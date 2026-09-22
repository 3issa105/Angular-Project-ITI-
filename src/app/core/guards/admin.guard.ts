/**
 * @file admin.guard.ts
 * @description Functional route guard that restricts access to admin-only routes.
 *
 * Race-condition safe: awaits `authLoading` to resolve before making any
 * redirect decision.
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Protects routes that require the `admin` role.
 *
 * Behaviour:
 *   - Waits for `authLoading` to be false before making any routing decision.
 *   - If user is an admin → allows activation.
 *   - If user is authenticated but not an admin → redirects to `/unauthorized`.
 *   - If user is unauthenticated → redirects to `/login`.
 */
export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // ── Wait for auth state resolution ──────────────────────────────────────────
  const loading$ = toObservable(authService.authLoading);
  await firstValueFrom(loading$.pipe(filter((loading) => !loading)));

  // ── Make routing decision ────────────────────────────────────────────────────
  if (authService.isAdmin()) {
    return true;
  }

  if (authService.isAuthenticated()) {
    // Authenticated but wrong role.
    return router.createUrlTree(['/unauthorized']);
  }

  // Not authenticated at all.
  return router.createUrlTree(['/login']);
};
