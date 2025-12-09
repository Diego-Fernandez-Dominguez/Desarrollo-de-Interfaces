import { Container } from "inversify";
import "reflect-metadata";
import { IRepositoryPersonas} from "@/app/Domain/Interfaces/Repositories/IRepositoryPersonas";
import { RepositoryPersonas} from "@/app/Data/Repositories/RepositoryPersonas";
import { PeopleListVM } from "@/app/UI/ViewModels/PeopleListVM";
import { TYPES } from "./types";
import { IPersonaUseCase } from "../Domain/Interfaces/UseCases/IPersonaUseCase";
import { PersonasUseCase } from "../Domain/UseCases/PersonasUseCase";


const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(RepositoryPersonas);
container.bind<IPersonaUseCase>(TYPES.IPersonaUseCase).to(PersonasUseCase);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };