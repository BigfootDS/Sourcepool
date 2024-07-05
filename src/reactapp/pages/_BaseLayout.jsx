
import React from "react";
import { Outlet } from "react-router-dom";
import NavigatorOutOfGame from "../components/NavigatorOutOfGame.jsx";

export default function BaseLayout(props){


	return(
		<section id="menuPageWrapper">
			<NavigatorOutOfGame />
			
			<Outlet />
			
		</section>
	)
}