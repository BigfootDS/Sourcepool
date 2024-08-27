const { ipcMain } = require('electron');
const { becomeClientToWebsocket, sendFromClientToServer } = require('../../../networking/websocketManager');
const { channels } = require('../../../../shared/constants');

function declareStuff(){
	ipcMain.handle(channels.WEBSOCKET_CONNECT_TO_SERVER, (_event, targetAddress) => {
		console.log("Connecting to websocket server at address: " + JSON.stringify(targetAddress));
		try {
			becomeClientToWebsocket(targetAddress);
			return true;
		} catch {
			return false;
		}
	});


	ipcMain.handle(channels.WEBSOCKET_DISCONNECT_FROM_SERVER, async () => {
		console.log("Disconnecting from a server now...");
		let result = "TODO: Server Disconnect";
		return result.status;
	});

	

	ipcMain.handle(channels.WEBSOCKET_SEND_TO_SERVER, async (_event, stringContent) => {
		console.log("Content to send to the connected websocket server:");
		console.log(stringContent);
		sendFromClientToServer(stringContent);
	});
}

module.exports = declareStuff;