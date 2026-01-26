import { IDepartamentoRepository } from '../../domain/interfaces/repositories/IDepartamentoRepository';
import { clsDepartamento } from '../../domain/entities/clsDepartamento';
import { DepartamentoDTO } from '../../domain/dtos/DepartamentoDTO';
import { APIConnection } from '../datasources/api/APIConnection';
import { injectable, inject } from 'inversify';

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  private api: APIConnection;

  constructor() {
    this.api = APIConnection.getInstance();
  }

  async getAll(): Promise<DepartamentoDTO[]> {
    return await this.api.get<DepartamentoDTO[]>('/departamentos');
  }

  async getById(id: number): Promise<DepartamentoDTO | null> {
    try {
      return await this.api.get<DepartamentoDTO>(`/departamentos/${id}`);
    } catch (error) {
      return null;
    }
  }

  async add(departamento: clsDepartamento): Promise<DepartamentoDTO> {
    const data = {
      nombre: departamento.nombre,
    };
    return await this.api.post<DepartamentoDTO>('/departamentos', data);
  }

  async update(departamento: clsDepartamento): Promise<DepartamentoDTO> {
    const data = {
      id: departamento.id,
      nombre: departamento.nombre,
    };
    return await this.api.put<DepartamentoDTO>(`/departamentos/${departamento.id}`, data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.api.delete(`/departamentos/${id}`);
  }
}