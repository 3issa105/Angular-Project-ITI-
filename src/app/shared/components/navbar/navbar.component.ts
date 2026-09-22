/**
 * @file navbar.component.ts
 * @description Sticky top navigation bar — Obsidian Dark / Luxury Light theme.
 *
 * Preserved from original: all AuthService signal calls, output() declarations, inject() pattern.
 * New: theme toggle inputs/outputs, page label, responsive layout, design token classes.
 */

import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Theme } from '../../../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="sm-navbar">
      <!-- ── Hamburger ─────────────────────────────────────────────── -->
      <button
        class="hamburger-btn"
        type="button"
        aria-label="Toggle navigation drawer"
        (click)="toggleDrawer.emit()">
        <i class="bi bi-list" style="font-size:1.2rem;"></i>
      </button>

      <!-- ── Brand ─────────────────────────────────────────────────── -->
      <a class="nav-brand-title" routerLink="/">
        <div class="brand-logo">
          <i class="bi bi-mortarboard-fill"></i>
        </div>
        <span class="hide-mobile">StudyMate <span class="gradient-text">AI</span></span>
      </a>

      <!-- ── Page Label (hide xs) ───────────────────────────────────── -->
      <span class="nav-page-label hide-mobile" style="margin-left:4px;">
        University Intelligence Platform
      </span>

      <!-- ── Spacer ─────────────────────────────────────────────────── -->
      <div style="flex:1;"></div>

      <!-- ── Theme Toggles ─────────────────────────────────────────── -->
      <div style="display:flex;gap:6px;align-items:center;">
        <button
          class="theme-toggle-btn"
          [class.active]="currentTheme() === 'dark'"
          type="button"
          aria-label="Dark theme"
          title="Dark theme"
          (click)="themeChange.emit('dark')">
          <i class="bi bi-moon-stars-fill"></i>
        </button>
        <button
          class="theme-toggle-btn"
          [class.active]="currentTheme() === 'light'"
          type="button"
          aria-label="Light theme"
          title="Light theme"
          (click)="themeChange.emit('light')">
          <i class="bi bi-sun-fill"></i>
        </button>
      </div>

      <!-- ── Auth Area ─────────────────────────────────────────────── -->
      <div style="display:flex;align-items:center;gap:8px;margin-left:8px;">

        @if (auth.authLoading()) {
          <div class="shimmer" style="width:100px;height:32px;border-radius:20px;"></div>
        } @else if (auth.isAuthenticated()) {
          <!-- User pill -->
          <div class="nav-user-pill hide-mobile">
            <div class="avatar-xs">
              <i class="bi bi-person-fill" style="font-size:0.75rem;"></i>
            </div>
            <span>{{ auth.userName() }}</span>
            <span class="pill pill-violet" style="font-size:0.65rem;padding:2px 8px;">
              {{ auth.userRole() }}
            </span>
          </div>
          <!-- Logout -->
          <button class="btn-border" type="button" style="padding:8px 14px;font-size:0.82rem;" (click)="onLogout()">
            <i class="bi bi-box-arrow-right"></i>
            <span class="hide-mobile">Logout</span>
          </button>
        } @else {
          <!-- Guest actions -->
          <a class="btn-border" routerLink="/login" style="padding:8px 14px;font-size:0.82rem;">
            <i class="bi bi-box-arrow-in-right"></i>
            <span class="hide-mobile">Login</span>
          </a>
          <a class="btn-gradient" routerLink="/register" style="padding:8px 16px;font-size:0.82rem;">
            <i class="bi bi-person-plus"></i>
            <span class="hide-mobile">Register</span>
          </a>
        }

      </div>
    </header>
  `,
  styles: [],
})
export class NavbarComponent {
  readonly auth = inject(AuthService);

  /** Current active theme – passed in from AppComponent. */
  readonly currentTheme = input<Theme>('dark');

  /** Emits when the hamburger button is clicked. */
  readonly toggleDrawer = output<void>();

  /** Emits when the user selects a theme. */
  readonly themeChange = output<Theme>();

  onLogout(): void {
    void this.auth.logout();
  }
}
