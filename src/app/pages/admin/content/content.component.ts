import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Contenido } from 'src/app/models/contenido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    imports: [CommonModule, FormsModule]
})
export class ContentComponent implements OnInit {
  mostrarFormularioNuevo: boolean = false;
  cursoId!: string;
  cursoNombre!: string;
  contenidos: Contenido[] = [];
  editandoIndice: number | null = null;
  nuevoContenido: Contenido = {
    id: 0,
    curso_id: '',
    titulo: '',
    descripcion: '',
    url_recurso: '',
  };

  constructor(private route: ActivatedRoute, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.paramMap.get('id')!;
    this.nuevoContenido.curso_id = this.cursoId;
    this.cursoService.getCursoPorId(this.cursoId).subscribe({
      next: (curso) => {
      this.cursoNombre = curso.titulo;
},
    error: (err) => console.error('Error al obtener el curso', err)
  });
    this.cargarContenidos();
  }

  cargarContenidos(): void {
    this.cursoService.getContenidosPorCurso(this.cursoId).subscribe({
      next: (data) => this.contenidos = data,
      error: (err) => console.error('Error al cargar contenidos', err)
    });
  }

agregarContenido(): void {
  if (!this.nuevoContenido.titulo || !this.nuevoContenido.descripcion || !this.nuevoContenido.url_recurso) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const nuevo = {
    curso_id: this.cursoId, // importante para el backend
    titulo: this.nuevoContenido.titulo,
    descripcion: this.nuevoContenido.descripcion,
    url_recurso: this.nuevoContenido.url_recurso
  };

  this.cursoService.crearContenido(this.cursoId, nuevo).subscribe({
    next: (res) => {
      console.log('Contenido agregado:', res);
      alert('Contenido agregado correctamente');
      this.cargarContenidos();
      this.nuevoContenido = { id: 0, curso_id: this.cursoId, titulo: '', descripcion: '', url_recurso: ''};
      this.mostrarFormularioNuevo = false;
    },
    error: (err) => console.error('Error al agregar contenido', err)
  });
}

  modificarContenido(indice: number): void {
  this.editandoIndice = indice;
  }
  cancelarEdicion(): void {
    this.editandoIndice = null;
  }
  
guardarCambios(indice: number): void {
  const contenido = this.contenidos[indice];
  this.cursoService.actualizarContenido(contenido.curso_id, contenido.id, contenido).subscribe({
    next: () => {
      console.log('Contenido actualizado');
      alert('Contenido actualizado correctamente');
      this.editandoIndice = null;
    },
    error: (err) => console.error('Error al actualizar contenido', err)
  });
}

toggleFormularioNuevo(): void {
  this.mostrarFormularioNuevo = !this.mostrarFormularioNuevo;
}
volverEdicionCurso(): void {
  window.history.back();
}
}