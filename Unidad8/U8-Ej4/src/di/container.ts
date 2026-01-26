import { Container } from 'inversify';
import 'reflect-metadata';
import { DITypes } from '../di/types';

// Repositories
import { IPersonaRepository } from '../domain/interfaces/repositories/IPersonaRepository';
import { IDepartamentoRepository } from '../domain/interfaces/repositories/IDepartamentoRepository';
import { PersonaRepository } from '../data/repositories/PersonaRepository';
import { DepartamentoRepository } from '../data/repositories/DepartamentoRepository';

// Use Cases - Personas
import { IGetPersonasUseCase } from '../domain/interfaces/usecases/personas/IGetPersonasUseCase';
import { IAddPersonaUseCase } from '../domain/interfaces/usecases/personas/IAddPersonaUseCase';
import { IUpdatePersonaUseCase } from '../domain/interfaces/usecases/personas/IUpdatePersonaUseCase';
import { IDeletePersonaUseCase } from '../domain/interfaces/usecases/personas/IDeletePersonaUseCase';
import { GetPersonasUseCase } from '../domain/usecases/persona/GetPersonaUseCase';
import { AddPersonaUseCase } from '../domain/usecases/persona/AddPersonaUseCase';
import { UpdatePersonaUseCase } from '../domain/usecases/persona/UpdatePersonaUseCase';
import { DeletePersonaUseCase } from '../domain/usecases/persona/DeletePersonaUseCase';

// Use Cases - Departamentos
import { IGetDepartamentosUseCase } from '../domain/interfaces/usecases/departamentos/IGetDepartamentosUseCase';
import { IAddDepartamentoUseCase } from '../domain/interfaces/usecases/departamentos/IAddDepartamentosUseCase';
import { IUpdateDepartamentoUseCase } from '../domain/interfaces/usecases/departamentos/IUpdateDepartamentoUseCase';
import { IDeleteDepartamentoUseCase } from '../domain/interfaces/usecases/departamentos/IDeleteDepartamentoUseCase';
import { GetDepartamentosUseCase } from '../domain/usecases/departamento/GetDepartamentoUseCase';
import { AddDepartamentoUseCase } from '../domain/usecases/departamento/AddDepartamentoUseCase';
import { UpdateDepartamentoUseCase } from '../domain/usecases/departamento/UpdateDepartamentoUseCase';
import { DeleteDepartamentoUseCase } from '../domain/usecases/departamento/DeleteDepartamentoUseCase';

// ViewModels
import { PersonasViewModel } from '../presentation/viewmodels/persona/PersonasViewModel';
import { DepartamentosViewModel } from '../presentation/viewmodels/departamento/DepartamentosViewModel';

const container = new Container();

// --------------------
// Repositories
// --------------------
container
  .bind<IPersonaRepository>(DITypes.PersonaRepository)
  .to(PersonaRepository)
  .inSingletonScope();

container
  .bind<IDepartamentoRepository>(DITypes.DepartamentoRepository)
  .to(DepartamentoRepository)
  .inSingletonScope();

// --------------------
// Use Cases - Personas
// --------------------
container
  .bind<IGetPersonasUseCase>(DITypes.GetPersonasUseCase)
  .to(GetPersonasUseCase)
  .inSingletonScope();

container
  .bind<IAddPersonaUseCase>(DITypes.AddPersonaUseCase)
  .to(AddPersonaUseCase)
  .inSingletonScope();

container
  .bind<IUpdatePersonaUseCase>(DITypes.UpdatePersonaUseCase)
  .to(UpdatePersonaUseCase)
  .inSingletonScope();

container
  .bind<IDeletePersonaUseCase>(DITypes.DeletePersonaUseCase)
  .to(DeletePersonaUseCase)
  .inSingletonScope();

// --------------------
// Use Cases - Departamentos
// --------------------
container
  .bind<IGetDepartamentosUseCase>(DITypes.GetDepartamentosUseCase)
  .to(GetDepartamentosUseCase)
  .inSingletonScope();

container
  .bind<IAddDepartamentoUseCase>(DITypes.AddDepartamentoUseCase)
  .to(AddDepartamentoUseCase)
  .inSingletonScope();

container
  .bind<IUpdateDepartamentoUseCase>(DITypes.UpdateDepartamentoUseCase)
  .to(UpdateDepartamentoUseCase)
  .inSingletonScope();

container
  .bind<IDeleteDepartamentoUseCase>(DITypes.DeleteDepartamentoUseCase)
  .to(DeleteDepartamentoUseCase)
  .inSingletonScope();

// --------------------
// ViewModels
// --------------------
container
  .bind<PersonasViewModel>(DITypes.PersonasViewModel)
  .toDynamicValue(() =>
    PersonasViewModel.getInstance(
      container.get(DITypes.GetPersonasUseCase),
      container.get(DITypes.AddPersonaUseCase),
      container.get(DITypes.UpdatePersonaUseCase),
      container.get(DITypes.DeletePersonaUseCase)
    )
  )
  .inSingletonScope();

container
  .bind<DepartamentosViewModel>(DITypes.DepartamentosViewModel)
  .toDynamicValue(() =>
    DepartamentosViewModel.getInstance(
      container.get(DITypes.GetDepartamentosUseCase),
      container.get(DITypes.AddDepartamentoUseCase),
      container.get(DITypes.UpdateDepartamentoUseCase),
      container.get(DITypes.DeleteDepartamentoUseCase)
    )
  )
  .inSingletonScope();

export { container };
