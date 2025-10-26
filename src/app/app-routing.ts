import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { adminGuard, authGuard, publicGuard } from './core/guards';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes cargados directamente
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForosComponent } from './pages/foros/foros.component';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ManProvidersComponent } from './pages/admin/man-providers/man-providers.component';

// Layout principal
import HomeComponent from './pages/home/home.component';
import { ReporteComponent } from './reportes/reporte/reporte.component';
import { ClaridadVsContenidoComponent } from './reportes/claridad-vs-contenido/claridad-vs-contenido.component';
import { RecomendacionesComponent } from './reportes/recomendaciones/recomendaciones.component';
import { PromedioCalificacionesComponent } from './reportes/promedio-calificaciones/promedio-calificaciones.component';
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
        path: ':id/feedback',
        component: FeedbackComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
          { path: 'users', component: UsersComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'man-providers', component: ManProvidersComponent },
          { path: 'content/:id', loadComponent: () => import('./pages/admin/content/content.component').then(m => m.ContentComponent) },
          { path: 'keywords/:id', loadComponent: () => import('./pages/admin/keywords/keywords.component').then(m => m.KeywordsComponent) },
          { path: 'providers/:id', loadComponent: () => import('./pages/admin/providers/providers.component').then(m => m.ProvidersComponent) },
          { path: '', redirectTo: 'users', pathMatch: 'full' },
        ],
      },
      {
        path: 'reportes',
        component: ReporteComponent,
        canActivate: [adminGuard],
        children: [
          { path: '', redirectTo: 'promedio-calificaciones', pathMatch: 'full' },
          { path: 'promedio-calificaciones', component: PromedioCalificacionesComponent },
          { path: 'recomendaciones', component: RecomendacionesComponent },
          { path: 'claridad-vs-contenido', component: ClaridadVsContenidoComponent },
        ]
      }
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
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRouting {}