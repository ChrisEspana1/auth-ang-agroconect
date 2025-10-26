import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from '../../services/reportes.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-usuarios-reporte',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './usuarios-reporte.component.html',
  styleUrls: ['./usuarios-reporte.component.css']
})
export class UsuariosReporteComponent implements OnInit {
  filtro: string = 'mes'; // dia | mes | rango
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Usuarios creados en el tiempo', font: { size: 18 } },
      legend: { position: 'top' }
    },
    scales: {
      x: { title: { display: true, text: 'Fecha' } },
      y: { title: { display: true, text: 'Cantidad' }, beginAtZero: true }
    }
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const usuarios = await this.reportesService.getUsuariosPorRango(new Date('2025-01-01'), new Date());
    const agrupados = this.agruparPorFiltro(usuarios);
    this.updateChart(agrupados);
  }

  agruparPorFiltro(usuarios: any[]): any {
    const conteo: { [key: string]: number } = {};
    usuarios.forEach(u => {
    const fecha = (u['fecha_creacion'] as Timestamp).toDate();
      let clave = '';
      if (this.filtro === 'dia') {
        clave = fecha.toISOString().split('T')[0];
      } else if (this.filtro === 'mes') {
        clave = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      }
      conteo[clave] = (conteo[clave] || 0) + 1;
    });
    return conteo;
  }

  updateChart(conteo: any): void {
    const labels = Object.keys(conteo).sort();
    const data = Object.values(conteo) as number[];
    this.lineChartData = {
      labels,
      datasets: [{ label: 'Usuarios creados', data, borderColor: '#42A5F5', fill: true }]
    };
  }

  exportarPDF(): void {
    const element = document.getElementById('grafico-usuarios');
    if (!element) return;

    html2canvas(element, { scale: 1 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('usuarios-reporte.pdf');
    });
  }
}