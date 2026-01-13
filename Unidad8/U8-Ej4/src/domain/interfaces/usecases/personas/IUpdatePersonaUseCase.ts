import { clsPersona } from "../../../entities/clsPersona";

export interface IUpdatePersonaUseCase {
  execute(persona: clsPersona): Promise<void>;
}
