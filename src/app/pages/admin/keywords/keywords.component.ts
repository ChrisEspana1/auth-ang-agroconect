import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Keyword } from 'src/app/models/keyword.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
  imports: [CommonModule, FormsModule]
})
export class KeywordsComponent implements OnInit {
  cursoId!: string;
  keywords: Keyword[] = [];
  mostrarFormularioNuevo = false;
  editandoIndice: number | null = null;
  nuevaKeyword: Keyword = { id: 0, curso_id: '', palabra: '' };



  constructor(private route: ActivatedRoute, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.paramMap.get('id')!;
    this.nuevaKeyword.curso_id = this.cursoId;
    this.cargarKeywords();
  }

  cargarKeywords(): void {
    this.cursoService.getKeywordsPorCurso(this.cursoId).subscribe({
      next: (data) => this.keywords = data,
      error: (err) => console.error('Error al cargar keywords', err)
    });
  }

  agregarKeyword(): void {
    if (!this.nuevaKeyword.palabra.trim()) {
      alert('La palabra clave es obligatoria');
      return;
    }
    this.cursoService.crearKeyword(this.cursoId, { palabra: this.nuevaKeyword.palabra }).subscribe({
      next: () => {
        alert('Keyword agregada correctamente');
        this.cargarKeywords();
        this.nuevaKeyword.palabra = '';
        this.mostrarFormularioNuevo = false;
      },
      error: () => alert('Error al agregar keyword')
    });
  }

  modificarKeyword(indice: number): void {
    this.editandoIndice = indice;
  }

  guardarCambios(indice: number): void {
    const keyword = this.keywords[indice];
    this.cursoService.actualizarKeyword(keyword.curso_id, keyword.id, { palabra: keyword.palabra }).subscribe({
      next: () => {
        alert('Keyword actualizada correctamente');
        this.editandoIndice = null;
      },
      error: () => alert('Error al actualizar keyword')
    });
  }

  cancelarEdicion(): void {
    this.editandoIndice = null;
  }

  volverEdicionCurso(): void {
    window.history.back();
  }

  toggleFormularioNuevo(): void {
    this.mostrarFormularioNuevo = !this.mostrarFormularioNuevo;
  }
}