const { app } = require("electron")
const fs = require("node:fs");
const path = require("node:path");

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