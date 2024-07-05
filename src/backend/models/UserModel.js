const {NedbDocument} = require("@bigfootds/supercamo");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const saltRounds = 10;

module.exports = class User extends NedbDocument {
	constructor(data, databaseName, collectionName){
		super(data, databaseName, collectionName);

		this.username = {
			type: String,
			required: true,
			unique: true
		}


	}


}