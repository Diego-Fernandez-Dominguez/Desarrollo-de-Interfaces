export interface PersonaUIModel {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  direccion: string;
  telefono: string;
  idDepartamento: number;
  imagen: string;
  nombreDepartamento: string;
  color: string;
}

export const mapPersonaDTOToUI = (dto: any): PersonaUIModel => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  return {
    id: dto.id,
    nombre: dto.nombre,
    apellido: dto.apellido,
    fechaNacimiento: new Date(dto.fechaNac),   // 👈 nombre correcto
    direccion: dto.direccion,                 // 👈 nuevo
    telefono: dto.telefono,                   // 👈 nuevo
    idDepartamento: dto.idDepartamento,
    imagen: dto.imagen,                       // 👈 nombre correcto
    nombreDepartamento: dto.nombreDepartamento ?? '', // si no viene, vacío
    color: colors[dto.id % colors.length],
  };
};
