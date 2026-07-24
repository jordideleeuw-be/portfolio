import React, { useState } from "react";

// Zet je eigen SVG's in public/icons/ — bestandsnaam = tool-naam in
// kleine letters, spaties vervangen door streepjes. Bijvoorbeeld:
// "After Effects" -> public/icons/after-effects.svg -> /icons/after-effects.svg
function slugify(name) {
	return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function ToolIcon({ name }) {
	return <img src={`/icons/${slugify(name)}.svg`} alt={name} title={name} className="tool-icon" />;
}

export default function SplitLayout({ leftContent, title, description, tools, liveUrl, liveLabel, liveButtonText }) {
	// Dit houdt bij of de "Read More" info open (true) of dicht (false) is
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="project-block">
			{/* Media/content — nu full-width, 12 kolommen breed. */}
			<div className="project-media">{leftContent}</div>

			<div className="project-header">
				<h2 className="project-title">{title}</h2>
				<button
					className="read-more-btn"
					onClick={() => setIsOpen(!isOpen)}
					aria-expanded={isOpen}
				>
					{isOpen ? "Read Less" : "Read More"}
				</button>
			</div>

			{/* Klapt open/dicht via grid-template-rows (0fr <-> 1fr) — geen
			    JS-gemeten hoogte nodig, animeert vanzelf soepel. */}
			<div className={`project-details ${isOpen ? "open" : ""}`}>
				<div className="project-details-inner">
					<div className="project-details-content">
						<div className="info-block">
							<h3>About</h3>
							<p>{description}</p>
						</div>

						{tools && tools.length > 0 && (
							<div className="info-block">
								<h3>Software Used</h3>
								<div className="tools-list">
									{tools.map((tool, index) => (
										<ToolIcon key={index} name={tool} />
									))}
								</div>
							</div>
						)}

						{/* Optioneel: alleen renderen als er een liveUrl is meegegeven */}
						{liveUrl && (
							<div className="info-block visit-block">
								<h3>{liveLabel || "Bekijk het project"}</h3>
								<a href={liveUrl} target="_blank" rel="noopener noreferrer" className="visit-button">
									{liveButtonText || "BEZOEK"}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
