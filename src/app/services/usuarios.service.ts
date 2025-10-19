import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service'; // Ajusta la ruta si es necesario
import { UserCredential } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, { idField: 'id' }); // 'id' será el UID
  }

  // Crear nuevo usuario con email y contraseña
  crearUsuario(datos: { name: string; email: string; password: string; rol: string; activo: boolean }) {
    return this.authService.signUpWithEmailAndPassword({
      email: datos.email,
      password: datos.password
    }).then((cred: UserCredential) => {
      const userRef = doc(this.firestore, `usuarios/${cred.user?.uid}`);
      return setDoc(userRef, {
        id: cred.user?.uid,
        name: datos.name,
        email: datos.email,
        rol: datos.rol,
        activo: datos.activo
      });
    });
  }

  // Actualizar el rol de un usuario
  actualizarRol(uid: string, nuevoRol: string): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { rol: nuevoRol });
  }

  // Activar o desactivar un usuario
  actualizarEstado(uid: string, activo: boolean): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { activo });
  }

  // Actualizar múltiples campos de un usuario
  actualizarUsuario(uid: string, datos: { name?: string; rol?: string; activo?: boolean }): Promise<void> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, datos);
  }
}