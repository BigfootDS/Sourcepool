import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { default as onChange } from "on-change";
import { app } from "electron";
import path from "node:path";

class Settings {

	static General = class  {


		static #username: string = null;
		static get username () {
			return Settings.General.#username || require("node:os").userInfo().username;
		}
		static set username(newValue){
			Settings.General.#username = newValue;
		}

		static #userId = "";
		static get userId () {
			return Settings.General.#userId;
		}
		static set userId (newValue) {
			Settings.General.#userId = newValue;
		}

		static #connectedServer = "";
		static get connectedServer () { 
			return Settings.General.#connectedServer;
		}
		static set connectedServer(newValue){
			if (newValue) {
				Settings.General.mostRecentConnectedServer = newValue;
			}
			Settings.General.#connectedServer = newValue;
		}

		static #mostRecentConnectedServer = "";
		static get mostRecentConnectedServer () { 
			return Settings.General.#mostRecentConnectedServer;
		}
		static set mostRecentConnectedServer(newValue){
			Settings.General.#mostRecentConnectedServer = newValue;
		}


		static toString() {
			let staticPropsAsObj = {
				username: Settings.General.username,
				connectedServer: Settings.General.connectedServer,
				mostRecentConnectedServer: Settings.General.mostRecentConnectedServer,
				userId: Settings.General.userId
			}
			
			return JSON.stringify(staticPropsAsObj);
		}
	}
	
	static Interface = class {
		/**
		 * The ISO-639-1 two-letter language code representing the current language of the game's interface.
		 * 
		 * Default value is "en" for the English language.
		 * 
		 * @author BigfootDS
		 *
		 * @static
		 */
		static #language = "en";
		
		/**
		 * The ISO-639-1 two-letter language code representing the current language of the game's interface.
		 * 
		 * @static
		 */
		static get language() {
			return Settings.Interface.#language;
		}
		
		/**
		 * @param {string} langIsoCode The new language to use for the game. It must be a language code meeting ISO-639-1 requirements, and supported by the game's localized data to have any impact - otherwise "en" for English will be used.
		 * 
		 * @static
		 */
		static set language(langIsoCode){
			console.log("Updated language stored in GameSettings RAM");
			Settings.Interface.#language = langIsoCode;
		}

		static toString() {
			let staticPropsAsObj = {
				language: Settings.Interface.language
			}
			
			return JSON.stringify(staticPropsAsObj);
		}
	}
	
	static Video = class {
		static #windowMode = 0;

		static get windowMode(){
			return Settings.Video.#windowMode;
		}

		static set windowMode(newValue){
			if (newValue == 0 || newValue == 1){
				Settings.Video.#windowMode = newValue;
			} else {
				console.log("Invalid value attempted to be set to GameSettings.Video.windowMode. This property only accepts a value of 0 or 1. 0 for windowed, 1 for fullscreen.");
			}
		}

		static toString() {
			let staticPropsAsObj = {
				windowMode: Settings.Video.windowMode
			}
			
			return JSON.stringify(staticPropsAsObj);
		}
	}
	
