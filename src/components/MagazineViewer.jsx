import React, { useState } from "react";

export default function MagazineViewer() {
	// Hier zet je jouw spreads.
	// Tip: Bij een echt magazine is je cover vaak 1 enkele staande foto,
	// en zijn je spreads (pag 2+3, 4+5) brede liggende foto's!
	const spreads = [
		{ id: 1, image: "/images/page1.jpg", caption: "Cover" },
		{ id: 2, image: "/images/page2-3.jpg", caption: "Spread 01 — Index & Editorial" },
		{ id: 3, image: "/images/page4-5.jpg", caption: "Spread 02 — Visual Essay" },
		{ id: 4, image: "/images/page6-7.jpg", caption: "Spread 03 — Typography" },
		{ id: 5, image: "/images/page8.jpg", caption: "Backcover" },
	];

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
				<img src={spreads[currentIndex].image} alt={spreads[currentIndex].caption} className="spread-image" />
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
