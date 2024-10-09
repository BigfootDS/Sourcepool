import { ipcMain, dialog, BrowserWindow } from 'electron';
import { channels } from '../../../../shared/constants.js';
// import { GameSettings as Settings } from '../../../game/SettingsManager';

function declareStuff(mainWindow: BrowserWindow){
	ipcMain.handle(channels.GET_FOLDER_WORLDSAVEROOT, async () => {
		console.log("Showing dialog to choose a folder now...");
		let { filePaths } = await dialog.showOpenDialog(mainWindow, {
			properties: ['openDirectory']
		});

		console.log({ filePaths });
		// if (filePaths[0]) {
		// 	Settings.Storage.serversRootDirectory = filePaths[0];
		// 	return filePaths[0];
		// } else {
		// 	return Settings.Storage.serversRootDirectory
		// }
		console.log("TODO!");
		return filePaths;
	});


	ipcMain.handle(channels.GAMESETTINGS_GET_BY_KEY_AND_CATEGORY, (_event, value) => {
		// Expect an object {key:"",category:""}
		console.log("Getting value by key: " + JSON.stringify(value));
		// let result = Settings.getProperty(value.name, value.category);
		// console.log("Result retrieved: " + result);
		console.log("TODO!");
		// return "result";
		return null;
	});

	ipcMain.handle(channels.GAMESETTINGS_SET_BY_KEY_AND_CATEGORY, (_event, value) => {
		// Expect an object {key:"",category:"", newValue: ""}
		console.log("Setting value by key: " + JSON.stringify(value));
		// let result = Settings.setProperty(value.name, value.category, value.newValue);
		// console.log("Game setting update result: " + result);
		console.log("TODO!");
		// return result;
		return null;
	});

	ipcMain.handle(channels.FORCE_WRITE_SETTINGS, () => {
		// Settings.toJsonFile(Settings.Storage.localSettingsDirectory);
		console.log("TODO!");
	});
}


module.exports = declareStuff;