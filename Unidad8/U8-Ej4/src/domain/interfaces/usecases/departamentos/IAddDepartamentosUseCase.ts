import { clsDepartamento } from "../../../entities/clsDepartamento";

export interface IAddDepartamentoUseCase {
  execute(dep: clsDepartamento): Promise<void>;
}
