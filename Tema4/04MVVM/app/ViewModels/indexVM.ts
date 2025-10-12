import { Persona } from "../Models/Entities/Persona";
import { getPersonas } from "../Models/Data/RepositoryPersona";

export class IndexVM {

  public obtenerPersonas(): { id: string; nombreCompleto: string }[] {
    return getPersonas().map(persona => ({
      id: persona.getId(),
      nombreCompleto: `${persona.getNombre()} ${persona.getApellido()}`
    }));
  }

  public obtenerDatosPersona(id: string): { id: string; nombre: string; apellido: string } | null {
    const persona = getPersonas().find(p => p.getId() === id);
    if (!persona) return null;
    return {
      id: persona.getId(),
      nombre: persona.getNombre(),
      apellido: persona.getApellido()
    };
  }
}