import { clsDepartamento } from "../../../entities/clsDepartamento";

export interface IUpdateDepartamentoUseCase {
  execute(dep: clsDepartamento): Promise<void>;
}
