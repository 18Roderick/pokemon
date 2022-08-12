import { useState } from "react";

import { usePokemons } from "./hooks/usePokemons";

function App() {
	const { data } = usePokemons();
	return <div className="container">{JSON.stringify(data?.results)}</div>;
}

export default App;
