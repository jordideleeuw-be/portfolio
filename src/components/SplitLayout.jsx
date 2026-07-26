import React, { useState } from "react";
import styles from "./SplitLayout.module.css";

// Zet je eigen SVG's in public/icons/ — bestandsnaam = tool-naam in
// kleine letters, spaties vervangen door streepjes. Bijvoorbeeld:
// "After Effects" -> public/icons/after-effects.svg -> /icons/after-effects.svg
function slugify(name) {
	return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function ToolIcon({ name }) {
	return <img src={`/icons/${slugify(name)}.svg`} alt={name} title={name} className={styles["tool-icon"]} />;
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
		<div className={styles["project-block"]}>
			{/* Media/content — nu full-width, 12 kolommen breed. */}
			<div className={styles["project-media"]}>{leftContent}</div>

			<div className={styles["project-header"]}>
				<h2 className={styles["project-title"]}>{title}</h2>
				<button
					className={styles["read-more-btn"]}
					onClick={() => setIsOpen(!isOpen)}
					aria-expanded={isOpen}
				>
					{/* CSS (not JS) swaps which one shows, based on viewport width —
					    see .btn-text-full/.btn-text-short in SplitLayout.module.css. */}
					<span className={styles["btn-text-full"]}>{isOpen ? "Lees minder" : "Lees meer"}</span>
					<span className={styles["btn-text-short"]}>{isOpen ? "Minder" : "Meer"}</span>
				</button>
			</div>

			{/* Klapt open/dicht via grid-template-rows (0fr <-> 1fr) — geen
			    JS-gemeten hoogte nodig, animeert vanzelf soepel. */}
			<div className={`${styles["project-details"]} ${isOpen ? styles.open : ""}`}>
				<div className={styles["project-details-inner"]}>
					<div className={styles["project-details-content"]}>
						<div className={styles["info-row"]}>
							<div className={`${styles["info-block"]} ${styles["about-block"]}`}>
								<h3>Over</h3>
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
									<div className={styles["visit-block"]}>
										<h3>{liveLabel || "Bekijk het project"}</h3>
										<a href={withSourceTracking(liveUrl)} target="_blank" rel="noopener" className={styles["visit-button"]}>
											{liveButtonText || "BEZOEK"}
										</a>
									</div>
								)}
							</div>

							{tools && tools.length > 0 && (
								<div className={`${styles["info-block"]} ${styles["tools-block"]}`}>
									<h3>Gebruikte programma's</h3>
									<div className={styles["tools-list"]}>
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
