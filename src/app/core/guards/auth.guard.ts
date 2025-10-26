import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const firestore = inject(Firestore);

  return authService.authState$.pipe(
    switchMap(user => {
      if (!user) {
        router.navigateByUrl('/auth/log-in');
        return of(false);
      }

      const userDocRef = doc(firestore, `usuarios/${user.uid}`);
      return from(getDoc(userDocRef)).pipe(
        map(snapshot => {
          const data = snapshot.data();
          const activo = data?.['activo']; // o usa 'estado' === 'activo' si así lo tienes

          if (activo === false) {
            alert('Tu cuenta está inactiva. Por favor contacta al administrador.');
            router.navigateByUrl('/auth/log-in');
            return false;
          }

          return true;
        })
      );
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return from(authService.authState$).pipe(
    map(user => {
      if (user) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  );
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const firestore = inject(Firestore);

  return authService.authState$.pipe(
    switchMap(user => {
      if (!user) {
        router.navigateByUrl('/auth/log-in');
        return of(false);
      }

      const userDocRef = doc(firestore, `usuarios/${user.uid}`);
      return from(getDoc(userDocRef)).pipe(
        map(snapshot => {
          const data = snapshot.data();
          const role = data?.['rol'];
          const activo = data?.['activo'];

          if (role === 'admin' && activo !== false) {
            return true;
          } else {
            router.navigateByUrl('/');
            return false;
          }
        })
      );
    })
  );
};
``