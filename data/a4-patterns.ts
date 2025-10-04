/**
 * REALISTICKÉ PATTERNY PRO A4 FORMÁT (13×19)
 * 
 * Inspirováno skutečnými českými křížovkami z iDNES a dalších zdrojů
 * 
 * Legenda:
 * 0 = bílá buňka (písmeno)
 * 1 = horizontal clue (zadání →)
 * 2 = vertical clue (zadání ↓)
 * 3 = both directions (zadání s obojí šipkou)
 */

export interface A4Pattern {
  name: string;
  width: number;
  height: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  pattern: number[][];
}

/**
 * STŘEDNÍ OBTÍŽNOST - ideální pro začátek
 * ~25% zadání, převážně krátká slova (3-5 písmen)
 */
export const A4_PATTERN_MEDIUM: A4Pattern = {
  name: 'A4 Střední',
  width: 13,
  height: 19,
  difficulty: 'medium',
  description: 'Realistický pattern inspirovaný iDNES křížovkami',
  pattern: [
    // Řádek 0
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    // Řádek 1
    [2, 0, 1, 0, 2, 0, 2, 0, 0, 1, 0, 2, 0],
    // Řádek 2
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    // Řádek 3
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // Řádek 4
    [2, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 2, 0],
    // Řádek 5
    [0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    // Řádek 6
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    // Řádek 7
    [2, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2, 0, 1],
    // Řádek 8
    [0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2],
    // Řádek 9
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    // Řádek 10
    [2, 0, 1, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0],
    // Řádek 11
    [0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1],
    // Řádek 12
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
    // Řádek 13
    [2, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0],
    // Řádek 14
    [0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0],
    // Řádek 15
    [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    // Řádek 16
    [2, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    // Řádek 17
    [0, 0, 2, 0, 2, 0, 1, 0, 0, 2, 0, 1, 0],
    // Řádek 18
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  ]
};

/**
 * SNADNÁ OBTÍŽNOST - víc zadání, kratší slova
 */
export const A4_PATTERN_EASY: A4Pattern = {
  name: 'A4 Snadná',
  width: 13,
  height: 19,
  difficulty: 'easy',
  description: 'Více zadání, jednodušší struktura',
  pattern: [
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [2, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1],
    [0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2],
    [2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2],
    [2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2],
    [2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2],
  ]
};

/**
 * TĚŽKÁ OBTÍŽNOST - méně zadání, delší slova
 */
export const A4_PATTERN_HARD: A4Pattern = {
  name: 'A4 Těžká',
  width: 13,
  height: 19,
  difficulty: 'hard',
  description: 'Méně zadání, delší slova, komplikovanější struktura',
  pattern: [
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 2, 0],
    [2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [2, 0, 0, 0, 2, 0, 0, 1, 0, 2, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
    [1, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 2],
  ]
};

/**
 * Vyber pattern podle obtížnosti
 */
export function getA4Pattern(difficulty: 'easy' | 'medium' | 'hard'): A4Pattern {
  switch (difficulty) {
    case 'easy':
      return A4_PATTERN_EASY;
    case 'hard':
      return A4_PATTERN_HARD;
    case 'medium':
    default:
      return A4_PATTERN_MEDIUM;
  }
}

/**
 * Statistiky patternu
 */
export function analyzePattern(pattern: A4Pattern): {
  totalCells: number;
  clueCells: number;
  whiteCells: number;
  horizontalClues: number;
  verticalClues: number;
  cluePercentage: number;
} {
  let totalCells = 0;
  let clueCells = 0;
  let horizontalClues = 0;
  let verticalClues = 0;

  for (const row of pattern.pattern) {
    for (const cell of row) {
      totalCells++;
      if (cell === 1) {
        clueCells++;
        horizontalClues++;
      } else if (cell === 2) {
        clueCells++;
        verticalClues++;
      } else if (cell === 3) {
        clueCells++;
        horizontalClues++;
        verticalClues++;
      }
    }
  }

  return {
    totalCells,
    clueCells,
    whiteCells: totalCells - clueCells,
    horizontalClues,
    verticalClues,
    cluePercentage: Math.round((clueCells / totalCells) * 100),
  };
}
