import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase.config';
import { routes } from './app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const UI_MODULES = importProvidersFrom([
  BrowserAnimationsModule,
  CommonModule, // ← necesario para el pipe async
  FormsModule,
  MatTableModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatFormFieldModule
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    UI_MODULES,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'accent',
      },
    },
  ],
};