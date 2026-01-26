import { IGetDepartamentosUseCase } from '../../interfaces/usecases/departamentos/IGetDepartamentosUseCase';
import { IDepartamentoRepository } from '../../interfaces/repositories/IDepartamentoRepository';
import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class GetDepartamentosUseCase implements IGetDepartamentosUseCase {
  constructor(@inject(DITypes.PersonaRepository)private departamentoRepository: IDepartamentoRepository) {}

  async execute(): Promise<DepartamentoDTO[]> {
    return await this.departamentoRepository.getAll();
  }
}