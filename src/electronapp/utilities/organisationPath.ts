import { app } from "electron";
import fs from "node:fs";
import path from "node:path";

function overrideUserDataPath(){
	

	// Logic found here:
	// https://stackoverflow.com/a/26227660
	let osUserDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
	
	let newPath = path.join(osUserDataPath, "BigfootDS", app.getName());

	if (!fs.existsSync(newPath)){
		fs.mkdirSync(newPath, { recursive: true});
	}

	app.setPath("userData",newPath);

	console.log("User data path is now: " + app.getPath("userData"));
}

module.exports = {
	overrideUserDataPath
}