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

// Standard utm_source/utm_medium query params — most analytics tools
// (GA, Plausible, etc.) recognize these automatically and will show
// "jordideleeuw" as a traffic source, without needing any code on the
// destination site itself.
function withSourceTracking(url) {
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}utm_source=jordideleeuw&utm_medium=portfolio`;
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
						<div className="info-row">
							<div className="info-block about-block">
								<h3>About</h3>
								{/* A literal newline inside description doesn't create a visual
								    break on its own — HTML collapses whitespace, so a single
								    <p> just runs it all together regardless of \n in the source
								    string. Splitting on real line breaks and rendering each as
								    its own <p> is what actually produces separate blocks. */}
								{description.split("\n").map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}

								{/* Optioneel: alleen renderen als er een liveUrl is meegegeven —
								    zit in about-block zodat het onder de about-tekst zelf staat,
								    even breed als die kolom, niet de volle breedte. */}
								{liveUrl && (
									<div className="visit-block">
										<h3>{liveLabel || "Bekijk het project"}</h3>
										<a href={withSourceTracking(liveUrl)} target="_blank" rel="noopener" className="visit-button">
											{liveButtonText || "BEZOEK"}
										</a>
									</div>
								)}
							</div>

							{tools && tools.length > 0 && (
								<div className="info-block tools-block">
									<h3>Software Used</h3>
									<div className="tools-list">
										{tools.map((tool, index) => (
											<ToolIcon key={index} name={tool} />
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
