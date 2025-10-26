export interface Proveedor {
    curso_proveedor_id: number;
    id: number;
    nombre: string;
    contacto: string;
    servicio: string;
    tipo_contacto: 'email' | 'telefono' | 'whatsapp'; // Enum simulado
    creado_en: string;
    actualizado_en: string;
}

export interface CursoProveedor {
    cursoId: string;
    proveedorId: number;
    activo: boolean;
    notas: string;
}
