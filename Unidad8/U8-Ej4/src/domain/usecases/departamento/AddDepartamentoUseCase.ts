import { IAddDepartamentoUseCase } from '../../interfaces/usecases/departamentos/IAddDepartamentosUseCase';
import { IDepartamentoRepository } from '../../interfaces/repositories/IDepartamentoRepository';
import { clsDepartamento } from '../../entities/clsDepartamento';
import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';


@injectable()
export class AddDepartamentoUseCase implements IAddDepartamentoUseCase {
  constructor(@inject(DITypes.PersonaRepository)private departamentoRepository: IDepartamentoRepository) {}

  async execute(departamento: clsDepartamento): Promise<DepartamentoDTO> {
    return await this.departamentoRepository.add(departamento);
  }
}