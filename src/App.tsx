import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

import { useGetRandomPokemon } from "./hooks/usePokemons";

function App() {
	const [answer, setAnswer] = useState("");
	const { randomPokemon, getNewRandomPokemon, isLoading } = useGetRandomPokemon();
	const [showPokemon, setShowPokemon] = useState<boolean>(false);

	const verifyAnswered = () => {
		console.log(randomPokemon);
		if (answer === randomPokemon?.name) {
			const name = randomPokemon.name.replace("-", " ");
			console.log(randomPokemon, name);
			if (name.toLocaleLowerCase() === answer.toLocaleLowerCase()) {
				setShowPokemon(true);
			}
		}
	};

	const resetForm = () => {
		setAnswer("");
		setShowPokemon(false);
	};

	return (
		<main className="container">
			<h2 className="header-title">Pokemon Game</h2>
			<section className="panel size-50 ">
				<form onSubmit={(e) => e.preventDefault()}>
					<p className="title-game">¿Quien es ese Pokemon ?</p>
					<div className="form-group">
						<input
							type="text"
							className="input"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
						/>
						<button className="button" onClick={verifyAnswered}>
							<i className="fa-solid fa-check"></i>
						</button>
					</div>
				</form>
			</section>
			<section className="row center-items">
				{/* <div className="panel default-size"></div> */}
				{randomPokemon != null ? (
					<PokemonCard
						pokemonName={randomPokemon?.name}
						next={() => {
							getNewRandomPokemon();
							resetForm();
						}}
						show={showPokemon}
					/>
				) : (
					<div className="panel">
						<button>Press start to begin</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
