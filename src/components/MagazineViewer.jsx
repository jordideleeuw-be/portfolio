import { useState, useRef, useEffect } from "react";
import styles from "./MagazineViewer.module.css";

// Two-stage load for one spread: stage 1 (a solid, genuinely sharp image)
// renders immediately; only once IT finishes loading does stage 2 (the
// full, near-native-resolution responsive srcset) start fetching — never
// in parallel, so the big request never competes with the first for
// bandwidth. Mounted fresh (via `key={spread.id}` in the parent) on every
// navigation, so each spread gets its own two-stage load, not just the
// first one shown.
// Inlined (not <img src="/icons/arrow.svg">) so the disabled state below can
// set its own fill/stroke directly — an external <img> can't be recolored
// per-state without CSS filter hacks.
function ArrowIcon({ disabled }) {
	return (
		<svg
			viewBox="0 0 450 300"
			className={`${styles["nav-arrow-icon"]}${disabled ? " " + styles["nav-arrow-icon--disabled"] : ""}`}
			aria-hidden="true"
		>
			<polygon
				points="450 150 210.61 0 248.25 100 0 100 0 200 248.25 200 210.61 300 450 150"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}

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
		<div className={styles["spread-content"]}>
			<div className={`${styles["spread-photo"]} ${styles[`spread-photo--${spread.orientation}`]}`}>
				<img
					ref={stage1Ref}
					src={spread.stage1Src}
					width={spread.stage1Width}
					height={spread.stage1Height}
					alt={spread.caption}
					className={styles["spread-image"]}
					loading={priority ? "eager" : "lazy"}
					onLoad={() => setStage1Loaded(true)}
				/>
				{stage1Loaded && (
					<img
						srcSet={spread.fullSrcSet}
						sizes="(max-width: 900px) 100vw, 95vw"
						alt=""
						aria-hidden="true"
						className={`${styles["spread-image"]} ${styles["spread-image--full"]} ${stage2Loaded ? styles.loaded : ""}`}
						onLoad={() => setStage2Loaded(true)}
					/>
				)}
			</div>
		</div>
	);
}

export default function MagazineViewer({ spreads, framePaddingTopPercent, initialIndex = 1 }) {
	// Desktop starts on Spread 1 (index 1), not the cover — prev still goes
	// back to it, it's just not the first thing shown. Mobile passes
	// initialIndex={0} to start on the cover instead (see Magazine.astro).
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
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
		<div className={styles["magazine-container"]}>
			{/* HET BEELD */}
			<div
				className={`${styles["spread-frame"]} ${styles[`spread-frame--${current.orientation}`]}`}
				style={{ paddingTop: `${framePaddingTopPercent}%` }}
			>
				<SpreadImage key={current.id} spread={current} priority={currentIndex === initialIndex} />
			</div>

			{/* DE NAVIGATIE */}
			<div className={styles["magazine-nav"]}>
				<button onClick={prevSpread} disabled={currentIndex === 0} className={`${styles["nav-btn"]} ${styles["nav-btn--prev"]}`} aria-label="Previous page">
					<ArrowIcon disabled={currentIndex === 0} />
				</button>

				<button onClick={nextSpread} disabled={currentIndex === spreads.length - 1} className={`${styles["nav-btn"]} ${styles["nav-btn--next"]}`} aria-label="Next page">
					<ArrowIcon disabled={currentIndex === spreads.length - 1} />
				</button>
			</div>
		</div>
	);
}
