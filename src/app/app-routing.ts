import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { adminGuard, authGuard, publicGuard } from './core/guards';

// Componentes cargados directamente
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForosComponent } from './pages/foros/foros.component';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProvidersComponent } from './pages/admin/providers/providers.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { UsersComponent } from './pages/admin/users/users.component';

// Layout principal
import HomeComponent from './pages/home/home.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
      },
      {
        path: 'cursos',
        component: CursosComponent,
      },
      {
        path: 'foros',
        component: ForosComponent,
      },
      {
        path: 'curso/:id',
        component: CursoDetalleComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
          { path: 'users', component: UsersComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'providers', component: ProvidersComponent },
          {path: 'content/:id', loadComponent: () => import('./pages/admin/content/content.component').then(m => m.ContentComponent) },
          { path: 'keywords/:id', loadComponent: () => import('./pages/admin/keywords/keywords.component').then(m => m.KeywordsComponent) },
          { path: '', redirectTo: 'users', pathMatch: 'full' },
        ],
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        loadComponent: () =>
          import('./pages/auth/log-in/log-in.component'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}