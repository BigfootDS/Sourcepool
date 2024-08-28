import React from "react";
import { Outlet } from "react-router-dom";
import NavigatorOutOfGame from "../components/NavigatorOutOfGame";


export default function MenuPageWrapper () {


	return (
		<section id="menuPageWrapper">
			<NavigatorOutOfGame />
			<Outlet />
			
		</section>
	);
}