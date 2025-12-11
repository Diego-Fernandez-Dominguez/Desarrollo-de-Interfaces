import { IRepositoryPersonas } from "@/app/Domain/Interfaces/Repositories/IRepositoryPersonas";
import { clsPersona } from "@/app/Domain/Entities/clsPersona";
import { injectable } from "inversify";
import { Try } from "expo-router/build/views/Try";
import { BaseApi } from "../Api/BaseApi";
import { inject } from "inversify";
import { TYPES } from "@/app/Core/types";

type PersonaDTO = clsPersona;

@injectable()
export class RepositoryPersonasApi implements IRepositoryPersonas {

    private api: BaseApi;

    constructor(@inject(TYPES.BaseApi) api: BaseApi) {
        this.api = api
    }

    async getListadoCompletoPersonas(): Promise<clsPersona[]> {
        const url = this.api.getUrl('personas')

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: this.api.getDefaultHeaders(),
            });

            if(!response.ok){
                throw new Error('Fallo en la API: ${response.status}')
            }

            const data: PersonaDTO[] = await response.json();

            const personas: clsPersona[]=data;

            return personas

        } catch(error){

        }
         
        return [];

    }
}
