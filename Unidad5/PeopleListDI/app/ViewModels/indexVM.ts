import { Persona } from "@/app/Models/Entities/Persona";
import { inject } from "inversify";
import { TYPES } from "../Core/types";
import { IRepositoryPersonas } from "../Models/Data/RepositoryPersona";

export class indexVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {
       
        this._personaSeleccionada = new Persona("0", '', '');


        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
     
    }

    public get personasList(): Persona[] {
        return this._personasList;
    }

    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
       
    }

  }
