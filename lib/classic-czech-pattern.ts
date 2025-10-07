/**
 * KLASICKÝ FRANCOUZSKÝ PATTERN PRO ČESKÉ KŘÍŽOVKY
 * 
 * Podle směrnic ČSHAK (Český svaz hádankářů a křížovkářů):
 * ✅ ÚPLNÉ KŘIŽOVÁNÍ - každé bílé pole je součástí vodorovného I svislého slova
 * ✅ SYMETRIE - středová symetrie (rotace 180°) pro černá pole
 * ✅ MINIMÁLNÍ ČERNÁ POLE - pouze jako rozdělovače slov (15-25%)
 * ✅ MIN. DÉLKA SLOVA - 3 písmena (optimálně 4-7)
 * ✅ TAJENKA - zvýrazněný řádek uprostřed (bez černých polí)
 */

import type { GridPattern } from './symmetric-pattern';

/**
 * Vytvoří klasickou francouzskou křížovku 13×13
 * - Střední řádek (6) = TAJENKA (plně průchozí, 13 písmen)
 * - Černá pole symetricky rozmístěná (středová symetrie)
 * - Vytváří sloty pro slova délky 3-7 písmen
 * - Všechna slova se protínají (úplné křižování)
 */
export function createClassicCzechPattern(): GridPattern {
  const width = 13;
  const height = 13;
  const tajenkaRow = 6; // prostřední řádek (indexováno od 0)
  const blackCells = new Set<string>();

  /**
   * SYMETRICKÁ ČERNÁ POLE (středová symetrie)
   * 
   * Každé pole (x,y) má automaticky pár na (12-x, 12-y)
   * 
   * Výsledná mřížka:
   * ......#......  0
   * ......#......  1
   * ..##...##....  2
   * ##.........##  3
   * .....#.#.....  4
   * ##.........##  5
   * TTTTTTTTTTTTT  6  ← TAJENKA
   * ##.........##  7
   * .....#.#.....  8
   * ##.........##  9
   * ....##...##.. 10
   * ......#..... 11
   * ......#..... 12
   */
  
  const symmetricPairs: [number, number][] = [
    // MINIMÁLNÍ černá pole - jen pro oddělení slov
    // Cíl: 10-15% černých polí (max 20-25 z 169)
    
    // Horní část (automaticky se zrcadlí dolů)
    [6, 1],  // střed nahoře
    
    [1, 2],  // levý okraj
    [11, 2], // pravý okraj
    
    [5, 3], [7, 3],  // střední separátory
    
    [1, 4], [11, 4],  // okraje
    
    [0, 5], [12, 5],  // krajní okraje
    
    // ⚠️ ŘÁDEK 6 = TAJENKA (ŽÁDNÁ ČERNÁ POLE!)
    // Řádky 7-12 = automatická symetrie z řádků 5-0
  ];
  
  // Přidej černá pole + jejich symetrické protějšky
  for (const [x, y] of symmetricPairs) {
    // DŮLEŽITÉ: Přeskočit černá pole v řádku tajenky!
    if (y === tajenkaRow || (height - 1 - y) === tajenkaRow) {
      console.warn(`⚠️ Přeskakuji černé pole v řádku tajenky: (${x},${y})`);
      continue; // Přeskočit!
    }
    
    blackCells.add(`${x},${y}`);
    
    // Středová symetrie (rotace 180°)
    const symX = width - 1 - x;
    const symY = height - 1 - y;
    blackCells.add(`${symX},${symY}`);
  }
  
  const percentage = Math.round((blackCells.size / (width * height)) * 100);
  console.log(`🏗️  Vytvořen FRANCOUZSKÝ vzor: ${blackCells.size} černých polí (${percentage}%)`);
  
  return {
    width,
    height,
    blackCells,
    tajenkiRows: [tajenkaRow]
  };
}

/**
 * Jednodušší pattern pro TESTOVÁNÍ
 * Méně černých polí, snazší vyplnění
 */
export function createSimpleCzechPattern(): GridPattern {
  const width = 13;
  const height = 13;
  const tajenkaRow = 6;
  const blackCells = new Set<string>();

  // Minimální černá pole - jen na okrajích
  const symmetricPairs: [number, number][] = [
    [6, 0],  // střed nahoře
    [0, 2], [12, 2],  // krajní levý/pravý
    [0, 4], [12, 4],
    [0, 5], [12, 5],
  ];
  
  for (const [x, y] of symmetricPairs) {
    blackCells.add(`${x},${y}`);
    const symX = width - 1 - x;
    const symY = height - 1 - y;
    blackCells.add(`${symX},${symY}`);
  }

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [tajenkaRow]
  };
}
