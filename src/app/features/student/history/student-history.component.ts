/**
 * @file student-history.component.ts
 * @description Student Chat History stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-student-history',
  standalone: true,
  imports: [],
  template: `
    <div class="stub-page">
      <div class="stub-header-row">
        <div class="stub-icon-wrap"><i class="bi bi-clock-history"></i></div>
        <div>
          <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
            Chat History Archive
          </h3>
          <span class="pill pill-green" style="font-size:0.7rem;">
            <i class="bi bi-database"></i> Firestore Persisted
          </span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        @for (item of skeletonItems; track item) {
          <div class="glass-card" style="padding:16px 20px;display:flex;align-items:center;gap:14px;">
            <div style="width:40px;height:40px;border-radius:11px;background:var(--accent-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="bi bi-chat-dots" style="color:var(--accent-light);"></i>
            </div>
            <div style="flex:1;">
              <div class="shimmer" style="height:14px;width:55%;margin-bottom:6px;"></div>
              <div class="shimmer" style="height:10px;width:35%;"></div>
            </div>
            <div class="shimmer" style="height:22px;width:75px;border-radius:20px;"></div>
          </div>
        }
      </div>

      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:24px;">
        <i class="bi bi-tools" style="color:var(--accent-light);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          Full conversation history and search will be implemented by Person 3.
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class StudentHistoryComponent {
  readonly skeletonItems = [1, 2, 3, 4, 5];
}
