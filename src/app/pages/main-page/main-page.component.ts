import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  cursosDestacados: any[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.feedbackService.getCursosRecomendados().subscribe(data => {
      this.cursosDestacados = data.slice(0, 3); // Mostrar solo los 3 primeros
    });
  }

  verCurso(id: number): void {
    this.router.navigate(['/curso', id]);
  }
}