import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import CustomButton from "../components/CustomButton";
import * as inflection from "inflection";
import { useTranslation } from "react-i18next";
import { useLanguageName, useLanguageSelector } from "../contexts/LanguageContext";

export function Settings () {
	const {t} = useTranslation();

	let [worldSavesRoot, setWorldSavesRoot] = useState("");

	let [currentWindowMode, setCurrentWindowMode] = useState(0);

	let [masterVolume, setMasterVolume] = useState(0);
	let [musicVolume, setMusicVolume] = useState(0);
	let [effectsVolume, setEffectsVolume] = useState(0);
	

	const { i18n } = useTranslation();

	const activeLanguage = useLanguageName();
	const setActiveLanguage = useLanguageSelector();

	const forceWriteSettingsToFile = () => {
		window.electronAPI.forceWriteSettings();
	}

	const changeActiveLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setActiveLanguage(event.target.value); 
		console.log(event.target.value);
		window.electronAPI.gameSettingsSetProperty({name:"language", category:"Interface", newValue: event.target.value});
	}

	async function selectWorldSavesRootDirectory(){
		let result = await window.electronAPI.getFolder();
		console.log(result);
		setWorldSavesRoot(result);
	}

	async function openFileExplorerToWorldSavesRoot(){
		window.electronAPI.openFileExplorerToPath(worldSavesRoot);
	}

	async function toggleWindowMode(){
		if (currentWindowMode === 1){
			setCurrentWindowMode(0);
			window.electronAPI.fullscreenDisable();
			window.electronAPI.gameSettingsSetProperty({name:"windowMode", category:"Video", newValue: 0});
		} else {
			setCurrentWindowMode(1);
			window.electronAPI.fullscreenEnable();
			window.electronAPI.gameSettingsSetProperty({name:"windowMode", category:"Video", newValue: 1});
		}
	}

	async function updateMasterVolume(event: React.ChangeEvent<HTMLInputElement>){
		let result = await window.electronAPI.gameSettingsSetProperty({name:"masterVolume", category:"Audio", newValue: event.target.value});
		setMasterVolume(result);
	}

	useEffect(() => {
		const getSettingsData = async () => {
			let storedWorldSavesRoot = await window.electronAPI.gameSettingsGetProperty({name:"saveDataLocation", category: "Storage"});
			console.log("Retrieved: " + storedWorldSavesRoot);
			setWorldSavesRoot(storedWorldSavesRoot);

			let storedWindowMode = await window.electronAPI.gameSettingsGetProperty({name:"windowMode", category:"Video"});
			setCurrentWindowMode(storedWindowMode);
		}
		
		getSettingsData().catch(error => console.error(error));

		return () => {
			forceWriteSettingsToFile();
		}
	}, []);



	return(
		<section className="page"  id="settingsPage">
			<section className="pageTitle settingsTitle">
				<h1>{ inflection.titleize(t("app_settings")) }</h1>
				
			</section>

			<section className="pageContent">
				<section className="settingsContainer">
					<div className="settingsTitle">
						<h2>{ inflection.titleize(t("app_settings_interface")) }</h2>
					</div>
					<div className="settingsFields">
						<div>
							<label htmlFor="languageDropdown">{ inflection.titleize(t("app_settings_interface_gamelanguage")) }</label>

							<select name="languageDropdown" id="languageDropdown" value={activeLanguage} onChange={changeActiveLanguage}>
								{Object.keys(i18n.services.resourceStore.data).map((lang) => {
									return <option className="languageOption" key={lang} value={lang}>
										{lang.toLocaleUpperCase()}: {inflection.titleize(t("app_language", {lng: lang}))}
										</option>
								})}
							</select>
						</div>
					</div>
					
				</section>
				
				<section className="settingsContainer">
					<div className="settingsTitle">
						<h2>{ inflection.titleize(t("app_settings_video")) }</h2>
					</div>
					<div className="settingsFields">
						<div>
							<label htmlFor="windowModeDropdown">{ inflection.titleize(t("app_settings_video_windowmode")) }</label>
							<p>{ inflection.titleize(t("app_settings_video_currentwindowmode")) }: {currentWindowMode === 1 ? inflection.titleize(t("app_settings_video_fullscreen"))  : inflection.titleize(t("app_settings_video_windowed"))}</p>
							<CustomButton onClick={toggleWindowMode}>{ inflection.titleize(t("app_settings_video_windowmodetoggle")) }</CustomButton>
						</div>
					</div>
					
				</section>

				<section className="settingsContainer">
					<div className="settingsTitle">
						<h2>{ inflection.titleize(t("app_settings_audio")) }</h2>
					</div>
					<div className="settingsFields">
						<div>
							<label htmlFor="masterVolume">{ inflection.titleize(t("app_settings_audio_mastervolume")) }</label>
							<input type="range" name="masterVolume" id="masterVolumeInput" />
						</div>
						<div>
							<label htmlFor="musicVolume">{ inflection.titleize(t("app_settings_audio_musicvolume")) }</label>
							<input type="range" name="musicVolume" id="musicVolumeInput" />
						</div>
						<div>
							<label htmlFor="effectsVolume">{ inflection.titleize(t("app_settings_audio_effectsvolume")) }</label>
							<input type="range" name="effectsVolume" id="effectsVolumeInput" />
						</div>
						<div>
							<label htmlFor="ambientVolume">{ inflection.titleize(t("app_settings_audio_ambiencevolume")) }</label>
							<input type="range" name="ambientVolume" id="ambientVolumeInput" /> 
						</div>
					</div>
					
				</section>

				<section className="settingsContainer">
					<div className="settingsTitle">
						<h2>{ inflection.titleize(t("app_settings_storage")) }</h2>
					</div>
					<div className="settingsFields">
						<div>
						<label htmlFor="worldSavesRoot">{ inflection.titleize(t("app_settings_storage_savedatalocation")) }</label>
						<CustomButton onClick={openFileExplorerToWorldSavesRoot}>{ inflection.titleize(t("app_settings_storage_openfolder")) }</CustomButton>
						<CustomButton onClick={selectWorldSavesRootDirectory}>{ inflection.titleize(t("app_settings_storage_choosefolder")) }</CustomButton>
						<p>{worldSavesRoot && `${ inflection.titleize(t("app_settings_storage_savedatacurrentlocation")) }:\n${worldSavesRoot}`}</p>
						</div>
					</div>
					
				</section>
			</section>


			
		</section>
	)
}