export const DITypes = {
  // Repositories
  PersonaRepository: Symbol.for('PersonaRepository'),
  DepartamentoRepository: Symbol.for('DepartamentoRepository'),
  
  // Use Cases - Personas
  GetPersonasUseCase: Symbol.for('GetPersonasUseCase'),
  AddPersonaUseCase: Symbol.for('AddPersonaUseCase'),
  UpdatePersonaUseCase: Symbol.for('UpdatePersonaUseCase'),
  DeletePersonaUseCase: Symbol.for('DeletePersonaUseCase'),
  
  // Use Cases - Departamentos
  GetDepartamentosUseCase: Symbol.for('GetDepartamentosUseCase'),
  AddDepartamentoUseCase: Symbol.for('AddDepartamentoUseCase'),
  UpdateDepartamentoUseCase: Symbol.for('UpdateDepartamentoUseCase'),
  DeleteDepartamentoUseCase: Symbol.for('DeleteDepartamentoUseCase'),
  
  // ViewModels
  PersonasViewModel: Symbol.for('PersonasViewModel'),
  DepartamentosViewModel: Symbol.for('DepartamentosViewModel'),
};