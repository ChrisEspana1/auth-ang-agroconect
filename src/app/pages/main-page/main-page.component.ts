import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
@Component({
  standalone: true,
  imports: [HomeComponent],
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  navActive: boolean = false;
  toggleNav() {
    this.navActive = !this.navActive;
  }
}
