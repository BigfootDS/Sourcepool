import React, { useState } from "react";


export default function WorldInfoCard ({worldName, filePath}) {

	// console.log({worldName, filePath});

	return(
		<section className="worldInfoCard" >
			<div className="infoContainer">
				<p className="wicWorldName">
					{worldName}
				</p>
				<p className="wicFilePath">
					{filePath}
				</p>
			</div>
			<div className="buttonContainer">
				<div className="wicSelectSpacer">
					<button>Select World</button>
				</div>
				<div className="wicViewSpacer">
					<button>View World Data</button>
				</div>
			</div>
		</section>
	)
}