	static Audio = class {
		
		/**
		 * Percentage value (whole number) representing the loudness of this audio category.
		 * 
		 * Minimum value of 0, maximum value of 100.
		 * @author BigfootDS
		 *
		 * @static
		 */
		static #masterVolume = 50;
		static #musicVolume = 50;
		static #effectsVolume = 50;
		static #ambientVolume = 50;

		static get masterVolume(){
			return Settings.Audio.#masterVolume;
		}
		static get musicVolume(){
			return Settings.Audio.#musicVolume;
		}
		static get effectsVolume(){
			return Settings.Audio.#effectsVolume;
		}
		static get ambientVolume(){
			return Settings.Audio.#ambientVolume;
		}

		
		/**
		 * Percentage value (whole number) representing the loudness of this audio category.
		 * 
		 * Minimum value of 0, maximum value of 100.
		 * 
		 * @param {number} newVolumePercentage The new volume percentage for this audio category. Should be a whole number between 0 and 100 (inclusive).
		 * 
		 * @author BigfootDS
		 *
		 * @static
		 */
		static set masterVolume(newVolumePercentage){
			if (newVolumePercentage > 100){
				Settings.Audio.#masterVolume = 100;
			} else if (newVolumePercentage < 0){
				Settings.Audio.#masterVolume = 0;
			} else {
				Settings.Audio.#masterVolume = newVolumePercentage;
			}
		}

		/**
		 * Percentage value (whole number) representing the loudness of this audio category.
		 * 
		 * Minimum value of 0, maximum value of 100.
		 * 
		 * @param {number} newVolumePercentage The new volume percentage for this audio category. Should be a whole number between 0 and 100 (inclusive).
		 * 
		 * @author BigfootDS
		 *
		 * @static
		 */
		static set musicVolume(newVolumePercentage){
			if (newVolumePercentage > 100){
				Settings.Audio.#musicVolume = 100;
			} else if (newVolumePercentage < 0){
				Settings.Audio.#musicVolume = 0;
			} else {
				Settings.Audio.#musicVolume = newVolumePercentage;
			}
		}

		/**
		 * Percentage value (whole number) representing the loudness of this audio category.
		 * 
		 * Minimum value of 0, maximum value of 100.
		 * 
		 * @param {number} newVolumePercentage The new volume percentage for this audio category. Should be a whole number between 0 and 100 (inclusive).
		 * 
		 * @author BigfootDS
		 *
		 * @static
		 */
		static set effectsVolume(newVolumePercentage){
			if (newVolumePercentage > 100){
				Settings.Audio.#effectsVolume = 100;
			} else if (newVolumePercentage < 0){
				Settings.Audio.#effectsVolume = 0;
			} else {
				Settings.Audio.#effectsVolume = newVolumePercentage;
			}
		}

		/**
		 * Percentage value (whole number) representing the loudness of this audio category.
		 * 
		 * Minimum value of 0, maximum value of 100.
		 * 
		 * @param {number} newVolumePercentage The new volume percentage for this audio category. Should be a whole number between 0 and 100 (inclusive).
		 * 
		 * @author BigfootDS
		 *
		 * @static
		 */
		static set ambientVolume(newVolumePercentage){
			if (newVolumePercentage > 100){
				Settings.Audio.#ambientVolume = 100;
			} else if (newVolumePercentage < 0){
				Settings.Audio.#ambientVolume = 0;
			} else {
				Settings.Audio.#ambientVolume = newVolumePercentage;
			}
		}

		static toString() {
			let staticPropsAsObj = {
				masterVolume: Settings.Audio.masterVolume,
				musicVolume: Settings.Audio.musicVolume,
				effectsVolume: Settings.Audio.effectsVolume,
				ambientVolume: Settings.Audio.ambientVolume,
			}
			
			return JSON.stringify(staticPropsAsObj);
		}
	}
	
	static Storage = class {

		static getAppSettingsDataDirectory() {
			let proposedDirectory = path.join(app.getPath("userData"), "Settings");
			if (!fs.existsSync(proposedDirectory)){
				fs.mkdirSync(proposedDirectory, {recursive: true});
			}
	
			return proposedDirectory;
		}

		static getServerDataDirectory(targetServerName: string) {
			let proposedDirectory = path.join(app.getPath("userData"), "Servers", targetServerName);
			if (!fs.existsSync(proposedDirectory)){
				fs.mkdirSync(proposedDirectory, {recursive: true});
			}
	
			return proposedDirectory;
		}
	
		static #localSettingsDirectory: null|string = null;
		static get localSettingsDirectory () {
			return Settings.Storage.getAppSettingsDataDirectory();
		}
		static set localSettingsDirectory (newValue) {
			Settings.Storage.#localSettingsDirectory = newValue;
		}

		static #serversRootDirectory: null|string = null;
		static get serversRootDirectory () {
			return Settings.Storage.getServerDataDirectory("");
		}
		static set serversRootDirectory (newValue) {
			Settings.Storage.#serversRootDirectory = newValue;
		}

		static #localDataRootDirectory: null|string = null;
		static get localDataRootDirectory () {
			return Settings.Storage.getServerDataDirectory("_Local");
		}
		static set localDataRootDirectory (newValue) {
			Settings.Storage.#localDataRootDirectory = newValue;
		}
	
		static currentServerDataDirectory: null|string = null;

		static toString() {
			let staticPropsAsObj = {
				serversRootDirectory: Settings.Storage.serversRootDirectory,
				localDataRootDirectory: Settings.Storage.localDataRootDirectory,
				localSettingsDirectory: Settings.Storage.localSettingsDirectory
			}
			
			return JSON.stringify(staticPropsAsObj);
		}
	}
	
