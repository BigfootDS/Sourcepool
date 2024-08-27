import React from "react";
import { Outlet } from "react-router-dom";
import NavigatorOutOfGame from "../components/NavigatorOutOfGame.js";


export default function MenuPageWrapper () {


	return (
		<section id="menuPageWrapper">
			<NavigatorOutOfGame />
			<Outlet />
			
		</section>
	);
}