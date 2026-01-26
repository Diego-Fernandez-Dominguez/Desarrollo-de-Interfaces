import { clsDepartamento } from '../../entities/clsDepartamento';
import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';

export interface IDepartamentoRepository {
  getAll(): Promise<DepartamentoDTO[]>;
  getById(id: number): Promise<DepartamentoDTO | null>;
  add(departamento: clsDepartamento): Promise<DepartamentoDTO>;
  update(departamento: clsDepartamento): Promise<DepartamentoDTO>;
  delete(id: number): Promise<boolean>;
}