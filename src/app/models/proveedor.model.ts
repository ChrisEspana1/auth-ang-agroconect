export interface Proveedor {
  id: number;
  curso_id: string;
  nombre: string;
  contacto: string;
  servicio: string;
  tipo_contacto: 'whatsapp' | 'email';
}