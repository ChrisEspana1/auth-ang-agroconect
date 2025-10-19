import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./style.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    NgIf
  ]
})
export default class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(
    private _router: Router, 
    private authservice: AuthService,
    private firestore: Firestore
    ) {}

ngOnInit(): void {
    this.authservice.authState$.subscribe(async user => {
      if (user) {
        const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.data();
        this.isAdmin = data?.['rol'] === 'admin';
      }
    });
  }

  redirectTo(url: string): void {
    this._router.navigateByUrl(url);
  }
  redirectToInicio() {
    this._router.navigate(['/home']);
  }
  goHome() {
    this._router.navigateByUrl('/home');
  }

  redirectToForos() {
    this._router.navigate(['/foros']);
  }

  redirectToCursos() {
    this._router.navigate(['/cursos']);
  }

  redirectToAdmin() {
  this._router.navigate(['/admin']);
}

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  @ViewChild('sidenav') sidenav: any;

  toggleMenu() {
    this.sidenav.toggle();
  }
}



