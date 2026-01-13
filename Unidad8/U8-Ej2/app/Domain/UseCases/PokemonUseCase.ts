import { IPokemonUseCase } from "../Interfaces/UseCases/IPokemonUseCase";
import { IPokemonRepository } from "../Interfaces/Repositories/IPokemonRepository";
import { clsPokemon } from "../Entities/clsPokemon";

export class PokemonUseCase implements IPokemonUseCase {
    constructor(private repository: IPokemonRepository) {}


    async getAllPokemon(): Promise<clsPokemon[]> {
        return await this.repository.getAllPokemon();
    }


    async getPokemonFromEndpointWithLimit(endpoint: number, limit: number): Promise<clsPokemon[]> {
        return await this.repository.getPokemonFromEndpointWithLimit(endpoint, limit);
    }
}