	static fromJson(incomingJson: string){
		// Parse incomingJson JSON string into an object
		let dataAsObj = JSON.parse(incomingJson);
		// Match each object key to a static property on GameSettings
		for (const category in dataAsObj){

			for (const property in dataAsObj[category]){
				console.log("Loading settings:");
				console.log(`Settings[${category}][${property}] = ${dataAsObj[category][property]}`);
				//@ts-ignore
				Settings[category][property] = dataAsObj[category][property];
			}

			
		}
	}

	static toJson(){
		let staticPropsAsObj = {
			General: JSON.parse(Settings.General.toString()),
			Interface: JSON.parse(Settings.Interface.toString()),
			Video: JSON.parse(Settings.Video.toString()),
			Audio: JSON.parse(Settings.Audio.toString()),
			Storage: JSON.parse(Settings.Storage.toString())
		}
		
		return JSON.stringify(staticPropsAsObj);
	}

	static fromJsonFile(incomingJsonFilePath: string){
		let resolvedPath = path.resolve(incomingJsonFilePath);
		// Load file from incomingJsonFilePath as string
		let result = fs.readFileSync(resolvedPath, {encoding:'utf8'});
		// Call GameSettings.fromJson() with that new string
		Settings.fromJson(result);
		
	}

	static async toJsonFile(targetFilePath: string){
		// Convert all static properties on GameSettings into a JSON string,
		// ideally using GameSettings.toJson()
		let stringToWrite = JSON.stringify(JSON.parse(Settings.toJson()), null, 4);

		// Write that resulting string to the targetFilePath
		let resolvedPath = path.resolve(targetFilePath, "settings.json");
		console.log("Updating settings stored in: " + resolvedPath);
		let result = await fsPromises.writeFile(resolvedPath, stringToWrite,{encoding:'utf8',flag:'w'}).catch(error => error);

		// Return a success status and other success data? Bytes written or something? IDK
		if (result === undefined){
			// Apparently undefined is a success? https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options 
			console.log("Settings updated, file changed at: " + resolvedPath);
			return true;
		} else {
			return result;
		}
	}

	static toString(){
		return Settings.toJson();
	}

	static settingsCategories = [
		{
			category: "General",
			classRef: Settings.General
		},
		{
			category: "Interface",
			classRef: Settings.Interface
		},
		{
			category: "Video",
			classRef: Settings.Video
		},
		{
			category: "Audio",
			classRef: Settings.Audio
		},
		{
			category: "Storage",
			classRef: Settings.Storage
		}
	];

	static getProperty(propertyName: string, propertyCategory: string){
		// Iterate through all static classes inside of GameSettings,
		// and check if key exists
		let validProperty = null;

		let matchingCategory = Settings.settingsCategories.filter((catObj) => {
			if (propertyCategory == catObj.category){
				return true;
			}
		})[0];


		if (matchingCategory?.classRef.hasOwnProperty(propertyName)){
			//@ts-ignore
			validProperty = matchingCategory.classRef[propertyName]
			console.log("Valid property: " + validProperty);
		}

		// If key exists, return its value.
		return validProperty;
	}

	static setProperty(propertyName: string, propertyCategory: string, newValue: any){
		// Iterate through all static classes inside of GameSettings,
		// and check if key exists
		let matchingCategory = Settings.settingsCategories.filter((catObj) => {
			if (propertyCategory == catObj.category){
				return true;
			}
		})[0];

		console.log(matchingCategory, propertyCategory, propertyName);
		// If key exists, update its value.
		if (matchingCategory?.classRef.hasOwnProperty(propertyName)){
			console.log(`Updated ${propertyName} with ${newValue} within ${matchingCategory.category}`);
			//@ts-ignore
			matchingCategory.classRef[propertyName] = newValue;
			Settings.toJsonFile(Settings.Storage.localSettingsDirectory);
		} else {
			console.log("Did not update");
		}
	}
}



let resolvedGameSettingsPath = path.resolve(app.getAppPath(), "settings.json");
if (fs.existsSync(resolvedGameSettingsPath)){
	Settings.fromJsonFile(resolvedGameSettingsPath);
}

export var GameSettings = onChange(Settings, (path, value, previousValue, applyData) => {
	console.log('this:', this);
	console.log('path:', path);
	console.log('value:', value);
	console.log('previousValue:', previousValue);
	console.log('applyData:', applyData);

	Settings.toJsonFile(Settings.Storage.localSettingsDirectory);
});


