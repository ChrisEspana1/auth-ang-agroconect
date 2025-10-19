import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/cursos.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  cursosPaginados: Curso[] = [];

  filtroCategoria = 'todos';
  filtroNivel = 'todos';
  filtroTexto = '';
  
  paginaActual = 1;
  cursosPorPagina = 4;
  paginas: number[] = [];
  
  constructor(private cursoService: CursoService, private router: Router) {}

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data.filter(curso => curso.estado === 'activo'); // Filtra activos
      this.generarPaginas();
      this.aplicarFiltros();
      this.actualizarCursosPaginados();
    });
  }
  
aplicarFiltros(): void {
    this.paginaActual = 1;
    this.cursosFiltrados = this.cursos.filter(curso => {
      const coincideCategoria = this.filtroCategoria === 'todos' || curso.categoria === this.filtroCategoria;
      const coincideNivel = this.filtroNivel === 'todos' || curso.nivel === this.filtroNivel;
      const coincideTexto = this.filtroTexto.trim() === '' || curso.titulo.toLowerCase().includes(this.filtroTexto.toLowerCase()) || curso.descripcion.toLowerCase().includes(this.filtroTexto.toLowerCase());
      return coincideCategoria && coincideNivel && coincideTexto;
    });
    
    this.generarPaginas();
    this.actualizarCursosPaginados();
  }


  generarPaginas(): void {
    const totalPaginas = Math.ceil(this.cursos.length / this.cursosPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  actualizarCursosPaginados(): void {
    const inicio = (this.paginaActual - 1) * this.cursosPorPagina;
    const fin = inicio + this.cursosPorPagina;
    this.cursosPaginados = this.cursosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.actualizarCursosPaginados();
  }

  verCurso(id: string): void {
    this.router.navigate(['/curso', id]);
  }


}
