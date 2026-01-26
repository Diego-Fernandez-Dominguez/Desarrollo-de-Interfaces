import { makeAutoObservable, runInAction } from 'mobx';
import { DepartamentoUIModel, mapDepartamentoDTOToUI } from '../../models/DepartamentoUIModel';
import { clsDepartamento } from '../../../domain/entities/clsDepartamento';
import { IGetDepartamentosUseCase } from '../../../domain/interfaces/usecases/departamentos/IGetDepartamentosUseCase';
import { IAddDepartamentoUseCase } from '../../../domain/interfaces/usecases/departamentos/IAddDepartamentosUseCase';
import { IUpdateDepartamentoUseCase } from '../../../domain/interfaces/usecases/departamentos/IUpdateDepartamentoUseCase';
import { IDeleteDepartamentoUseCase } from '../../../domain/interfaces/usecases/departamentos/IDeleteDepartamentoUseCase';

export class DepartamentosViewModel {
  private static instance: DepartamentosViewModel;
  
  departamentos: DepartamentoUIModel[] = [];
  departamentoSeleccionado: DepartamentoUIModel | null = null;
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';

  private constructor(
    private getDepartamentosUseCase: IGetDepartamentosUseCase,
    private addDepartamentoUseCase: IAddDepartamentoUseCase,
    private updateDepartamentoUseCase: IUpdateDepartamentoUseCase,
    private deleteDepartamentoUseCase: IDeleteDepartamentoUseCase
  ) {
    makeAutoObservable(this);
  }

  public static getInstance(
    getDepartamentosUseCase: IGetDepartamentosUseCase,
    addDepartamentoUseCase: IAddDepartamentoUseCase,
    updateDepartamentoUseCase: IUpdateDepartamentoUseCase,
    deleteDepartamentoUseCase: IDeleteDepartamentoUseCase
  ): DepartamentosViewModel {
    if (!DepartamentosViewModel.instance) {
      DepartamentosViewModel.instance = new DepartamentosViewModel(
        getDepartamentosUseCase,
        addDepartamentoUseCase,
        updateDepartamentoUseCase,
        deleteDepartamentoUseCase
      );
    }
    return DepartamentosViewModel.instance;
  }

  get departamentosFiltrados(): DepartamentoUIModel[] {
    if (!this.searchQuery) return this.departamentos;
    
    const query = this.searchQuery.toLowerCase();
    return this.departamentos.filter(d => 
      d.nombre.toLowerCase().includes(query)
    );
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  async loadDepartamentos() {
    this.loading = true;
    this.error = null;
    try {
      const departamentosDTO = await this.getDepartamentosUseCase.execute();

      runInAction(() => {
        this.departamentos = departamentosDTO.map(mapDepartamentoDTOToUI);
        this.loading = false;
        
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Error al cargar los departamentos';
        this.loading = false;
      });
    }
  }

  async addDepartamento(departamento: clsDepartamento) {
    try {
      const departamentoDTO = await this.addDepartamentoUseCase.execute(departamento);
      runInAction(() => {
        this.departamentos.push(mapDepartamentoDTOToUI(departamentoDTO));
      });
      return true;
    } catch (err) {
      this.error = 'Error al añadir departamento';
      return false;
    }
  }

  async updateDepartamento(departamento: clsDepartamento) {
    try {
      const departamentoDTO = await this.updateDepartamentoUseCase.execute(departamento);
      runInAction(() => {
        const index = this.departamentos.findIndex(d => d.id === departamento.id);
        if (index !== -1) {
          this.departamentos[index] = mapDepartamentoDTOToUI(departamentoDTO);
        }
      });
      return true;
    } catch (err) {
      this.error = 'Error al actualizar departamento';
      return false;
    }
  }

  async deleteDepartamento(id: number) {
    try {
      await this.deleteDepartamentoUseCase.execute(id);
      runInAction(() => {
        this.departamentos = this.departamentos.filter(d => d.id !== id);
      });
      return true;
    } catch (err) {
      this.error = 'Error al eliminar departamento';
      return false;
    }
  }

  selectDepartamento(departamento: DepartamentoUIModel | null) {
    this.departamentoSeleccionado = departamento;
  }

  clearError() {
    this.error = null;
  }
}