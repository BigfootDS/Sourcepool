import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";


let defaultLanguage = "en";

export const languages = {
	en: {

	}
}

const LanguageNameContext = createContext(defaultLanguage);
const LanguageSelectorContext = createContext(null);

export function useLanguageName(){
	return useContext(LanguageNameContext);
}

export function useLanguageSelector(){
	return useContext(LanguageSelectorContext);
}

interface LanguageProviderProps {
	children: React.ReactNode
}

export default function LanguageProvider({children}: LanguageProviderProps){
	const [language, setLanguage] = useState(defaultLanguage);
	const [languageStored, setLanguageStored] = useLocalStorage("language", defaultLanguage);
	
	const {i18n} = useTranslation();

	const selectLanguage = (newLang: string) => {
		if (Object.keys(i18n.services.resourceStore.data).includes(newLang)){
			console.log("Setting language to selection now.");
			i18n.changeLanguage(newLang);
			return true;
		} else {
			console.log("Invalid language supplied. Doing nothing.");
			return false;
		}
	}

	// On app start, themeStored is automatically pulled from 
	// the browser's local storage and then applied to this global state.
	useEffect(() => {
		setLanguage(languageStored);
		console.log("Available languages:\n" + Object.keys(i18n.services.resourceStore.data));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// If the theme changes, set the new value to the browser's local storage.
	useEffect(() => {
		if (selectLanguage(language)){
			setLanguageStored(language);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	return(
		<LanguageNameContext.Provider value={language} >
			<LanguageSelectorContext.Provider value={setLanguage}>
				{children}
			</LanguageSelectorContext.Provider>
		</LanguageNameContext.Provider>
	)
}