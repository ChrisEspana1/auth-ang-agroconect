import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; // ← asegúrate de importar tus rutas
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgModule } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideNoopAnimations(),
    NgModule
  ]
}).catch(err => console.error(err));
