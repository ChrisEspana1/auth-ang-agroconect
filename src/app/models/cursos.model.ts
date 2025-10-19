export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  nivel: string;
  url_video: string;
  estado: 'activo' | 'inactivo' | '';
}
