// data/repositories/PersonaRepository.ts
import { IPersonaRepository } from '../../domain/interfaces/repositories/IPersonaRepository';
import { clsPersona } from '../../domain/entities/clsPersona';
import { APIConnection } from '../datasources/api/APIConnection';

export class PersonaRepository implements IPersonaRepository {
  async getPersonas(): Promise<clsPersona[]> {
    const data = await APIConnection.get('/personas');

    return data.map((dto: any) => new clsPersona(
      dto.id,
      dto.nombre,
      dto.apellido,
      new Date(dto.fechaNacimiento)
    ));
  }

  async getPersonaById(id: number): Promise<clsPersona> {
    const dto = await APIConnection.get(`/personas/${id}`);

    return new clsPersona(
      dto.id,
      dto.nombre,
      dto.apellido,
      new Date(dto.fechaNacimiento)
    );
  }

  async addPersona(persona: clsPersona): Promise<void> {
    await APIConnection.post('/personas', {
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento.toISOString()
    });
  }

  async updatePersona(persona: clsPersona): Promise<void> {
    await APIConnection.put(`/personas/${persona.id}`, {
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento.toISOString()
    });
  }

  async deletePersona(id: number): Promise<void> {
    await APIConnection.delete(`/personas/${id}`);
  }
}
