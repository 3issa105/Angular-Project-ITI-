/**
 * @file admin-materials.component.ts
 * @description Admin Materials Manager stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-materials',
  standalone: true,
  imports: [],
  template: `
    <div class="stub-page">
      <div class="stub-header-row">
        <div class="stub-icon-wrap"><i class="bi bi-folder2-open"></i></div>
        <div>
          <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
            Manage Ingested Literature
          </h3>
          <span class="pill pill-amber" style="font-size:0.7rem;">
            <i class="bi bi-shield-lock"></i> Admin Restricted
          </span>
        </div>
        <div class="shimmer" style="height:40px;width:150px;border-radius:12px;margin-left:auto;"></div>
      </div>

      <div class="glass-card" style="overflow:hidden;">
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--accent-dim);">
                @for (col of cols; track col) {
                  <th style="padding:14px 18px;text-align:left;font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;">
                    {{ col }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of skeletonRows; track row) {
                <tr style="border-bottom:1px solid var(--border-subtle);">
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:14px;width:80%;"></div></td>
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:14px;width:65%;"></div></td>
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:22px;width:60px;border-radius:20px;"></div></td>
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:14px;width:40%;"></div></td>
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:14px;width:70%;"></div></td>
                  <td style="padding:14px 18px;"><div class="shimmer" style="height:32px;width:64px;border-radius:8px;"></div></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:24px;">
        <i class="bi bi-tools" style="color:var(--accent-light);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          Materials management and literature deletion will be implemented by Person 2.
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminMaterialsComponent {
  readonly cols = ['File Name', 'Subject', 'Status', 'Chunks', 'Uploaded', 'Actions'];
  readonly skeletonRows = [1, 2, 3, 4, 5];
}
