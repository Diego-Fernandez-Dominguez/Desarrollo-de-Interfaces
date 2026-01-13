// PersonaUIModel.ts
export interface PersonaUIModel {
  id: number;
  nombreCompleto: string;
  edad: number;
  nombreDepartamento: string;
  color?: string; // por ejemplo, según edad o departamento
}
