/**
 * @file admin-subjects.component.ts
 * @description Admin Subjects Manager stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-subjects',
  standalone: true,
  imports: [],
  template: `
    <div class="stub-page">
      <div class="stub-header-row">
        <div class="stub-icon-wrap"><i class="bi bi-journal-richtext"></i></div>
        <div>
          <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
            Manage Subjects CRUD
          </h3>
          <span class="pill pill-green" style="font-size:0.7rem;">
            <i class="bi bi-journal-plus"></i> Full Course Control
          </span>
        </div>
        <div class="shimmer" style="height:40px;width:150px;border-radius:12px;margin-left:auto;"></div>
      </div>

      <div class="features-grid">
        @for (item of skeletonItems; track item) {
          <div class="glass-card" style="padding:24px;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
              <div style="width:44px;height:44px;border-radius:12px;background:var(--accent-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;">
                <i class="bi bi-journal-richtext" style="color:var(--accent-light);font-size:1.1rem;"></i>
              </div>
              <div class="shimmer" style="height:22px;width:55px;border-radius:20px;"></div>
            </div>
            <div class="shimmer" style="height:14px;width:70%;margin-bottom:8px;"></div>
            <div class="shimmer" style="height:10px;width:40%;margin-bottom:14px;"></div>
            <div class="shimmer" style="height:10px;margin-bottom:6px;"></div>
            <div class="shimmer" style="height:10px;width:80%;margin-bottom:18px;"></div>
            <div style="display:flex;gap:8px;">
              <div class="shimmer" style="height:36px;flex:1;border-radius:10px;"></div>
              <div class="shimmer" style="height:36px;flex:1;border-radius:10px;"></div>
            </div>
          </div>
        }
      </div>

      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:24px;">
        <i class="bi bi-tools" style="color:var(--accent-light);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          Subject CRUD management and syllabus assignments will be implemented by Person 2.
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminSubjectsComponent {
  readonly skeletonItems = [1, 2, 3, 4, 5, 6];
}
