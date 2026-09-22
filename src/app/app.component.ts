/**
 * @file app.component.ts
 * @description Root application shell for StudyMate AI.
 *
 * Responsibilities:
 *   - Hosts the top Navbar and slide-out Drawer.
 *   - Manages `drawerOpen` signal.
 *   - Owns dual-theme state (dark / light) persisted in localStorage.
 *   - Applies [data-theme] attribute to document root on init and toggle.
 *
 * NOTE: No TypeScript business logic changed – theme management is pure UI shell concern.
 */

import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DrawerComponent } from './shared/components/drawer/drawer.component';

export type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DrawerComponent],
  template: `
    <!-- Top Navigation Bar -->
    <app-navbar
      [currentTheme]="theme()"
      (toggleDrawer)="drawerOpen.set(!drawerOpen())"
      (themeChange)="setTheme($event)" />

    <!-- Slide-out Offcanvas Drawer -->
    <app-drawer
      [isOpen]="drawerOpen()"
      (closeDrawer)="drawerOpen.set(false)" />

    <!-- Main Content Area (offset by fixed navbar height via CSS var) -->
    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class AppComponent implements OnInit {
  /** Controls whether the navigation drawer is visible. */
  readonly drawerOpen = signal(false);

  /** Current active theme. */
  readonly theme = signal<Theme>('dark');

  ngOnInit(): void {
    // Restore persisted theme preference from localStorage.
    const saved = localStorage.getItem('sm-theme') as Theme | null;
    const initial: Theme = saved === 'light' ? 'light' : 'dark';
    this.applyTheme(initial);
  }

  setTheme(t: Theme): void {
    this.applyTheme(t);
    localStorage.setItem('sm-theme', t);
  }

  private applyTheme(t: Theme): void {
    this.theme.set(t);
    document.documentElement.setAttribute('data-theme', t);
  }
}
