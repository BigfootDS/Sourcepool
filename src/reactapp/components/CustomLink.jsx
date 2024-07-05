import React from "react";
import { Link } from "react-router-dom";


export default function CustomLink ({onClick, to, children}){

	return <Link onClick={onClick} className="customLink" to={to}>
		{children}
	</Link>
}