/**
 * @file student-chat.component.ts
 * @description Student Chat stub — Obsidian Dark / Luxury Light glass-card skin.
 * Route: /student/chat/:subjectId
 */

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-chat',
  standalone: true,
  imports: [],
  template: `
    <div style="display:flex;flex-direction:column;height:calc(100vh - var(--nav-height));">

      <!-- Chat Header Bar -->
      <div class="glass-card" style="border-radius:0;border-left:none;border-right:none;border-top:none;padding:16px clamp(16px,3vw,28px);display:flex;align-items:center;gap:14px;flex-shrink:0;">
        <div class="brand-logo" style="width:40px;height:40px;font-size:1rem;">
          <i class="bi bi-cpu"></i>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">AI RAG Chat</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">
            Subject Scope: <span class="mono" style="color:var(--accent-light);">{{ subjectId }}</span>
          </div>
        </div>
        <span class="pill pill-amber" style="margin-left:auto;">
          <i class="bi bi-tools"></i> Coming Soon
        </span>
      </div>

      <!-- Messages Area -->
      <div style="flex:1;overflow-y:auto;background:var(--bg-base);display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;padding:32px 20px;">
          <div style="width:80px;height:80px;border-radius:22px;background:var(--accent-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;">
            <i class="bi bi-cpu" style="font-size:2.2rem;color:var(--accent-light);"></i>
          </div>
          <h5 style="font-weight:800;color:var(--text-primary);margin:0 0 8px;">AI Chat Interface</h5>
          <p style="font-size:0.85rem;color:var(--text-muted);margin:0;max-width:360px;line-height:1.6;">
            Client-side RAG powered by Llama 3.1 8B running via WebGPU.<br>
            Implementation by Person 2 &amp; Person 3.
          </p>
        </div>
      </div>

      <!-- Chat Input Bar -->
      <div style="background:var(--bg-surface);border-top:1px solid var(--border);padding:16px clamp(16px,3vw,28px);flex-shrink:0;">
        <div style="display:flex;gap:10px;max-width:900px;margin:0 auto;">
          <input type="text" class="text-input" placeholder="Ask a question about your study materials…" disabled style="flex:1;">
          <button class="btn-gradient" disabled style="padding:12px 20px;opacity:0.4;cursor:not-allowed;">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [],
})
export class StudentChatComponent {
  private readonly route = inject(ActivatedRoute);
  readonly subjectId = this.route.snapshot.paramMap.get('subjectId') ?? 'default';
}
