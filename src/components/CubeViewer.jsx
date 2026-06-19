import { useEffect, useRef } from "react";

export default function CubeViewer({ setupAlg, currentSingleMove, isComplete, tempoScale = 0.9, stickering = "full" }) {
  const containerRef = useRef(null);
  const playerRef    = useRef(null);
  const readyRef     = useRef(false);
  const rafRef       = useRef(null);

  // Create / re-create TwistyPlayer when stickering changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;

    import("cubing/twisty").then(({ TwistyPlayer }) => {
      if (!isMounted) return;

      const player = new TwistyPlayer({
        puzzle:                 "3x3x3",
        alg:                   "",
        experimentalSetupAlg:  setupAlg,
        hintFacelets:          "none",
        background:            "none",
        controlPanel:          "none",
        visualization:         "3D",
        experimentalStickering: stickering,
        tempoScale,
      });

      player.style.width  = "100%";
      player.style.height = "100%";
      container.innerHTML = "";
      container.appendChild(player);
      playerRef.current = player;
      readyRef.current  = true;
    });

    return () => {
      isMounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (containerRef.current) containerRef.current.innerHTML = "";
      playerRef.current = null;
      readyRef.current  = false;
    };
  }, [stickering]);

  // Keep tempoScale in sync when speed changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.tempoScale = tempoScale;
    }
  }, [tempoScale]);

  // Animate on each move change
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!readyRef.current || !playerRef.current) return;

    const player = playerRef.current;

    if (!currentSingleMove) {
      try { player.pause(); } catch (_) {}
      player.experimentalSetupAlg = setupAlg;
      player.alg = "";
      return;
    }

    try { player.pause(); } catch (_) {}
    player.experimentalSetupAlg = setupAlg;
    player.alg = currentSingleMove;
    player.timestamp = 0;

    rafRef.current = requestAnimationFrame(() => {
      if (playerRef.current) {
        try {
          const playPromise = playerRef.current.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } catch (_) {}
      }
    });
  }, [setupAlg, currentSingleMove]);

  return (
    <div className="cube-viewer-wrapper">
      <div
        ref={containerRef}
        className="cube-player"
        aria-label="3D Rubik's Cube Visualizer"
      />

      {currentSingleMove && (
        <div className="cube-move-label" key={currentSingleMove + setupAlg}>
          <span className="move-label-arrow">▶</span>
          <span className="move-label-text">{currentSingleMove}</span>
        </div>
      )}

      {isComplete && (
        <div className="cube-complete-badge">
          <span className="badge-icon">✓</span>
          <span className="badge-text">Algorithm Complete!</span>
        </div>
      )}
    </div>
  );
}
