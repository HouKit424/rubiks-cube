export const PLL_CATEGORIES = [
  { id: "edge",   label: "Edge Only",    color: "#22d3ee" },
  { id: "corner", label: "Corner Only",  color: "#a78bfa" },
  { id: "mixed",  label: "Mixed",        color: "#f59e0b" },
  { id: "gperm",  label: "G-Perms",      color: "#34d399" },
];

export const algorithms = [
  // ── Edge Only (4) ─────────────────────────────────────────────────────
  {
    id: "H", name: "H-Perm", category: "edge",
    description: "Swaps two pairs of opposite edges.",
    variants: [
      {
        id: "H-1", name: "Standard MU",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["M2", "U"] },
          { id: "c1", label: "Core",   moves: ["M2", "U2"] },
          { id: "c2", label: "Finish", moves: ["M2", "U", "M2"] },
        ]
      },
      {
        id: "H-2", name: "Alternative MU",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["M2", "U'"] },
          { id: "c1", label: "Core",   moves: ["M2", "U2"] },
          { id: "c2", label: "Finish", moves: ["M2", "U'", "M2"] },
        ]
      }
    ]
  },
  {
    id: "Z", name: "Z-Perm", category: "edge",
    description: "Swaps two pairs of adjacent edges.",
    variants: [
      {
        id: "Z-1", name: "Standard MU",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["M'", "U", "M2", "U"] },
          { id: "c1", label: "Core",   moves: ["M2", "U", "M'"] },
          { id: "c2", label: "Finish", moves: ["U2", "M2", "U'"] },
        ]
      },
      {
        id: "Z-2", name: "Alternative MU",
        chunks: [
          { id: "c0", label: "Part 1", moves: ["M2", "U", "M2", "U"] },
          { id: "c1", label: "Part 2", moves: ["M'", "U2", "M2", "U2", "M'"] },
        ]
      }
    ]
  },
  {
    id: "Ua", name: "Ua-Perm", category: "edge",
    description: "Cycles three edges counter-clockwise on the U face.",
    variants: [
      {
        id: "Ua-1", name: "Standard MU",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["M2", "U"] },
          { id: "c1", label: "Core",   moves: ["M", "U2"] },
          { id: "c2", label: "Finish", moves: ["M'", "U", "M2"] },
        ]
      },
      {
        id: "Ua-2", name: "Standard RU",
        chunks: [
          { id: "c0", label: "Flow 1", moves: ["R", "U'", "R", "U"] },
          { id: "c1", label: "Flow 2", moves: ["R", "U", "R", "U'"] },
          { id: "c2", label: "Finish", moves: ["R'", "U'", "R2"] },
        ]
      }
    ]
  },
  {
    id: "Ub", name: "Ub-Perm", category: "edge",
    description: "Cycles three edges clockwise on the U face.",
    variants: [
      {
        id: "Ub-1", name: "Standard MU",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["M2", "U'"] },
          { id: "c1", label: "Core",   moves: ["M", "U2"] },
          { id: "c2", label: "Finish", moves: ["M'", "U'", "M2"] },
        ]
      },
      {
        id: "Ub-2", name: "Standard RU",
        chunks: [
          { id: "c0", label: "Flow 1", moves: ["R2", "U", "R", "U"] },
          { id: "c1", label: "Flow 2", moves: ["R'", "U'", "R'", "U'"] },
          { id: "c2", label: "Finish", moves: ["R'", "U", "R'"] },
        ]
      }
    ]
  },

  // ── Corner Only (5) ───────────────────────────────────────────────────
  {
    id: "Aa", name: "Aa-Perm", category: "corner",
    description: "Cycles three corners counter-clockwise.",
    variants: [
      {
        id: "Aa-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup", moves: ["x", "R'", "U", "R'"] },
          { id: "c1", label: "D2",    moves: ["D2", "R", "U'", "R'"] },
          { id: "c2", label: "Finish",moves: ["D2", "R2", "x'"] },
        ]
      },
      {
        id: "Aa-2", name: "Front version",
        chunks: [
          { id: "c0", label: "Setup", moves: ["y'", "R'", "F", "R'"] },
          { id: "c1", label: "B2",    moves: ["B2", "R", "F'", "R'"] },
          { id: "c2", label: "Finish",moves: ["B2", "R2"] },
        ]
      }
    ]
  },
  {
    id: "Ab", name: "Ab-Perm", category: "corner",
    description: "Cycles three corners clockwise.",
    variants: [
      {
        id: "Ab-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup", moves: ["x'", "R", "U'", "R"] },
          { id: "c1", label: "D2",    moves: ["D2", "R'", "U", "R"] },
          { id: "c2", label: "Finish",moves: ["D2", "R2", "x"] },
        ]
      },
      {
        id: "Ab-2", name: "Front version",
        chunks: [
          { id: "c0", label: "Setup", moves: ["y", "R", "B'", "R"] },
          { id: "c1", label: "F2",    moves: ["F2", "R'", "B", "R"] },
          { id: "c2", label: "Finish",moves: ["F2", "R2"] },
        ]
      }
    ]
  },
  {
    id: "E", name: "E-Perm", category: "corner",
    description: "Swaps two pairs of diagonally opposite corners.",
    variants: [
      {
        id: "E-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["x'", "R", "U'", "R'", "D"] },
          { id: "c1", label: "Forward", moves: ["R", "U", "R'", "D'"] },
          { id: "c2", label: "Back",    moves: ["R", "U", "R'", "D"] },
          { id: "c3", label: "Finish",  moves: ["R", "U'", "R'", "D'", "x"] },
        ]
      }
    ]
  },
  {
    id: "Na", name: "Na-Perm", category: "corner",
    description: "Swaps two pairs of diagonal corners (front/back).",
    variants: [
      {
        id: "Na-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Part 1", moves: ["R", "U'", "L", "U2"] },
          { id: "c1", label: "Part 2", moves: ["R'", "U", "L'"] },
          { id: "c2", label: "Part 3", moves: ["R", "U'", "L", "U2"] },
          { id: "c3", label: "Finish", moves: ["R'", "U", "L'", "U2"] },
        ]
      }
    ]
  },
  {
    id: "Nb", name: "Nb-Perm", category: "corner",
    description: "Swaps two pairs of diagonal corners (left/right).",
    variants: [
      {
        id: "Nb-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Part 1", moves: ["L'", "U", "R'", "U2"] },
          { id: "c1", label: "Part 2", moves: ["L", "U'", "R"] },
          { id: "c2", label: "Part 3", moves: ["L'", "U", "R'", "U2"] },
          { id: "c3", label: "Finish", moves: ["L", "U'", "R", "U2"] },
        ]
      }
    ]
  },

  // ── Mixed – Adjacent (8) ──────────────────────────────────────────────
  {
    id: "T", name: "T-Perm", category: "mixed",
    description: "Swaps adjacent corners and adjacent edges. Very common in LL.",
    variants: [
      {
        id: "T-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Sexy Move",    moves: ["R", "U", "R'", "U'"] },
          { id: "c1", label: "Setup",        moves: ["R'", "F", "R2", "U'"] },
          { id: "c2", label: "Reverse Sexy", moves: ["R'", "U'", "R", "U"] },
          { id: "c3", label: "Finish",       moves: ["R'", "F'"] },
        ]
      }
    ]
  },
  {
    id: "F", name: "F-Perm", category: "mixed",
    description: "Swaps a pair of adjacent corners and a pair of adjacent edges (cross pattern).",
    variants: [
      {
        id: "F-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",  moves: ["R'", "U'", "F'"] },
          { id: "c1", label: "Core",   moves: ["R", "U", "R'", "U'", "R'", "F", "R2"] },
          { id: "c2", label: "Finish", moves: ["U'", "R'", "U'", "R", "U", "R'", "U", "R"] },
        ]
      }
    ]
  },
  {
    id: "Ja", name: "Ja-Perm", category: "mixed",
    description: "Swaps two adjacent corners and two adjacent edges (J shape).",
    variants: [
      {
        id: "Ja-1", name: "Standard L",
        chunks: [
          { id: "c0", label: "Setup",    moves: ["R'", "U2", "R", "U"] },
          { id: "c1", label: "L Insert", moves: ["R'", "U2", "L"] },
          { id: "c2", label: "Finish",   moves: ["U'", "R", "U", "L'"] },
        ]
      },
      {
        id: "Ja-2", name: "Standard R",
        chunks: [
          { id: "c0", label: "Reverse Setup", moves: ["x", "R2", "F", "R", "F'"] },
          { id: "c1", label: "Core", moves: ["R", "U2", "r'", "U", "r", "U2", "x'"] },
        ]
      }
    ]
  },
  {
    id: "Jb", name: "Jb-Perm", category: "mixed",
    description: "Swaps two adjacent corners and two adjacent edges (J shape, mirrored).",
    variants: [
      {
        id: "Jb-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Sexy",    moves: ["R", "U", "R'", "F'"] },
          { id: "c1", label: "Core",    moves: ["R", "U", "R'", "U'", "R'", "F", "R2"] },
          { id: "c2", label: "Finish",  moves: ["U'", "R'", "U'"] },
        ]
      }
    ]
  },
  {
    id: "Ra", name: "Ra-Perm", category: "mixed",
    description: "Swaps a pair of adjacent corners and edges (R shape).",
    variants: [
      {
        id: "Ra-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R", "U'", "R'", "U'"] },
          { id: "c1", label: "D Move",  moves: ["R", "U", "R", "D"] },
          { id: "c2", label: "Release", moves: ["R'", "U'", "R", "D'"] },
          { id: "c3", label: "Finish",  moves: ["R'", "U2", "R'"] },
        ]
      }
    ]
  },
  {
    id: "Rb", name: "Rb-Perm", category: "mixed",
    description: "Swaps a pair of adjacent corners and edges (R shape, mirrored).",
    variants: [
      {
        id: "Rb-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R'", "U2", "R", "U2"] },
          { id: "c1", label: "F Move",  moves: ["R'", "F", "R", "U"] },
          { id: "c2", label: "Release", moves: ["R'", "U'", "R'", "F'"] },
          { id: "c3", label: "Finish",  moves: ["R2", "U'"] },
        ]
      }
    ]
  },
  {
    id: "Y", name: "Y-Perm", category: "mixed",
    description: "Swaps a pair of diagonal corners and a pair of adjacent edges.",
    variants: [
      {
        id: "Y-1", name: "Standard",
        chunks: [
          { id: "c0", label: "F Setup",   moves: ["F", "R", "U'", "R'", "U'"] },
          { id: "c1", label: "Core",      moves: ["R", "U", "R'", "F'"] },
          { id: "c2", label: "Sexy",      moves: ["R", "U", "R'", "U'"] },
          { id: "c3", label: "F Finish",  moves: ["R'", "F", "R", "F'"] },
        ]
      }
    ]
  },
  {
    id: "V", name: "V-Perm", category: "mixed",
    description: "Swaps a pair of diagonal corners and a pair of non-adjacent edges.",
    variants: [
      {
        id: "V-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R'", "U", "R'", "U'"] },
          { id: "c1", label: "y Move",  moves: ["y", "R'", "F'", "R2"] },
          { id: "c2", label: "Core",    moves: ["U'", "R'", "U", "R'", "F"] },
          { id: "c3", label: "Finish",  moves: ["R", "F", "y'"] },
        ]
      }
    ]
  },

  // ── G-Perms (4) ───────────────────────────────────────────────────────
  {
    id: "Ga", name: "Ga-Perm", category: "gperm",
    description: "4-cycle of corners and edges (G shape variant a).",
    variants: [
      {
        id: "Ga-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R2", "u", "R'", "U"] },
          { id: "c1", label: "Core",    moves: ["R'", "U'", "R", "u'"] },
          { id: "c2", label: "Finish",  moves: ["R2", "y'", "R'", "U", "R"] },
        ]
      }
    ]
  },
  {
    id: "Gb", name: "Gb-Perm", category: "gperm",
    description: "4-cycle of corners and edges (G shape variant b).",
    variants: [
      {
        id: "Gb-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R'", "d'", "F", "R2"] },
          { id: "c1", label: "Core",    moves: ["u", "R'", "U", "R", "U'"] },
          { id: "c2", label: "Finish",  moves: ["R", "u'", "R2", "y"] },
        ]
      }
    ]
  },
  {
    id: "Gc", name: "Gc-Perm", category: "gperm",
    description: "4-cycle of corners and edges (G shape variant c).",
    variants: [
      {
        id: "Gc-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R2", "u'", "R", "U'"] },
          { id: "c1", label: "Core",    moves: ["R", "U", "R'", "u"] },
          { id: "c2", label: "Finish",  moves: ["R2", "y", "R", "U'", "R'"] },
        ]
      }
    ]
  },
  {
    id: "Gd", name: "Gd-Perm", category: "gperm",
    description: "4-cycle of corners and edges (G shape variant d).",
    variants: [
      {
        id: "Gd-1", name: "Standard",
        chunks: [
          { id: "c0", label: "Setup",   moves: ["R", "d", "F'", "R2"] },
          { id: "c1", label: "Core",    moves: ["u'", "R", "U'", "R'", "U"] },
          { id: "c2", label: "Finish",  moves: ["R'", "u", "R2", "y'"] },
        ]
      }
    ]
  },
];

/** Flat list of all moves with metadata */
export function flattenMoves(variant) {
  const result = [];
  let globalIndex = 0;
  variant.chunks.forEach((chunk, chunkIndex) => {
    chunk.moves.forEach((move, moveInChunk) => {
      result.push({ move, chunkIndex, moveInChunk, globalIndex });
      globalIndex++;
    });
  });
  return result;
}

export function movesToAlgString(moves) {
  return moves.join(" ");
}

export function invertMove(move) {
  if (move.endsWith("'")) return move.slice(0, -1);
  if (move.endsWith("2")) return move; // For Example: R2 or x2
  return move + "'";
}

export function invertAlgorithm(moves) {
  return [...moves].reverse().map(invertMove);
}
