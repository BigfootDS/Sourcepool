import React, { useContext, useEffect, useState, createContext } from "react";
import { MdnsStartServiceProps } from "../../electronapp/ipc/ipcTypes";

interface ServerInfo {
	name: string,
	addresses: string[],
	host: string,
	port: string,
	username: string,
	password: string,
	isConnected: boolean,
	isHosting: boolean
}

interface FoundServers {
	foundServers: ServerInfo[],
	isConnected: boolean,
	isHosting: boolean
}

let defaultFoundServers: FoundServers  = {
	foundServers: [],
	isConnected: false,
	isHosting: false
};

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

interface ServerDiscoveryProviderProps {
	children: React.ReactNode
}

export default function ServerDiscoveryProvider({children}: ServerDiscoveryProviderProps){

	//#region MDNS Browser
	// 	Clients can use the MDNS Browser to discover available servers, as long as they aren't already hosting a server.
	const [foundServers, setFoundServers] = useState(Array<ServerInfo>);

	const findMdnsServices = async () => {
		let result = await window.electronAPI.mdnsFindAllServices();
		setFoundServers(result);
	}
	
	//#endregion

	//#region Websocket Client
	// 	Clients can connect to a Websocket Server, as long as they aren't already hosting a server.
	const [chosenServer, setChosenServer] = useState(null);
	const [isConnected, setIsConnected] = useState(false);

	const websocketServerConnect = async (targetAddress: string) => {
		console.log("serverConnect targetAddress is: " + targetAddress);
		await window.electronAPI.websocketServerConnect(targetAddress);
		setChosenServer(targetAddress);
		setIsConnected(true);
	}

	const websocketSendStringToServer = (stringContent: string) => {
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

	const websocketStartServer = async (hostingServerInfo: MdnsStartServiceProps) => {
		if (chosenServer) {
			console.log("Cannot be a server AND a client in this app!");
			return false;
		}
		let mdnsServiceStartResult = await window.electronAPI.mdnsStartService(hostingServerInfo);
		let serverStartResult = await window.electronAPI.websocketStartServer();
		setIsHosting(serverStartResult);
	}

	const websocketSendStringToAllClients = (stringContent: string) => {
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
						{children}
					</ChosenServerDispatchContext.Provider>
				</ChosenServerDataContext.Provider>
			</FoundServersDispatchContext.Provider>
		</FoundServersDataContext.Provider>
	)
}