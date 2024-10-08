import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
	onClick: React.MouseEventHandler<HTMLAnchorElement>,
	to: string,
	children: React.ReactNode
}

export default function CustomLink ({onClick, to, children}: CustomLinkProps){

	return <Link onClick={onClick} className="customLink" to={to}>
		{children}
	</Link>
}