export const OLL_CATEGORIES = [
  {
    "id": "dot",
    "label": "Dot",
    "color": "#f87171"
  },
  {
    "id": "line",
    "label": "Line",
    "color": "#60a5fa"
  },
  {
    "id": "cross",
    "label": "Cross",
    "color": "#fbbf24"
  },
  {
    "id": "lshape",
    "label": "L-Shape",
    "color": "#34d399"
  },
  {
    "id": "pshape",
    "label": "P-Shape",
    "color": "#a78bfa"
  },
  {
    "id": "tshape",
    "label": "T-Shape",
    "color": "#2dd4bf"
  },
  {
    "id": "cshape",
    "label": "C-Shape",
    "color": "#f472b6"
  },
  {
    "id": "wshape",
    "label": "W-Shape",
    "color": "#818cf8"
  },
  {
    "id": "fish",
    "label": "Fish",
    "color": "#fb923c"
  },
  {
    "id": "awkward",
    "label": "Awkward",
    "color": "#94a3b8"
  },
  {
    "id": "other",
    "label": "Other",
    "color": "#a1a1aa"
  }
];

export const ollAlgorithms = [
  {
    id: "OLL-1", name: "OLL 1", category: "dot",
    description: "OLL Case 1",
    variants: [
      {
        id: "OLL-1-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","F","R","F'","U2","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-1-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R'","U'","R","U'","R'","U2","y","L'","U'","L","U","L'","U","L"] }
        ]
      }
    ]
  },
  {
    id: "OLL-2", name: "OLL 2", category: "dot",
    description: "OLL Case 2",
    variants: [
      {
        id: "OLL-2-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U","R'","U'","F'","f","R","U","R'","U'","f'"] }
        ]
      },
      {
        id: "OLL-2-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","f'","y'","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-3", name: "OLL 3", category: "dot",
    description: "OLL Case 3",
    variants: [
      {
        id: "OLL-3-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","f'","U'","F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-3-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","F","R","U","R'","U'","F'","U'","f","R","U","R'","U'","f'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-4", name: "OLL 4", category: "dot",
    description: "OLL Case 4",
    variants: [
      {
        id: "OLL-4-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","f'","U","F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-4-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","F","R","U","R'","U'","F'","U","f","R","U","R'","U'","f'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-5", name: "OLL 5", category: "other",
    description: "OLL Case 5",
    variants: [
      {
        id: "OLL-5-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U2","R","U","R'","U","r"] }
        ]
      },
      {
        id: "OLL-5-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["l'","U2","L","U","L'","U","l"] }
        ]
      }
    ]
  },
  {
    id: "OLL-6", name: "OLL 6", category: "other",
    description: "OLL Case 6",
    variants: [
      {
        id: "OLL-6-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U2","R'","U'","R","U'","r'"] }
        ]
      },
      {
        id: "OLL-6-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["l","U2","L'","U'","L","U'","l'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-7", name: "OLL 7", category: "other",
    description: "OLL Case 7",
    variants: [
      {
        id: "OLL-7-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U","R","U2","r'"] }
        ]
      },
      {
        id: "OLL-7-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["l","U","L'","U","L","U2","l'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-8", name: "OLL 8", category: "other",
    description: "OLL Case 8",
    variants: [
      {
        id: "OLL-8-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U'","R","U'","R'","U2","r"] }
        ]
      },
      {
        id: "OLL-8-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["l'","U'","L","U'","L'","U2","l"] }
        ]
      }
    ]
  },
  {
    id: "OLL-9", name: "OLL 9", category: "fish",
    description: "OLL Case 9",
    variants: [
      {
        id: "OLL-9-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","R'","F","R2","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-9-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R","y'","x'","R","U'","R'","F","R","U","R'","x"] }
        ]
      }
    ]
  },
  {
    id: "OLL-10", name: "OLL 10", category: "fish",
    description: "OLL Case 10",
    variants: [
      {
        id: "OLL-10-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R'","F","R","F'","R","U2","R'"] }
        ]
      },
      {
        id: "OLL-10-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","y","R'","F","R","U'","R'","F'","R"] }
        ]
      }
    ]
  },
  {
    id: "OLL-11", name: "OLL 11", category: "other",
    description: "OLL Case 11",
    variants: [
      {
        id: "OLL-11-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","R2","U","R'","U","R","U2","R'","U","M'"] }
        ]
      },
      {
        id: "OLL-11-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U","R'","F","R","F'","R","U2","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-12", name: "OLL 12", category: "other",
    description: "OLL Case 12",
    variants: [
      {
        id: "OLL-12-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["M","R","U","R'","U","R","U2","R'","U","M'"] }
        ]
      },
      {
        id: "OLL-12-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U","R'","U'","F'","U","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-13", name: "OLL 13", category: "other",
    description: "OLL Case 13",
    variants: [
      {
        id: "OLL-13-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","U","R","U'","R2","F'","R","U","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-13-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U'","r'","U'","r","U","r'","y'","R'","U","R"] }
        ]
      }
    ]
  },
  {
    id: "OLL-14", name: "OLL 14", category: "other",
    description: "OLL Case 14",
    variants: [
      {
        id: "OLL-14-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","F","R","U","R'","F'","R","F","U'","F'"] }
        ]
      },
      {
        id: "OLL-14-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U","R'","F","R","F'","R","U'","R'","F","R","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-15", name: "OLL 15", category: "other",
    description: "OLL Case 15",
    variants: [
      {
        id: "OLL-15-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["l'","U'","l","L'","U'","L","U","l'","U","l"] }
        ]
      },
      {
        id: "OLL-15-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U'","r","R'","U'","R","U","r'","U","r"] }
        ]
      }
    ]
  },
  {
    id: "OLL-16", name: "OLL 16", category: "other",
    description: "OLL Case 16",
    variants: [
      {
        id: "OLL-16-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","r'","R","U","R'","U'","r","U'","r'"] }
        ]
      },
      {
        id: "OLL-16-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","M'","U","R","U'","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-17", name: "OLL 17", category: "dot",
    description: "OLL Case 17",
    variants: [
      {
        id: "OLL-17-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R'","F","R","F'","U2","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-17-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R'","F'","R2","r'","U","R","U'","R'","U'","M'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-18", name: "OLL 18", category: "dot",
    description: "OLL Case 18",
    variants: [
      {
        id: "OLL-18-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U","R","U2","r2","U'","R","U'","R'","U2","r"] }
        ]
      },
      {
        id: "OLL-18-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R","U2","R2","F","R","F'","U2","M'","U","R","U'","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-19", name: "OLL 19", category: "dot",
    description: "OLL Case 19",
    variants: [
      {
        id: "OLL-19-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","R","U","R","U","R'","U'","M'","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-19-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["M","U","R","U","R'","U'","M2","U","R","U'","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-20", name: "OLL 20", category: "dot",
    description: "OLL Case 20",
    variants: [
      {
        id: "OLL-20-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U'","M2","U","R","U'","R'","U'","M'"] }
        ]
      },
      {
        id: "OLL-20-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["M","U","R","U","R'","U'","M2","U","R","U'","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-21", name: "OLL 21", category: "cross",
    description: "OLL Case 21",
    variants: [
      {
        id: "OLL-21-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R'","U'","R","U","R'","U'","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-21-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R","U","R'","U","R","U'","R'","U","R","U2","R'"] }
        ]
      },
      {
        id: "OLL-21-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","R","U2","R'","U'","R","U","R'","U'","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-21-4", name: "Variant 4",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R'","U'","R","U'","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-22", name: "OLL 22", category: "cross",
    description: "OLL Case 22",
    variants: [
      {
        id: "OLL-22-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","U'","R2","U'","R2","U2","R"] }
        ]
      },
      {
        id: "OLL-22-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","U'","R2","U'","R2","U2","R"] }
        ]
      },
      {
        id: "OLL-22-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","f'","F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-22-4", name: "Variant 4",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U2","R2","U","R2","U","R2","U2","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-23", name: "OLL 23", category: "cross",
    description: "OLL Case 23",
    variants: [
      {
        id: "OLL-23-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R2","D'","R","U2","R'","D","R","U2","R"] }
        ]
      },
      {
        id: "OLL-23-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y2","R2","D","R'","U2","R","D'","R'","U2","R'"] }
        ]
      },
      {
        id: "OLL-23-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R2","D","R'","U2","R","D'","R'","U2","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-24", name: "OLL 24", category: "cross",
    description: "OLL Case 24",
    variants: [
      {
        id: "OLL-24-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U'","r'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-24-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R","D","R'","U'","R","D'","R2"] }
        ]
      },
      {
        id: "OLL-24-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R","U","R'","U'","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-24-4", name: "Variant 4",
        chunks: [
          { id: "c0", label: "Alg", moves: ["x","R'","U","R","D'","R'","U'","R","D","x'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-25", name: "OLL 25", category: "cross",
    description: "OLL Case 25",
    variants: [
      {
        id: "OLL-25-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F'","r","U","R'","U'","r'","F","R"] }
        ]
      },
      {
        id: "OLL-25-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","F","R","B'","R'","F'","R","B"] }
        ]
      },
      {
        id: "OLL-25-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","R'","F","R","B'","R'","F'","R","B"] }
        ]
      }
    ]
  },
  {
    id: "OLL-26", name: "OLL 26", category: "cross",
    description: "OLL Case 26",
    variants: [
      {
        id: "OLL-26-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R'","U'","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-26-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","R'","U'","R","U'","R'","U2","R"] }
        ]
      },
      {
        id: "OLL-26-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["L'","U'","L","U'","L'","U2","L"] }
        ]
      },
      {
        id: "OLL-26-4", name: "Variant 4",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","L'","U'","L","U'","L'","U2","L"] }
        ]
      }
    ]
  },
  {
    id: "OLL-27", name: "OLL 27", category: "cross",
    description: "OLL Case 27",
    variants: [
      {
        id: "OLL-27-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U2","R'"] }
        ]
      },
      {
        id: "OLL-27-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","R'","U2","R","U","R'","U","R"] }
        ]
      },
      {
        id: "OLL-27-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["L","U","L'","U","L","U2","L'"] }
        ]
      },
      {
        id: "OLL-27-4", name: "Variant 4",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","L","U","L'","U","L","U2","L'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-28", name: "OLL 28", category: "awkward",
    description: "OLL Case 28",
    variants: [
      {
        id: "OLL-28-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U","R'","U'","M","U","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-28-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["M'","U","M","U2","M'","U","M"] }
        ]
      }
    ]
  },
  {
    id: "OLL-29", name: "OLL 29", category: "awkward",
    description: "OLL Case 29",
    variants: [
      {
        id: "OLL-29-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","R","U'","R'","F'","U'","F","R","U","R'"] }
        ]
      },
      {
        id: "OLL-29-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R","U","R'","U'","R","U'","R'","F'","U'","F","R","U","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-30", name: "OLL 30", category: "awkward",
    description: "OLL Case 30",
    variants: [
      {
        id: "OLL-30-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R'","F","R2","U'","R'","U'","R","U","R'","F2"] }
        ]
      },
      {
        id: "OLL-30-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","U","R","U2","R'","U'","R","U2","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-31", name: "OLL 31", category: "pshape",
    description: "OLL Case 31",
    variants: [
      {
        id: "OLL-31-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","F","U","R","U'","R'","F'","R"] }
        ]
      },
      {
        id: "OLL-31-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["S'","L'","U'","L","U","L","F'","L'","f"] }
        ]
      }
    ]
  },
  {
    id: "OLL-32", name: "OLL 32", category: "pshape",
    description: "OLL Case 32",
    variants: [
      {
        id: "OLL-32-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["L","U","F'","U'","L'","U","L","F","L'"] }
        ]
      },
      {
        id: "OLL-32-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["S","R","U","R'","U'","R'","F","R","f'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-33", name: "OLL 33", category: "tshape",
    description: "OLL Case 33",
    variants: [
      {
        id: "OLL-33-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-33-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y'","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-34", name: "OLL 34", category: "cshape",
    description: "OLL Case 34",
    variants: [
      {
        id: "OLL-34-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R2","U'","R'","F","R","U","R","U'","F'"] }
        ]
      },
      {
        id: "OLL-34-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R2","U'","R'","F","R","U","R","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-35", name: "OLL 35", category: "fish",
    description: "OLL Case 35",
    variants: [
      {
        id: "OLL-35-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","F","R","F'","R","U2","R'"] }
        ]
      },
      {
        id: "OLL-35-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","F","R","F'","R","U2","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-36", name: "OLL 36", category: "wshape",
    description: "OLL Case 36",
    variants: [
      {
        id: "OLL-36-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["L'","U'","L","U'","L'","U","L","U","L","F'","L'","F"] }
        ]
      },
      {
        id: "OLL-36-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R","U'","R'","U","R","U","R","B'","R'","B"] }
        ]
      }
    ]
  },
  {
    id: "OLL-37", name: "OLL 37", category: "fish",
    description: "OLL Case 37",
    variants: [
      {
        id: "OLL-37-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R'","F'","R","U","R","U'","R'"] }
        ]
      },
      {
        id: "OLL-37-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U'","R'","U'","R","U","R'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-38", name: "OLL 38", category: "wshape",
    description: "OLL Case 38",
    variants: [
      {
        id: "OLL-38-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U'","R'","U'","R'","F","R","F'"] }
        ]
      },
      {
        id: "OLL-38-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U'","R'","U'","R'","F","R","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-39", name: "OLL 39", category: "other",
    description: "OLL Case 39",
    variants: [
      {
        id: "OLL-39-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["L","F'","L'","U'","L","U","F","U'","L'"] }
        ]
      },
      {
        id: "OLL-39-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","B'","R'","U'","R","U","B","U'","R'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-40", name: "OLL 40", category: "other",
    description: "OLL Case 40",
    variants: [
      {
        id: "OLL-40-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","F","R","U","R'","U'","F'","U","R"] }
        ]
      },
      {
        id: "OLL-40-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","F","R","U","R'","U'","F'","U","R"] }
        ]
      }
    ]
  },
  {
    id: "OLL-41", name: "OLL 41", category: "awkward",
    description: "OLL Case 41",
    variants: [
      {
        id: "OLL-41-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U2","R'","F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-41-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U2","R'","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-42", name: "OLL 42", category: "awkward",
    description: "OLL Case 42",
    variants: [
      {
        id: "OLL-42-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R","U'","R'","U2","R","F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-42-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R","U'","R'","U2","R","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-43", name: "OLL 43", category: "pshape",
    description: "OLL Case 43",
    variants: [
      {
        id: "OLL-43-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F'","U'","L'","U","L","F"] }
        ]
      },
      {
        id: "OLL-43-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f'","L'","U'","L","U","f"] }
        ]
      },
      {
        id: "OLL-43-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","F'","U","F","R"] }
        ]
      }
    ]
  },
  {
    id: "OLL-44", name: "OLL 44", category: "pshape",
    description: "OLL Case 44",
    variants: [
      {
        id: "OLL-44-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","U","R","U'","R'","F'"] }
        ]
      },
      {
        id: "OLL-44-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","f'"] }
        ]
      },
      {
        id: "OLL-44-3", name: "Variant 3",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y2","f","R","U","R'","U'","f'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-45", name: "OLL 45", category: "tshape",
    description: "OLL Case 45",
    variants: [
      {
        id: "OLL-45-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-45-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y2","F","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-46", name: "OLL 46", category: "cshape",
    description: "OLL Case 46",
    variants: [
      {
        id: "OLL-46-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R'","F","R","F'","U","R"] }
        ]
      },
      {
        id: "OLL-46-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R'","F","R","F'","U","R"] }
        ]
      }
    ]
  },
  {
    id: "OLL-47", name: "OLL 47", category: "lshape",
    description: "OLL Case 47",
    variants: [
      {
        id: "OLL-47-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R'","U'","R'","F","R","F'","R'","F","R","F'","U","R"] }
        ]
      },
      {
        id: "OLL-47-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","F'","L'","U'","L","U","L'","U'","L","U","F"] }
        ]
      }
    ]
  },
  {
    id: "OLL-48", name: "OLL 48", category: "lshape",
    description: "OLL Case 48",
    variants: [
      {
        id: "OLL-48-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U","R'","U'","R","U","R'","U'","F'"] }
        ]
      },
      {
        id: "OLL-48-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["F","R","U","R'","U'","R","U","R'","U'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-49", name: "OLL 49", category: "lshape",
    description: "OLL Case 49",
    variants: [
      {
        id: "OLL-49-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U'","r2","U","r2","U","r2","U'","r"] }
        ]
      },
      {
        id: "OLL-49-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U'","r2","U","r2","U","r2","U'","r"] }
        ]
      }
    ]
  },
  {
    id: "OLL-50", name: "OLL 50", category: "lshape",
    description: "OLL Case 50",
    variants: [
      {
        id: "OLL-50-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U","r2","U'","r2","U'","r2","U","r'"] }
        ]
      },
      {
        id: "OLL-50-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U","r2","U'","r2","U'","r2","U","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-51", name: "OLL 51", category: "line",
    description: "OLL Case 51",
    variants: [
      {
        id: "OLL-51-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","R","U","R'","U'","f'"] }
        ]
      },
      {
        id: "OLL-51-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["f","R","U","R'","U'","R","U","R'","U'","f'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-52", name: "OLL 52", category: "line",
    description: "OLL Case 52",
    variants: [
      {
        id: "OLL-52-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U","R","U'","B","U'","B'","R'"] }
        ]
      },
      {
        id: "OLL-52-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","F","U","R","U'","R'","U","R","U'","R'","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-53", name: "OLL 53", category: "lshape",
    description: "OLL Case 53",
    variants: [
      {
        id: "OLL-53-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U2","R","U","R'","U'","R","U","R'","U","r"] }
        ]
      },
      {
        id: "OLL-53-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U2","R","U","R'","U'","R","U","R'","U","r"] }
        ]
      }
    ]
  },
  {
    id: "OLL-54", name: "OLL 54", category: "lshape",
    description: "OLL Case 54",
    variants: [
      {
        id: "OLL-54-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U2","R'","U'","R","U","R'","U'","R","U'","r'"] }
        ]
      },
      {
        id: "OLL-54-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r","U2","R'","U'","R","U","R'","U'","R","U'","r'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-55", name: "OLL 55", category: "line",
    description: "OLL Case 55",
    variants: [
      {
        id: "OLL-55-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U2","R2","U'","R","U'","R'","U2","F","R","F'"] }
        ]
      },
      {
        id: "OLL-55-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["y","R","U2","R2","U'","R","U'","R'","U2","F","R","F'"] }
        ]
      }
    ]
  },
  {
    id: "OLL-56", name: "OLL 56", category: "line",
    description: "OLL Case 56",
    variants: [
      {
        id: "OLL-56-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U'","r","U'","R'","U","R","U'","R'","U","R","r'","U","r"] }
        ]
      },
      {
        id: "OLL-56-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["r'","U'","r","U'","R'","U","R","U'","R'","U","R","r'","U","r"] }
        ]
      }
    ]
  },
  {
    id: "OLL-57", name: "OLL 57", category: "other",
    description: "OLL Case 57",
    variants: [
      {
        id: "OLL-57-1", name: "Variant 1",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","M'","U","R","U'","r'"] }
        ]
      },
      {
        id: "OLL-57-2", name: "Variant 2",
        chunks: [
          { id: "c0", label: "Alg", moves: ["R","U","R'","U'","M'","U","R","U'","r'"] }
        ]
      }
    ]
  }
];
