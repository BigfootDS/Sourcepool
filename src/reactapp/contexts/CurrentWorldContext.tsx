import React, { createContext, useContext, useEffect, useReducer, useState } from "react";


let defaultWorldName = "Default World Name";

const WorldNameContext = createContext(defaultWorldName);
const WorldNameDispatchContext = createContext(null);

export function useWorldName(){
	return useContext(WorldNameContext);
}

export function useWorldDispatch(){
	return useContext(WorldNameDispatchContext);
}

function worldReducer(previousState: any, action: any){
	let previousStateEditable = previousState;

	switch (action.type) {
		case "connect":

			console.log("Connecting to world: " + action.data);
			return action.data;
			
		case "disconnect":
			console.log("Disconnecting from world:" + previousStateEditable);
			return "";
			
		default:
			console.log("Invalid action given to the ReactJS World Context. Action was:");
			console.log(action);
			break;
	}
}

interface WorldNameProviderProps {
	children: React.ReactNode
}

export default function WorldNameProvider({children}: WorldNameProviderProps){
	// const [currentWorldName, setCurrentWorldName] = useState(defaultWorldName);

	const [worldNameData, worldNameDispatch] = useReducer(worldReducer, "");

	useEffect(() => {
		async function changeWorldState(){
			if (worldNameData){
				// let result = await window.electronAPI.worldConnect(worldNameData).catch(error => error);
				// console.log("World connect result:");
				// console.log(result);
			} else {
				// let result = await window.electronAPI.worldDisconnect().catch(error => error);
				// console.log("World disconnect result:");
				// console.log(result);
			}
		}
		changeWorldState();
	}, [worldNameData]);

	return(
		<WorldNameContext.Provider value={worldNameData}>
			<WorldNameDispatchContext.Provider value={worldNameDispatch}>
				{children}
			</WorldNameDispatchContext.Provider>
		</WorldNameContext.Provider>
	)
}