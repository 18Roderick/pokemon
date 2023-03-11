import React, { memo } from "react";
import useSearchPokemon from "../hooks/useSearchPokemon";

interface PokemonCardInterface {
	pokemonName: string;
	show: boolean;
	next: () => void;
}

const PokemonCard = ({ pokemonName, next, show }: PokemonCardInterface) => {
	const { data, isFetching } = useSearchPokemon(pokemonName);
	console.log(data);
	return (
		<div className="panel  justify-center ">
			<div className="panel-header ">
				<div className="d-flex justify-space-between ">
					<button className="btn" onClick={() => {}}>
						<i className="fa-solid fa-exclamation"></i>
					</button>
					<button
						className="button"
						onClick={() => {
							if (next) next();
						}}
					>
						<i className="fa-solid fa-rotate"></i>
					</button>
				</div>
			</div>
			<div className="panel-body">
				<div className="image-container">
					<img
						className={`pokemon-image ${show ? "" : "blackout"}`}
						src={data?.sprites.other?.["official-artwork"].front_default}
						alt={data?.name}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(PokemonCard);
