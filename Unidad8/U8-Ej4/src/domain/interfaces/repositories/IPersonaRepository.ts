import { clsPersona } from '../../entities/clsPersona';

export interface IPersonaRepository {
  getPersonas(): Promise<clsPersona[]>;
  getPersonaById(id: number): Promise<clsPersona>;
  addPersona(persona: clsPersona): Promise<void>;
  updatePersona(persona: clsPersona): Promise<void>;
  deletePersona(id: number): Promise<void>;
}
