import React from "react";
import "../styles/Credits.css";
const dependencyCopyrightInfo = require("../../shared/data/compliance.json");
import * as inflection from "inflection";
import { useTranslation } from "react-i18next";

export function Credits (props) {
	const {t} = useTranslation();

	return(
		<section className="page" id="creditsPage">
			<section className="pageTitle creditsTitle">
				<h1>{ inflection.titleize(t("app_credits")) }</h1>
			</section>
			

			<section className="pageContent">
				
			<section className="creditsStaff">
				<h2>{ inflection.titleize(t("app_credits_staff")) }</h2>
				<p>Alex Stormwood - { inflection.titleize(t("app_credits_solodeveloper")) } @ BigfootDS</p>
			</section>
			

			<section className="creditsDependencies">
				<h2>{ inflection.titleize(t("app_credits_projectdependencies")) }</h2>
				<section className="directDepLicenses">
					{dependencyCopyrightInfo.directDependencies.map((license, index) => {
						let licenseText = license.content;
						let dependenciesAsHumanString = "";
						
						license.dependencies.forEach(packageName => {
							dependenciesAsHumanString += `${packageName}\n`
						})


						return <div key={`license-directDependency-${index}`} className="directDepLicenseInfo">
								<h3 className="dependencyHeader">{dependenciesAsHumanString}</h3>
								<p className="licenseText">{licenseText}</p>
						</div>
					})}
				</section>
			</section>

			</section>
		</section>
	)
}