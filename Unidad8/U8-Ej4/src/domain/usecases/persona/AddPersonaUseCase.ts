import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { clsPersona } from "../../entities/clsPersona";

export class AddPersonaUseCase {
  constructor(private repo: IPersonaRepository) {}

  async execute(persona: clsPersona): Promise<void> {
    await this.repo.addPersona(persona);
  }
}
