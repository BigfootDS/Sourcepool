import { NedbDocument, SuperCamo } from "@bigfootds/supercamo";
import {scrypt, timingSafeEqual, randomBytes} from "node:crypto";

export type UserData = {
	_id?: string,
	username: string,
	password?: string
}

export class User extends NedbDocument {
	constructor(newData: any, newParentDatabaseName: string, newCollectionName: string){
		super(newData, newParentDatabaseName, newCollectionName);

		this.rules = {
			username: {
				type: String,
				required: true,
				unique: true
			},
			password: {
				type: String,
				required: false,
				invalidateOnMinMaxError: true,
				minLength: 8
			}
		}		
	}

	static encryptionKeyLength = 64;

	/**
	 * Zero-dependency password hashing.
	 * 
	 * Code based on comments and article content from this article:
	 * 
	 * [https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k#comment-24a9e](https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k)
	 * @author BigfootDS
	 *
	 * @static
	 * @async
	 * @param {string} password Raw, unencrypted and vulnerable password. eg. "Password1"
	 * @returns {Promise<string>}
	 */
	static async hashPassword(password: string): Promise<string> {
		let result: string = await new Promise((resolve, reject) => {
			const salt = randomBytes(16).toString("hex");
	
			scrypt(password, salt, User.encryptionKeyLength, (err, derivedKey) => {
				if (err) reject(err);
				resolve(`${salt}:${derivedKey.toString('hex')}`);
			});
		});
		return result;
	}
	
	
	/**
	 * Zero-dependency password verification.
	 * 
	 * Code based on comments and article content from this article:
	 * 
	 * [https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k#comment-24a9e](https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k)
	 * @author BigfootDS
	 *
	 * @static
	 * @async
	 * @param {string} password Raw, unencrypted and vulnerable password. eg. "Password1"
	 * @param {string} hash Previously-hashed and salted password.
	 * @returns {Promise<boolean>}
	 */
	static async verifyPassword(password: string, hash: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const [salt, key] = hash.split(":");
			const keyAsBuffer = Buffer.from(key, "hex");

			scrypt(password, salt, User.encryptionKeyLength, (err, derivedKey) => {
				if (err) reject(err);
				resolve(timingSafeEqual(keyAsBuffer, derivedKey));
			});
		})
	}

	async preSave(){
		if (this.data._id){

			
			
			let existingDbData = await SuperCamo.clientGet(this.parentDatabaseName).findOneObject(this.collectionName, {_id: this.data._id}) as UserData;
			if (existingDbData.password && existingDbData?.password != this.data.password){
				// Password was modified, should re-encrypt it!
				this.data.password = await User.hashPassword(this.data.password);
				// console.log("Password encrypted!");
			}
		}
	}
}