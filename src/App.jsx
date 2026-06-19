import { useState, useCallback } from "react";
import { algorithms, PLL_CATEGORIES } from "./data/algorithms";
import { ollAlgorithms, OLL_CATEGORIES } from "./data/oll";
import { useAlgorithmState, SPEED_PRESETS } from "./hooks/useAlgorithmState";
import CubeViewer from "./components/CubeViewer";
import AlgorithmTimeline from "./components/AlgorithmTimeline";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Controls from "./components/Controls";
import ProgressBar from "./components/ProgressBar";
import NotationGuide from "./components/NotationGuide";
import SolveTimer from "./components/SolveTimer";

export default function App() {
  const [selectedId, setSelectedId] = useState("T");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [theme,       setTheme]       = useState("dark");  // "dark" | "light"
  const [speedPreset, setSpeedPreset] = useState(SPEED_PRESETS[1]);
  const [topColor,    setTopColor]    = useState("yellow");
  const [mode,        setMode]        = useState("PLL");   // "PLL" | "OLL"

  const currentAlgorithms = mode === "PLL" ? algorithms : ollAlgorithms;
  const currentCategories = mode === "PLL" ? PLL_CATEGORIES : OLL_CATEGORIES;
  const selectedCase      = currentAlgorithms.find((a) => a.id === selectedId) ?? currentAlgorithms[0];
  const algorithmVariant  = selectedCase.variants[selectedVariantIndex] ?? selectedCase.variants[0];

  const {
    currentMoveIndex, currentChunkIndex, currentMoveWithinChunk,
    setupAlg, currentSingleMove, flatMoves,
    progress, isComplete, isAtStart, isPlaying,
    nextMove, prevMove, jumpToMove, toggleAutoplay, reset,
  } = useAlgorithmState(algorithmVariant, speedPreset);

  const [timerScramble, setTimerScramble] = useState("");
  const [timerMode,     setTimerMode]     = useState("pll");

  const handleActiveScrambleChange = useCallback((scramble, mode) => {
    setTimerScramble(scramble);
    setTimerMode(mode);
  }, []);

  const handleSelectCase = (id) => {
    setSelectedId(id);
    setSelectedVariantIndex(0);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="app-root" data-theme={theme}>
      <ProgressBar progress={progress} isComplete={isComplete} />

      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🧩</span>
          <span className="logo-text">CubeTrainer</span>
        </div>

        <div className="header-right">
          {/* PLL / OLL mode toggle */}
          <div className="mode-toggle" style={{ display: "flex", gap: "2px", background: "rgba(255,255,255,0.05)", padding: "3px", borderRadius: "20px", border: "1px solid var(--color-border)" }}>
            <button
              onClick={() => setMode("PLL")}
              className="header-tag"
              style={{ margin: 0, cursor: "pointer", border: mode === "PLL" ? undefined : "none", background: mode === "PLL" ? undefined : "transparent", color: mode === "PLL" ? undefined : "var(--color-text-dim)" }}
            >
              PLL
            </button>
            <button
              onClick={() => setMode("OLL")}
              className="header-tag"
              style={{ margin: 0, cursor: "pointer", border: mode === "OLL" ? undefined : "none", background: mode === "OLL" ? undefined : "transparent", color: mode === "OLL" ? undefined : "var(--color-text-dim)" }}
            >
              OLL
            </button>
          </div>

          {/* Theme toggle */}
          <button
            id="btn-theme-toggle"
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Top face colour selector */}
          <div className="top-color-selector">
            <span className="top-color-label">🎨</span>
            <select
              id="top-color-select"
              value={topColor}
              onChange={(e) => setTopColor(e.target.value)}
              className="top-color-select"
              aria-label="Top face color"
            >
              <option value="yellow">Yellow</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Left Column (70%): Algorithm selector + cube viewer + timeline + controls */}
        <section className="pane pane--practice-left" aria-label="Visualizer Panel">
          <AlgorithmSelector
            algorithms={currentAlgorithms}
            categories={currentCategories}
            selectedId={selectedId}
            onSelect={handleSelectCase}
          />

          <div className="timeline-divider" />

          <div className="practice-viewer-row">
            <CubeViewer
              topColor={topColor}
              setupAlg={timerMode === "full" ? timerScramble : setupAlg}
              currentSingleMove={timerMode === "full" ? "" : currentSingleMove}
              isComplete={timerMode === "full" ? false : isComplete}
              tempoScale={speedPreset.tempoScale}
              stickering={mode === "OLL" ? "OLL" : "PLL"}
            />

            <div className="practice-details-column">
              <AlgorithmTimeline
                algorithmCase={selectedCase}
                variant={algorithmVariant}
                selectedVariantIndex={selectedVariantIndex}
                onSelectVariant={(idx) => setSelectedVariantIndex(idx)}
                currentMoveIndex={currentMoveIndex}
                currentChunkIndex={currentChunkIndex}
                currentMoveWithinChunk={currentMoveWithinChunk}
                flatMoves={flatMoves}
                isComplete={isComplete}
                isPlaying={isPlaying}
                onJumpToMove={jumpToMove}
                mode={mode}
              />

              <div className="controls-divider" />

              <Controls
                onPrev={prevMove}
                onNext={nextMove}
                onToggleAutoplay={toggleAutoplay}
                onReset={reset}
                isAtStart={isAtStart}
                isComplete={isComplete}
                isPlaying={isPlaying}
                speedPreset={speedPreset}
                onSpeedChange={setSpeedPreset}
              />
            </div>
          </div>
        </section>

        <div className="pane-divider pane-divider--vertical" />

        {/* Right Column (30%): Timer */}
        <section className="pane pane--practice-right" aria-label="Practice Timer">
          <SolveTimer
            variant={algorithmVariant}
            onActiveScrambleChange={handleActiveScrambleChange}
          />
        </section>
      </main>

      <NotationGuide />
    </div>
  );
}
