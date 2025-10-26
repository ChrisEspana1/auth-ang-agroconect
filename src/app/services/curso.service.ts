import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';
import { Contenido } from '../models/contenido.model';
import { Proveedor } from '../models/proveedor.model';
import { Keyword } from '../models/keyword.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private apiUrl = 'https://api.agroconecta.site/api/cursos';


  constructor(private http: HttpClient) {}

  // ============================
  // 📘 CURSOS
  // ============================

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoPorId(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(id: string, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  // ============================
  // 📄 CONTENIDOS
  // ============================

  getContenidosPorCurso(id: string): Observable<Contenido[]> {
    return this.http.get<Contenido[]>(`${this.apiUrl}/${id}/contenidos`);
  }

  crearContenido(cursoId: string, contenido: Partial<Contenido>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cursoId}/contenidos`, contenido);
  }

  actualizarContenido(cursoId: string, contenidoId: number, contenido: Partial<Contenido>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoId}/contenidos/${contenidoId}`, contenido);
  }

  // ============================
  // 🧑‍💼 PROVEEDORES
  // ============================

  getTodosLosProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/proveedores`);
  }

  getProveedoresPorCurso(id: string): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/${id}/proveedores`);
  }

  crearProveedor(cursoId: string, proveedor: Partial<Proveedor>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cursoId}/proveedores`, proveedor);
  }

  actualizarProveedor(cursoId: string, proveedorId: number, proveedor: Partial<Proveedor>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}`, proveedor);
  }

  inhabilitarProveedor(cursoId: string, proveedorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}`);
  }

  cambiarEstadoProveedor(cursoId: string, proveedorId: number, activo: number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${cursoId}/proveedores/${proveedorId}/estado`, { activo });
}
asignarProveedorACurso(cursoId: string, proveedorId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${cursoId}/proveedores/asignar`, { proveedorId });
}

eliminarAsignacionPorId(asignacionId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/proveedores/asignacion/${asignacionId}`);
}

  // ============================
  // 🏷️ PALABRAS CLAVE (KEYWORDS)
  // ============================

  getKeywordsPorCurso(id: string): Observable<Keyword[]> {
    return this.http.get<Keyword[]>(`${this.apiUrl}/${id}/keywords`);
  }

  crearKeyword(cursoId: string, keyword: Partial<Keyword>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cursoId}/keywords`, keyword);
  }

  actualizarKeyword(cursoId: string, keywordId: number, keyword: Partial<Keyword>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoId}/keywords/${keywordId}`, keyword);
  }
}