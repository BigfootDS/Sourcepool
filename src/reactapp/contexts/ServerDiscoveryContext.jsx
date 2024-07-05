import React, { useContext, useEffect, useState, createContext } from "react";


let defaultFoundServers = [];

const FoundServersDataContext = createContext(defaultFoundServers);
const FoundServersDispatchContext = createContext(null);
const ChosenServerDataContext = createContext(null);
const ChosenServerDispatchContext = createContext(null);

export function useFoundServersData(){
	return useContext(FoundServersDataContext);
}

export function useFoundServersDispatch(){
	return useContext(FoundServersDispatchContext);
}

export function useChosenServerData(){
	return useContext(ChosenServerDataContext);
}

export function useChosenServerDispatch(){
	return useContext(ChosenServerDispatchContext);
}

export default function ServerDiscoveryProvider(props){

	//#region MDNS Browser
	// 	Clients can use the MDNS Browser to discover available servers, as long as they aren't already hosting a server.
	const [foundServers, setFoundServers] = useState(defaultFoundServers);

	const findMdnsServices = async () => {
		let result = await window.electronAPI.mdnsFindAllServices();
		setFoundServers(result);
	}
	
	//#endregion

	//#region Websocket Client
	// 	Clients can connect to a Websocket Server, as long as they aren't already hosting a server.
	const [chosenServer, setChosenServer] = useState(null);
	const [isConnected, setIsConnected] = useState(false);

	const websocketServerConnect = async (targetAddress) => {
		console.log("serverConnect targetAddress is: " + targetAddress);
		await window.electronAPI.websocketServerConnect(targetAddress);
		setChosenServer(targetAddress);
		setIsConnected(true);
	}

	const websocketSendStringToServer = (stringContent) => {
		if (!chosenServer || !isConnected) {
			return false;
		}

		window.electronAPI.websocketSendToServer(stringContent);
	}

	const websocketServerDisconnect = async () => {
		await window.electronAPI.websocketServerDisconnect();
		setChosenServer(null);
		setIsConnected(false);
	}

	

	//#endregion

	//#region Websocket Server and MDNS Service
	// 	If we want to start a server, we must also start the MDNS Service.
	let [isHosting, setIsHosting] = useState(false);

	const websocketStartServer = async () => {
		if (chosenServer) {
			console.log("Cannot be a server AND a client in this app!");
			return false;
		}
		let mdnsServiceStartResult = await window.electronAPI.mdnsStartService();
		let serverStartResult = await window.electronAPI.websocketStartServer();
		setIsHosting(serverStartResult);
	}

	const websocketSendStringToAllClients = (stringContent) => {
		if (chosenServer) {
			console.log("Cannot be a server AND a client in this app!");
			return false;
		}

		window.electronAPI.websocketSendToClients(stringContent);
	}

	const websocketStopServer = async () => {
		let mdnsServiceStopResult = await window.electronAPI.mdnsStopService();
		let serverStopResult = await window.electronAPI.websocketStopServer();
		setIsHosting(!serverStopResult);
	}

	//#endregion


	return (
		<FoundServersDataContext.Provider value={{foundServers, isConnected, isHosting}}>
			<FoundServersDispatchContext.Provider value={setFoundServers}>
				<ChosenServerDataContext.Provider value={chosenServer}>
					<ChosenServerDispatchContext.Provider value={{
						findMdnsServices,
						websocketServerConnect, websocketSendStringToServer, websocketServerDisconnect,
						websocketStartServer, websocketSendStringToAllClients, websocketStopServer
						}}>
						{props.children}
					</ChosenServerDispatchContext.Provider>
				</ChosenServerDataContext.Provider>
			</FoundServersDispatchContext.Provider>
		</FoundServersDataContext.Provider>
	)
}