/**
 * TEST PATTERN - DIAGONÁLA pro ověření že pattern funguje
 */

import type { GridPattern } from './symmetric-pattern';

export function createTestPattern(): GridPattern {
  const width = 15;
  const height = 15;
  const blackCells = new Set<string>();

  // DIAGONÁLA - MEGA VIDITELNÁ!
  for (let i = 0; i < 15; i++) {
    blackCells.add(`${i},${i}`); // Hlavní diagonála
  }

  console.log('🔥 TEST PATTERN: DIAGONÁLA - pokud vidíš diagonálu černých polí, pattern funguje!');

  return {
    width,
    height,
    blackCells,
    tajenkiRows: [7],
  };
}
