/**
 * @file admin-upload.component.ts
 * @description Admin PDF Upload stub — Obsidian Dark / Luxury Light glass-card skin.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-upload',
  standalone: true,
  imports: [],
  template: `
    <div class="stub-page">
      <div class="stub-header-row">
        <div class="stub-icon-wrap"><i class="bi bi-cloud-upload"></i></div>
        <div>
          <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:var(--text-primary);">
            PDF Ingestion Portal
          </h3>
          <span class="pill pill-amber" style="font-size:0.7rem;">
            <i class="bi bi-shield-lock"></i> Admin Restricted
          </span>
        </div>
      </div>

      <div style="display:flex;justify-content:center;">
        <div class="glass-card" style="width:100%;max-width:580px;padding:clamp(24px,5vw,36px);">

          <!-- Drag & Drop Zone -->
          <div style="border:2px dashed var(--border);border-radius:18px;padding:clamp(36px,6vw,56px) 24px;text-align:center;background:var(--accent-dim);cursor:pointer;margin-bottom:24px;">
            <div style="width:64px;height:64px;border-radius:18px;background:var(--bg-elevated);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
              <i class="bi bi-file-earmark-pdf" style="font-size:2rem;color:#f87171;"></i>
            </div>
            <div style="font-weight:800;color:var(--text-primary);margin-bottom:6px;font-size:1.05rem;">
              Drag &amp; drop your syllabus PDF here
            </div>
            <div style="font-size:0.8rem;color:var(--text-muted);">
              or click to browse from device — max 50 MB, PDF only
            </div>
          </div>

          <!-- Subject Select Placeholder -->
          <div style="margin-bottom:18px;">
            <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px;">
              Target Subject
            </label>
            <div class="shimmer" style="height:44px;border-radius:12px;"></div>
          </div>

          <!-- Upload Action Button Placeholder -->
          <div class="shimmer" style="height:46px;border-radius:12px;"></div>
        </div>
      </div>

      <div style="background:var(--accent-dim);border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-top:24px;">
        <i class="bi bi-tools" style="color:var(--accent-light);flex-shrink:0;"></i>
        <span style="font-size:0.82rem;color:var(--text-secondary);">
          PDF upload &amp; Web Worker chunking pipeline will be implemented by Person 2.
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminUploadComponent {}
