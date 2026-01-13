import { clsPokemon } from "../../Entities/clsPokemon";


export interface IPokemonUseCase {
    getAllPokemon(): Promise<clsPokemon[]>;
    getPokemonFromEndpointWithLimit(endpoint: number, limit: number): Promise<clsPokemon[]>;
}