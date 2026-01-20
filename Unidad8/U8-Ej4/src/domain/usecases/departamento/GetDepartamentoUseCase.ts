import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { clsDepartamento } from "../../entities/clsDepartamento";

export class GetPersonasUseCase {
  constructor(private repo: IDepartamentoRepository) {}

  async execute(): Promise<clsDepartamento[]> {
    const personas = await this.repo.getDepartamentos();
    const day = new Date().getDay();

    return personas;
  }
}
