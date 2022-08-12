import { AxiosError } from "axios";
import axios from "./axios";
import { PageForm, PokemonDetails } from "./types";

export interface PokemonPageInterface {
	limit?: number;
	offset?: number;
	all?: boolean;
}

const defaultsValues = {
	limit: 20,
	offset: 0,
};

export const pokemonList = async (
	request: PokemonPageInterface = defaultsValues
): Promise<PageForm> => {
	try {
		if (request.all === true) {
			request.limit = Number.MAX_SAFE_INTEGER;
			request.offset = 0;
		}
		const response = await axios.get<PageForm>(
			`/pokemon?limit=${request.limit}&offset=${request.offset}`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const searchPokemon = async (pokemon: string): Promise<PokemonDetails> => {
	try {
		const response = await axios.get<PokemonDetails>(`/pokemon/${pokemon}`);
		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getPokemonListWithDetails = async ({
	limit = 20,
	offset = 0,
	all,
}: PokemonPageInterface): Promise<PokemonDetails[]> => {
	try {
		if (all === true) {
			limit = Number.MAX_SAFE_INTEGER;
			offset = 0;
		}
		const response = await axios.get<PageForm>(`/pokemon?limit=${limit}&offset=${offset}`);
		const results = response.data.results;

		const pokemons: PokemonDetails[] = [];

		for (let i = 0; i < results.length; i++) {
			pokemons.push(await searchPokemon(results[i].name));
		}

		return pokemons;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
