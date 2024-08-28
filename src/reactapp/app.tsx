import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/customComponents.css";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Home } from "./pages/HomePage";
import TitleBar from "./components/TitleBar";
import SaveManager from "./components/SaveManager";
import MenuPageWrapper from "./pages/MenuPageWrapper";
import { Credits } from "./pages/CreditsPage";
import { Settings } from "./pages/SettingsPage";
import { BarePageExample } from "./pages/_barePageExample";

import LanguageProvider from "./contexts/LanguageContext";

import './utils/i18n.js';
import CurrentUserProvider from "./contexts/CurrentUserContext";
import LocalServerManager from "./pages/LocalServerManager";
import ServerDiscoveryProvider from "./contexts/ServerDiscoveryContext";
import BaseLayout from "./pages/_BaseLayout";
import UserSelection from "./pages/UserSelection";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<MemoryRouter>
				<LanguageProvider>
					<CurrentUserProvider>
						<ServerDiscoveryProvider>
							<Helmet>
								<meta name="viewport" content="width=device-width,initial-scale=1.0" />
								<title>Sourcepool</title>
								<link rel="apple-touch-icon" sizes="180x180" href="../assets/logo/apple-touch-icon.png" />
								<link rel="icon" type="image/png" sizes="32x32" href="../assets/logo/favicon-32x32.png" />
								<link rel="icon" type="image/png" sizes="16x16" href="../assets/logo/favicon-16x16.png" />
								<link rel="mask-icon" href="../assets/logo/safari-pinned-tab.svg" color="#000000" />
								<meta name="msapplication-TileColor" content="#000000" />
								<meta name="theme-color" content="#ffffff" />
								<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />


							</Helmet>
							<TitleBar />
							<main>


								<Routes>
									<Route path="/" element={<BaseLayout />}>

										<Route index element={<UserSelection />} />

										{/* <Route index element={<Home />} />

										<Route path="menu" element={<MenuPageWrapper />}>
											<Route path="savedata" element={<SaveManager />} />
											<Route path="credits" element={<Credits />} />
											<Route path="settings" element={<Settings />} />
											<Route path="example" element={<BarePageExample />} />
										</Route> */}



									</Route>
								</Routes>

							</main>

							</ServerDiscoveryProvider>
					</CurrentUserProvider>
				</LanguageProvider>
			</MemoryRouter>
		</HelmetProvider>
	</React.StrictMode>
);