export const DITypes = {
  PersonaRepository: Symbol.for('PersonaRepository'),
  DepartamentoRepository: Symbol.for('DepartamentoRepository'),
  
  GetPersonasUseCase: Symbol.for('GetPersonasUseCase'),
  AddPersonaUseCase: Symbol.for('AddPersonaUseCase'),
  UpdatePersonaUseCase: Symbol.for('UpdatePersonaUseCase'),
  DeletePersonaUseCase: Symbol.for('DeletePersonaUseCase'),
  
  GetDepartamentosUseCase: Symbol.for('GetDepartamentosUseCase'),
  AddDepartamentoUseCase: Symbol.for('AddDepartamentoUseCase'),
  UpdateDepartamentoUseCase: Symbol.for('UpdateDepartamentoUseCase'),
  DeleteDepartamentoUseCase: Symbol.for('DeleteDepartamentoUseCase'),
  
  PersonasViewModel: Symbol.for('PersonasViewModel'),
  DepartamentosViewModel: Symbol.for('DepartamentosViewModel'),
};