import { NedbDocument } from "@bigfootds/supercamo";
import ISO6391 from "iso-639-1";

import { User, UserData } from "./UserModel";
import { ServerData, ServerRecord } from "./ServerModel";

import { app } from "electron";
import path from "node:path";


export type AppSettingsData = {
	currentUser: UserData | string,
	connectedServers?: ServerData | string,
	historicalServers?: ServerData | string,
	displayLanguage: string,
	windowMode: string,
	volumeMaster: number,
	volumeMusic: number,
	volumeEffects: number,
	volumeAmbient: number,
	localDataDirectory: string,
	serverCacheDirectory: string
}

export class AppSettings extends NedbDocument {
	constructor(newData: any, newParentDatabaseName: string, newCollectionName: string){
		super(newData, newParentDatabaseName, newCollectionName);

		this.rules = {
			currentUser: {
				type: User,
				required: true
			},
			connectedServers: {
				type: [ServerRecord],
				required: false
			},
			historicalServers: {
				type: [ServerRecord],
				required: false
			},
			displayLanguage: {
				type: String,
				required: true,
				default: "en",
				choices: ISO6391.getAllCodes()
			},
			windowMode: {
				type: String,
				required: true,
				default: "fullscreen",
				choices: ["fullscreen", "windowed"]
			},
			volumeMaster: {
				type: Number,
				required: true,
				default: 50,
				min: 0,
				max: 100
			},
			volumeMusic: {
				type: Number,
				required: true,
				default: 50,
				min: 0,
				max: 100
			},
			volumeEffects: {
				type: Number,
				required: true,
				default: 50,
				min: 0,
				max: 100
			},
			volumeAmbient: {
				type: Number,
				required: true,
				default: 50,
				min: 0,
				max: 100
			},
			localDataDirectory: {
				type: String,
				required: true,
				default: path.join(app.getPath("userData"), "LocalSourcepoolData")
			},
			serverCacheDirectory: {
				type: String,
				required: true,
				default: path.join(app.getPath("userData"), "SourcepoolServerCache")
			}

		}
	}

	
}