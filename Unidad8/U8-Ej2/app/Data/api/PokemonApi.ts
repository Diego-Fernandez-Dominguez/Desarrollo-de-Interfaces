export class PokemonApi {
    private baseUrl = "https://pokeapi.co/api/v2/pokemon";


    getUrl(endpoint: number, limit: number): string {
        return `${this.baseUrl}?limit=${limit}&offset=${endpoint}`;
    }


    getDefaultHeaders(): HeadersInit {
        return { "Content-Type": "application/json" };
        }
    }