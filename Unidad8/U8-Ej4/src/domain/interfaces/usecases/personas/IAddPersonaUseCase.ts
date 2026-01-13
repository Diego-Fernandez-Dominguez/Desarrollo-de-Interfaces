import { clsPersona } from "../../../entities/clsPersona";

export interface IAddPersonaUseCase {
  execute(persona: clsPersona): Promise<void>;
}
