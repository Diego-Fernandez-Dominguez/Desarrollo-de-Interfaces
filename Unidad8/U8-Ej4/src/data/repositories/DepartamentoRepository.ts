// data/repositories/DepartamentoRepository.ts
import { IDepartamentoRepository } from '../../domain/interfaces/repositories/IDepartamentoRepository';
import { clsDepartamento } from '../../domain/entities/clsDepartamento';
import { APIConnection } from '../datasources/api/APIConnection';

export class DepartamentoRepository implements IDepartamentoRepository {
  async getDepartamentos(): Promise<clsDepartamento[]> {
    const data = await APIConnection.get('/departamentos');

    return data.map((dto: any) => new clsDepartamento(
      dto.id,
      dto.nombre
    ));
  }

  async getDepartamentoById(id: number): Promise<clsDepartamento> {
    const dto = await APIConnection.get(`/departamentos/${id}`);

    return new clsDepartamento(dto.id, dto.nombre);
  }

  async addDepartamento(dep: clsDepartamento): Promise<void> {
    await APIConnection.post('/departamentos', {
      id: dep.id,
      nombre: dep.nombre
    });
  }

  async updateDepartamento(dep: clsDepartamento): Promise<void> {
    await APIConnection.put(`/departamentos/${dep.id}`, {
      id: dep.id,
      nombre: dep.nombre
    });
  }

  async deleteDepartamento(id: number): Promise<void> {
    await APIConnection.delete(`/departamentos/${id}`);
  }
}
