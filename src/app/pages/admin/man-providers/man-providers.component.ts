import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-man-providers',
    templateUrl: './man-providers.component.html',
    styleUrls: ['./man-providers.component.css'],
    imports: [CommonModule, FormsModule]
})
export class ManProvidersComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorForm: Partial<Proveedor> = {
    nombre: '',
    contacto: '',
    servicio: '',
    tipo_contacto: 'email'
  };
  editandoId: number | null = null;
  mostrarFormulario = false;

  // Paginación
  paginaActual = 1;
  proveedoresPorPagina = 4;

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedoresService.getTodosLosProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: () => alert('Error al cargar proveedores')
    });
  }

  get proveedoresPaginados(): Proveedor[] {
    const inicio = (this.paginaActual - 1) * this.proveedoresPorPagina;
    return this.proveedores.slice(inicio, inicio + this.proveedoresPorPagina);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente'): void {
    const totalPaginas = Math.ceil(this.proveedores.length / this.proveedoresPorPagina);
    if (direccion === 'anterior' && this.paginaActual > 1) this.paginaActual--;
    if (direccion === 'siguiente' && this.paginaActual < totalPaginas) this.paginaActual++;
  }

  mostrarFormularioCreacion(): void {
    this.resetFormulario();
    this.mostrarFormulario = true;
  }

  guardarProveedor(): void {
    if (this.editandoId) {
      this.proveedoresService.actualizarProveedor(this.editandoId, this.proveedorForm).subscribe({
        next: () => {
          alert('Proveedor actualizado');
          this.resetFormulario();
          this.cargarProveedores();
        },
        error: () => alert('Error al actualizar proveedor')
      });
    } else {
      this.proveedoresService.crearProveedor(this.proveedorForm).subscribe({
        next: () => {
          alert('Proveedor creado');
          this.resetFormulario();
          this.cargarProveedores();
        },
        error: () => alert('Error al crear proveedor')
      });
    }
  }

  editarProveedor(proveedor: Proveedor): void {
    this.editandoId = proveedor.id;
    this.proveedorForm = { ...proveedor };
    this.mostrarFormulario = true;
  }

  eliminarProveedor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedoresService.eliminarProveedor(id).subscribe({
        next: () => {
          alert('Proveedor eliminado');
          this.cargarProveedores();
        },
        error: () => alert('Error al eliminar proveedor')
      });
    }
  }

  resetFormulario(): void {
    this.editandoId = null;
    this.proveedorForm = {
      nombre: '',
      contacto: '',
      servicio: '',
      tipo_contacto: 'email'
    };
    this.mostrarFormulario = false;
  }

toggleFormulario(): void {
  this.mostrarFormulario = !this.mostrarFormulario;
  if (!this.mostrarFormulario) {
    this.resetFormulario(); // Limpia el formulario al cancelar
  }
}

}
