import React, { useEffect, useState } from "react";
import "../styles/TitleBar.css";

import minimizeImage from "../../shared/assets/buttons/minimize_FILL0_wght400_GRAD0_opsz24.svg";
import maximizeImage from "../../shared/assets/buttons/check_box_outline_blank_FILL0_wght400_GRAD0_opsz24.svg";
import exitImage from "../../shared/assets/buttons/close_FILL0_wght400_GRAD0_opsz24.svg";

import gameLogo from "../../shared/assets/logo/apple-touch-icon.png";

import { channels } from "../../shared/constants";
import { useTranslation } from "react-i18next";
import * as inflection from "inflection";




export default function TitleBar(props) {

	let [currentWindowMode, setCurrentWindowMode] = useState(0);

	const {t} = useTranslation();

	window.electronAPI.fullscreenSendUpdate((value) => {
		console.log("Frontend received fullscreen value from backend: " + value);
		setCurrentWindowMode(value);
	})

	const getFullscreenStatus = async () => {
		let result = await window.electronAPI.gameSettingsGetProperty({name:"windowMode", category:"Video"});
		console.log("Titlebar retrieved fullscreen status: " + result);
		if (result === null){
			setTimeout(() => {
				getFullscreenStatus();
			}, 1000);
		} else {
			setCurrentWindowMode(result || currentWindowMode);
		}
	}

	const minimizeWindow = () => {
		console.log("Clicked on button to buzz channel: " + channels.MINIMIZE_WINDOW);
		window.electronAPI.minimizeWindow();
	}

	const maximizeWindow = () => {
		console.log("Clicked on button to buzz channel: " + channels.MAXIMIZE_WINDOW);
		window.electronAPI.maximizeWindow();
	}

	const exitApp = () => {
		console.log("Clicked on button to buzz channel: " + channels.EXIT_APP);
		window.electronAPI.exitApp();
	}

	useEffect(() => {
		getFullscreenStatus();
	}, []);

	return <header id="titleBarHeader" style={{display: currentWindowMode === 1 ? "none" : "block"}}>
		<div className="row" >
			<div className="column" id="titleLogoAndText">
				<div className="row">
					<div className="column">
						<img 
							id="titleLogo" 
							src={gameLogo} 
							alt="Logo of Sourcepool." 
							
						/>
					</div>
					<div className="column">
						<p id="gameTitleBarText">{inflection.titleize(t("app_gamename"))}</p>
					</div>
				</div>
			</div>


			<div className="column">
				<div className="row" id="titleBarWindowButtons">
					<div className="column">
						<button 
							onClick={minimizeWindow} 
							id="titleBarMinimizeButton" 
							className="titleBarButton"
							title="Minimize"
						>
							<img src={minimizeImage} />
						</button>
					</div>
					<div className="column">
						<button 
							onClick={maximizeWindow} 
							id="titleBarMaximizeButton" 
							className="titleBarButton"
							title="Maximize"
						>
							<img src={maximizeImage} />
						</button>
					</div>
					<div className="column">
						<button 
							onClick={exitApp} 
							id="titleBarExitButton" 
							className="titleBarButton" 
							title="Exit"
						>
							<img src={exitImage} />
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>
}