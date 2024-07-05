import React from "react";


export default function CustomButton ({onClick, children}){

	return <div className="customButton" onClick={onClick}>
		{children}
	</div>
}