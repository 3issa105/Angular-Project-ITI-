/**
 * @file landing.component.ts
 * @description Public landing / hero page — Obsidian Dark design skin.
 *
 * No TypeScript business logic changes. Pure template & style upgrade.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  pill: string;
  pillClass: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: 'bi-cpu',
    title: 'Client-Side RAG',
    description: 'Retrieval-Augmented Generation runs entirely in your browser via Web Workers. Your study materials never leave your device during inference.',
    pill: 'Privacy-First',
    pillClass: 'pill-green',
  },
  {
    icon: 'bi-file-earmark-pdf',
    title: 'Web Worker PDF Chunking',
    description: 'PDFs are chunked, vectorised, and indexed locally in real time using a dedicated Web Worker — zero server round-trips required.',
    pill: 'Zero Latency',
    pillClass: 'pill-violet',
  },
  {
    icon: 'bi-stars',
    title: 'Llama 3.1 8B Instant',
    description: 'Powered by the latest open-weight LLM running directly in-browser via WebGPU, delivering sub-second academic answers.',
    pill: 'State of the Art',
    pillClass: 'pill-amber',
  },
  {
    icon: 'bi-shield-check',
    title: 'Verified Citations',
    description: 'Every AI answer ships with inline citations pointing to the exact page and excerpt from your uploaded lecture notes.',
    pill: 'Hallucination-Free',
    pillClass: 'pill-green',
  },
  {
    icon: 'bi-lock-fill',
    title: 'Enterprise Security',
    description: 'Firebase Auth + Firestore rules enforce strict per-user data isolation. Role escalation is architecturally impossible.',
    pill: 'Firebase Secured',
    pillClass: 'pill-violet',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Instant Retrieval',
    description: 'Vector similarity search returns relevant chunks in milliseconds powering real-time responses without any server dependency.',
    pill: 'Client-Native',
    pillClass: 'pill-amber',
  },
];

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ══════════════════════════════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="section-hero">
      <div class="desktop-container" style="width:100%;">
        <div style="max-width:760px;margin:0 auto;text-align:center;animation:fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1) both;">

          <!-- Badge -->
          <span class="pill pill-violet" style="margin-bottom:24px;display:inline-flex;">
            <i class="bi bi-stars"></i>
            Next-Gen Academic Intelligence
          </span>

          <!-- Headline -->
          <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:800;line-height:1.1;letter-spacing:-0.03em;color:var(--text-primary);margin:0 0 20px;">
            Zero Hallucinations<br>
            <span class="gradient-text">Grounded University</span> Study
          </h1>

          <!-- Sub -->
          <p style="font-size:clamp(1rem,2vw,1.15rem);color:var(--text-secondary);margin:0 0 36px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.65;">
            Upload your lecture notes once. Ask anything. Every answer is
            cited, grounded, and runs entirely in your browser — no data
            leaves your device.
          </p>

          <!-- CTA Buttons -->
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a class="btn-gradient" routerLink="/register" style="padding:14px 32px;font-size:0.95rem;">
              <i class="bi bi-rocket-takeoff"></i>
              Start Studying Free
            </a>
            <a class="btn-border" routerLink="/login" style="padding:13px 28px;font-size:0.95rem;">
              <i class="bi bi-box-arrow-in-right"></i>
              Sign In
            </a>
          </div>

          <!-- Trust row -->
          <div style="display:flex;justify-content:center;gap:20px;margin-top:32px;flex-wrap:wrap;">
            @for (t of trustBadges; track t.label) {
              <div style="display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--text-muted);">
                <i class="bi {{ t.icon }}" style="color:var(--accent-light);"></i>
                {{ t.label }}
              </div>
            }
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         FEATURES SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section style="padding:clamp(60px,10vh,100px) 0;background:var(--bg-surface);">
      <div class="desktop-container">

        <div style="text-align:center;margin-bottom:48px;">
          <h2 style="font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 12px;">
            Everything You Need to <span class="gradient-text">Ace Your Studies</span>
          </h2>
          <p style="color:var(--text-secondary);font-size:1rem;max-width:500px;margin:0 auto;">
            Powered by open-weight AI models running locally in your browser.
          </p>
        </div>

        <div class="features-grid">
          @for (card of features; track card.title) {
            <div class="glass-card feature-card" style="animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1) both;">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
                <div style="width:48px;height:48px;border-radius:14px;background:var(--accent-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;">
                  <i class="bi {{ card.icon }}" style="font-size:1.3rem;color:var(--accent-light);"></i>
                </div>
                <span class="pill {{ card.pillClass }}">{{ card.pill }}</span>
              </div>
              <h3 style="font-size:1rem;font-weight:700;color:var(--text-primary);margin:0 0 10px;">{{ card.title }}</h3>
              <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;margin:0;">{{ card.description }}</p>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         CTA BANNER
    ═══════════════════════════════════════════════════════════════════ -->
    <section style="padding:clamp(60px,8vh,90px) 0;background:var(--bg-base);border-top:1px solid var(--border-subtle);">
      <div class="desktop-container" style="text-align:center;">
        <div class="glass-card" style="padding:clamp(36px,6vw,64px) clamp(24px,6vw,80px);max-width:760px;margin:0 auto;">
          <span class="pill pill-violet" style="margin-bottom:20px;display:inline-flex;">
            <i class="bi bi-lightning-charge"></i> Get Started Today
          </span>
          <h2 style="font-size:clamp(1.6rem,4vw,2.2rem);font-weight:800;letter-spacing:-0.02em;color:var(--text-primary);margin:0 0 14px;">
            Ready to Transform Your Learning?
          </h2>
          <p style="color:var(--text-secondary);margin:0 0 28px;font-size:0.95rem;">
            Join university students studying smarter with grounded, citation-backed AI answers.
          </p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a class="btn-gradient" routerLink="/register" style="padding:14px 36px;">
              <i class="bi bi-person-plus"></i> Create Free Account
            </a>
            <a class="btn-border" routerLink="/login" style="padding:13px 28px;">
              <i class="bi bi-box-arrow-in-right"></i> Sign In
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════════════════════════ -->
    <footer style="padding:20px;text-align:center;border-top:1px solid var(--border-subtle);background:var(--bg-base);">
      <span style="font-size:0.78rem;color:var(--text-muted);">
        &copy; {{ year }} StudyMate AI &mdash; Built with Angular 19 &amp; Firebase
      </span>
    </footer>
  `,
  styles: [],
})
export class LandingComponent {
  readonly features = FEATURES;
  readonly year = new Date().getFullYear();

  readonly trustBadges = [
    { icon: 'bi-shield-lock',  label: 'Firebase Secured' },
    { icon: 'bi-device-hdd',   label: 'Client-Side RAG' },
    { icon: 'bi-mortarboard',  label: 'University Ready' },
    { icon: 'bi-eye-slash',    label: 'Zero Data Upload' },
  ];
}
