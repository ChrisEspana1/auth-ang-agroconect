import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-user-form-dialog',
    templateUrl: './user-form-dialog.component.html',
    styleUrls: ['./user-form-dialog.component.css'],
    imports: [FormsModule, CommonModule, MatButtonModule]
})
export class UserFormDialogComponent {
  tipoRegistro: 'email' | 'google' | 'github' = 'email';

  nuevoUsuario = {
    name: '',
    email: '',
    password: '',
    rol: 'estudiante',
    activo: true
  };

  nombreSocial = '';
  apellidoSocial = '';
  rolSocial = 'estudiante';

  roles = ['admin', 'proveedor', 'estudiante'];

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) {}

  crearUsuarioEmail() {
    this.usuariosService.crearUsuario(this.nuevoUsuario)
      .then(() => this.dialogRef.close(true))
      .catch(err => console.error('Error al crear usuario', err));
  }

  async crearConGoogle() {
    try {
      const cred = await this.authService.signInWithGoogleProvider();
      await this.usuariosService.actualizarUsuario(cred.user.uid, {
        name: `${this.nombreSocial} ${this.apellidoSocial}`,
        rol: this.rolSocial,
        activo: true
      });
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error con Google:', error);
    }
  }

  async crearConGitHub() {
    try {
      const cred = await this.authService.signInWithGithubProvider();
      await this.usuariosService.actualizarUsuario(cred.user.uid, {
        name: `${this.nombreSocial}`,
        rol: this.rolSocial,
        activo: true
      });
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error con GitHub:', error);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}