import React from "react";

export function BarePageExample (props) {

	return(
		<section className="page" id="customIdForPage">
			<section className="pageTitle">
				<h1>Example Page</h1>
			</section>
			
			{/* Scrolling is enabled for pageContent, but not the page as a whole. */}
			<section className="pageContent">
				<section id="somePageSpecificContentId">
					<p>If you're not a developer working on this game, you should never see this page!</p>
				</section>
			</section>

		</section>
	)
}