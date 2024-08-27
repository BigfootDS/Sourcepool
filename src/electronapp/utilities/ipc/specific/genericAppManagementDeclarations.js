const { ipcMain } = require('electron');
const Settings = require('../../../game/SettingsManager.js');
const { channels } = require('../../../../shared/constants.js');
const fs = require("node:fs");
const { default: openExplorer } = require('explorer-opener');

function declareStuff(mainWindow){
	ipcMain.handle(channels.EXIT_APP, () => {
		console.log("Closing app now...");
		mainWindow.close();
	});

	ipcMain.handle(channels.MINIMIZE_WINDOW, () => {
		console.log("Minimizing app now...");
		mainWindow.minimize();
	});

	ipcMain.handle(channels.MAXIMIZE_WINDOW, () => {
		console.log("Maximizing app now...");
		mainWindow.maximize();
	});

	ipcMain.handle(channels.FULLSCREEN_ENABLE, () => {
		console.log("Entering fullscreen now...");
		mainWindow.setFullScreen(true);
		mainWindow.webContents.send(channels.FULLSCREEN_STATUS, 1);
		Settings.Video.windowMode = 1;
	});

	ipcMain.handle(channels.FULLSCREEN_DISABLE, () => {
		console.log("Exiting fullscreen now...");
		mainWindow.setFullScreen(false);
		mainWindow.webContents.send(channels.FULLSCREEN_STATUS, 0);
		Settings.Video.windowMode = 0;
	});

	ipcMain.handle(channels.FILEEXPLORER_OPEN_TO_PATH, (_event, value) => {

		if (fs.existsSync(value)){
			console.log("Opening the system file explorer to location: " + value);
			openExplorer(value);
		} else {
			console.log("User requested to open an invalid path in file explorer: " + value);
		}

	});
}

module.exports = declareStuff;