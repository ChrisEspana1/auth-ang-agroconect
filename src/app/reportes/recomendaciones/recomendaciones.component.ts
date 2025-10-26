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
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Recomendaciones por Curso',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Recomendaciones: ${context.parsed.x}`
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad de Recomendaciones' }
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
    this.reportesService.getRecomendaciones().subscribe((data: any[]) => {
      const labels = data.map(item => item.nombre_curso);
      const valores = data.map(item => item.cantidad_recomendaciones);

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
  const element = document.getElementById('grafico-recomendaciones');
  if (!element) return;

  html2canvas(element).then((canvas: HTMLCanvasElement) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('recomendaciones.pdf');
  });
}

}