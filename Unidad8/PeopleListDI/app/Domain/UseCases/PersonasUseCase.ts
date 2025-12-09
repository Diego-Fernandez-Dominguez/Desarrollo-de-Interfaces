import { injectable, inject } from "inversify";
import { TYPES } from "@/app/Core/types";
import { IRepositoryPersonas } from "@/app/Domain/Interfaces/Repositories/IRepositoryPersonas";
import { clsPersona } from "@/app/Domain/Entities/clsPersona";
import { IPersonaUseCase } from "../Interfaces/UseCases/IPersonaUseCase";

@injectable()
export class PersonasUseCase implements IPersonaUseCase {
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private repositoryPersonas: IRepositoryPersonas
    ) {}

    getListadoPersonas(): clsPersona[] {
        return this.repositoryPersonas.getListadoCompletoPersonas();
    }
}
