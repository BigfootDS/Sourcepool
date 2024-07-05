// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron/renderer')
const {channels} = require("../shared/constants");

contextBridge.exposeInMainWorld('electronAPI', {
  exitApp: () => ipcRenderer.invoke(channels.EXIT_APP),
  minimizeWindow: () => ipcRenderer.invoke(channels.MINIMIZE_WINDOW),
  maximizeWindow: () => ipcRenderer.invoke(channels.MAXIMIZE_WINDOW),
  fullscreenEnable: () => ipcRenderer.invoke(channels.FULLSCREEN_ENABLE),
  fullscreenDisable: () => ipcRenderer.invoke(channels.FULLSCREEN_DISABLE),
  fullscreenSendUpdate: (callback) => ipcRenderer.on(channels.FULLSCREEN_STATUS, (_event, value) => callback(value)),
  getFolder: async () => await ipcRenderer.invoke(channels.GET_FOLDER_WORLDSAVEROOT),
  gameSettingsGetProperty: async (keyAndCatObj) => await ipcRenderer.invoke(channels.GAMESETTINGS_GET_BY_KEY_AND_CATEGORY, keyAndCatObj),
  gameSettingsSetProperty: async (keyAndCatAndValueObj) => await ipcRenderer.invoke(channels.GAMESETTINGS_SET_BY_KEY_AND_CATEGORY, keyAndCatAndValueObj),
  openFileExplorerToPath: (targetDirectoryPath) => ipcRenderer.invoke(channels.FILEEXPLORER_OPEN_TO_PATH, targetDirectoryPath),
  forceWriteSettings: () => ipcRenderer.invoke(channels.FORCE_WRITE_SETTINGS),

  // Websocket client stuff
  websocketServerConnect: async (targetAddress) => {
    console.log("preload serverConnect arg is: ");
    console.log(targetAddress);
    await ipcRenderer.invoke(channels.WEBSOCKET_CONNECT_TO_SERVER, targetAddress)
  },
  websocketServerDisconnect: async () => await ipcRenderer.invoke(channels.WEBSOCKET_DISCONNECT_FROM_SERVER),
  websocketSendToServer: async (stringToSend) => {
    await ipcRenderer.invoke(channels.WEBSOCKET_SEND_TO_SERVER, stringToSend);
  },

  // Websocket server stuff
  websocketStartServer: async () => await ipcRenderer.invoke(channels.WEBSOCKET_START_SERVER),
  websocketStopServer: async () => await ipcRenderer.invoke(channels.WEBSOCKET_STOP_SERVER),
  websocketSendToClients: async (stringToSend) => {
    await ipcRenderer.invoke(channels.WEBSOCKET_SEND_TO_CLIENTS, stringToSend);
  },

  // MDNS server stuff
  mdnsStartService: async (objWithServiceNameAndServicePort) => await ipcRenderer.invoke(channels.MDNS_START_SERVICE, objWithServiceNameAndServicePort),
  mdnsStopService: async () => await ipcRenderer.invoke(channels.MDNS_STOP_SERVICE),

  // MDNS client stuff
  mdnsFindAllServices: async () => await ipcRenderer.invoke(channels.MDNS_FIND_SERVICES)
});