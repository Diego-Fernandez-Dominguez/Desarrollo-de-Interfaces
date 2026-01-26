import { clsPersona } from '../../../entities/clsPersona';
import { PersonaDTO } from '../../../dtos/PersonaDTO';

export interface IAddPersonaUseCase {
  execute(persona: clsPersona): Promise<PersonaDTO>;
}