import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PromedioCalificacionesComponent } from '../promedio-calificaciones/promedio-calificaciones.component';
import { RecomendacionesComponent } from '../recomendaciones/recomendaciones.component';
import { ClaridadVsContenidoComponent } from '../claridad-vs-contenido/claridad-vs-contenido.component';
import { EvolucionTemporalComponent } from '../evolucion-temporal/evolucion-temporal.component';
import { UsuariosReporteComponent } from '../usuarios-reporte/usuarios-reporte.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    MatTabsModule,
    PromedioCalificacionesComponent,
    RecomendacionesComponent,
    ClaridadVsContenidoComponent,
    EvolucionTemporalComponent,
    UsuariosReporteComponent
  ],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {}

