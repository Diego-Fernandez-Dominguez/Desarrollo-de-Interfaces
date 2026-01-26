import { IAddPersonaUseCase } from '../../interfaces/usecases/personas/IAddPersonaUseCase';
import { IPersonaRepository } from '../../interfaces/repositories/IPersonaRepository';
import { clsPersona } from '../../entities/clsPersona';
import { PersonaDTO } from '../../dtos/PersonaDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class AddPersonaUseCase implements IAddPersonaUseCase {
  constructor(@inject(DITypes.PersonaRepository) private personaRepository: IPersonaRepository) {}

  async execute(persona: clsPersona): Promise<PersonaDTO> {
    return await this.personaRepository.add(persona);
  }
}