import { SPEED_PRESETS } from "../hooks/useAlgorithmState";

export default function Controls({
  onPrev, onNext, onToggleAutoplay, onReset,
  isAtStart, isComplete, isPlaying,
  speedPreset, onSpeedChange,
}) {
  return (
    <div className="controls-bar">
      {/* Left: nav buttons */}
      <div className="controls-group">
        <button
          id="btn-prev-move"
          className="control-btn"
          onClick={onPrev}
          disabled={isAtStart || isPlaying}
          title="Previous Move (←)"
          aria-label="Previous Move"
        >
          <kbd className="key-badge">←</kbd>
          <span className="key-label">Prev</span>
        </button>

        <button
          id="btn-autoplay"
          className={`control-btn control-btn--primary ${isPlaying ? "control-btn--playing" : ""}`}
          onClick={onToggleAutoplay}
          title="Autoplay / Pause (Space)"
          aria-label={isPlaying ? "Pause Autoplay" : "Autoplay"}
        >
          <kbd className="key-badge key-badge--space">Space</kbd>
          <span className="key-label">
            {isPlaying ? "⏸ Pause" : "▶ Autoplay"}
          </span>
        </button>

        <button
          id="btn-next-move"
          className="control-btn"
          onClick={onNext}
          disabled={isComplete || isPlaying}
          title="Next Move (→)"
          aria-label="Next Move"
        >
          <kbd className="key-badge">→</kbd>
          <span className="key-label">Next</span>
        </button>
      </div>

      {/* Centre: speed selector */}
      <div className="speed-selector" role="group" aria-label="Playback Speed">
        <span className="speed-label">Speed</span>
        {SPEED_PRESETS.map((preset) => (
          <button
            key={preset.id}
            id={`speed-${preset.id}`}
            className={`speed-btn ${speedPreset.id === preset.id ? "speed-btn--active" : ""}`}
            onClick={() => onSpeedChange(preset)}
            aria-pressed={speedPreset.id === preset.id}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Right: reset */}
      <button
        id="btn-reset"
        className="control-btn control-btn--ghost"
        onClick={onReset}
        title="Reset (R)"
        aria-label="Reset Algorithm"
      >
        <kbd className="key-badge">R</kbd>
        <span className="key-label">Reset</span>
      </button>
    </div>
  );
}
