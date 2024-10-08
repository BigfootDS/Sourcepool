import React, { useState } from "react";
import SaveManager from "../components/SaveManager";
import { useWorldDispatch, useWorldName } from "../contexts/CurrentWorldContext";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

export function PlayConfigPage () {

	// Determine which world to play in. 
	// We need to store these things into a context obj, 
	// which the GameWrapper will access to actually load the game data:
	// worldName - String
	// worldSettings - Object

	// let worldName = useWorldName();
	let worldNameDispatch = useWorldDispatch();

	let [formWorldName, setFormWorldName] = useState("Default World");

	let [listOfWorlds, setListOfWorlds] = useState([]);

	const navigate = useNavigate();

	const createWorldFromName = () => {
		selectWorldName(formWorldName);
	}

	const selectWorldName = (givenWorldName: string) => {
		worldNameDispatch({type:"connect", data: givenWorldName});
		navigate("/game/play");
	}

	const worldFindAll = async () => {
		// let result = await window.electronAPI.worldFindAll();
		// console.log(result);
		// setListOfWorlds(result);
	}

	return(
		<section className="page" id="playConfigPage">
			<section className="pageTitle playConfigTitle">
				<h1>Choose your world</h1>
			</section>
			
			<section className="pageContent">
				<section className="worldCreator">
					<h2>Create a new world</h2>
					<label htmlFor="newWorldName">World Name:</label>
					<input 
						type="text" 
						name="newWorldName" 
						id="newWorldName" 
						value={formWorldName} 
						onChange={(event) => setFormWorldName(event.target.value)} 
					/>
					<CustomButton onClick={createWorldFromName}>Create</CustomButton>
				</section>

				<section className="worldLoader">
					<h2>Load an existing world</h2>
				</section>
			</section>

		</section>
	)
}