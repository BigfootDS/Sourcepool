import React from "react";
import { Outlet } from "react-router-dom";
import NavigatorOutOfGame from "../components/NavigatorOutOfGame.jsx";


export default function MenuPageWrapper (props) {


	return (
		<section id="menuPageWrapper">
			<NavigatorOutOfGame />
			<Outlet />
			
		</section>
	);
}