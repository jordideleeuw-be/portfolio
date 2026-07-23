import React, { useState } from "react";

export default function MagazineViewer({ spreads }) {
	// Dit houdt bij op welke spread we nu zitten (begint bij 0, dus de cover)
	const [currentIndex, setCurrentIndex] = useState(0);

	// Functie voor de volgende pagina
	const nextSpread = () => {
		if (currentIndex < spreads.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	// Functie voor de vorige pagina
	const prevSpread = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div className="magazine-container">
			{/* HET BEELD */}
			<div className="spread-frame">
				<img
					src={spreads[currentIndex].image}
					alt={spreads[currentIndex].caption}
					className="spread-image"
					loading={currentIndex === 0 ? "eager" : "lazy"}
				/>
			</div>

			{/* DE NAVIGATIE & CAPTION */}
			<div className="magazine-nav">
				<button onClick={prevSpread} disabled={currentIndex === 0} className="nav-btn">
					&larr; Prev
				</button>

				<span className="spread-counter">
					{currentIndex + 1} / {spreads.length}
					<span className="caption-text"> — {spreads[currentIndex].caption}</span>
				</span>

				<button onClick={nextSpread} disabled={currentIndex === spreads.length - 1} className="nav-btn">
					Next &rarr;
				</button>
			</div>
		</div>
	);
}
