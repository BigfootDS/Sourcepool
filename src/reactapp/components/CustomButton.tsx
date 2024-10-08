import React from "react";

interface CustomButtonProps {
	onClick: React.MouseEventHandler<HTMLDivElement>,
	children: React.ReactNode
}

export default function CustomButton ({onClick, children}: CustomButtonProps){

	return <div className="customButton" onClick={onClick}>
		{children}
	</div>
}