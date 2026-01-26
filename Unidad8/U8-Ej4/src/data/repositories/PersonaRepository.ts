import { IPersonaRepository } from '../../domain/interfaces/repositories/IPersonaRepository';
import { clsPersona } from '../../domain/entities/clsPersona';
import { PersonaDTO } from '../../domain/dtos/PersonaDTO';
import { APIConnection } from '../datasources/api/APIConnection';
import { injectable, inject } from 'inversify';

@injectable()
export class PersonaRepository implements IPersonaRepository {
  private api: APIConnection;

  constructor() {
    this.api = APIConnection.getInstance();
  }

  async getAll(): Promise<PersonaDTO[]> {
    return await this.api.get<PersonaDTO[]>('/personas');
  }

  async getById(id: number): Promise<PersonaDTO | null> {
    try {
      return await this.api.get<PersonaDTO>(`/personas/${id}`);
    } catch (error) {
      return null;
    }
  }

  async add(persona: clsPersona): Promise<PersonaDTO> {
    const data = {
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento.toISOString(),
      idDepartamento: persona.idDepartamento,
      foto: persona.foto,
    };
    return await this.api.post<PersonaDTO>('/personas', data);
  }

  async update(persona: clsPersona): Promise<PersonaDTO> {
    const data = {
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento.toISOString(),
      idDepartamento: persona.idDepartamento,
      foto: persona.foto,
    };
    return await this.api.put<PersonaDTO>(`/personas/${persona.id}`, data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.api.delete(`/personas/${id}`);
  }
}