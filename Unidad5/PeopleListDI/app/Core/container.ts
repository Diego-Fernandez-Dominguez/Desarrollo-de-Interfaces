import { Container } from "inversify";
import "reflect-metadata";
import { IRepositoryPersonas, RepositoryPersona, RepositoryPersona100, RepositoryPersonaEmpty } from "../Models/Data/RepositoryPersona";
import { indexVM } from "../ViewModels/indexVM";
import { TYPES } from "./types";


const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(RepositoryPersonaEmpty);
container.bind<indexVM>(TYPES.IndexVM).to(indexVM);
export { container };
