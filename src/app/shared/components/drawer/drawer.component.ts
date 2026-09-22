/**
 * @file drawer.component.ts
 * @description Slide-out navigation drawer — Obsidian Dark / Luxury Light theme.
 *
 * Preserved from original: all AuthService signal calls, input/output declarations,
 * inject() pattern, TitleCasePipe, role-based navigation logic.
 * New: design token class names, cubic-bezier animation, role-aware section headers,
 * 44px minimum touch targets, responsive width via CSS var(--drawer-width).
 */

import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface NavLink {
  label: string;
  icon: string;
  route: string;
}

const STUDENT_LINKS: NavLink[] = [
  { label: 'AI RAG Chat',             icon: 'bi-cpu',             route: '/student/chat/default' },
  { label: 'Student Dashboard',       icon: 'bi-speedometer2',    route: '/student/dashboard'    },
  { label: 'My Subjects Catalog',     icon: 'bi-book',            route: '/student/subjects'     },
  { label: 'Chat History Archive',    icon: 'bi-clock-history',   route: '/student/history'      },
  { label: 'Profile & Locked ID',     icon: 'bi-person-badge',    route: '/student/profile'      },
];

const ADMIN_LINKS: NavLink[] = [
  { label: 'Faculty Analytics',       icon: 'bi-speedometer2',    route: '/admin/dashboard'  },
  { label: 'PDF Ingestion Portal',    icon: 'bi-cloud-upload',    route: '/admin/upload'     },
  { label: 'Manage Literature',       icon: 'bi-folder2-open',    route: '/admin/materials'  },
  { label: 'Subjects CRUD',          icon: 'bi-journal-richtext', route: '/admin/subjects'   },
];

const GUEST_LINKS: NavLink[] = [
  { label: 'Platform Landing Page',   icon: 'bi-house',              route: '/'         },
  { label: 'Sign In',                 icon: 'bi-box-arrow-in-right', route: '/login'    },
  { label: 'Create Student Account',  icon: 'bi-person-plus',        route: '/register' },
];

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  template: `
    <!-- ── Backdrop ───────────────────────────────────────────────────── -->
    @if (isOpen()) {
      <div class="sm-backdrop" (click)="closeDrawer.emit()" aria-hidden="true"></div>
    }

    <!-- ── Drawer Panel ────────────────────────────────────────────────── -->
    <nav class="sm-drawer" [class.is-open]="isOpen()" aria-label="Site navigation">

      <!-- Header row -->
      <div class="drawer-header">
        <div class="nav-brand-title" style="gap:10px;text-decoration:none;">
          <div class="brand-logo" style="width:36px;height:36px;font-size:1rem;">
            <i class="bi bi-mortarboard-fill"></i>
          </div>
          <span style="font-size:0.95rem;font-weight:800;color:var(--text-primary);">
            StudyMate <span class="gradient-text">AI</span>
          </span>
        </div>
        <button
          class="hamburger-btn"
          type="button"
          style="width:34px;height:34px;"
          aria-label="Close drawer"
          (click)="closeDrawer.emit()">
          <i class="bi bi-x" style="font-size:1.1rem;"></i>
        </button>
      </div>

      <!-- Section label -->
      <div class="drawer-section-label">
        @if (authSvc.isAdmin()) {
          Admin Management Suite
        } @else if (authSvc.isStudent()) {
          Student Portal Experience
        } @else {
          Public &amp; System Views
        }
      </div>

      <!-- Navigation links -->
      <div style="flex:1;overflow-y:auto;overflow-x:hidden;">
        @for (link of navLinks; track link.route) {
          <a
            class="drawer-nav-link"
            [routerLink]="link.route"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: link.route === '/' }"
            (click)="closeDrawer.emit()">
            <span class="link-icon">
              <i class="bi {{ link.icon }}"></i>
            </span>
            <span>{{ link.label }}</span>

            @if (link.route === '/student/chat/default' || link.route === '/admin/upload') {
              <span class="pill pill-violet" style="margin-left:auto;font-size:0.65rem;padding:2px 8px;">New</span>
            }
          </a>
        }
      </div>

      <!-- User section (authenticated) -->
      @if (authSvc.isAuthenticated() && !authSvc.authLoading()) {
        <div class="drawer-user-section">
          <div class="drawer-user-card">
            <div class="avatar-sm">
              <i class="bi bi-person-fill" style="font-size:0.85rem;"></i>
            </div>
            <div style="overflow:hidden;flex:1;">
              <div class="user-name">{{ authSvc.userName() }}</div>
              <div class="user-role">{{ authSvc.userRole() | titlecase }}</div>
            </div>
            <span class="pill"
                  [class.pill-red]="authSvc.isAdmin()"
                  [class.pill-violet]="authSvc.isStudent()"
                  style="font-size:0.65rem;">
              @if (authSvc.isAdmin()) { Admin } @else { Student }
            </span>
          </div>

          <button
            class="btn-border"
            type="button"
            style="width:100%;justify-content:center;gap:8px;"
            (click)="onLogout()">
            <i class="bi bi-box-arrow-right"></i>
            Sign Out
          </button>
        </div>
      }

    </nav>
  `,
  styles: [],
})
export class DrawerComponent {
  readonly authSvc = inject(AuthService);

  readonly isOpen = input.required<boolean>();
  readonly closeDrawer = output<void>();

  get navLinks(): NavLink[] {
    if (this.authSvc.isAdmin())   return ADMIN_LINKS;
    if (this.authSvc.isStudent()) return STUDENT_LINKS;
    return GUEST_LINKS;
  }

  onLogout(): void {
    this.closeDrawer.emit();
    void this.authSvc.logout();
  }
}
