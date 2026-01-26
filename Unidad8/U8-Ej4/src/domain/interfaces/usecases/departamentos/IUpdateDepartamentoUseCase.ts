import { clsDepartamento } from '../../../entities/clsDepartamento';
import { DepartamentoDTO } from '../../../dtos/DepartamentoDTO';

export interface IUpdateDepartamentoUseCase {
  execute(departamento: clsDepartamento): Promise<DepartamentoDTO>;
}