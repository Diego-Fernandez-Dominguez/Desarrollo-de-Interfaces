export interface PersonaDTO {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  idDepartamento: number;
  nombreDepartamento: string;
  foto?: string;
}