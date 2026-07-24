import React, { useState } from "react";

export default function MagazineViewer({ spreads, framePaddingTopPercent }) {
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
			<div
				className={`spread-frame spread-frame--${spreads[currentIndex].orientation}`}
				style={{ paddingTop: `${framePaddingTopPercent}%` }}
			>
				<img
					src={spreads[currentIndex].image}
					srcSet={spreads[currentIndex].srcSet}
					sizes="(max-width: 900px) 100vw, 75vw"
					alt={spreads[currentIndex].caption}
					className="spread-image"
					loading={currentIndex === 0 ? "eager" : "lazy"}
				/>
			</div>

			{/* DE NAVIGATIE */}
			<div className="magazine-nav">
				<button onClick={prevSpread} disabled={currentIndex === 0} className="nav-btn nav-btn--prev" aria-label="Previous page">
					<img src="/icons/arrow.svg" alt="" className="nav-arrow-icon" />
				</button>

				<button onClick={nextSpread} disabled={currentIndex === spreads.length - 1} className="nav-btn nav-btn--next" aria-label="Next page">
					<img src="/icons/arrow.svg" alt="" className="nav-arrow-icon" />
				</button>
			</div>
		</div>
	);
}
