const { WebSocket, WebSocketServer } = require("ws");





/**
 * @type {WebSocketServer}
 * @author BigfootDS
 */
let thisWebSocketServer = null;


/**
 * @type {WebSocket}
 * @author BigfootDS
 */
let thisWebSocketClient = null;

let thisWssHeartbeatInterval = null;
let intervalMs = 5000;

function heartbeat() {
	this.isAlive = true;
}

//#region Websocker server
function hostWebsocketServer(){
	thisWebSocketServer = new WebSocketServer({ port: 7474});

	thisWssHeartbeatInterval = setInterval(() => {
		thisWebSocketServer.clients.forEach((client) => {
			if (client.isAlive === false) return client.terminate();

			client.isAlive = false;
			client.ping();
		})
	}, intervalMs);

	thisWebSocketServer.on("connection", (incomingWebSocket, incomingRequest) => {
		console.log("New user connected to server: ", incomingRequest.socket.remoteAddress);


		incomingWebSocket.isAlive = true;

		incomingWebSocket.on("error", console.error);

		incomingWebSocket.on("pong", heartbeat);

		incomingWebSocket.on("message", (message) => {
			// Do validations on message
			console.log("message received:");
			let messageAsString = Buffer.from(message).toString();
			console.log(messageAsString);


			// Then, blast its result to all clients connected
			thisWebSocketServer.clients.forEach((client) => {
				if (incomingWebSocket !== client && client.readyState === WebSocket.OPEN){
					client.send("Server is sending this, which it received from another client:" + message);
				}
			});
		});

		incomingWebSocket.on("close", () => {
			console.log("User disconnected from server: ", incomingRequest.socket.remoteAddress);
		});
	});

	thisWebSocketServer.on("close", () => {
		clearInterval(thisWssHeartbeatInterval);
	})
}

function closeWebsocketServer(){
	thisWebSocketServer.close(() => {
		console.log("Websocket server is now closed.");
	});
	for (const client of thisWebSocketServer.clients) {
		client.terminate();
	}
	console.log("Websocket server closing, all client connections terminated.");
}

//#endregion

//#region Websocket client

/**
 * 
 * @author BigfootDS
 *
 * @param {String} targetAddress A url containing a domain or IP address plus a port. The "ws://" needed to connect to the websocket server is added automatically within this function.
 * 
 * @example connectToWebsocket("192.168.0.42:7474");
 */
function becomeClientToWebsocket(targetAddress){
	thisWebSocketClient = new WebSocket("ws://" + targetAddress);

	thisWebSocketClient.onopen = () => {
		console.log("Connected to server.");
		thisWebSocketClient.send("Hello dear server!");
	}
	
	thisWebSocketClient.onclose = () => {
		console.log("Disconnected from server.");
	}

	thisWebSocketClient.on("message", (message) => {
		console.log("Websocket client received this message:\n\t" + message);
	});

	thisWebSocketClient.on("error", (error) => {
		console.error(error);
	});
}

function disconnectClientFromServer(){
	thisWebSocketClient.close();
}


//#endregion

//#region Websocket communication

function sendFromClientToServer(content) {
	thisWebSocketClient.send(content);
}

function sendFromServerToClient(content) {
	thisWebSocketServer.clients.forEach(client => {
		client.send(content);
	})
}

//#endregion


module.exports = {
	hostWebsocketServer, closeWebsocketServer,
	becomeClientToWebsocket,
	sendFromClientToServer, sendFromServerToClient
}