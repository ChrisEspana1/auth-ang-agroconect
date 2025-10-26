import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, Timestamp } from '@angular/fire/firestore';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  readonly authState$ = authState(this.auth);
  private usuarioActual: { nombre: string; correo: string } | null = null;

  getUsuarioActual(): { nombre: string; correo: string } | null {
    return this.usuarioActual;
  }
  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  // providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      const userRef = doc(this.firestore, `usuarios/${user.uid}`);
      const snapshot = await getDoc(userRef);
      
      this.usuarioActual = {
        nombre: user.displayName || '',
        correo: user.email || ''
      };

      if (!snapshot.exists()) {
        console.log('[AuthService] Creando documento en Firestore para nuevo usuario:', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          rol: 'estudiante', // rol por defecto
          activo: false, // estado por defecto
          fecha_creacion: Timestamp.fromDate(new Date())
        });
      }

      return result;
    } catch (error: any) {
      return error;
    }
  }
}

