import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(DataLabelsPlugin);

@Component({
  selector: 'app-claridad-vs-contenido',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './claridad-vs-contenido.component.html',
  styleUrls: ['./claridad-vs-contenido.component.css']
})
export class ClaridadVsContenidoComponent implements OnInit {
  cursos: any[] = [];
  selectedCurso: string = 'todos';

  scatterChartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: {
        display: true,
        text: 'Claridad vs Contenido por Curso',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw as { curso?: string; x?: number; y?: number };
            return `${raw.curso}: Contenido ${raw.x}, Claridad ${raw.y}`;
          }
        }
      },
      datalabels: {
        align: 'top',
        color: '#6D4C41',
        font: { size: 12, weight: 'bold' },
        formatter: (value: any) => value.curso
      }
    },
    scales: {
      x: { title: { display: true, text: 'Contenido' }, min: 0, max: 5 },
      y: { title: { display: true, text: 'Claridad' }, min: 0, max: 5 }
    }
  };

  scatterChartData: ChartData<'scatter'> = {
    datasets: [{ label: 'Cursos', data: [], backgroundColor: '#FFCC80' }]
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.loadCursos();
    this.loadData();
  }

  loadCursos(): void {
    this.reportesService.getClaridadVsContenido().subscribe((data: any[]) => {
      this.cursos = data;
    });
  }

  loadData(): void {
    if (this.selectedCurso === 'todos') {
      this.reportesService.getClaridadVsContenido().subscribe((data: any[]) => {
        this.graficarDatos(data);
      });
    } else {
      this.reportesService.getClaridadVsContenidoById(+this.selectedCurso).subscribe((data: any[]) => {
        this.graficarDatos(data);
      });
    }
  }

  graficarDatos(data: any[]): void {
    const puntos = data.map(item => ({
      x: Number(item.promedio_contenido),
      y: Number(item.promedio_claridad),
      curso: item.nombre_curso
    }));

    this.scatterChartData = {
      datasets: [
        {
          label: 'Cursos',
          data: puntos,
          backgroundColor: '#FFCC80'
        }
      ]
    };
  }

  onCursoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCurso = selectElement.value;
    this.loadData();
  }

  exportarPDF(): void {
    const element = document.getElementById('grafico-claridad');
    if (!element) return;

    html2canvas(element, { scale: 1 }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('claridad-vs-contenido.pdf');
    }).catch(err => {
      console.error('Error al generar PDF:', err);
    });
  }
}