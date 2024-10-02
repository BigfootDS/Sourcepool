import { ServerDb } from "../../shared/types/serverManagementTypes";
import { CollectionListEntry, NedbClient, SuperCamo } from "@bigfootds/supercamo";
import { User } from "./models/UserModel";
import { AppSettings, AppSettingsData } from "./models/AppSettingsModel";
import { ServerRecord } from "./models/ServerModel";
import { app } from "electron";
import path from "node:path";


export class SuperCamoManager {

	static localAppData: NedbClient = SuperCamo.clientConnect(
		"LocalSourcepoolData",
		path.join(app.getPath("userData"), "LocalSourcepoolData"),
		[
			new CollectionListEntry("Users", User),
			new CollectionListEntry("Settings", AppSettings),
			new CollectionListEntry("ServerRecords", ServerRecord)
		]
	);

	static get settingsData(){
		return new Promise(async (resolve, reject) => {
			let settingsData: AppSettingsData = await SuperCamoManager.localAppData.findOneObject("Settings", {}) as AppSettingsData;
			if (settingsData){
				resolve(settingsData);
			} else {
				reject(new Error("Something went wrong retrieving local app settings data."));
			}
		})
	}
}
