import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { clsPersona } from "../../entities/clsPersona";

export class UpdatePersonaUseCase {
  constructor(private repo: IPersonaRepository) {}

  async execute(persona: clsPersona): Promise<void> {
    await this.repo.updatePersona(persona);
  }
}
