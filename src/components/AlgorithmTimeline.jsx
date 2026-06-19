import { useMemo } from "react";
import AlgorithmIcon from "./AlgorithmIcon";

const CATEGORY_EMOJIS = {
  // OLL categories
  dot: "⚪", line: "➖", cross: "➕", lshape: "📐", pshape: "🅿️",
  tshape: "🇹", cshape: "🇨", wshape: "〰️", fish: "🐟", awkward: "🔀", other: "✨",
  // PLL categories
  edge: "↔️", corner: "🔲", mixed: "🔄", gperm: "🇬",
};

/**
 * AlgorithmTimeline — chunks display with clickable move chips (jump-to-move).
 */
export default function AlgorithmTimeline({
  algorithmCase,
  variant,
  selectedVariantIndex,
  onSelectVariant,
  currentMoveIndex,
  currentChunkIndex,
  flatMoves,
  isComplete,
  isPlaying,
  onJumpToMove,
  mode = "PLL",
}) {
  let globalMoveIdx = 0;
  const categoryEmoji = CATEGORY_EMOJIS[algorithmCase.category] || "🧩";

  return (
    <div className="timeline-container">
      <div className="timeline-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
        
        <div className="case-illustration" style={{ width: "70px", height: "70px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AlgorithmIcon algId={algorithmCase.id} mode={mode} size={64} />
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 className="algo-name">{algorithmCase.name}</h2>
            <span className="algo-category">{categoryEmoji} {algorithmCase.category.toUpperCase()}</span>
            {isPlaying && (
              <span className="playing-badge">
                <span className="playing-dot" />
                Playing
              </span>
            )}
          </div>
          <p className="algo-description" style={{ marginTop: "6px", fontSize: "12px", color: "var(--color-text-dim)" }}>{algorithmCase.description}</p>
        </div>
      </div>

      {algorithmCase.variants && algorithmCase.variants.length > 1 && (
        <div className="variant-selector">
          <span className="variant-label">Variant:</span>
          {algorithmCase.variants.map((v, idx) => (
            <button
              key={v.id}
              className={`variant-btn ${idx === selectedVariantIndex ? "variant-btn--active" : ""}`}
              onClick={() => onSelectVariant(idx)}
              aria-pressed={idx === selectedVariantIndex}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}

      <div className="chunks-row" role="list">
        {variant.chunks.map((chunk, chunkIdx) => {
          const isActiveChunk  = chunkIdx === currentChunkIndex;
          const isPastChunk    = chunkIdx < currentChunkIndex;
          const isFutureChunk  = chunkIdx > currentChunkIndex;

          return (
            <div
              key={chunk.id}
              role="listitem"
              className={[
                "chunk-card",
                isActiveChunk ? "chunk-card--active" : "",
                isPastChunk   ? "chunk-card--done"   : "",
                isFutureChunk ? "chunk-card--future"  : "",
                isComplete    ? "chunk-card--complete" : "",
              ].filter(Boolean).join(" ")}
            >
              {chunk.label && (
                <span className="chunk-label">{chunk.label}</span>
              )}

              <div className="moves-row">
                {chunk.moves.map((move, moveInChunkIdx) => {
                  const gIdx        = globalMoveIdx++;
                  const isActiveMove = gIdx === currentMoveIndex;
                  const isPastMove   = gIdx < currentMoveIndex;
                  const isFutureMove = gIdx > currentMoveIndex;

                  return (
                    <button
                      key={`${chunk.id}-${moveInChunkIdx}`}
                      className={[
                        "move-chip",
                        isActiveMove ? "move-chip--active" : "",
                        isPastMove   ? "move-chip--done"   : "",
                        isFutureMove ? "move-chip--future" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => onJumpToMove(gIdx)}
                      title={`Jump to: ${move}`}
                      aria-label={`Move ${gIdx + 1}: ${move}${isActiveMove ? " (current)" : isPastMove ? " (done)" : " (upcoming)"}`}
                      aria-pressed={isActiveMove}
                    >
                      <span className="move-letter">{move}</span>
                      {isActiveMove && (
                        <span className="move-cursor" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isPastChunk && (
                <span className="chunk-done-icon" aria-label="Chunk complete">✓</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Move counter */}
      <div className="move-counter">
        <span className="counter-current">{currentMoveIndex + 1}</span>
        <span className="counter-separator">/</span>
        <span className="counter-total">{flatMoves.length}</span>
        <span className="counter-label">moves</span>
      </div>
    </div>
  );
}
