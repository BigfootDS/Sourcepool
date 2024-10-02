import { WebSocket } from "ws";
import { SuperCamoManager } from "../database/SuperCamoManager";
import { AppSettingsData } from "../database/models/AppSettingsModel";



class WebsocketClient {

	
	/**
	 * @type {WebSocket}
	 * @author BigfootDS
	 *
	 * @static
	 */
	static client: null|WebSocket = null;

	static async connect(serverAddress: string) {

		// Is the local user signed in properly?
		// There should be a username to pass along.
		let currentSettings: AppSettingsData = await SuperCamoManager.settingsData as AppSettingsData;
		let currentUser = SuperCamoManager.localAppData.findOneDocument("Users", {_id: currentSettings.currentUser})
		if (!currentUser) {
			throw new Error("Local app user is not signed in, a server connection without a user identifier like that will not be useful.");
		}

		WebsocketClient.client = new WebSocket("ws://" + serverAddress);

		WebsocketClient.client.onopen = () => {
			console.log(`Connected to server at ${serverAddress}.`);
			WebsocketClient.client.send("")
		}
	}

}