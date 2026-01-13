// PersonaDTO.ts
export interface PersonaDTO {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // ISO string
  departamentoId: number;
  nombreDepartamento: string;
}
