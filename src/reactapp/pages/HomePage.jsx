import React from "react";
import "../styles/Home.css";
import { channels } from "../../shared/constants.js";
import CustomLink from "../components/CustomLink.jsx";
import { useTranslation } from "react-i18next";
import * as inflection from "inflection";

export const Home = (props) => {


	const {t} = useTranslation();

	const exitApp = () => {
		console.log("Clicked on button to buzz channel: " + channels.EXIT_APP);
		window.electronAPI.exitApp();
	}

	return (
		<div id="homeContent">
			<h1>{inflection.titleize(t("app_gamename"))}</h1>

			<section id="mainMenu">
				<div id="mainMenuButtons">
				<CustomLink to={"/menu/play"}>{ inflection.titleize(t("app_playgame")) }</CustomLink>
				<CustomLink to={"/menu/example"}> { inflection.titleize(t("app_stats")) } </CustomLink>
				<CustomLink to={"/menu/settings"}> { inflection.titleize(t("app_settings")) } </CustomLink>
				<CustomLink to={"/menu/credits"}> { inflection.titleize(t("app_credits")) } </CustomLink>
				<CustomLink onClick={exitApp} > { inflection.titleize(t("app_exit")) } </CustomLink>
				</div>
			</section>
		</div>
	)
}