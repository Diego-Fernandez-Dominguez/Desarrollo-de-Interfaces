// ============================================
// RUTAS CORRECTAS PARA VIEWMODELS
// ============================================

// ✅ CORRECTO - presentation/viewmodels/personas/PersonasViewModel.ts
// Nota: "personas" (plural)
import { makeAutoObservable, runInAction } from 'mobx';
import { PersonaUIModel, mapPersonaDTOToUI } from '../../models/PersonaUIModel';
import { clsPersona } from '../../../domain/entities/clsPersona';
import { IGetPersonasUseCase } from '../../../domain/interfaces/usecases/personas/IGetPersonasUseCase';
import { IAddPersonaUseCase } from '../../../domain/interfaces/usecases/personas/IAddPersonaUseCase';
import { IUpdatePersonaUseCase } from '../../../domain/interfaces/usecases/personas/IUpdatePersonaUseCase';
import { IDeletePersonaUseCase } from '../../../domain/interfaces/usecases/personas/IDeletePersonaUseCase';

export class PersonasViewModel {
  private static instance: PersonasViewModel;
  
  personas: PersonaUIModel[] = [];
  personaSeleccionada: PersonaUIModel | null = null;
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';

  private constructor(
    private getPersonasUseCase: IGetPersonasUseCase,
    private addPersonaUseCase: IAddPersonaUseCase,
    private updatePersonaUseCase: IUpdatePersonaUseCase,
    private deletePersonaUseCase: IDeletePersonaUseCase
  ) {
    makeAutoObservable(this);
  }

  public static getInstance(
    getPersonasUseCase: IGetPersonasUseCase,
    addPersonaUseCase: IAddPersonaUseCase,
    updatePersonaUseCase: IUpdatePersonaUseCase,
    deletePersonaUseCase: IDeletePersonaUseCase
  ): PersonasViewModel {
    if (!PersonasViewModel.instance) {
      PersonasViewModel.instance = new PersonasViewModel(
        getPersonasUseCase,
        addPersonaUseCase,
        updatePersonaUseCase,
        deletePersonaUseCase
      );
    }
    return PersonasViewModel.instance;
  }

  get personasFiltradas(): PersonaUIModel[] {
    if (!this.searchQuery) return this.personas;
    
    const query = this.searchQuery.toLowerCase();
    return this.personas.filter(p => 
      p.nombre.toLowerCase().includes(query) ||
      p.apellido.toLowerCase().includes(query) ||
      p.nombreDepartamento.toLowerCase().includes(query)
    );
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  async loadPersonas() {
    this.loading = true;
    this.error = null;
    try {
      const personasDTO = await this.getPersonasUseCase.execute();
      runInAction(() => {
        this.personas = personasDTO.map(mapPersonaDTOToUI);
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Error al cargar las personas';
        this.loading = false;
      });
    }
  }

  async addPersona(persona: clsPersona) {
    try {
      const personaDTO = await this.addPersonaUseCase.execute(persona);
      runInAction(() => {
        this.personas.push(mapPersonaDTOToUI(personaDTO));
      });
      return true;
    } catch (err) {
      this.error = 'Error al añadir persona';
      return false;
    }
  }

  async updatePersona(persona: clsPersona) {
    try {
      const personaDTO = await this.updatePersonaUseCase.execute(persona);
      runInAction(() => {
        const index = this.personas.findIndex(p => p.id === persona.id);
        if (index !== -1) {
          this.personas[index] = mapPersonaDTOToUI(personaDTO);
        }
      });
      return true;
    } catch (err) {
      this.error = 'Error al actualizar persona';
      return false;
    }
  }

  async deletePersona(id: number) {
    try {
      await this.deletePersonaUseCase.execute(id);
      runInAction(() => {
        this.personas = this.personas.filter(p => p.id !== id);
      });
      return true;
    } catch (err: any) {
      this.error = err.message || 'Error al eliminar persona';
      return false;
    }
  }

  selectPersona(persona: PersonaUIModel | null) {
    this.personaSeleccionada = persona;
  }

  clearError() {
    this.error = null;
  }
}