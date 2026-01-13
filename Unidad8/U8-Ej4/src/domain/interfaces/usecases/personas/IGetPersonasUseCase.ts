import { clsPersona } from "../../../entities/clsPersona";

export interface IGetPersonasUseCase {
  execute(): Promise<clsPersona[]>;
}
