import React from 'react';
import ollData from '../data/ollIconData.json';
import { PLL_ICON_DATA } from '../data/pllIconData';

const C = {
  bg: 'transparent',
  grid: 'var(--color-border)',
  yellow: '#fbbf24',
  dark: 'var(--color-future)',
  front: '#4caf50',
  right: '#f44336',
  back: '#2196f3',
  left: '#ff9800',
  white: '#ffffff',
  arrow1: '#000000',
  arrow2: '#000000'
};

const SOLVED = {
  T: { c1: C.back },
  R: { c1: C.right },
  B: { c1: C.front },
  L: { c1: C.left },
  TL: { c1: C.back, c2: C.left },
  TR: { c1: C.back, c2: C.right },
  BL: { c1: C.front, c2: C.left },
  BR: { c1: C.front, c2: C.right }
};

function getScrambled(cycles) {
  const state = {};
  for (const k in SOLVED) state[k] = { ...SOLVED[k] };
  cycles.forEach(cyc => {
    const saved = { ...state[cyc] };
    for (let i = 0; i < cyc.length - 1; i++) {
      state[cyc[i]] = { ...state[cyc[i + 1]] };
    }
    state[cyc[cyc.length - 1]] = saved;
  });
  return state;
}

export default function AlgorithmIcon({ algId, mode, size = 48 }) {
  const S = size;
  const pad = S * 0.125;
  const cs = (S - pad * 2) / 3;
  const bw = S * 0.06;
  const r = 2; // border radius for stickers

  const isOLL = mode === 'OLL' || /^\d+$/.test(algId) || algId.startsWith('OLL');

  if (isOLL) {
    const searchId = algId.startsWith('OLL') ? algId : `OLL-${algId}`;
    const caseData = ollData.find(o => o.id === searchId);
    if (!caseData) return <svg width={S} height={S} />;

    return (
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ flexShrink: 0 }}>
        {/* Draw top face grid */}
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => {
            const isYellow = caseData.top[row * 3 + col] === 1;
            return (
              <rect
                key={`top-${row}-${col}`}
                x={pad + col * cs + 1}
                y={pad + row * cs + 1}
                width={cs - 2}
                height={cs - 2}
                rx={r}
                fill={isYellow ? C.yellow : C.dark}
              />
            );
          })
        )}

        {/* Draw sides */}
        {/* Top (Back) */}
        {caseData.sides.t.map((isY, i) => (
          <rect key={`t-${i}`} x={pad + i * cs + (i === 1 ? 1 : 2)} y={1} width={i === 1 ? cs - 2 : cs - 4} height={bw} rx={1.5} fill={isY ? C.yellow : C.dark} />
        ))}
        {/* Bottom (Front) */}
        {caseData.sides.b.map((isY, i) => (
          <rect key={`b-${i}`} x={pad + i * cs + (i === 1 ? 1 : 2)} y={S - 1 - bw} width={i === 1 ? cs - 2 : cs - 4} height={bw} rx={1.5} fill={isY ? C.yellow : C.dark} />
        ))}
        {/* Left */}
        {caseData.sides.l.map((isY, i) => (
          <rect key={`l-${i}`} x={1} y={pad + i * cs + (i === 1 ? 1 : 2)} width={bw} height={i === 1 ? cs - 2 : cs - 4} rx={1.5} fill={isY ? C.yellow : C.dark} />
        ))}
        {/* Right */}
        {caseData.sides.r.map((isY, i) => (
          <rect key={`r-${i}`} x={S - 1 - bw} y={pad + i * cs + (i === 1 ? 1 : 2)} width={bw} height={i === 1 ? cs - 2 : cs - 4} rx={1.5} fill={isY ? C.yellow : C.dark} />
        ))}
      </svg>
    );
  }

  if (mode === 'PLL' || (!isOLL && PLL_ICON_DATA.some(p => p.id === algId))) {
    let searchId = algId;
    if (algId.endsWith("-Perm")) {
      searchId = algId.replace("-Perm", "");
    }

    const caseData = PLL_ICON_DATA.find(p => p.id === searchId);
    if (!caseData) return <svg width={S} height={S} />;

    const state = getScrambled(caseData.cyc);

    const drawArrows = () => {
      const cen = S / 2;
      const pts = {
        TL: [pad + cs * 0.5, pad + cs * 0.5],
        TR: [pad + cs * 2.5, pad + cs * 0.5],
        BL: [pad + cs * 0.5, pad + cs * 2.5],
        BR: [pad + cs * 2.5, pad + cs * 2.5],
        T: [cen, pad + cs * 0.5],
        B: [cen, pad + cs * 2.5],
        L: [pad + cs * 0.5, cen],
        R: [pad + cs * 2.5, cen]
      };

      return caseData.cyc.map((cyc, idx) => {
        const color = idx === 0 ? C.arrow1 : C.arrow2;
        const elements = [];

        if (cyc.length === 2) {
          const [ax, ay] = pts[cyc[0]];
          const [bx, by] = pts[cyc[1]];

          elements.push(
            <line key={`line-${idx}`} x1={ax} y1={ay} x2={bx} y2={by} stroke={color} strokeWidth="2" strokeLinecap="round" />,
            <polygon key={`head1-${idx}`} points={getArrowPoints(ax, ay, bx, by)} fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round" />,
            <polygon key={`head2-${idx}`} points={getArrowPoints(bx, by, ax, ay)} fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round" />
          );
        } else {
          const n = cyc.length;
          for (let i = 0; i < n; i++) {
            const [ax, ay] = pts[cyc[i]];
            const [bx, by] = pts[cyc[(i + 1) % n]];
            const mx = (ax + bx) / 2, my = (ay + by) / 2;
            const cx_ = mx - (my - (S / 2)) * 0.35;
            const cy_ = my + (mx - (S / 2)) * 0.35;

            const t = 0.85;
            const ex = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * cx_ + t * t * bx;
            const ey = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * cy_ + t * t * by;

            elements.push(
              <path key={`arc-${idx}-${i}`} d={`M ${ax} ${ay} Q ${cx_} ${cy_} ${bx} ${by}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />,
              <polygon key={`head-${idx}-${i}`} points={getArrowPoints(ex, ey, bx, by)} fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            );
          }
        }
        return elements;
      });
    };

    return (
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ flexShrink: 0 }}>
        {/* Draw top face grid */}
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`grid-${row}-${col}`}
              x={pad + col * cs + 1}
              y={pad + row * cs + 1}
              width={cs - 2}
              height={cs - 2}
              rx={r}
              fill={C.yellow}
            />
          ))
        )}

        {/* Draw edges and corners colors */}
        <rect x={pad + cs + 1} y={1} width={cs - 2} height={bw} rx={1.5} fill={state.T.c1} />
        <rect x={pad + cs + 1} y={S - 1 - bw} width={cs - 2} height={bw} rx={1.5} fill={state.B.c1} />
        <rect x={1} y={pad + cs + 1} width={bw} height={cs - 2} rx={1.5} fill={state.L.c1} />
        <rect x={S - 1 - bw} y={pad + cs + 1} width={bw} height={cs - 2} rx={1.5} fill={state.R.c1} />

        <rect x={pad + 2} y={1} width={cs - 4} height={bw} rx={1.5} fill={state.TL.c1} />
        <rect x={1} y={pad + 2} width={bw} height={cs - 4} rx={1.5} fill={state.TL.c2} />

        <rect x={pad + cs * 2 + 2} y={1} width={cs - 4} height={bw} rx={1.5} fill={state.TR.c1} />
        <rect x={S - 1 - bw} y={pad + 2} width={bw} height={cs - 4} rx={1.5} fill={state.TR.c2} />

        <rect x={pad + 2} y={S - 1 - bw} width={cs - 4} height={bw} rx={1.5} fill={state.BL.c1} />
        <rect x={1} y={pad + cs * 2 + 2} width={bw} height={cs - 4} rx={1.5} fill={state.BL.c2} />

        <rect x={pad + cs * 2 + 2} y={S - 1 - bw} width={cs - 4} height={bw} rx={1.5} fill={state.BR.c1} />
        <rect x={S - 1 - bw} y={pad + cs * 2 + 2} width={bw} height={cs - 4} rx={1.5} fill={state.BR.c2} />

        {/* Draw arrows */}
        {drawArrows()}
      </svg>
    );
  }

  return <svg width={S} height={S} />;
}

// Utility to generate arrow head polygon points
function getArrowPoints(x1, y1, x2, y2) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 5;
  const p1x = x2 - size * Math.cos(angle - Math.PI / 6);
  const p1y = y2 - size * Math.sin(angle - Math.PI / 6);
  const p2x = x2 - size * Math.cos(angle + Math.PI / 6);
  const p2y = y2 - size * Math.sin(angle + Math.PI / 6);
  return `${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`;
}
