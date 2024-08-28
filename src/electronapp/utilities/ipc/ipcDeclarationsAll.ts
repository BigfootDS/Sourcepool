import { BrowserWindow } from "electron";



export function ipcDeclarations(mainWindow: BrowserWindow) {
	const genericElectronAppDeclarations = require("./specific/genericAppManagementDeclarations");
	genericElectronAppDeclarations(mainWindow);

	const electronAppSettingsDeclarations = require("./specific/electronAppSettingsDeclarations");
	electronAppSettingsDeclarations(mainWindow);

	const websocketServerDeclarations = require("./specific/websocketServerDeclarations");
	websocketServerDeclarations();

	const websocketClientDeclarations = require("./specific/websocketClientDeclarations");
	websocketClientDeclarations();

	const bonjourDiscoveryDeclarations = require("./specific/bonjourDiscoveryDeclarations");
	bonjourDiscoveryDeclarations();

	const databaseGeneralDeclarations = require("./specific/generalCrudDeclarations");
	databaseGeneralDeclarations();
	



}

