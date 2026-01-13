// IDepartamentoRepository.ts
import { clsDepartamento } from '../../entities/clsDepartamento';
;

export interface IDepartamentoRepository {
  getDepartamentos(): Promise<clsDepartamento[]>;
  addDepartamento(departamento: clsDepartamento): Promise<void>;
  updateDepartamento(departamento: clsDepartamento): Promise<void>;
  deleteDepartamento(id: number): Promise<void>;
}
