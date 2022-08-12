import * as api from "../services";
import * as apiTypes from "../services/types";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
const apiKeys = {
	pokemons: "pokemons",
	all: "pokemonsall",
};

export const usePokemons = (): UseQueryResult<apiTypes.PageForm> => {
	const query: UseQueryResult<apiTypes.PageForm> = useQuery<apiTypes.PageForm>(
		[apiKeys.pokemons],
		() => api.pokemonList()
	);

	return query;
};
