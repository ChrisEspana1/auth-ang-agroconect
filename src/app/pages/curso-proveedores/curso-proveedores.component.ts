import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorChatService } from '../../services/proveedor-chat.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-curso-proveedores',
  templateUrl: './curso-proveedores.component.html',
  styleUrls: ['./curso-proveedores.component.css'],
  imports: [CommonModule]
})


export class CursoProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private proveedorChatService: ProveedorChatService
  ) { }


  ngOnInit(): void {
    const cursoId = this.route.snapshot.paramMap.get('id');
    if (cursoId) {
      this.cursoService.getProveedoresPorCurso(cursoId).subscribe({
        next: (data) => this.proveedores = data,
        error: (err) => console.error('Error al cargar proveedores', err)
      });
    }
  }
  abrirWhatsapp(numero: string): void {
    const url = `https://wa.me/${numero}`;
    window.open(url, '_blank');
  }

  enviarEmail(correo: string): void {
    const url = `mailto:${correo}`;
    window.open(url, '_blank');
  }

  iniciarChat(proveedor: Proveedor): void {
    this.proveedorChatService.seleccionarProveedor(proveedor);
  }
}
