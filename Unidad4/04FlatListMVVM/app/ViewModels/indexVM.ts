import { Persona } from "../Models/Entities/Persona";
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";

export class IndexVM {

   private personas: Persona[] = [];
    private personaSeleccionada : Persona | null = null;

    constructor() {
        this.personaSeleccionada
    }

    public get Personas(): Persona[] {
        const repo = new RepositoryPersona();
        this.personas = repo.Personas;
        return this.personas;
    }

    public get PersonaSeleccionada(): Persona | null {
        return this.personaSeleccionada;
    }
    public set PersonaSeleccionada(value: Persona | null){
        this.personaSeleccionada = value;
        this.personaPress();
    }

    private personaPress(): void {

        if(this.personaSeleccionada != null) {
        alert(`has clicado en :  ${this.personaSeleccionada?.Nombre} ${this.personaSeleccionada?.Apellido}`);
    }
}

}