import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorChatService {
  private proveedorSeleccionado = new BehaviorSubject<Proveedor | null>(null);
  proveedor$ = this.proveedorSeleccionado.asObservable();

  seleccionarProveedor(proveedor: Proveedor) {
    this.proveedorSeleccionado.next(proveedor);
  }
}
