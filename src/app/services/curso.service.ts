import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';
import { Contenido } from '../models/contenido.model';
import { Proveedor } from '../models/proveedor.model';
import { Keyword } from '../models/keyword.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private apiUrl = 'http://192.168.1.234:3000/api/cursos';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }
  getCursoPorId(id: string): Observable<Curso> {
  return this.http.get<Curso>(`${this.apiUrl}/${id}`);
}
getContenidosPorCurso(id: string): Observable<Contenido[]> {
  return this.http.get<Contenido[]>(`${this.apiUrl}/${id}/contenidos`);
}

getProveedoresPorCurso(id: string): Observable<Proveedor[]> {
  return this.http.get<Proveedor[]>(`${this.apiUrl}/${id}/proveedores`);
}

createCurso(curso: Curso): Observable<Curso> {
  return this.http.post<Curso>(this.apiUrl, curso);
}

updateCurso(id: string, curso: Curso): Observable<Curso> {
  return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
}
actualizarContenido(cursoId: string, contenidoId: number, contenido: Partial<Contenido>): Observable<any> {
  return this.http.put(`${this.apiUrl}/${cursoId}/contenidos/${contenidoId}`, contenido);
}

crearContenido(cursoId: string, contenido: Partial<Contenido>): Observable<any> {
  return this.http.post(`${this.apiUrl}/${cursoId}/contenidos`, contenido);
}

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
