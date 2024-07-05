const { ipcMain } = require('electron');
const { channels } = require('../../../../shared/constants');

/*
		DB_CONNECT: "db_connect",
		DB_DISCONNECT: "db_disconnect",
		DB_DOC_CREATE: "db_doc_create",
		DB_DOC_UPDATE: "db_doc_update",
		DB_DOC_DELETE: "db_doc_delete",
		DB_DOC_FIND_ONE: "db_doc_find_one",
		DB_DOC_FIND_MANY: "db_doc_find_many",
		DB_DOC_FIND_ALL: "db_doc_find_all",
*/

function declareStuff(){
	ipcMain.handle(channels.DB_CONNECT, async (_event, payload) => {
		console.log("Connecting to a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DISCONNECT, async (_event, payload) => {
		console.log("Disconnecting from a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_CREATE, async (_event, payload) => {
		console.log("Creating a document in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_UPDATE, async (_event, payload) => {
		console.log("Updating a document in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_DELETE, async (_event, payload) => {
		console.log("Deleting a document in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_FIND_ONE, async (_event, payload) => {
		console.log("Finding a document in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_FIND_MANY, async (_event, payload) => {
		console.log("Finding documents in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});

	ipcMain.handle(channels.DB_DOC_FIND_ALL, async (_event, payload) => {
		console.log("Finding documents in a specified database now...");
		try {

			return true;
		} catch {
			return false;
		}
	});
}


module.exports = declareStuff;