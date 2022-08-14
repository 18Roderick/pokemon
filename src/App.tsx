import { useState } from "react";

import { usePokemons, useGetRandomPokemon } from "./hooks/usePokemons";

function App() {
	const { data } = usePokemons();
	const { randomPokemon, getNewRandomPokemon } = useGetRandomPokemon();
	console.log(randomPokemon);
	return (
		<main className="container">
			<h2 className="header-title">Pokemon Game</h2>
			<section className="panel size-50 ">
				<form onSubmit={(e) => e.preventDefault()}>
					<p className="title-game">¿Quien es ese Pokemon ?</p>
					<div className="form-group">
						<input type="text" name="" id="" className="input" />
						<button
							className="button"
							onClick={() => {
								console.log("clickin");
								getNewRandomPokemon();
							}}
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>
				</form>
			</section>
			<section className="row">
				<div className="panel default-size"></div>
				<div className="panel default-size ">
					{randomPokemon ? (
						<img
							className="pokemon-image blackout"
							src={randomPokemon.sprites.other?.["official-artwork"].front_default}
							alt={randomPokemon.name}
						/>
					) : null}
				</div>
			</section>
		</main>
	);
}

export default App;
