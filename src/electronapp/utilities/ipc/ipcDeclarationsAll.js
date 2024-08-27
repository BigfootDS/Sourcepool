


function ipcDeclarations(mainWindow) {
	const genericElectronAppDeclarations = require("./specific/genericAppManagementDeclarations.js");
	genericElectronAppDeclarations(mainWindow);

	const electronAppSettingsDeclarations = require("./specific/electronAppSettingsDeclarations.js");
	electronAppSettingsDeclarations(mainWindow);

	const websocketServerDeclarations = require("./specific/websocketServerDeclarations.js");
	websocketServerDeclarations();

	const websocketClientDeclarations = require("./specific/websocketClientDeclarations.js");
	websocketClientDeclarations();

	const bonjourDiscoveryDeclarations = require("./specific/bonjourDiscoveryDeclarations.js");
	bonjourDiscoveryDeclarations();

	const databaseGeneralDeclarations = require("./specific/generalCrudDeclarations.js");
	databaseGeneralDeclarations();
	



}

module.exports = ipcDeclarations;