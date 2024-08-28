import React, { useEffect, useState } from "react"
import { useChosenServerData, useChosenServerDispatch, useFoundServersData } from "../contexts/ServerDiscoveryContext"


export default function LocalServerManager() {


	const { foundServers, isHosting } = useFoundServersData();
	const connectedServer = useChosenServerData();
	const { findMdnsServices,
		websocketServerConnect, websocketSendStringToServer, websocketServerDisconnect,
		websocketStartServer, websocketSendStringToAllClients, websocketStopServer } = useChosenServerDispatch();

	const [messageBox, setMessageBox] = useState("");

	const sendMessage = () => {
		isHosting ? websocketSendStringToAllClients(messageBox) : websocketSendStringToServer(messageBox);
	}

	return (
		<div>
			{foundServers.map((service, index) => {
				return <div key={service.host + index}>
					<ul>
						<li>
							Name: {service.name}
						</li>
						<li>
							Hostname: {service.host}
						</li>
						<li>
							Local IP Address: {service.addresses[0]}
						</li>
					</ul>
					<button onClick={() => websocketServerConnect(service.addresses[0] + ":" + 7474)} className="customButton">
						Connect to server
					</button>
				</div>
			})}

			{isHosting ?
				<button onClick={websocketStopServer} className="customButton">
					Stop Hosting
				</button> 
				:
				<button onClick={websocketStartServer} className="customButton">
					Start Hosting
				</button>
			}


			<button onClick={findMdnsServices} className="customButton">
				Find available servers
			</button>


			{(connectedServer || isHosting) && <div>
				<input type="text" name="messageBoxField" id="messageBoxField" value={messageBox} onChange={(event) => setMessageBox(event.target.value)} />
				<button onClick={sendMessage} className="customButton">
					{isHosting ? "Send to clients" : "Send to server"}
				</button>
			</div> }

		</div>
	)
}