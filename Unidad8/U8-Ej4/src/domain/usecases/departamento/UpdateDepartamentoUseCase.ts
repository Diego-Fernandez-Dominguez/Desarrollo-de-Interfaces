import { IUpdateDepartamentoUseCase } from '../../interfaces/usecases/departamentos/IUpdateDepartamentoUseCase';
import { IDepartamentoRepository } from '../../interfaces/repositories/IDepartamentoRepository';
import { clsDepartamento } from '../../entities/clsDepartamento';
import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class UpdateDepartamentoUseCase implements IUpdateDepartamentoUseCase {
  constructor(@inject(DITypes.DepartamentoRepository)private departamentoRepository: IDepartamentoRepository) {}

  async execute(departamento: clsDepartamento): Promise<DepartamentoDTO> {
    return await this.departamentoRepository.update(departamento);
  }
}