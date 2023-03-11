import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import * as api from "../services";

const useSearchPokemon = (pokemonName: string) => {
	const searchPokemon = useCallback(() => {
		return api.searchPokemon(pokemonName);
	}, [pokemonName]);

	return useQuery(["searchPokemon", pokemonName], searchPokemon);
};

export default useSearchPokemon;
