import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/cursos.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import HomeComponent from '../home/home.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { Contenido } from 'src/app/models/contenido.model';
import { ProveedorChatService } from '../../services/proveedor-chat.service';
import { Proveedor } from '../../models/proveedor.model';
import { CursoProveedoresComponent } from '../curso-proveedores/curso-proveedores.component';


@Component({
    imports: [CommonModule, SafeUrlPipe, CursoProveedoresComponent],
    selector: 'app-curso-detalle',
    templateUrl: './curso-detalle.component.html',
    styleUrls: ['./curso-detalle.component.css']
})

export class CursoDetalleComponent implements OnInit {
  curso: Curso | null = null;
  contenidos: Contenido[];
  proveedorSeleccionado: Proveedor | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
    private http: HttpClient,
    private proveedorChatService: ProveedorChatService
  ) {
    this.contenidos = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.getCursoPorId(id).subscribe(data => {
        this.curso = data;
      });

      this.cursoService.getContenidosPorCurso(id).subscribe(data => {
        this.contenidos = data;
      });

      this.proveedorChatService.proveedor$.subscribe(proveedor => {
        this.proveedorSeleccionado = proveedor;
      });
    }
  }
  
abrirWhatsapp(numero: string): void {
  const url = `https://wa.me/${numero}`;
  window.open(url, '_blank');
}
darFeedback(): void {
this.router.navigate([`${this.curso?.id}/feedback`]);
}

enviarEmail(correo: string): void {
  const url = `mailto:${correo}`;
  window.open(url, '_blank');
}

volver(){
  this.router.navigate(['/cursos']);
}
}
