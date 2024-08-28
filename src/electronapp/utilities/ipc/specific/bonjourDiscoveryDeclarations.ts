import { ipcMain } from 'electron';

import { channels } from '../../../../shared/constants.js';
import { createMdnsServiceServer, getFoundServices, destroyMdnsServiceServer } from '../../../networking/localNetworkDiscovery';

function declareStuff(){
	ipcMain.handle(channels.MDNS_FIND_SERVICES, async () => {
		console.log("Finding all local network servers now...");
		let result = getFoundServices();
		return result;
	});

	ipcMain.handle(channels.MDNS_START_SERVICE, async (_event, value) => {
		let result = await createMdnsServiceServer(value?.serviceName, value?.servicePort);
		return result;
	});

	ipcMain.handle(channels.MDNS_STOP_SERVICE, async (_event, value) => {
		let result = await destroyMdnsServiceServer();
		return result;
	});
}

module.exports = declareStuff;