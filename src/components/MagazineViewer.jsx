import React, { useState, useRef, useEffect } from "react";

// Two-stage load for one spread: stage 1 (a solid, genuinely sharp image)
// renders immediately; only once IT finishes loading does stage 2 (the
// full, near-native-resolution responsive srcset) start fetching — never
// in parallel, so the big request never competes with the first for
// bandwidth. Mounted fresh (via `key={spread.id}` in the parent) on every
// navigation, so each spread gets its own two-stage load, not just the
// first one shown.
function SpreadImage({ spread, priority }) {
	const [stage1Loaded, setStage1Loaded] = useState(false);
	const [stage2Loaded, setStage2Loaded] = useState(false);
	const stage1Ref = useRef(null);

	// A browser-cached image can finish loading (and fire its native `load`
	// event) before React hydrates and attaches the onLoad handler below —
	// this catches that case on mount instead of waiting for an event that
	// already happened.
	useEffect(() => {
		if (stage1Ref.current?.complete) {
			setStage1Loaded(true);
		}
	}, []);

	return (
		<>
			<img
				ref={stage1Ref}
				src={spread.stage1Src}
				width={spread.stage1Width}
				height={spread.stage1Height}
				alt={spread.caption}
				className="spread-image"
				loading={priority ? "eager" : "lazy"}
				onLoad={() => setStage1Loaded(true)}
			/>
			{stage1Loaded && (
				<img
					srcSet={spread.fullSrcSet}
					sizes="(max-width: 900px) 100vw, 95vw"
					alt=""
					aria-hidden="true"
					className={`spread-image spread-image--full ${stage2Loaded ? "loaded" : ""}`}
					onLoad={() => setStage2Loaded(true)}
				/>
			)}
		</>
	);
}

export default function MagazineViewer({ spreads, framePaddingTopPercent }) {
	// Dit houdt bij op welke spread we nu zitten (begint bij 0, dus de cover)
	const [currentIndex, setCurrentIndex] = useState(0);
	const current = spreads[currentIndex];

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
				className={`spread-frame spread-frame--${current.orientation}`}
				style={{ paddingTop: `${framePaddingTopPercent}%` }}
			>
				<SpreadImage key={current.id} spread={current} priority={currentIndex === 0} />
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
