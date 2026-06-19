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
  const [theme,        setTheme]        = useState("dark");   // "dark" | "light"
  const [speedPreset,  setSpeedPreset]  = useState(SPEED_PRESETS[1]); // normal
  const [topColor, setTopColor] = useState('yellow'); // default top face color
  const [layoutMode,   setLayoutMode]   = useState(() => {
    return localStorage.getItem("cubetrainer_layout_mode") ?? "practice";
  });

  const [mode, setMode] = useState("PLL"); // "PLL" | "OLL"

  const currentAlgorithms = mode === "PLL" ? algorithms : ollAlgorithms;
  const currentCategories = mode === "PLL" ? PLL_CATEGORIES : OLL_CATEGORIES;
  const selectedCase = currentAlgorithms.find((a) => a.id === selectedId) ?? currentAlgorithms[0];
  const algorithmVariant = selectedCase.variants[selectedVariantIndex] ?? selectedCase.variants[0];

  const {
    currentMoveIndex, currentChunkIndex, currentMoveWithinChunk,
    setupAlg, currentSingleMove, flatMoves,
    progress, isComplete, isAtStart, isPlaying,
    nextMove, prevMove, jumpToMove, toggleAutoplay, reset,
  } = useAlgorithmState(algorithmVariant, speedPreset);

  const [timerScramble, setTimerScramble] = useState("");
  const [timerMode, setTimerMode] = useState("pll"); // "pll" | "full"

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

          {/* Layout mode toggle */}
          <button
            id="btn-layout-toggle"
            className="layout-toggle"
            onClick={() => {
              setLayoutMode((prev) => {
                const next = prev === "practice" ? "classic" : "practice";
                localStorage.setItem("cubetrainer_layout_mode", next);
                return next;
              });
            }}
            title={`Switch to ${layoutMode === "practice" ? "Classic" : "Practice"} Layout`}
            aria-label="Toggle layout"
          >
            {layoutMode === "practice" ? "📋" : "⏱️"}
          </button>

          {/* Theme toggle */}
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
          {/* Top color selector */}
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

      <main className="app-main" data-layout={layoutMode}>
        {layoutMode === "practice" ? (
          <>
            {/* Left Column (70%): Visualizer + Chunks (in two rows/blocks) + Selector & controls */}
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

            {/* Right Column (30%): Full Screen Timer */}
            <section className="pane pane--practice-right" aria-label="Practice Timer">
              <SolveTimer
                variant={algorithmVariant}
                onActiveScrambleChange={handleActiveScrambleChange}
              />
            </section>
          </>
        ) : (
          <>
            {/* Top: 3D Cube + Algorithm Timeline side-by-side */}
            <section className="pane pane--cube" aria-label="3D Cube & Timeline">
              <CubeViewer
                topColor={topColor}
                setupAlg={timerMode === "full" ? timerScramble : setupAlg}
                currentSingleMove={timerMode === "full" ? "" : currentSingleMove}
                isComplete={timerMode === "full" ? false : isComplete}
                tempoScale={speedPreset.tempoScale}
                stickering={mode === "OLL" ? "OLL" : "PLL"}
              />
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
            </section>

            <div className="pane-divider" />

            {/* Bottom: Configuration & Interactive Tools */}
            <section className="pane pane--timeline" aria-label="Controls & Timer Panel">
              <AlgorithmSelector
                algorithms={currentAlgorithms}
                categories={currentCategories}
                selectedId={selectedId}
                onSelect={handleSelectCase}
              />

              <div className="timeline-divider" />

              <div className="bottom-dashboard">
                <div className="bottom-controls-column">
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
                <SolveTimer
                  variant={algorithmVariant}
                  hideScramble={true}
                  onActiveScrambleChange={handleActiveScrambleChange}
                />
              </div>
            </section>
          </>
        )}
      </main>

      <NotationGuide />
    </div>
  );
}

