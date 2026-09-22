/**
 * @file not-found.component.ts
 * @description 404 Not Found error page — Obsidian Dark glass-card skin.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="error-page">
      <div style="width:100%;max-width:480px;text-align:center;animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1) both;">
        <div class="glass-card" style="padding:clamp(36px,6vw,56px) clamp(28px,6vw,56px);">

          <!-- Error code -->
          <div class="error-code-text">404</div>

          <!-- Icon -->
          <div style="width:72px;height:72px;border-radius:20px;background:var(--accent-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <i class="bi bi-search" style="font-size:2rem;color:var(--accent-light);"></i>
          </div>

          <!-- Text -->
          <h2 style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 10px;">
            Page Not Found
          </h2>
          <p style="font-size:0.87rem;color:var(--text-secondary);line-height:1.65;margin:0 0 28px;">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <!-- Buttons -->
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <a class="btn-gradient" routerLink="/" style="padding:12px 24px;">
              <i class="bi bi-house"></i> Go Home
            </a>
            <a class="btn-border" routerLink="/student/dashboard" style="padding:11px 20px;">
              <i class="bi bi-speedometer2"></i> Dashboard
            </a>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NotFoundComponent {}
