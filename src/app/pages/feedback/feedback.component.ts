import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from "../../services/curso.service";
import { AuthService } from 'src/app/core/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-feedback',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  enviado = false;
  cursoNombre = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private authService: AuthService
  ) {
    this.feedbackForm = this.fb.group({

      nombre: [''], // sin validación
      correo: [''], // opcional pero debe tener formato válido si se llena
      cursoId: [null, Validators.required], // obligatorio
      contenido: [null, Validators.required],
      claridad: [null, Validators.required],
      actualidad: ['', Validators.required],
      temasProfundizar: [''],
      metodologia: [null, Validators.required],
      recursosUtiles: ['', Validators.required],
      mejoras: [''],
      recomendacion: ['', Validators.required],
      comentariosAdicionales: ['']

    });
  }

async ngOnInit(): Promise<void> {
  const cursoId = Number(this.route.snapshot.paramMap.get('id'));
  this.feedbackForm.patchValue({ cursoId });

  const user = await firstValueFrom(this.authService.authState$);

  if (!user) {
    this.router.navigate(['/auth/log-in']);
    return;
  }

  const correo = user.email ?? '';
  const nombre = user.displayName ?? '';

  this.feedbackForm.patchValue({ nombre, correo });

  try {
    await firstValueFrom(this.feedbackService.validarAcceso({ cursoId, correo }));
    // Acceso permitido, no hacer nada
    console.log('[FeedbackComponent] Acceso permitido');
  } catch (err: any) {
    if (err.status === 403) {
      alert(err.error.mensaje || 'Ya has enviado tu Feedback a este curso. ¡Gracias por tu participación!');
      this.regresarAlCurso();
    } else {
      console.error('[FeedbackComponent] Error inesperado al validar acceso:', err);
    }
  }
}

regresarAlCurso() {
    const cursoId = this.feedbackForm.value.cursoId;
    this.router.navigate([`/curso/${cursoId}`]);
  }

onSubmit() {
  if (this.feedbackForm.valid) {
    const cursoId = this.feedbackForm.value.cursoId;

    console.log('[FeedbackComponent] Enviando formulario con los siguientes datos:');
    console.log(this.feedbackForm.value);
    this.feedbackService.enviarFeedback(this.feedbackForm.value).subscribe(() => {
      alert('¡Gracias por tu retroalimentación!');
      this.router.navigate([`/curso/${cursoId}`]);
    });

  } else {
    console.warn('[FeedbackComponent] Formulario inválido. No se envía.');
    console.log('Estado del formulario:', this.feedbackForm.status);
    console.log('Valores actuales:', this.feedbackForm.value);
  }
}
}
