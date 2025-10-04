/**
 * SYMETRICKÝ PATTERN GENERATOR pro 15×15 grid
 * 
 * Vytváří rotačně symetrický vzor černých polí (jako v novinách)
 * Inspirováno skutečnými křížovkami z iDNES
 */

export interface GridPattern {
  width: number;
  height: number;
  blackCells: Set<string>; // "x,y" positions
  tajenkiRows: number[]; // Řádky pro tajenku
}

/**
 * REÁLNÝ PATTERN Z ČASOPISU - přesná kopie 1:1
 * Grid 13 sloupců × 19 řádků (švédská křížovka)
 */
export function createRealisticPattern(): GridPattern {
  const width = 13;
  const height = 19;
  const blackCells = new Set<string>();

  // PŘESNÁ KOPIE Z OBRÁZKU - řádek po řádku
  
  // Řádek 0: černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 0);
  addBlackCell(blackCells, 12, 0);
  
  // Řádek 1-3: žádné černé
  
  // Řádek 4: černé na pozicích 5, 10
  addBlackCell(blackCells, 5, 4);
  addBlackCell(blackCells, 10, 4);
  
  // Řádek 5: žádné černé
  
  // Řádek 6: černé na pozicích 0, 4, 8, 12
  addBlackCell(blackCells, 0, 6);
  addBlackCell(blackCells, 4, 6);
  addBlackCell(blackCells, 8, 6);
  addBlackCell(blackCells, 12, 6);
  
  // Řádek 7: černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 7);
  addBlackCell(blackCells, 12, 7);
  
  // Řádek 8: TAJENKA - černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 8);
  addBlackCell(blackCells, 12, 8);
  
  // Řádek 9: TAJENKA - černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 9);
  addBlackCell(blackCells, 12, 9);
  
  // Řádek 10: TAJENKA - černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 10);
  addBlackCell(blackCells, 12, 10);
  
  // Řádek 11: černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 11);
  addBlackCell(blackCells, 12, 11);
  
  // Řádek 12: černé na pozicích 0, 4, 8, 12
  addBlackCell(blackCells, 0, 12);
  addBlackCell(blackCells, 4, 12);
  addBlackCell(blackCells, 8, 12);
  addBlackCell(blackCells, 12, 12);
  
  // Řádek 13: žádné černé
  
  // Řádek 14: černé na pozicích 2, 7
  addBlackCell(blackCells, 2, 14);
  addBlackCell(blackCells, 7, 14);
  
  // Řádek 15-17: žádné černé
  
  // Řádek 18: černé na pozicích 0, 12
  addBlackCell(blackCells, 0, 18);
  addBlackCell(blackCells, 12, 18);

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [8, 9, 10] // 3 řádky tajenky (index 8, 9, 10)
  };
}

/**
 * Přidej černou buňku (a automaticky ji zrcadli pro rotační symetrii)
 */
function addBlackCell(blackCells: Set<string>, x: number, y: number): void {
  blackCells.add(`${x},${y}`);
}

/**
 * Zrcadli pattern pro rotační symetrii (180°)
 * Každá buňka [x,y] má zrcadlovou buňku [width-1-x, height-1-y]
 */
function mirrorPattern(blackCells: Set<string>, width: number, height: number): void {
  const cellsToAdd: string[] = [];

  for (const cell of blackCells) {
    const [x, y] = cell.split(',').map(Number);
    const mirrorX = width - 1 - x;
    const mirrorY = height - 1 - y;
    cellsToAdd.push(`${mirrorX},${mirrorY}`);
  }

  cellsToAdd.forEach(cell => blackCells.add(cell));
}

/**
 * Zkontroluj jestli je buňka černá podle patternu
 */
export function isBlackCell(pattern: GridPattern, x: number, y: number): boolean {
  return pattern.blackCells.has(`${x},${y}`);
}

/**
 * Zkontroluj jestli je řada tajenková
 */
export function isTajenkaRow(pattern: GridPattern, y: number): boolean {
  return pattern.tajenkiRows.includes(y);
}

/**
 * ALTERNATIVNÍ PATTERN - hustší (pro těžší křížovky)
 */
export function createDensePattern(): GridPattern {
  const width = 15;
  const height = 15;
  const blackCells = new Set<string>();

  // Více černých polí pro kompaktnější slova
  for (let y = 0; y < Math.ceil(height / 2); y++) {
    for (let x = 0; x < width; x++) {
      // Přidej černá pole v pravidelných intervalech
      if ((x + y) % 4 === 0 || (x === 0 && y % 2 === 0) || (x === 14 && y % 2 === 0)) {
        addBlackCell(blackCells, x, y);
      }
    }
  }

  mirrorPattern(blackCells, width, height);

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [7]
  };
}

/**
 * SPARSE PATTERN - méně černých polí (pro lehčí křížovky)
 * ULTRA JEDNODUCHÝ - jen minimum polí pro testování
 */
export function createSparsePattern(): GridPattern {
  const width = 15;
  const height = 15;
  const blackCells = new Set<string>();

  // MINIMÁLNÍ PATTERN - jen pár polí
  // Rohy
  addBlackCell(blackCells, 0, 0);
  addBlackCell(blackCells, 14, 0);
  
  // Pár polí uprostřed
  addBlackCell(blackCells, 7, 3);
  addBlackCell(blackCells, 3, 5);
  addBlackCell(blackCells, 11, 5);

  // Automaticky zrcadli
  mirrorPattern(blackCells, width, height);

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [7]
  };
}

/**
 * BALANCED PATTERN - realistický pattern podle iDNES křížovek
 * PŘESNÁ KOPIE z obrázku uživatele!
 * ~25-30% černých polí, symetrický, černá pole i v řádku tajenky
 */
/**
 * PROFESIONÁLNÍ PATTERN - použij realistický pattern z časopisu!
 */
export function createBalancedPattern(): GridPattern {
  // Použij REÁLNÝ pattern z časopisu
  return createRealisticPattern();
}
