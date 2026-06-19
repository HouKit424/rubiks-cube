import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { flattenMoves, movesToAlgString, invertAlgorithm } from "../data/algorithms";

// Playback speed presets: { label, interval (ms between moves), tempoScale for TwistyPlayer }
export const SPEED_PRESETS = [
  { id: "slow",   label: "0.7×", intervalMs: 1100, tempoScale: 0.9  },
  { id: "normal", label: "1×",   intervalMs: 700,  tempoScale: 1.4  },
  { id: "fast",   label: "1.5×", intervalMs: 450,  tempoScale: 2.0  },
];

export function useAlgorithmState(algorithm, speedPreset = SPEED_PRESETS[1]) {
  const flatMoves  = useMemo(() => flattenMoves(algorithm), [algorithm]);
  const totalMoves = flatMoves.length;

  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [isPlaying, setIsPlaying]               = useState(false);
  const autoplayRef = useRef(null);

  // Reset when algorithm changes
  useEffect(() => {
    stopAutoplay();
    setCurrentMoveIndex(-1);
  }, [algorithm]);

  const chunkBoundaries = useMemo(() => {
    const boundaries = [];
    let idx = 0;
    algorithm.chunks.forEach((chunk) => {
      boundaries.push({ start: idx, end: idx + chunk.moves.length - 1 });
      idx += chunk.moves.length;
    });
    return boundaries;
  }, [algorithm]);

  const currentChunkIndex = useMemo(() => {
    if (currentMoveIndex < 0) return -1;
    return flatMoves[currentMoveIndex]?.chunkIndex ?? -1;
  }, [currentMoveIndex, flatMoves]);

  const currentMoveWithinChunk = useMemo(() => {
    if (currentMoveIndex < 0) return -1;
    return flatMoves[currentMoveIndex]?.moveInChunk ?? -1;
  }, [currentMoveIndex, flatMoves]);

  const setupAlg = useMemo(() => {
    // We want the cube to start "unsolved", such that applying the full algorithm solves it.
    // So the initial setup is the inverse of the ENTIRE algorithm.
    // Then we add whatever moves from the algorithm we have applied before `currentSingleMove`.
    const fullInverse = invertAlgorithm(flatMoves.map(m => m.move));
    const playedSoFar = currentMoveIndex < 0 ? [] : flatMoves.slice(0, currentMoveIndex).map((m) => m.move);
    return movesToAlgString(["x2", "y2", ...fullInverse, ...playedSoFar]);
  }, [currentMoveIndex, flatMoves]);

  const currentSingleMove = useMemo(() => {
    if (currentMoveIndex < 0) return "";
    return flatMoves[currentMoveIndex]?.move ?? "";
  }, [currentMoveIndex, flatMoves]);

  const appliedAlgString = useMemo(() => {
    if (currentMoveIndex < 0) return "";
    return movesToAlgString(flatMoves.slice(0, currentMoveIndex + 1).map((m) => m.move));
  }, [currentMoveIndex, flatMoves]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const nextMove = useCallback(() => {
    setCurrentMoveIndex((prev) => Math.min(prev + 1, totalMoves - 1));
  }, [totalMoves]);

  const prevMove = useCallback(() => {
    setCurrentMoveIndex((prev) => Math.max(prev - 1, -1));
  }, []);

  const jumpToMove = useCallback((index) => {
    const clamped = Math.max(-1, Math.min(index, totalMoves - 1));
    setCurrentMoveIndex(clamped);
  }, [totalMoves]);

  const reset = useCallback(() => {
    stopAutoplay();
    setCurrentMoveIndex(-1);
  }, []);

  // ── Autoplay ──────────────────────────────────────────────────────────────
  function stopAutoplay() {
    setIsPlaying(false);
  }

  const startAutoplay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const toggleAutoplay = useCallback(() => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      if (currentMoveIndex >= totalMoves - 1) {
        setCurrentMoveIndex(-1);
        setTimeout(() => startAutoplay(), 80);
      } else {
        startAutoplay();
      }
    }
  }, [isPlaying, currentMoveIndex, totalMoves, startAutoplay]);

  // Handle dynamic delays for autoplay
  useEffect(() => {
    if (isPlaying) {
      if (currentMoveIndex >= totalMoves - 1) {
        setIsPlaying(false);
        return;
      }
      
      const currentMoveStr = flatMoves[currentMoveIndex]?.move || "";
      const isDouble = currentMoveStr.includes("2");
      const delay = speedPreset.intervalMs * (isDouble ? 1.6 : 1);

      const tid = setTimeout(() => {
        setCurrentMoveIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(tid);
    }
  }, [isPlaying, currentMoveIndex, totalMoves, speedPreset.intervalMs, flatMoves]);

  // ── Keyboard listeners ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      // Skip default navigation shortcuts if the solve timer is actively focused, armed, or running
      if (
        document.body.classList.contains("timer-active") ||
        document.body.classList.contains("timer-running") ||
        document.activeElement?.closest(".timer-card")
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowRight": e.preventDefault(); if (!isPlaying) nextMove(); break;
        case "ArrowLeft":  e.preventDefault(); if (!isPlaying) prevMove(); break;
        case " ":          e.preventDefault(); toggleAutoplay(); break;
        case "r": case "R": reset(); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextMove, prevMove, toggleAutoplay, reset, isPlaying]);

  const progress  = totalMoves > 0 ? ((currentMoveIndex + 1) / totalMoves) * 100 : 0;
  const isComplete = currentMoveIndex === totalMoves - 1;
  const isAtStart  = currentMoveIndex === -1;

  return {
    currentMoveIndex, currentChunkIndex, currentMoveWithinChunk,
    appliedAlgString, setupAlg, currentSingleMove,
    flatMoves, chunkBoundaries,
    progress, isComplete, isAtStart,
    isPlaying,
    nextMove, prevMove, jumpToMove, toggleAutoplay, reset,
  };
}
