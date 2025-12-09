import { clsPersona } from "@/app/Domain/Entities/clsPersona";

export interface IPersonaUseCase {
    getListadoPersonas(): clsPersona[];
}
