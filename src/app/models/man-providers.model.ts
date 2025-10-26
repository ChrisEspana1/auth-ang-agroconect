export interface Proveedor {
  curso_proveedor_id?: number; // ← opcional aquí
  id: number;
  nombre: string;
  contacto: string;
  servicio: string;
  tipo_contacto: 'email' | 'telefono' | 'whatsapp';
  creado_en?: string;
  actualizado_en?: string;
}
