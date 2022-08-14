import * as api from "../services";
import * as apiTypes from "../services/types";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
const apiKeys = {
	pokemons: "pokemons",
	all: "pokemonsall",
	searchPokemon: "searchPokemon",
};

export const usePokemons = (): UseQueryResult<apiTypes.PageForm> => {
	const query: UseQueryResult<apiTypes.PageForm> = useQuery<apiTypes.PageForm>(
		[apiKeys.pokemons],
		() => api.pokemonList()
	);

	return query;
};

export const usePokemonsWithDetails = (): UseQueryResult<apiTypes.PokemonDetails[]> => {
	const query: UseQueryResult<apiTypes.PokemonDetails[]> = useQuery<apiTypes.PokemonDetails[]>(
		[apiKeys.all],
		() => api.getPokemonListWithDetails({ all: true })
	);
	return query;
};

export const useSearchPokemon = (pokemon: string): UseQueryResult<apiTypes.PokemonDetails> => {
	const query: UseQueryResult<apiTypes.PokemonDetails> = useQuery<apiTypes.PokemonDetails>(
		[apiKeys.searchPokemon, pokemon],
		() => api.searchPokemon(pokemon)
	);
	return query;
};

export const useGetRandomPokemon = (): {
	randomPokemon: apiTypes.PokemonDetails | null;
	getNewRandomPokemon: Function;
} => {
	const query: UseQueryResult<apiTypes.PokemonDetails[]> = useQuery<apiTypes.PokemonDetails[]>(
		[apiKeys.all],
		() => api.getPokemonListWithDetails({ all: true })
	);

	const { data } = query;

	const [randomPokemon, setRandomPokemon] = React.useState<apiTypes.PokemonDetails | null>(null);

	useEffect(() => {
		const size = data?.length;
		if (size) {
			setRandomPokemon(data[Math.floor(Math.random() * size)]);
		}
	}, [data]);

	const getNewRandomPokemon = useCallback(() => {
		const size = data?.length;
		if (size) {
			const pokemon: apiTypes.PokemonDetails = data[Math.floor(Math.random() * size)];
			setRandomPokemon(pokemon);
			return pokemon;
		}
	}, [data]);

	return { randomPokemon, getNewRandomPokemon };
};
