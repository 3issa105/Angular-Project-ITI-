/**
 * @file register.component.ts
 * @description Registration page — Obsidian Dark glass-card skin.
 *
 * PRESERVED (untouched):
 *   - All custom validators: `nationalIdValidator`, `studentCodeValidator`,
 *     `strongPasswordValidator`, `passwordMatchValidator`
 *   - All ReactiveForm declarations and `registerForm` group
 *   - All signals: `showPassword`, `isLoading`, `errorMessage`, `successMessage`
 *   - `onSubmit()` method with Firebase registration and redirect
 *   - `passwordStrengthScore` computed logic and `getStrengthColor()`
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
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

// ─── Custom Validators (PRESERVED) ──────────────────────────────────────────

const nationalIdValidator: ValidatorFn = (ctrl: AbstractControl): ValidationErrors | null => {
  const value = ctrl.value as string;
  return /^[0-9]{14}$/.test(value) ? null : { invalidNationalId: true };
};

const studentCodeValidator: ValidatorFn = (ctrl: AbstractControl): ValidationErrors | null => {
  const value = (ctrl.value as string || '').trim();
  // University format: cs + 2 digits (grade e.g. 03) + student rank digits (e.g. 630) -> e.g. cs03630
  return /^cs[0-9]{2}[0-9]{3,}$/i.test(value) ? null : { invalidStudentCode: true };
};

const strongPasswordValidator: ValidatorFn = (ctrl: AbstractControl): ValidationErrors | null => {
  const value = ctrl.value as string;
  if (!value) return null;
  const errors: ValidationErrors = {};
  if (value.length < 8)      errors['minLength']   = true;
  if (!/[A-Z]/.test(value))  errors['noUppercase'] = true;
  if (!/[a-z]/.test(value))  errors['noLowercase'] = true;
  if (!/[0-9]/.test(value))  errors['noDigit']     = true;
  return Object.keys(errors).length > 0 ? errors : null;
};

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pw  = group.get('password')?.value  as string;
  const cpw = group.get('confirmPassword')?.value as string;
  return pw === cpw ? null : { passwordMismatch: true };
};

const AUTH_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/weak-password': 'Password is too weak.',
  'auth/network-request-failed': 'Network error. Check your internet connection.',
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-page" style="padding-top:40px;padding-bottom:40px;">
      <div style="width:100%;max-width:540px;animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1) both;">
        <div class="glass-card auth-card">

          <!-- ── Header ─────────────────────────────────────────────── -->
          <div style="text-align:center;margin-bottom:28px;">
            <div class="brand-logo" style="margin:0 auto 14px;">
              <i class="bi bi-person-plus-fill"></i>
            </div>
            <h2 style="font-size:1.45rem;font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 6px;">
              Create Your Account
            </h2>
            <p style="font-size:0.83rem;color:var(--text-muted);margin:0;">
              Join StudyMate AI as a verified student
            </p>
          </div>

          <!-- ── Error Banner ───────────────────────────────────────── -->
          @if (errorMessage()) {
            <div style="background:var(--pill-red-bg);border:1px solid rgba(248,113,113,0.25);border-radius:12px;padding:11px 16px;display:flex;align-items:center;gap:10px;margin-bottom:18px;animation:fadeInUp 0.2s ease both;">
              <i class="bi bi-exclamation-triangle-fill" style="color:#f87171;flex-shrink:0;"></i>
              <span style="font-size:0.83rem;color:#f87171;">{{ errorMessage() }}</span>
            </div>
          }

          <!-- ── Success Banner ─────────────────────────────────────── -->
          @if (successMessage()) {
            <div style="background:var(--pill-green-bg);border:1px solid rgba(52,211,153,0.25);border-radius:12px;padding:11px 16px;display:flex;align-items:center;gap:10px;margin-bottom:18px;animation:fadeInUp 0.2s ease both;">
              <i class="bi bi-check-circle-fill" style="color:#34d399;flex-shrink:0;"></i>
              <span style="font-size:0.83rem;color:#34d399;">{{ successMessage() }}</span>
            </div>
          }

          <!-- ── Register Form ──────────────────────────────────────── -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>

            <!-- Name -->
            <div class="input-group-sm-custom" style="margin-bottom:14px;">
              <label class="input-label" for="reg-name">Full Name</label>
              <div class="input-icon-wrap">
                <i class="bi bi-person input-icon"></i>
                <input id="reg-name" type="text" class="text-input"
                  [class.is-invalid]="f['name'].invalid && f['name'].touched"
                  formControlName="name" placeholder="Ahmed Mohamed">
              </div>
              @if (f['name'].invalid && f['name'].touched) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  @if (f['name'].errors?.['required']) { Full name is required. }
                  @else if (f['name'].errors?.['minlength']) { Name must be at least 3 characters. }
                </div>
              }
            </div>

            <!-- Email -->
            <div class="input-group-sm-custom" style="margin-bottom:14px;">
              <label class="input-label" for="reg-email">University Email</label>
              <div class="input-icon-wrap">
                <i class="bi bi-envelope input-icon"></i>
                <input id="reg-email" type="email" class="text-input"
                  [class.is-invalid]="f['email'].invalid && f['email'].touched"
                  formControlName="email" placeholder="student@university.edu" autocomplete="email">
              </div>
              @if (f['email'].invalid && f['email'].touched) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  @if (f['email'].errors?.['required']) { Email is required. }
                  @else if (f['email'].errors?.['email']) { Enter a valid email address. }
                </div>
              }
            </div>

            <!-- Two-col row: National ID + Student Code -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">

              <!-- National ID -->
              <div class="input-group-sm-custom">
                <label class="input-label" for="reg-nid">
                  National ID <span style="font-weight:400;color:var(--text-muted);">(14 digits)</span>
                </label>
                <div class="input-icon-wrap">
                  <i class="bi bi-credit-card-2-front input-icon"></i>
                  <input id="reg-nid" type="text" class="text-input"
                    [class.is-invalid]="f['nationalId'].invalid && f['nationalId'].touched"
                    formControlName="nationalId" placeholder="29XXXXXXXXXXXX"
                    maxlength="14" inputmode="numeric">
                </div>
                @if (f['nationalId'].invalid && f['nationalId'].touched) {
                  <div class="input-error">
                    <i class="bi bi-exclamation-circle"></i>
                    @if (f['nationalId'].errors?.['required']) { Required. }
                    @else { Must be 14 digits. }
                  </div>
                }
              </div>

              <!-- Student Code -->
              <div class="input-group-sm-custom">
                <label class="input-label" for="reg-code">
                  Student Code <span style="font-weight:400;color:var(--text-muted);">(e.g. cs03630)</span>
                </label>
                <div class="input-icon-wrap">
                  <i class="bi bi-123 input-icon"></i>
                  <input id="reg-code" type="text" class="text-input"
                    [class.is-invalid]="f['studentCode'].invalid && f['studentCode'].touched"
                    formControlName="studentCode" placeholder="cs03630">
                </div>
                @if (f['studentCode'].invalid && f['studentCode'].touched) {
                  <div class="input-error">
                    <i class="bi bi-exclamation-circle"></i>
                    @if (f['studentCode'].errors?.['required']) { Required. }
                    @else { Format: cs + grade (01-04) + rank (e.g. cs03630). }
                  </div>
                }
              </div>

            </div>

            <!-- Password -->
            <div class="input-group-sm-custom" style="margin-bottom:14px;">
              <label class="input-label" for="reg-pw">Password</label>
              <div class="input-icon-wrap">
                <i class="bi bi-lock input-icon"></i>
                <input id="reg-pw"
                  [type]="showPassword() ? 'text' : 'password'"
                  class="text-input"
                  [class.is-invalid]="f['password'].invalid && f['password'].touched"
                  formControlName="password"
                  placeholder="Min 8 chars, upper + lower + digit"
                  autocomplete="new-password"
                  style="padding-right:44px;">
                <button class="input-suffix" type="button"
                        (click)="showPassword.set(!showPassword())">
                  <i class="bi" [class.bi-eye]="!showPassword()" [class.bi-eye-slash]="showPassword()"></i>
                </button>
              </div>
              @if (f['password'].invalid && f['password'].touched) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  @if (f['password'].errors?.['required']) { Password is required. }
                  @else if (f['password'].errors?.['minLength']) { At least 8 characters. }
                  @else if (f['password'].errors?.['noUppercase']) { Add an uppercase letter. }
                  @else if (f['password'].errors?.['noLowercase']) { Add a lowercase letter. }
                  @else if (f['password'].errors?.['noDigit']) { Add a number. }
                </div>
              }
              <!-- Strength bars -->
              @if (f['password'].dirty) {
                <div class="strength-bar-wrap">
                  @for (step of passwordStrengthSteps; track step) {
                    <div class="strength-bar" [style.background]="getStrengthColor(step)"></div>
                  }
                </div>
              }
            </div>

            <!-- Confirm Password -->
            <div class="input-group-sm-custom" style="margin-bottom:20px;">
              <label class="input-label" for="reg-cpw">Confirm Password</label>
              <div class="input-icon-wrap">
                <i class="bi bi-lock-fill input-icon"></i>
                <input id="reg-cpw"
                  [type]="showPassword() ? 'text' : 'password'"
                  class="text-input"
                  [class.is-invalid]="(f['confirmPassword'].touched || f['confirmPassword'].dirty) && registerForm.errors?.['passwordMismatch']"
                  formControlName="confirmPassword"
                  placeholder="Re-enter your password"
                  autocomplete="new-password">
              </div>
              @if ((f['confirmPassword'].touched || f['confirmPassword'].dirty) && registerForm.errors?.['passwordMismatch']) {
                <div class="input-error">
                  <i class="bi bi-exclamation-circle"></i>
                  Passwords do not match.
                </div>
              }
            </div>

            <!-- Role notice -->
            <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;margin-bottom:20px;font-size:0.8rem;color:var(--text-secondary);">
              <i class="bi bi-info-circle" style="color:var(--accent-light);flex-shrink:0;"></i>
              All new accounts are registered as <strong style="color:var(--text-primary);margin-left:3px;">Students</strong>.
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn-gradient"
              style="width:100%;padding:14px;font-size:0.95rem;justify-content:center;"
              [disabled]="isLoading()">
              @if (isLoading()) {
                <span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;"></span>
                Creating account…
              } @else {
                <i class="bi bi-person-check"></i>
                Create Account
              }
            </button>

          </form>

          <!-- Footer -->
          <div class="divider" style="margin:22px 0;"></div>
          <div style="text-align:center;font-size:0.82rem;color:var(--text-muted);">
            Already have an account?
            <a routerLink="/login" style="color:var(--accent-light);font-weight:600;text-decoration:none;margin-left:4px;">Sign in</a>
          </div>

        </div>

        <div style="text-align:center;margin-top:16px;">
          <a routerLink="/" style="font-size:0.8rem;color:var(--text-muted);text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
            <i class="bi bi-arrow-left"></i> Back to Home
          </a>
        </div>
      </div>
    </div>

    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
      @media (max-width: 560px) {
        form > div[style*="grid-template-columns:1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }
      }
    </style>
  `,
  styles: [],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly passwordStrengthSteps = [1, 2, 3, 4] as const;

  readonly registerForm: FormGroup = this.fb.group(
    {
      name:            ['', [Validators.required, Validators.minLength(3)]],
      email:           ['', [Validators.required, Validators.email]],
      nationalId:      ['', [Validators.required, nationalIdValidator]],
      studentCode:     ['', [Validators.required, studentCodeValidator]],
      password:        ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  get f(): Record<string, AbstractControl> { return this.registerForm.controls; }

  get passwordStrengthScore(): number {
    const pw = this.f['password'].value as string;
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8)    score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    return score;
  }

  getStrengthColor(step: number): string {
    const score = this.passwordStrengthScore;
    if (step > score) return 'var(--border-subtle)';
    if (score <= 1) return '#ef4444';
    if (score <= 2) return '#f59e0b';
    if (score <= 3) return '#0ea5e9';
    return '#10b981';
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      await this.authService.register(
        this.registerForm.value.name as string,
        this.registerForm.value.email as string,
        this.registerForm.value.password as string,
        this.registerForm.value.nationalId as string,
        this.registerForm.value.studentCode as string
      );

      this.successMessage.set('Account created! Redirecting to your dashboard…');
      setTimeout(() => {
        void this.router.navigate(['/student/dashboard']);
      }, 1500);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      this.errorMessage.set(AUTH_ERRORS[code] ?? 'Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
