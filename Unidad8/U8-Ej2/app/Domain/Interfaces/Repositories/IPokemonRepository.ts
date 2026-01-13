import { clsPokemon } from "../../Entities/clsPokemon";


export interface IPokemonRepository {
    getAllPokemon(): Promise<clsPokemon[]>;
    getPokemonFromEndpointWithLimit(endpoint: number, limit: number): Promise<clsPokemon[]>;
}