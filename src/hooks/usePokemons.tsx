import * as api from "../services";
import * as apiTypes from "../services/types";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";

const apiKeys = {
	pokemons: "pokemons",
	all: "pokemonsall",
	pokemonsFull: "pokemonsFull",
	searchPokemon: "searchPokemon",
};

function randomPokemon(
	pokemons: apiTypes.PokemonDetails[],
	lastPokemons?: apiTypes.PokemonDetails
): apiTypes.PokemonDetails {
	const size = pokemons?.length;
	let loop = true;
	let pokemon: apiTypes.PokemonDetails = {} as apiTypes.PokemonDetails;
	while (loop) {
		pokemon = pokemons[Math.floor(Math.random() * size)];
	}

	return pokemon;
}

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
	randomPokemon: apiTypes.PageResult | null;
	getNewRandomPokemon: Function;
	isFetching: boolean;
	isLoading: boolean;
} => {
	const query: UseQueryResult<apiTypes.PageResult[]> = useQuery<apiTypes.PageResult[]>(
		[apiKeys.all],
		async () => {
			const data: apiTypes.PageForm = await api.pokemonList({ all: true });
			return data.results;
		}
	);

	const { data, isFetching, isLoading } = query;

	const [randomPokemon, setRandomPokemon] = React.useState<apiTypes.PageResult | null>(null);

	useEffect(() => {
		const size = data?.length;
		if (size) {
			setRandomPokemon(data[Math.floor(Math.random() * size)]);
		}
	}, [data]);

	const getNewRandomPokemon = useCallback(() => {
		const size = data?.length;
		if (size) {
			const pokemon: apiTypes.PageResult = data[Math.floor(Math.random() * size)];
			setRandomPokemon(pokemon);
			return pokemon;
		}
	}, [data]);

	return { randomPokemon, getNewRandomPokemon, isFetching, isLoading };
};

export const useGetRandomPokemonFull = (): {
	randomPokemon: apiTypes.PokemonDetails | null;
	getNewRandomPokemon: Function;
} => {
	const query: UseQueryResult<apiTypes.PokemonDetails[]> = useQuery<apiTypes.PokemonDetails[]>(
		[apiKeys.pokemonsFull],
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
