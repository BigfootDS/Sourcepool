import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";


export interface ServerDb {
	serverName: string;
	serverHost: string;
	serverPort: number;
	dbInstance: null|Sequelize<SqliteDialect>
}