import { IDeletePersonaUseCase } from '../../interfaces/usecases/personas/IDeletePersonaUseCase';
import { IPersonaRepository } from '../../interfaces/repositories/IPersonaRepository';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class DeletePersonaUseCase implements IDeletePersonaUseCase {
  constructor(@inject(DITypes.PersonaRepository)private personaRepository: IPersonaRepository) {}

  async execute(id: number): Promise<boolean> {
    // Regla de negocio: Los domingos no se puede eliminar
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek === 0) {
      throw new Error('No se permite eliminar personas los domingos');
    }
    
    return await this.personaRepository.delete(id);
  }
}