// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron/renderer';
import { channels } from "../shared/constants";
import { GameSettingsKeyCatDataProps, GameSettingsKeyCatProps, MdnsStartServiceProps } from '../shared/types/ipcTypes';

contextBridge.exposeInMainWorld('electronAPI', {
  exitApp: () => ipcRenderer.invoke(channels.EXIT_APP),
  minimizeWindow: () => ipcRenderer.invoke(channels.MINIMIZE_WINDOW),
  maximizeWindow: () => ipcRenderer.invoke(channels.MAXIMIZE_WINDOW),
  fullscreenEnable: () => ipcRenderer.invoke(channels.FULLSCREEN_ENABLE),
  fullscreenDisable: () => ipcRenderer.invoke(channels.FULLSCREEN_DISABLE),
  fullscreenSendUpdate: (callback: Function) => ipcRenderer.on(channels.FULLSCREEN_STATUS, (_event, value) => callback(value)),
  getFolder: async () => await ipcRenderer.invoke(channels.GET_FOLDER_WORLDSAVEROOT),
  gameSettingsGetProperty: async (keyAndCatObj: GameSettingsKeyCatProps) => await ipcRenderer.invoke(channels.GAMESETTINGS_GET_BY_KEY_AND_CATEGORY, keyAndCatObj),
  gameSettingsSetProperty: async (keyAndCatAndValueObj: GameSettingsKeyCatDataProps) => await ipcRenderer.invoke(channels.GAMESETTINGS_SET_BY_KEY_AND_CATEGORY, keyAndCatAndValueObj),
  openFileExplorerToPath: (targetDirectoryPath: string) => ipcRenderer.invoke(channels.FILEEXPLORER_OPEN_TO_PATH, targetDirectoryPath),
  forceWriteSettings: () => ipcRenderer.invoke(channels.FORCE_WRITE_SETTINGS),

  // Websocket client stuff
  websocketServerConnect: async (targetAddress: string) => {
    console.log("preload serverConnect arg is: ");
    console.log(targetAddress);
    await ipcRenderer.invoke(channels.WEBSOCKET_CONNECT_TO_SERVER, targetAddress)
  },
  websocketServerDisconnect: async () => await ipcRenderer.invoke(channels.WEBSOCKET_DISCONNECT_FROM_SERVER),
  websocketSendToServer: async (stringToSend: string) => {
    await ipcRenderer.invoke(channels.WEBSOCKET_SEND_TO_SERVER, stringToSend);
  },

  // Websocket server stuff
  websocketStartServer: async () => await ipcRenderer.invoke(channels.WEBSOCKET_START_SERVER),
  websocketStopServer: async () => await ipcRenderer.invoke(channels.WEBSOCKET_STOP_SERVER),
  websocketSendToClients: async (stringToSend: string) => {
    await ipcRenderer.invoke(channels.WEBSOCKET_SEND_TO_CLIENTS, stringToSend);
  },

  // MDNS server stuff
  mdnsStartService: async (objWithServiceNameAndServicePort: MdnsStartServiceProps) => await ipcRenderer.invoke(channels.MDNS_START_SERVICE, objWithServiceNameAndServicePort),
  mdnsStopService: async () => await ipcRenderer.invoke(channels.MDNS_STOP_SERVICE),

  // MDNS client stuff
  mdnsFindAllServices: async () => await ipcRenderer.invoke(channels.MDNS_FIND_SERVICES)
});


export interface IElectronAPI {

	exitApp: () => Promise<any>,
	minimizeWindow: () => Promise<any>,
	maximizeWindow: () => Promise<any>,
	fullscreenEnable: () => Promise<any>,
	fullscreenDisable: () => Promise<any>,
	fullscreenSendUpdate: (callback: Function) => Promise<any>,
	getFolder: () => Promise<any>,
	gameSettingsGetProperty: (data: GameSettingsKeyCatProps) => Promise<any>,
	gameSettingsSetProperty: (data: GameSettingsKeyCatDataProps) => Promise<any>,
	openFileExplorerToPath: (targetDirectoryPath: string) => Promise<any>,
	forceWriteSettings: () => Promise<any>,

	// Websocket client stuff
	websocketServerConnect: (targetAddress: string) => Promise<any>,
	websocketServerDisconnect: () => Promise<any>,
	websocketSendToServer: (stringToSend: string) => Promise<any>,


	websocketStartServer: () => Promise<any>,
	websocketStopServer: () => Promise<any>,
	websocketSendToClients: (stringToSend: string) => Promise<any>,

	mdnsStartService: (objWithServiceNameAndServicePort: MdnsStartServiceProps) => Promise<any>,
	mdnsStopService: () => Promise<any>,
	mdnsFindAllServices: () => Promise<any>
}

declare global {
	interface Window {
		electronAPI: IElectronAPI
	}
}