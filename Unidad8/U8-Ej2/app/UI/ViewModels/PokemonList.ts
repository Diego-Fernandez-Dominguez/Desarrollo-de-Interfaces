import { makeAutoObservable } from "mobx";
import { clsPokemon } from "../../Domain/Entities/clsPokemon";
import { IPokemonUseCase } from "../../Domain/Interfaces/UseCases/IPokemonUseCase";

export class PokemonListVM {
    pokemonList: clsPokemon[] = [];
    endpoint = 0; // offset
    limit = 20;
    loading = false;


    constructor(private useCase: IPokemonUseCase) {
    makeAutoObservable(this);
    }


    async loadNextPage() {
    this.loading = true;


    this.pokemonList = await this.useCase.getPokemonFromEndpointWithLimit(
    this.endpoint,
    this.limit
    );


    this.endpoint += this.limit;
    this.loading = false;
    }
}