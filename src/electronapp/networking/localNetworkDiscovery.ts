import { networkInterfaces, hostname, userInfo } from "node:os";
import * as ciao from "@homebridge/ciao";
import { default as Bonjour, Service } from "bonjour-service";

const ciaoResponder = ciao.getResponder();



/**
 * Array of found MDNS servers.
 * 
 */
let foundServers: Service[] = [];


/**
 * A default hostname for the MDNS discovery server to use when hosting.
 * Ideally, a user would provide a custom server name and that would get passed in from the frontend to this function via the IPC commands.
 * 
 * So, this is a fallback variable.
 * 
 * @type {String}
 */
let defaultServerName = `Sourcepool-${hostname()}-${userInfo().username}`;



/**
 * Description placeholder
 * @type {ciao.CiaoService|null}
 */
let mdnsServiceServer: ciao.CiaoService|null = null; 


/**
 * Reference to the interval that is updating the service data for the MDNS service server.
 */
let mdnsServiceUpdateInterval: null|NodeJS.Timeout = null;


const bonjourInstance = new Bonjour();
let discoveryBrowser = null;
let bonjourQueryInterval = null;

async function createMdnsServiceServer(serviceName = defaultServerName, discoveryServicePort = 7475, destroyIfPreexisting = true){
	if (mdnsServiceServer && destroyIfPreexisting){
		await destroyMdnsServiceServer();
	}

	mdnsServiceServer = ciaoResponder.createService({
		name: serviceName,
		type: 'spl-mdns',
		port: discoveryServicePort,
		txt: {
			key: new Date(Date.now()).toLocaleTimeString()
		}
	});

	mdnsServiceServer.advertise().then(() => {
		console.log(`Discovery service for server ${serviceName} is now advertising to the connected network on port ${discoveryServicePort}.`);
	})

	mdnsServiceUpdateInterval = setInterval(() => {
		mdnsServiceServer.updateTxt({
			key: new Date(Date.now()).toLocaleTimeString()
		});
	}, 5000);

	return true;
}


async function destroyMdnsServiceServer(){
	if (mdnsServiceUpdateInterval) {
		clearInterval(mdnsServiceUpdateInterval);
	}
	await mdnsServiceServer.destroy();
	mdnsServiceServer = null;

	return true;
}



function getFoundServices() {

	foundServers = [];
	
	discoveryBrowser = bonjourInstance.find({ type: "spl-mdns" });
	discoveryBrowser.start();

	discoveryBrowser.on("up", (server: Service) => {
		if (server.name == mdnsServiceServer?.getHostname()) {
			// Detected ourselves, do nothing
			console.log("Found ourselves, not adding this server to the foundServers array.");
		} else {
			console.log("Found server:\n" + JSON.stringify(server, null, 4));
			foundServers.push(server)
		}
	})

	discoveryBrowser.update();

	// discoveryBrowser.stop();
	return foundServers;
}



module.exports = {
	createMdnsServiceServer, destroyMdnsServiceServer,
	getFoundServices
}