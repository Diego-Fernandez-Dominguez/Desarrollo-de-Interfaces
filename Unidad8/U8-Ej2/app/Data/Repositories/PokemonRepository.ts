import { IPokemonRepository } from "../../Domain/Interfaces/Repositories/IPokemonRepository";
import { clsPokemon } from "../../Domain/Entities/clsPokemon";
import { PokemonApi } from "../api/PokemonApi";


export class PokemonRepository implements IPokemonRepository {
    private api = new PokemonApi();


    async getAllPokemon(): Promise<clsPokemon[]> {
        return this.getPokemonFromEndpointWithLimit(0, 20);
    }


    async getPokemonFromEndpointWithLimit(endpoint: number, limit: number): Promise<clsPokemon[]> {
        const response = await fetch(this.api.getUrl(endpoint, limit), {
        headers: this.api.getDefaultHeaders(),
        });


        const data = await response.json();


        return data.results.map(
        (p: any, index: number) => new clsPokemon(p.name, endpoint + index + 1)
        );
    }
}