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
	// Dit houdt bij of de rechterkolom open (true) of dicht (false) is
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`split-layout-wrapper ${isOpen ? "info-open" : "info-closed"}`}>
			{/* LINKER KANT: Beeld/Grid. Blijft ALTIJD op kolom 1-9. */}
			<div className="left-pane">{leftContent}</div>

			{/* RECHTER KANT: Informatie Lade. Blijft ALTIJD op kolom 10-12. */}
			<div className={`right-pane ${isOpen ? "open" : "closed"}`}>
				{/* Alleen het pijltje, altijd — geen tekst, geen border, geen
				    hover. Draait 180 graden om dicht/open aan te geven. */}
				<button className="toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle information panel">
					<img src="/icons/arrow.svg" alt="" className={`arrow-icon ${isOpen ? "" : "arrow-flipped"}`} />
				</button>

				<div className="pane-content">
					<div className="info-block">
						<h3>Project</h3>
						<h2>{title}</h2>
					</div>

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
	);
}
