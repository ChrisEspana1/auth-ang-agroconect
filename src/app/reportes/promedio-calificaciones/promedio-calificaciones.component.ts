import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-promedio-calificaciones',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './promedio-calificaciones.component.html',
  styleUrls: ['./promedio-calificaciones.component.css']
})
export class PromedioCalificacionesComponent implements OnInit {
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Calificaciones por Curso',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Promedio: ${context.parsed.x}`
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Calificación Promedio' }
      },
      y: {
        title: { display: true, text: 'Curso' }
      }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A']
      }
    ]
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.reportesService.getPromedioCalificaciones().subscribe((data: any[]) => {
      const labels = data.map(item => item.nombre_curso);
      const valores = data.map(item => {
        const contenido = parseFloat(item.promedio_contenido);
        const claridad = parseFloat(item.promedio_claridad);
        const metodologia = parseFloat(item.promedio_metodologia);
        return (contenido + claridad + metodologia) / 3;
      });

      this.barChartData = {
        labels,
        datasets: [
          {
            data: valores,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A']
          }
        ]
      };
    });
  }

  exportarPDF(): void {
    const element = document.getElementById('grafico-promedio');
    if (!element) return;

    html2canvas(element, { scale: 1 }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('promedio-calificaciones.pdf');
    }).catch(err => {
      console.error('Error al generar PDF:', err);
    });
  }
}