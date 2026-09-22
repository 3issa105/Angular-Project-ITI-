/**
 * @file admin-dashboard.component.ts
 * @description Admin Dashboard stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="stub-page">

      <!-- Admin Header Banner -->
      <div class="glass-card" style="padding:24px 28px;margin-bottom:24px;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(30,20,54,0.95));border-color:rgba(239,68,68,0.25);">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#ef4444,#b91c1c);display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:#fff;box-shadow:0 4px 14px rgba(239,68,68,0.35);flex-shrink:0;">
            <i class="bi bi-shield-check"></i>
          </div>
          <div>
            <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
              Admin Control Panel &mdash; {{ auth.currentUser()?.faculty ?? 'Computer Science' }}
            </h4>
            <span style="font-size:0.8rem;color:var(--text-muted);">
              {{ auth.currentUser()?.university ?? 'Example University' }} &bull; National ID: {{ auth.currentUser()?.nationalId ?? '99999999999999' }}
            </span>
          </div>
          <span class="pill pill-red" style="margin-left:auto;">
            <i class="bi bi-shield-fill"></i> Administrator
          </span>
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

      <!-- Administration Grid -->
      <h5 style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin:0 0 14px;">
        Administration Actions
      </h5>
      <div class="admin-actions-grid">
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

      <div style="background:var(--pill-amber-bg);border:1px solid rgba(251,191,36,0.2);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:20px;">
        <i class="bi bi-tools" style="color:var(--pill-amber-text);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          Admin management features will be expanded by Person 2.
        </span>
      </div>

    </div>
  `,
  styles: [`
    .admin-actions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 20px;
    }
    @media (max-width: 640px) {
      .admin-actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class AdminDashboardComponent {
  readonly auth = inject(AuthService);

  readonly stats = [
    { icon: 'bi-journal-richtext', label: 'Subjects' },
    { icon: 'bi-file-earmark-pdf', label: 'Materials' },
    { icon: 'bi-people',           label: 'Students' },
    { icon: 'bi-cpu',              label: 'Chunks' },
  ];

  readonly actions = [
    { icon: 'bi-cloud-upload',     label: 'PDF Ingestion Portal',  desc: 'Upload new study material',   route: '/admin/upload' },
    { icon: 'bi-folder2-open',     label: 'Manage Literature',     desc: 'View and delete PDFs',         route: '/admin/materials' },
    { icon: 'bi-journal-richtext', label: 'Subjects CRUD',         desc: 'Add or remove subjects',       route: '/admin/subjects' },
    { icon: 'bi-speedometer2',     label: 'Faculty Analytics',     desc: 'Platform usage overview',      route: '/admin/dashboard' },
  ];
}
