/**
 * @file login.component.ts
 * @description Login page — Obsidian Dark glass-card skin.
 *
 * PRESERVED (untouched):
 *   - All ReactiveForm declarations (`loginForm`, `emailCtrl`, `passwordCtrl`)
 *   - All Validators (`Validators.required`, `Validators.email`)
 *   - All Signals (`showPassword`, `isLoading`, `errorMessage`)
 *   - `onSubmit()` method with Firebase error mapping and role-based redirect
 *   - All AUTH_ERRORS mappings
 *
 * CHANGED: Template HTML + component styles only.
 */

import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

const AUTH_ERRORS: Record<string, string> = {
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many failed attempts. Please wait before retrying.',
  'auth/user-disabled': 'This account has been disabled. Contact support.',
  'auth/network-request-failed': 'Network error. Check your internet connection.',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-page">
      <div style="width:100%;max-width:460px;animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1) both;">
        <div class="glass-card auth-card">

          <!-- ── Header ─────────────────────────────────────────────── -->
          <div style="text-align:center;margin-bottom:32px;">
            <div class="brand-logo" style="margin:0 auto 16px;">
              <i class="bi bi-mortarboard-fill"></i>
            </div>
            <h2 style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 6px;">
              Welcome Back
            </h2>
            <p style="font-size:0.85rem;color:var(--text-muted);margin:0;">
              Sign in to StudyMate AI
            </p>
          </div>

          <!-- ── Error Banner ───────────────────────────────────────── -->
          @if (errorMessage()) {
            <div style="background:var(--pill-red-bg);border:1px solid rgba(248,113,113,0.25);border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px;margin-bottom:20px;animation:fadeInUp 0.2s ease both;">
              <i class="bi bi-exclamation-triangle-fill" style="color:#f87171;flex-shrink:0;"></i>
              <span style="font-size:0.85rem;color:#f87171;">{{ errorMessage() }}</span>
            </div>
          }

          <!-- ── Login Form ─────────────────────────────────────────── -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>

            <!-- Email -->
            <div class="input-group-sm-custom" style="margin-bottom:18px;">
              <label class="input-label" for="login-email">Email Address</label>
              <div class="input-icon-wrap">
                <i class="bi bi-envelope input-icon"></i>
                <input
                  id="login-email"
                  type="email"
                  class="text-input"
                  [class.is-invalid]="emailCtrl.invalid && emailCtrl.touched"
                  formControlName="email"
                  placeholder="you@university.edu"
                  autocomplete="email">
              </div>
              @if (emailCtrl.invalid && emailCtrl.touched) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  @if (emailCtrl.errors?.['required']) { Email is required. }
                  @else if (emailCtrl.errors?.['email']) { Enter a valid email address. }
                </div>
              }
            </div>

            <!-- Password -->
            <div class="input-group-sm-custom" style="margin-bottom:28px;">
              <label class="input-label" for="login-password">Password</label>
              <div class="input-icon-wrap">
                <i class="bi bi-lock input-icon"></i>
                <input
                  id="login-password"
                  [type]="showPassword() ? 'text' : 'password'"
                  class="text-input"
                  [class.is-invalid]="passwordCtrl.invalid && passwordCtrl.touched"
                  formControlName="password"
                  placeholder="Your password"
                  autocomplete="current-password"
                  style="padding-right:44px;">
                <button
                  class="input-suffix"
                  type="button"
                  (click)="showPassword.set(!showPassword())"
                  [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'">
                  <i class="bi" [class.bi-eye]="!showPassword()" [class.bi-eye-slash]="showPassword()"></i>
                </button>
              </div>
              @if (passwordCtrl.invalid && passwordCtrl.touched) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  Password is required.
                </div>
              }
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn-gradient"
              style="width:100%;padding:14px;font-size:0.95rem;justify-content:center;"
              [disabled]="isLoading()">
              @if (isLoading()) {
                <span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;"></span>
                Signing in…
              } @else {
                <i class="bi bi-box-arrow-in-right"></i>
                Sign In
              }
            </button>

          </form>

          <!-- ── Footer Links ───────────────────────────────────────── -->
          <div class="divider" style="margin:24px 0;"></div>
          <div style="text-align:center;font-size:0.83rem;color:var(--text-muted);">
            Don't have an account?
            <a routerLink="/register" style="color:var(--accent-light);font-weight:600;text-decoration:none;margin-left:4px;">
              Register here
            </a>
          </div>

        </div>

        <!-- Back link -->
        <div style="text-align:center;margin-top:16px;">
          <a routerLink="/" style="font-size:0.8rem;color:var(--text-muted);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color 0.2s;">
            <i class="bi bi-arrow-left"></i> Back to Home
          </a>
        </div>
      </div>
    </div>

    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  `,
  styles: [],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailCtrl(): AbstractControl { return this.loginForm.get('email')!; }
  get passwordCtrl(): AbstractControl { return this.loginForm.get('password')!; }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      );

      if (this.authService.isAdmin()) {
        await this.router.navigate(['/admin/dashboard']);
      } else {
        await this.router.navigate(['/student/dashboard']);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      this.errorMessage.set(AUTH_ERRORS[code] ?? 'An unexpected error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
