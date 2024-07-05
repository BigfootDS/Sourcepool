/*
  worldSeed: () => ipcRenderer.invoke(channels.WORLD_SEED),
  worldConnect: () => ipcRenderer.invoke(channels.WORLD_CONNECT),
  worldDisconnect: () => ipcRenderer.invoke(channels.WORLD_DISCONNECT),
*/

import React, { useEffect, useState } from "react";
import WorldInfoCard from "./WorldInfoCard.jsx";
import "../styles/SaveDataManager.css";


export default function SaveManager(props) {

	const worldSeed = async () => {
		let result = await window.electronAPI.worldSeed();
		console.log(result);
		setLatestOpLog(result);
	}

	const worldConnect = async () => {
		let result = await window.electronAPI.worldConnect(worldName);
		console.log(result);
		setLatestOpLog(result);
	}

	const worldDisconnect = async () => {
		let result = await window.electronAPI.worldDisconnect();
		console.log(result);
		setLatestOpLog(result);
	}

	const worldFindAll = async () => {
		let result = await window.electronAPI.worldFindAll();
		console.log(result);
		setListOfWorlds(result);
		setLatestOpLog(result);
	}

	let [worldName, setWorldName] = useState("Default World");

	let [listOfWorlds, setListOfWorlds] = useState([]);

	let [latestOpLog, setLatestOpLog] = useState("");


	useEffect(() => {
		worldFindAll();
	}, []);

	return (
		<section id="saveManager">
			<section id="worldMenu">
				<h2>Create a new world</h2>
				<label htmlFor="worldName">Enter the world name:</label>
				<input 
					type="text" 
					name="worldName" 
					id="worldNameInput" 
					value={worldName} 
					onChange={(event) => setWorldName(event.target.value)} 
				/>

				<button onClick={worldConnect}>
					Connect to world
				</button>

				<button onClick={worldSeed}>
					Seed the connected world
				</button>

				<button onClick={worldDisconnect}>
					Disconnect from world
				</button>

				<button onClick={worldFindAll}>
					Find all worlds
				</button>
			</section>

			<section className="worldInfoCardContainer">
				<h2>Existing Worlds</h2>
				<section className="worldInfoCardScrollArea">
					{listOfWorlds.length > 0 && listOfWorlds.map((world, index) => {
						return <WorldInfoCard key={`${world.worldName}-${index}`} worldName={world.worldName} filePath={world.filePath} />
					})}
				</section>
			</section>

			

			
			
		</section>
	);
}