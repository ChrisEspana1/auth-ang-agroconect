import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css'],
    imports: [CommonModule, FormsModule]
})
export class ProvidersComponent implements OnInit {

  cursoId!: string;
  cursoNombre!: string;

  proveedoresAsignados: Proveedor[] = [];
  proveedoresDisponibles: Proveedor[] = [];

  proveedorSeleccionadoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private proveedoresService: ProveedoresService
  ) {}

ngOnInit(): void {
  this.cursoId = this.route.snapshot.paramMap.get('id')!;
  this.cargarCurso();

  this.cursoService.getProveedoresPorCurso(this.cursoId).subscribe({
    next: (asignados) => {
      this.proveedoresAsignados = asignados;
      this.cargarProveedoresDisponibles(); // Se llama después de tener los asignados
    },
    error: (err) => console.error('Error al cargar proveedores asignados, ', err)
  });
}

  cargarCurso(): void {
    this.cursoService.getCursoPorId(this.cursoId).subscribe({
      next: (curso) => this.cursoNombre = curso.titulo,
      error: (err) => console.error('Error al obtener el curso', err)
    });
  }

  cargarProveedoresAsignados(): void {
    this.proveedoresService.getProveedoresPorCurso(this.cursoId).subscribe({
      next: (data) => this.proveedoresAsignados = data,
      error: (err) => console.error('Error al cargar proveedores asignados', err)
    });
  }

cargarProveedoresDisponibles(): void {
  this.proveedoresService.getTodosLosProveedores().subscribe({
    next: (todos) => {
      // Filtrar proveedores que NO están asignados al curso
      const asignadosIds = this.proveedoresAsignados.map(p => p.id);
      this.proveedoresDisponibles = todos.filter(p => !asignadosIds.includes(p.id));
    },
    error: (err) => console.error('Error al cargar proveedores disponibles', err)
  });
}

  asignarProveedor(): void {
    if (this.proveedorSeleccionadoId) {
      this.cursoService.asignarProveedorACurso(this.cursoId, this.proveedorSeleccionadoId).subscribe({
        next: () => {
          alert('Proveedor asignado correctamente');
          this.proveedorSeleccionadoId = null;
          this.cargarProveedoresAsignados();
          this.cargarProveedoresDisponibles();
          this.ngOnInit();
        },
        error: () => alert('Error al asignar proveedor al curso, ya existe una asignación')
      });
    }
  }

eliminarAsignacion(asignacionId: number): void {
  this.ngOnInit();
  this.cursoService.eliminarAsignacionPorId(asignacionId).subscribe({
    next: () => {
      alert('Asignación eliminada');
      this.cargarProveedoresAsignados();
      this.cargarProveedoresDisponibles();
       this.ngOnInit();
    },
    error: () => alert('Error al eliminar asignación')
  });
}

  volverEdicionCurso(): void {
    window.history.back();
  }
}