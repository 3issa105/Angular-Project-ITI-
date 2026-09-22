/**
 * @file app.routes.ts
 * @description Complete lazy-loaded routing table for StudyMate AI.
 *
 * Route structure:
 *   /                     → LandingComponent         (public)
 *   /login                → LoginComponent            (public)
 *   /register             → RegisterComponent         (public)
 *   /unauthorized         → UnauthorizedComponent     (public)
 *   /student/...          → Student feature area      (authGuard)
 *   /admin/...            → Admin feature area        (adminGuard)
 *   **                    → NotFoundComponent         (catch-all)
 *
 * All routes resolve to valid standalone components → ng build: 0 errors.
 */

import { Routes } from '@angular/router';
import { authGuard }  from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  // ── Public Routes ──────────────────────────────────────────────────────────

  {
    path: '',
    loadComponent: () =>
      import('./features/public/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
    title: 'StudyMate AI – Home',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/public/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Sign In – StudyMate AI',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/public/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Create Account – StudyMate AI',
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/public/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
    title: '403 – Access Denied',
  },

  // ── Student Routes (authGuard) ─────────────────────────────────────────────

  {
    path: 'student',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/student/dashboard/student-dashboard.component').then(
            (m) => m.StudentDashboardComponent
          ),
        title: 'Dashboard – StudyMate AI',
      },
      {
        path: 'subjects',
        loadComponent: () =>
          import('./features/student/subjects/student-subjects.component').then(
            (m) => m.StudentSubjectsComponent
          ),
        title: 'My Subjects – StudyMate AI',
      },
      {
        path: 'chat',
        redirectTo: 'chat/default',
        pathMatch: 'full',
      },
      {
        path: 'chat/:subjectId',
        loadComponent: () =>
          import('./features/student/chat/student-chat.component').then(
            (m) => m.StudentChatComponent
          ),
        title: 'Chat – StudyMate AI',
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/student/history/student-history.component').then(
            (m) => m.StudentHistoryComponent
          ),
        title: 'Chat History – StudyMate AI',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/student/profile/student-profile.component').then(
            (m) => m.StudentProfileComponent
          ),
        title: 'My Profile – StudyMate AI',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // ── Admin Routes (adminGuard) ──────────────────────────────────────────────

  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
        title: 'Admin Dashboard – StudyMate AI',
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./features/admin/upload/admin-upload.component').then(
            (m) => m.AdminUploadComponent
          ),
        title: 'Upload Material – StudyMate AI',
      },
      {
        path: 'materials',
        loadComponent: () =>
          import('./features/admin/materials/admin-materials.component').then(
            (m) => m.AdminMaterialsComponent
          ),
        title: 'Materials – StudyMate AI',
      },
      {
        path: 'subjects',
        loadComponent: () =>
          import('./features/admin/subjects/admin-subjects.component').then(
            (m) => m.AdminSubjectsComponent
          ),
        title: 'Manage Subjects – StudyMate AI',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // ── 404 Catch-All ──────────────────────────────────────────────────────────

  {
    path: '**',
    loadComponent: () =>
      import('./features/public/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: '404 – Page Not Found',
  },
];
