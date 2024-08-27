import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomLink from "../components/CustomLink.js";
import { useWorldDispatch, useWorldName } from "../contexts/CurrentWorldContext.js";
import "../styles/GameWrapper.css";

export default function GameWrapper(){

	// Create and/or load world from details found in context:
	// worldName - String
	// worldSettings - {}
	let worldName = useWorldName();
	
	useEffect(() => {
		console.log("GameWrapper has world: " + worldName);
	}, [worldName]);

	// Render the gameplay in the Outlet

	return(
	<section id="gameplayWrapper">
		<section id="gameplayMenuBar">
			<CustomLink onClick={() => {}} to={"/"}>Return to Main Menu</CustomLink>
		</section>

		<Outlet context={worldName} />

	</section>
	);
}