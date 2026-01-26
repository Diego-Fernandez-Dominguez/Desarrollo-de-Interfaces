import { IUpdatePersonaUseCase } from '../../interfaces/usecases/personas/IUpdatePersonaUseCase';
import { IPersonaRepository } from '../../interfaces/repositories/IPersonaRepository';
import { clsPersona } from '../../entities/clsPersona';
import { PersonaDTO } from '../../dtos/PersonaDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class UpdatePersonaUseCase implements IUpdatePersonaUseCase {
  constructor(@inject(DITypes.PersonaRepository) private personaRepository: IPersonaRepository) {}

  async execute(persona: clsPersona): Promise<PersonaDTO> {
    return await this.personaRepository.update(persona);
  }
}