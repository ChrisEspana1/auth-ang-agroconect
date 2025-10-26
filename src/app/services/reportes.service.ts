import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query, where, collection, getDocs, Firestore } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private baseUrl = 'https://api.agroconecta.site/api/reportes';

  constructor(
    private http: HttpClient, 
    private firestore: Firestore
  ) {}

  getPromedioCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/promedio-calificaciones`);
  }

  getRecomendaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recomendaciones`);
  }

  getClaridadVsContenido(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/claridad-vs-contenido`);
  }
  getClaridadVsContenidoById(id: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/${id}/claridad-vs-contenido`);
}
  getTendenciaCalificaciones(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/tendencia-calificaciones`);
}


async getUsuariosPorRango(fechaInicio: Date, fechaFin: Date) {
  const usuariosRef = collection(this.firestore, 'usuarios');
  const q = query(
    usuariosRef,
    where('fecha_creacion', '>=', Timestamp.fromDate(fechaInicio)),
    where('fecha_creacion', '<=', Timestamp.fromDate(fechaFin))
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

}