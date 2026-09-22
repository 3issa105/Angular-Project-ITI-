/**
 * @file student-profile.component.ts
 * @description Student Profile stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [],
  template: `
    <div class="stub-page">
      <div class="stub-header-row">
        <div class="stub-icon-wrap"><i class="bi bi-person-badge"></i></div>
        <div>
          <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
            Profile &amp; Locked ID
          </h3>
          <span class="pill pill-violet" style="font-size:0.7rem;">
            <i class="bi bi-shield-lock"></i> Firebase Secured
          </span>
        </div>
      </div>

      <div class="profile-layout-grid">

        <!-- Avatar Card -->
        <div class="glass-card" style="padding:32px 20px;text-align:center;">
          <div style="width:76px;height:76px;border-radius:22px;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 6px 20px var(--accent-glow);">
            <i class="bi bi-person-fill" style="font-size:2rem;color:#fff;"></i>
          </div>
          <div style="font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">
            {{ auth.userName() ?? '—' }}
          </div>
          <span class="pill pill-violet">Student</span>
        </div>

        <!-- Account Fields -->
        <div class="glass-card" style="padding:28px;">
          <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:20px;">
            Account Credentials &amp; Verification
          </div>
          @for (field of fields; track field.label) {
            <div style="margin-bottom:18px;">
              <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:6px;">
                {{ field.label }}
              </label>
              <div class="shimmer" [style.width]="field.width" style="height:42px;border-radius:12px;"></div>
            </div>
          }
        </div>

      </div>

      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:24px;">
        <i class="bi bi-tools" style="color:var(--accent-light);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          Profile editing and verification details will be implemented by Person 2.
        </span>
      </div>
    </div>
  `,
  styles: [`
    .profile-layout-grid {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 20px;
    }
    @media (max-width: 768px) {
      .profile-layout-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class StudentProfileComponent {
  readonly auth = inject(AuthService);
  readonly fields = [
    { label: 'Full Name',    width: '75%' },
    { label: 'Email',        width: '90%' },
    { label: 'National ID',  width: '80%' },
    { label: 'Student Code', width: '55%' },
    { label: 'Phone',        width: '60%' },
  ];
}
