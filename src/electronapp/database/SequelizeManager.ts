import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { GameSettings } from "../game/SettingsManager";
import { ServerDb } from "../../shared/types/serverManagementTypes";



export class SequelizeManager {

	static serverConnections: ServerDb[] = [];

	static async connectToServerDb(targetServerName: string, targetServerHost: string, targetServerPort: number) {
		const sequelizeInstance: Sequelize<SqliteDialect> = new Sequelize({
			dialect: SqliteDialect,
			storage:
				GameSettings.Storage.getServerDataDirectory(targetServerName) +
				"'.sqlite'",
		});

		SequelizeManager.serverConnections.push({
			serverName: targetServerName,
			serverHost: targetServerHost,
			serverPort: targetServerPort,
			dbInstance: sequelizeInstance
		});
	}

	static async connectToLocalDb() {
		let result = await SequelizeManager.connectToServerDb("_Local", "localhost", 0);
	}
}
