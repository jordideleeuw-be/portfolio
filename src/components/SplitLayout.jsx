import React, { useState } from "react";

export default function SplitLayout({ leftContent, title, description, tools }) {
	// Dit houdt bij of de rechterkolom open (true) of dicht (false) is
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`split-layout-wrapper ${isOpen ? "info-open" : "info-closed"}`}>
			{/* LINKER KANT: Beeld/Grid. Blijft ALTIJD op kolom 1-9 —
			    de daadwerkelijke breedte-verandering gebeurt op de
			    wrapper hierboven (grid-template-columns), niet hier. */}
			<div className="left-pane">{leftContent}</div>

			{/* RECHTER KANT: Informatie Lade. Blijft ALTIJD op kolom 10-12. */}
			<div className={`right-pane ${isOpen ? "open" : "closed"}`}>
				{/* DE KLAP-KNOP: vast gepositioneerd t.o.v. de wrapper (zie CSS) */}
				<button className="toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle information panel">
					{isOpen ? "→" : "← INFO"}
				</button>

				{/* DE INHOUD VAN DE LADE (verdwijnt netjes uit beeld als hij dichtklapt) */}
				<div className="pane-content">
					<div className="info-block">
						<h3>Project</h3>
						<h2>{title}</h2>
					</div>

					<div className="info-block">
						<h3>About</h3>
						<p>{description}</p>
					</div>

					{/* Software / Tools lijstje */}
					{tools && tools.length > 0 && (
						<div className="info-block">
							<h3>Software Used</h3>
							<div className="tools-list">
								{tools.map((tool, index) => (
									<span key={index} className="tool-badge">
										{tool}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
