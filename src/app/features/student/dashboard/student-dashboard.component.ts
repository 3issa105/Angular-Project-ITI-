/**
 * @file student-dashboard.component.ts
 * @description Student Dashboard — Obsidian Dark / Luxury Light glass-card skin.
 * All original AuthService signals preserved.
 */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="stub-page">

      <!-- Welcome Banner -->
      <div class="glass-card" style="padding:24px 28px;margin-bottom:24px;background:linear-gradient(135deg,rgba(147,51,234,0.12),rgba(30,20,54,0.95));border-color:rgba(147,51,234,0.25);">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div class="brand-logo" style="width:52px;height:52px;font-size:1.4rem;flex-shrink:0;">
            <i class="bi bi-mortarboard-fill"></i>
          </div>
          <div>
            <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
              Welcome back, {{ auth.userName() ?? 'Student' }}! 👋
            </h4>
            <span class="pill pill-violet"><i class="bi bi-stars"></i> AI Study Mode Active</span>
          </div>
          <div style="margin-left:auto;">
            <span class="pill pill-green"><i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> Online</span>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stub-stats-grid">
        @for (stat of stats; track stat.label) {
          <div class="glass-card stat-card">
            <div class="stat-icon"><i class="bi {{ stat.icon }}"></i></div>
            <div class="stat-value">—</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        }
      </div>

      <!-- Quick Actions -->
      <h5 style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin:0 0 14px;">
        Quick Actions
      </h5>
      <div class="stub-actions-grid">
        @for (action of actions; track action.label) {
          <a [routerLink]="action.route" class="glass-card action-link-card">
            <div class="action-icon"><i class="bi {{ action.icon }}"></i></div>
            <div>
              <div class="action-label">{{ action.label }}</div>
              <div class="action-desc">{{ action.desc }}</div>
            </div>
            <i class="bi bi-chevron-right" style="margin-left:auto;color:var(--text-muted);font-size:0.85rem;"></i>
          </a>
        }
      </div>

      <!-- Notice -->
      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:10px;">
        <i class="bi bi-tools" style="color:var(--accent-light);font-size:1.1rem;flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          <strong style="color:var(--text-primary);">Full dashboard features</strong> are being built by Person 2. Navigation &amp; guards are fully functional.
        </span>
      </div>

    </div>
  `,
  styles: [],
})
export class StudentDashboardComponent {
  readonly auth = inject(AuthService);

  readonly stats = [
    { icon: 'bi-book',          label: 'Subjects' },
    { icon: 'bi-chat-dots',     label: 'Chats' },
    { icon: 'bi-file-earmark',  label: 'Materials' },
    { icon: 'bi-cpu',           label: 'Sessions' },
  ];

  readonly actions = [
    { icon: 'bi-cpu',           label: 'AI RAG Chat',      desc: 'Start a grounded chat',      route: '/student/chat/default' },
    { icon: 'bi-book',          label: 'Browse Subjects',  desc: 'View all your courses',      route: '/student/subjects'     },
    { icon: 'bi-clock-history', label: 'Chat History',     desc: 'Review past sessions',       route: '/student/history'      },
    { icon: 'bi-person-badge',  label: 'My Profile',       desc: 'Update your student info',   route: '/student/profile'      },
    { icon: 'bi-house',         label: 'Home',             desc: 'Back to landing page',       route: '/'                     },
    { icon: 'bi-shield-check',  label: 'Security Overview',desc: 'Firebase Firestore rules',   route: '/student/profile'      },
  ];
}
