export interface DepartamentoUIModel {
  id: number;
  nombre: string;
  color: string;
}

export const mapDepartamentoDTOToUI = (dto: any): DepartamentoUIModel => {
  const colors = ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055', '#74B9FF', '#A29BFE'];
  return {
    id: dto.id,
    nombre: dto.nombre,
    color: colors[dto.id % colors.length],
  };
};