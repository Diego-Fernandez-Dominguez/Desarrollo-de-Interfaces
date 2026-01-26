import { IGetPersonasUseCase } from '../../interfaces/usecases/personas/IGetPersonasUseCase';
import { IPersonaRepository } from '../../interfaces/repositories/IPersonaRepository';
import { PersonaDTO } from '../../dtos/PersonaDTO';
import { injectable, inject } from 'inversify';
import { DITypes } from '@/src/di/types';

@injectable()
export class GetPersonasUseCase implements IGetPersonasUseCase {
constructor( @inject(DITypes.PersonaRepository) private personaRepository: IPersonaRepository ) {}
  async execute(): Promise<PersonaDTO[]> {
    const personas = await this.personaRepository.getAll();
    
    // Regla de negocio: Viernes y sábados solo mostrar mayores de 18
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Domingo, 5=Viernes, 6=Sábado
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return personas.filter(persona => {
        const edad = this.calcularEdad(persona.fechaNacimiento);
        return edad > 18;
      });
    }
    
    return personas;
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }
}