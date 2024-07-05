import React, { useContext, useEffect, useState, createContext } from "react";

let defaultUserName = "";

const CurrentUserDataContext = createContext(defaultUserName);
const CurrentUserDispatchContext = createContext(null);

export function useCurrentUsername(){
	return useContext(CurrentUserDataContext);
}

export function useCurrentUserDispatch(){
	return useContext(CurrentUserDispatchContext);
}


export default function CurrentUserProvider(props){

	const [currentUsername, setCurrentUsername] = useState(defaultUserName);
	const [currentUserId, setCurrentUserId] = useState("");

	async function getSavedUsername(){
		let result = await window.electronAPI.gameSettingsGetProperty({name:"username", category:"General"});
		if (result){
			setCurrentUsername(result);
		}
	}

	async function getSavedUserId(){
		let result = await window.electronAPI.gameSettingsGetProperty({name:"userId", category:"General"});
		if (result){
			setCurrentUserId(result);
		}
	}

	useEffect(() => {
		
		getSavedUsername();
		getSavedUserId();
	}, []);

	useEffect(() => {
		if (currentUsername !== defaultUserName){
			window.electronAPI.gameSettingsSetProperty({name:"username", category:"General", newValue: currentUsername});
		}
		if (currentUsername == "" || !currentUsername){
			getSavedUsername();
		}
	}, [currentUsername]);

	return (
		<CurrentUserDataContext.Provider value={currentUsername}>
			<CurrentUserDispatchContext.Provider value={setCurrentUsername}>
				{props.children}
			</CurrentUserDispatchContext.Provider>
		</CurrentUserDataContext.Provider>
	)
}