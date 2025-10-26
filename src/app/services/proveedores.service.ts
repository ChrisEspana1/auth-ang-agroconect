import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';

@Injectable({ providedIn: 'root' })
export class ProveedoresService {
    private apiUrl = 'https://api.agroconecta.site/api/proveedores';

    constructor(private http: HttpClient) { }

    getTodosLosProveedores(): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(this.apiUrl);
    }
    getProveedoresPorCurso(cursoId: string): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(`${this.apiUrl}/${cursoId}/proveedores`);
    }

    crearProveedor(datos: Partial<Proveedor>): Observable<any> {
        return this.http.post(this.apiUrl, datos);
    }

    actualizarProveedor(id: number, datos: Partial<Proveedor>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, datos);
    }

    eliminarProveedor(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}