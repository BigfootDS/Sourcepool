import React, { useEffect, useState } from "react";
import { useCurrentUsername } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import LocalServerManager from "./LocalServerManager";


export default function UserSelection(){

	const navigate = useNavigate();

	const currentUsername = useCurrentUsername();
	
	const [availableUsers, setAvailableUsers] = useState([]);
	
 
	return (
		<>
		<h1>Selected user: {currentUsername}</h1>

		{availableUsers.length > 0 && 
		<>
			<h3>Available users:</h3>

			<ul>
				{availableUsers.map((userObj) => {
					return <li key={userObj.username}>
						{userObj.username}
					</li>
				})}
			</ul>
		</>
		
		}
		

		<hr />
		<button className="customButton" onClick={() => navigate("/")}>
			Proceed as selected user
		</button>

		<LocalServerManager />
		</>
	)
}