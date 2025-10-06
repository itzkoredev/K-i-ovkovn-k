/**
 * Symmetric pattern helpers for classic Czech crosswords.
 */

export interface GridPattern {
  width: number;
  height: number;
  blackCells: Set<string>; // "x,y" coordinates of black squares
  tajenkiRows: number[];   // highlighted rows used for tajenka
}

const REALISTIC_LAYOUT = [
  '..#...#...#..',
  '...##.#.##...',
  '....#...#....',
  '##...#.#...##',
  '..#.#...#.#..',
  '...##...##...',
  '......#......',
  '...##...##...',
  '..#.#...#.#..',
  '##...#.#...##',
  '....#...#....',
  '...##.#.##...',
  '..#...#...#..'
];

function buildPatternFromLayout(layout: string[], tajenkaRows: number[]): GridPattern {
  if (layout.length === 0) {
    throw new Error('Pattern layout must contain at least one row');
  }

  const height = layout.length;
  const width = layout[0].length;
  const blackCells = new Set<string>();

  layout.forEach((row, y) => {
    if (row.length !== width) {
      throw new Error(`Row ${y + 1} has length ${row.length}, expected ${width}`);
    }

    for (let x = 0; x < width; x++) {
      if (row[x] === '#') {
        blackCells.add(`${x},${y}`);
      }
    }
  });

  const cells = Array.from(blackCells);
  for (const cell of cells) {
    const [x, y] = cell.split(',').map(Number);
    const mirrorKey = `${width - 1 - x},${height - 1 - y}`;
    blackCells.add(mirrorKey);
  }

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [...new Set(tajenkaRows)].sort((a, b) => a - b)
  };
}

export function createRealisticPattern(): GridPattern {
  const middleRow = Math.floor(REALISTIC_LAYOUT.length / 2);
  return buildPatternFromLayout(REALISTIC_LAYOUT, [middleRow]);
}

function addBlackCell(blackCells: Set<string>, x: number, y: number): void {
  blackCells.add(`${x},${y}`);
}

function mirrorPattern(blackCells: Set<string>, width: number, height: number): void {
  const cellsToMirror = Array.from(blackCells);
  for (const cell of cellsToMirror) {
    const [x, y] = cell.split(',').map(Number);
    const mirrorKey = `${width - 1 - x},${height - 1 - y}`;
    blackCells.add(mirrorKey);
  }
}

export function isBlackCell(pattern: GridPattern, x: number, y: number): boolean {
  return pattern.blackCells.has(`${x},${y}`);
}

export function isTajenkaRow(pattern: GridPattern, y: number): boolean {
  return pattern.tajenkiRows.includes(y);
}

export function isTajenkaColumn(pattern: GridPattern, x: number): boolean {
  return false; // classic Czech crosswords use rows for tajenka, not columns
}

export function createDensePattern(): GridPattern {
  const width = 15;
  const height = 15;
  const blackCells = new Set<string>();

  for (let y = 0; y < Math.ceil(height / 2); y++) {
    for (let x = 0; x < width; x++) {
      if ((x + y) % 4 === 0 || (x === 0 && y % 2 === 0) || (x === width - 1 && y % 2 === 0)) {
        addBlackCell(blackCells, x, y);
      }
    }
  }

  mirrorPattern(blackCells, width, height);

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [Math.floor(height / 2)]
  };
}

export function createSparsePattern(): GridPattern {
  const width = 15;
  const height = 15;
  const blackCells = new Set<string>();

  addBlackCell(blackCells, 0, 0);
  addBlackCell(blackCells, width - 1, 0);
  addBlackCell(blackCells, Math.floor(width / 2), 3);
  addBlackCell(blackCells, 3, 5);
  addBlackCell(blackCells, width - 4, 5);

  mirrorPattern(blackCells, width, height);

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [Math.floor(height / 2)]
  };
}

export function createBalancedPattern(): GridPattern {
  return createRealisticPattern();
}
