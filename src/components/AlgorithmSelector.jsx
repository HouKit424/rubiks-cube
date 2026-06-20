import AlgorithmIcon from "./AlgorithmIcon";

export default function AlgorithmSelector({ algorithms, categories, selectedId, onSelect }) {
  return (
    <div className="selector-root">
      {categories.map((cat) => {
        const algsInCat = algorithms.filter((a) => a.category === cat.id);
        return (
          <div key={cat.id} className="selector-group">
            <span
              className="selector-group-label"
              style={{ color: cat.color }}
            >
              {cat.label}
            </span>
            <div className="selector-pills">
              {algsInCat.map((alg) => {
                const totalMoves = alg.variants[0].chunks.reduce(
                  (s, c) => s + c.moves.length, 0
                );
                return (
                  <button
                    key={alg.id}
                    id={`alg-btn-${alg.id}`}
                    className={`alg-pill ${selectedId === alg.id ? "alg-pill--active" : ""}`}
                    style={{ "--pill-color": cat.color }}
                    onClick={() => onSelect(alg.id)}
                    title={`${alg.name} — ${totalMoves} moves`}
                  >
                    <AlgorithmIcon algId={alg.id} size={32} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                      <span className="pill-name">{alg.id}</span>
                      <span className="pill-count">{totalMoves} moves</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
