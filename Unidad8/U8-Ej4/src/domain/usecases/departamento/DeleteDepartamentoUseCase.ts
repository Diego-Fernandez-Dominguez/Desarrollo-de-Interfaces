import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";

export class DeleteDepartamentoUseCase {
  constructor(private repo: IDepartamentoRepository) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteDepartamento(id);
  }
}
