/**
 * @file unauthorized.component.ts
 * @description 403 Access Denied error page — Obsidian Dark glass-card skin.
 * Red shield badge variant.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="error-page">
      <div style="width:100%;max-width:480px;text-align:center;animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1) both;">
        <div class="glass-card" style="padding:clamp(36px,6vw,56px) clamp(28px,6vw,56px);">

          <!-- Error code -->
          <div class="error-code-text" style="color:transparent;background:linear-gradient(135deg,#f87171,#ef4444,#b91c1c);-webkit-background-clip:text;background-clip:text;">403</div>

          <!-- Red shield icon -->
          <div style="width:72px;height:72px;border-radius:20px;background:var(--pill-red-bg);border:1px solid rgba(248,113,113,0.25);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <i class="bi bi-shield-x" style="font-size:2rem;color:#f87171;"></i>
          </div>

          <!-- Text -->
          <h2 style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 10px;">
            Access Denied
          </h2>
          <p style="font-size:0.87rem;color:var(--text-secondary);line-height:1.65;margin:0 0 24px;">
            You don't have permission to view this page.
            This area is restricted to users with the required role.
          </p>

          <!-- Role note -->
          <span class="pill pill-red" style="margin-bottom:24px;display:inline-flex;">
            <i class="bi bi-lock-fill"></i> Insufficient Permissions
          </span>

          <!-- Buttons -->
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <a class="btn-gradient" routerLink="/student/dashboard" style="padding:12px 24px;">
              <i class="bi bi-speedometer2"></i> My Dashboard
            </a>
            <a class="btn-border" routerLink="/" style="padding:11px 20px;">
              <i class="bi bi-house"></i> Go Home
            </a>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UnauthorizedComponent {}
