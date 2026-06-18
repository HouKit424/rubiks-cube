import { useState } from 'react';

export default function NotationGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`notation-widget ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="notation-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Notation Guide"
      >
        <span className="notation-toggle-icon">📖</span>
        <span className="notation-toggle-text">Notation</span>
      </button>

      <div className="notation-panel">
        <div className="notation-header">
          <h3>Cube Notation Guide</h3>
          <button className="notation-close" onClick={() => setIsOpen(false)} aria-label="Close">×</button>
        </div>
        <div className="notation-content">
          <div className="notation-group">
            <h4>Basic Moves (Clockwise)</h4>
            <div className="notation-grid">
              <div className="notation-item"><kbd>R</kbd> Right face</div>
              <div className="notation-item"><kbd>L</kbd> Left face</div>
              <div className="notation-item"><kbd>U</kbd> Up face</div>
              <div className="notation-item"><kbd>D</kbd> Down face</div>
              <div className="notation-item"><kbd>F</kbd> Front face</div>
              <div className="notation-item"><kbd>B</kbd> Back face</div>
            </div>
          </div>
          <div className="notation-group">
            <h4>Modifiers</h4>
            <div className="notation-row"><kbd>'</kbd> Prime = Counter-clockwise (e.g. R')</div>
            <div className="notation-row"><kbd>2</kbd> Double turn (180°) (e.g. U2)</div>
            <div className="notation-row"><kbd>w</kbd> Wide turn (two layers) (e.g. Rw)</div>
          </div>
          <div className="notation-group">
            <h4>Slices & Rotations</h4>
            <div className="notation-grid">
              <div className="notation-item"><kbd>M</kbd> Middle slice</div>
              <div className="notation-item"><kbd>E</kbd> Equator slice</div>
              <div className="notation-item"><kbd>S</kbd> Standing slice</div>
              <div className="notation-item"><kbd>x</kbd> Rotate up</div>
              <div className="notation-item"><kbd>y</kbd> Rotate left</div>
              <div className="notation-item"><kbd>z</kbd> Rotate face</div>
            </div>
          </div>
          <div className="notation-group">
            <h4>Keyboard Shortcuts</h4>
            <div className="notation-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="notation-item"><kbd>Space</kbd> Play / Pause Autoplay</div>
              <div className="notation-item"><kbd>←</kbd> <kbd>→</kbd> Previous / Next Move</div>
              <div className="notation-item"><kbd>R</kbd> Reset to Start</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
