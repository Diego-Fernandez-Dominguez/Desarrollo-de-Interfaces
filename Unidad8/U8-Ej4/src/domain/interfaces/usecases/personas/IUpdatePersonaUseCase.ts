import { clsPersona } from '../../../entities/clsPersona';
import { PersonaDTO } from '../../../dtos/PersonaDTO';

export interface IUpdatePersonaUseCase {
  execute(persona: clsPersona): Promise<PersonaDTO>;
}