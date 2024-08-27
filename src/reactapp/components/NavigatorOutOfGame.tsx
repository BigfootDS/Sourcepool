import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton.js";
import * as inflection from "inflection";
import { useTranslation } from "react-i18next";

export default function NavigatorOutOfGame () {
	const {t} = useTranslation();

	const navigate = useNavigate();

	return(
		<section id="navigatorOutOfGame">
		<CustomButton onClick={() => navigate(-1)}>
			{ inflection.titleize(t("app_ui_back")) }
		</CustomButton>
		</section>
	)
}