import { clsPersona } from "../../Entities/clsPersona";

export interface IRepositoryPersonas {
     getListadoCompletoPersonas(): Promise<clsPersona[]>;
}
