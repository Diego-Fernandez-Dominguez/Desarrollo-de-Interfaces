
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository"; import { clsDepartamento } from "../../entities/clsDepartamento";
export class AddDepartamentoUseCase { constructor(private repo: IDepartamentoRepository) {} async execute(dep: clsDepartamento) { await this.repo.addDepartamento(dep); } }