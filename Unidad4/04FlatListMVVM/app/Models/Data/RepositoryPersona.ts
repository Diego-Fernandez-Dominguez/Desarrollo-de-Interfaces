import { Persona } from "../Entities/Persona";

export class RepositoryPersona {

private personas: Persona[] = [
    new Persona('1', 'Dario', 'Fernandez'),
    new Persona('2', 'Emilio', 'Salinas'),
    new Persona('3', 'Renata', 'Mendoza'),
    new Persona('4', 'Tomás', 'Rivas'),
    new Persona('5', 'Camila', 'Ortega'),
    new Persona('6', 'Mateo', 'Silva'),
    new Persona('7', 'Lucía', 'Paredes'),
    new Persona('8', 'Santiago', 'Cordero'),
    new Persona('9', 'Paula', 'Vera'),
    new Persona('10', 'Gabriel', 'Fuentes'),
    new Persona('11', 'Daniela', 'Peña'),
    new Persona('12', 'Martín', 'Bravo'),
    new Persona('13', 'Julia', 'Campos'),
    new Persona('14', 'Nicolás', 'Aguirre'),
    new Persona('15', 'Sara', 'Molina'),
    new Persona('16', 'Adrián', 'Reyes'),
    new Persona('17', 'Marina', 'Soto'),
    new Persona('18', 'Laura', 'Luzhen(Si, ese es el apellido)'),
    new Persona('19', 'Clara', 'León'),
    new Persona('20', 'Hugo', 'Vargas'),
]; 
 public get Personas(): Persona[] {
        return this.personas;
    }
    public addPersona(persona: Persona): void {
        this.personas.push(persona);
    }
    public removePersona(id: string): void {
        this.personas = this.personas.filter(p => p.Id !== id);
    }
}