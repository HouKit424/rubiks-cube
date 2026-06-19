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
  const [mode,        setMode]        = useState("PLL");   // "PLL" | "OLL"
  const [showTimer, setShowTimer]     = useState(false);

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



  const [showThemeMenu, setShowThemeMenu] = useState(false);

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
              style={{ margin: 0, cursor: "pointer", border: mode === "PLL" ? "1px solid var(--color-border)" : "none", background: mode === "PLL" ? "var(--color-surface)" : "transparent", color: mode === "PLL" ? "var(--color-text)" : "var(--color-text-dim)" }}
            >
              PLL
            </button>
            <button
              onClick={() => setMode("OLL")}
              className="header-tag"
              style={{ margin: 0, cursor: "pointer", border: mode === "OLL" ? "1px solid var(--color-border)" : "none", background: mode === "OLL" ? "var(--color-surface)" : "transparent", color: mode === "OLL" ? "var(--color-text)" : "var(--color-text-dim)" }}
            >
              OLL
            </button>
          </div>

          {/* Theme Selector Dropdown */}
          <div className="theme-selector-wrapper" style={{ position: 'relative' }}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="Select Theme"
              style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-surface)',
                border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px'
              }}
            >
              🎨
            </button>
            {showThemeMenu && (
              <div
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 100
                }}
              >
                {[
                  { id: 'dark', color: '#1e224a' },
                  { id: 'pastel-purple', color: '#d8b4fe' },
                  { id: 'pastel-blue', color: '#93c5fd' },
                  { id: 'pastel-green', color: '#86efac' },
                  { id: 'pastel-pink', color: '#f9a8d4' },
                  { id: 'pastel-orange', color: '#fdba74' },
                  { id: 'pastel-yellow', color: '#fde047' },
                  { id: 'pastel-mint', color: '#5eead4' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setShowThemeMenu(false); }}
                    title={t.id}
                    aria-label={`Select ${t.id} theme`}
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: t.color,
                      border: theme === t.id ? '2px solid var(--color-text)' : '1px solid rgba(0,0,0,0.2)',
                      cursor: 'pointer', padding: 0, transition: '0.2s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Timer Toggle */}
          <button
            onClick={() => setShowTimer(!showTimer)}
            title="Toggle Timer"
            style={{
              height: '32px', borderRadius: '20px', background: showTimer ? 'var(--color-active)' : 'var(--color-surface)',
              border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 12px', fontSize: '12px', fontWeight: 'bold', color: showTimer ? '#fff' : 'var(--color-text)', transition: '0.2s', marginLeft: '8px'
            }}
          >
            ⏱️ Timer
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Left Column: Algorithm selector + cube viewer + timeline + controls */}
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
              setupAlg={setupAlg}
              currentSingleMove={currentSingleMove}
              isComplete={isComplete}
              tempoScale={speedPreset.tempoScale}
              stickering="full"
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

        {showTimer && <div className="pane-divider pane-divider--vertical" />}

        {showTimer && (
          <section className="pane pane--practice-right" aria-label="Practice Timer">
            <SolveTimer
              variant={algorithmVariant}
              onActiveScrambleChange={handleActiveScrambleChange}
            />
          </section>
        )}
      </main>

      <NotationGuide />
    </div>
  );
}
