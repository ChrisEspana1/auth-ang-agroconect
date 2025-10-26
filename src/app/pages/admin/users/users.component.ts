import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from 'src/app/components/user-form-dialog/user-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    imports: [CommonModule, FormsModule, MatDialogModule]
})

export class UsersComponent implements OnInit {
  usuarios$!: Observable<any[]>;
  roles = ['admin', 'proveedor', 'estudiante'];
  ediciones: { [uid: string]: { name: string; rol: string; activo: boolean } } = {};
  editando: { [uid: string]: boolean } = {};

  mostrarFormularioNuevoUsuario = false;
  nuevoUsuario = {
    name: '',
    email: '',
    password: '',
    rol: 'estudiante',
    activo: true
  };


  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.getUsuarios();

    this.usuarios$.subscribe(usuarios => {
      usuarios.forEach(user => {
        this.ediciones[user.id] = {
          name: user.name || '',
          rol: user.rol || 'estudiante',
          activo: user.activo ?? true
        };
        this.editando[user.id] = false;
      });
    });
  }

  activarEdicion(uid: string) {
    this.editando[uid] = true;
  }

  cancelarEdicion(uid: string) {
    this.editando[uid] = false;
  }

mensajeExito: string | null = null;

guardarCambios(uid: string) {
  const datos = this.ediciones[uid];
  this.usuariosService.actualizarUsuario(uid, datos)
    .then(() => {
      this.mensajeExito = 'Cambios guardados correctamente';
      this.cancelarEdicion(uid);
      setTimeout(() => {
        this.mensajeExito = null;
      }, 3000);
    })
    .catch(err => console.error('Error al actualizar usuario', err));
}
  
crearUsuario() {
  this.usuariosService.crearUsuario(this.nuevoUsuario)
    .then(() => {
      console.log('Usuario creado');
      this.mostrarFormularioNuevoUsuario = false;
      this.nuevoUsuario = {
        name: '',
        email: '',
        password: '',
        rol: 'estudiante',
        activo: true
      };
    })
    .catch(err => console.error('Error al crear usuario', err));
}

abrirModalNuevoUsuario() {
  const dialogRef = this.dialog.open(UserFormDialogComponent);

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.mensajeExito = 'Usuario creado correctamente';
      setTimeout(() => this.mensajeExito = null, 3000);
    }
  });
}
}