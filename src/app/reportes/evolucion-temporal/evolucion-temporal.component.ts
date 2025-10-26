import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-evolucion-temporal',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './evolucion-temporal.component.html',
  styleUrls: ['./evolucion-temporal.component.css'],
})
export class EvolucionTemporalComponent implements OnInit {
  cursos: any[] = [];
  selectedCurso: string = 'todos';
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tendencia de Calificaciones por Mes',
        font: { size: 18 }
      },
      legend: { position: 'top' }
    },
    scales: {
      x: { title: { display: true, text: 'Mes' } },
      y: { title: { display: true, text: 'Promedio' }, min: 0, max: 5 }
    }
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.reportesService.getTendenciaCalificaciones().subscribe(data => {
      this.cursos = [...new Set(data.map(item => item.nombre_curso))];
      this.updateChart(data);
    });
  }

  updateChart(data: any[]): void {
    let filtered = data;
    if (this.selectedCurso !== 'todos') {
      filtered = data.filter(item => item.nombre_curso === this.selectedCurso);
    }

    const labels = [...new Set(filtered.map(item => item.mes))].sort();
    const datasets = [];

    if (this.selectedCurso === 'todos') {
      // Comparativa entre cursos
      const cursosUnicos = [...new Set(filtered.map(item => item.nombre_curso))];
      cursosUnicos.forEach(curso => {
        const puntos = filtered.filter(d => d.nombre_curso === curso);
        datasets.push({
          label: curso,
          data: puntos.map(p => Number(p.promedio_contenido)), // Puedes cambiar a promedio general
          borderColor: this.getRandomColor(),
          fill: false
        });
      });
    } else {
      // Solo un curso: mostrar las 3 métricas
      const puntos = filtered;
      datasets.push({
        label: 'Contenido',
        data: puntos.map(p => Number(p.promedio_contenido)),
        borderColor: '#42A5F5',
        fill: false
      });
      datasets.push({
        label: 'Claridad',
        data: puntos.map(p => Number(p.promedio_claridad)),
        borderColor: '#66BB6A',
        fill: false
      });
      datasets.push({
        label: 'Metodología',
        data: puntos.map(p => Number(p.promedio_metodologia)),
        borderColor: '#FFA726',
        fill: false
      });
    }

    this.lineChartData = { labels, datasets };
  }

  onCursoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCurso = selectElement.value;
    this.loadData();
  }

  exportarPDF(): void {
    const element = document.getElementById('grafico-tendencia');
    if (!element) return;

    html2canvas(element, { scale: 1 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('tendencia-calificaciones.pdf');
    });
  }

  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
