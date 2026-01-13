import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";

export class DeletePersonaUseCase {
  constructor(private repo: IPersonaRepository) {}

  async execute(id: number): Promise<void> {
    const day = new Date().getDay();
    if (day === 0) throw new Error("No se puede eliminar en domingo");

    await this.repo.deletePersona(id);
  }
}
