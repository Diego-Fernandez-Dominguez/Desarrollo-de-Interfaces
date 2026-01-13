import { clsDepartamento } from "../../../entities/clsDepartamento";

export interface IGetDepartamentosUseCase {
  execute(): Promise<clsDepartamento[]>;
}
