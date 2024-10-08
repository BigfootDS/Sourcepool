import React from "react";
import { useWorldName } from "../contexts/CurrentWorldContext.jsx";

export default function GamePlayArea () {

	let worldName = useWorldName();

	return <h1>Game not yet implemented. Would've loaded {worldName}</h1>
}