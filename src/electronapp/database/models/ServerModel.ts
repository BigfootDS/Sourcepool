import { NedbDocument } from "@bigfootds/supercamo";

export type ServerData = {
	_id?: string,
	name: string,
	host: string,
	port?: number,
	dateLastUsed?: Date,
	dateFirstUsed?: Date
}

export class ServerRecord extends NedbDocument {
	constructor(newData: any, newParentDatabaseName: string, newCollectionName: string){
		super(newData, newParentDatabaseName, newCollectionName);

		this.rules = {
			name: {
				type: String,
				required: true
			},
			host: {
				type: String,
				required: true
			},
			port: {
				type: Number,
				required: false
			},
			dateLastUsed: {
				type: Date,
				required: false
			},
			dateFirstUsed: {
				type: Date,
				required: false,
				default: new Date(Date.now())
			}
			
		}
	}

	
}