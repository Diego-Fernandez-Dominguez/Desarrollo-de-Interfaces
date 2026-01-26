import { IDeleteDepartamentoUseCase } from '../../interfaces/usecases/departamentos/IDeleteDepartamentoUseCase';
import { IDepartamentoRepository } from '../../interfaces/repositories/IDepartamentoRepository';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class DeleteDepartamentoUseCase implements IDeleteDepartamentoUseCase {
  constructor(@inject(DITypes.PersonaRepository)private departamentoRepository: IDepartamentoRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.departamentoRepository.delete(id);
  }
}