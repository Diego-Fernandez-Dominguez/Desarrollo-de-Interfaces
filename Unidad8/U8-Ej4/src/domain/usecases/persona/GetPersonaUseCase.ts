import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { clsPersona } from "../../entities/clsPersona";

export class GetPersonasUseCase {
  constructor(private repo: IPersonaRepository) {}

  async execute(): Promise<clsPersona[]> {
    const personas = await this.repo.getPersonas();
    const day = new Date().getDay();

    if (day === 5 || day === 6) {
      return personas.filter(p => this.getEdad(p.fechaNacimiento) > 18);
    }

    return personas;
  }

  private getEdad(fecha: Date): number {
    return new Date().getFullYear() - fecha.getFullYear();
  }
}
