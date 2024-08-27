const { ipcMain } = require('electron');
const { channels } = require('../../../../shared/constants');
const { hostWebsocketServer, closeWebsocketServer, sendFromServerToClient } = require('../../../networking/websocketManager.js');

function declareStuff(){
	ipcMain.handle(channels.WEBSOCKET_START_SERVER, () => {
		console.log("Starting local network server now...");
		try {
			hostWebsocketServer();
			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.WEBSOCKET_STOP_SERVER, () => {
		console.log("Stopping local network server now...");
		try {
			closeWebsocketServer();
			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.WEBSOCKET_SEND_TO_CLIENTS, async (_event, stringContent) => {
		console.log("Content to send to all connected websocket clients:");
		console.log(stringContent);
		sendFromServerToClient(stringContent)
	});
}

module.exports = declareStuff;