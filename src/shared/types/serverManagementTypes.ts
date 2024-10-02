import { NedbClient } from "@bigfootds/supercamo";



export interface ServerDb {
	serverName: string;
	serverHost: string;
	serverPort: number;
	dbInstance: null|NedbClient
}