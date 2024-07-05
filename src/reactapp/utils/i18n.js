import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import localizationDatasheet from "../../shared/i18nLocalization.json";

const resources = {};

Object.keys(localizationDatasheet["json-ready"]).forEach(language => {
	resources[language] = {};
	resources[language].translation = localizationDatasheet["json-ready"][language]
});

// See all localized data that has been loaded: 
// console.log(resources);

i18next.use(initReactI18next).init({
	resources,
	fallbackLng: "en",
	debug: true,
	interpolation: {
		escapeValue: false, // not needed for React as React escapes by default, apparently?
	}
});

export default i18next;