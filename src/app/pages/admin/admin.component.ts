import { Component } from '@angular/core';
import HomeComponent from "../home/home.component";
import { RouterOutlet } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [RouterOutlet]
})
export class AdminComponent {

constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }
}
