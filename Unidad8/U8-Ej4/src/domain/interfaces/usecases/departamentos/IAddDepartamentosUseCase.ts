import { clsDepartamento } from '../../../entities/clsDepartamento';
import { DepartamentoDTO } from '../../../dtos/DepartamentoDTO';

export interface IAddDepartamentoUseCase {
  execute(departamento: clsDepartamento): Promise<DepartamentoDTO>;
}
