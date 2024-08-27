import { WebSocket } from "ws";
import Settings from "../game/SettingsManager.js";

class WebsocketClient {

	
	/**
	 * @type {WebSocket}
	 * @author BigfootDS
	 *
	 * @static
	 */
	static client: null|WebSocket = null;

	static connect(serverAddress: string) {

		// Is the local user signed in properly?
		// There should be a username to pass along.
		if (!Settings.General.username) {
			throw new Error("Local app user is not signed in, a server connection without a user identifier like that will not be useful.");
		}

		WebsocketClient.client = new WebSocket("ws://" + serverAddress);

		WebsocketClient.client.onopen = () => {
			console.log(`Connected to server at ${serverAddress}.`);
			WebsocketClient.client.send("")
		}
	}

}