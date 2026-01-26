import { clsPersona } from '../../entities/clsPersona';
import { PersonaDTO } from '../../dtos/PersonaDTO';

export interface IPersonaRepository {
  getAll(): Promise<PersonaDTO[]>;
  getById(id: number): Promise<PersonaDTO | null>;
  add(persona: clsPersona): Promise<PersonaDTO>;
  update(persona: clsPersona): Promise<PersonaDTO>;
  delete(id: number): Promise<boolean>;
}