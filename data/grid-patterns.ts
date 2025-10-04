/**
 * STANDARDNÍ GRID PATTERNY PRO ŠVÉDSKÉ KŘÍŽOVKY (ARROWORDS)
 * 
 * Podle výzkumu z Wikipedia a crossword standardů:
 * - Švédské křížovky mají HUSTOU mřížku s minimem prázdných buněk
 * - Clue buňky (černé/fialové) obsahují zadání a šipku → nebo ↓
 * - Téměř každá buňka je vyplněná slovem
 * - Symmetrie NENÍ nutná (na rozdíl od amerických křížovek)
 * - Grid má maximální hustotu - minimum prázdných buněk
 * 
 * Formát:
 * - 0 = bílá buňka (bude obsahovat písmeno)
 * - 1 = černá/fialová buňka s horizontálním zadáním (→)
 * - 2 = černá/fialová buňka s vertikálním zadáním (↓)
 * - 3 = černá/fialová buňka s obojím zadáním (→ i ↓)
 */

export interface GridPattern {
  name: string;
  size: number;
  description: string;
  density: number; // % vyplněných buněk
  pattern: number[][];
}

/**
 * KLASICKÝ ŠVÉDSKÝ PATTERN 10x10
 * Hustá mřížka s krátkými slovy (3-5 písmen)
 */
const SWEDISH_CLASSIC_10x10: GridPattern = {
  name: "Švédská klasika 10x10",
  size: 10,
  description: "Hustý pattern s krátkými slovy, vysoká čitelnost",
  density: 85,
  pattern: [
    [1, 0, 0, 0, 2, 0, 0, 1, 0, 0],
    [2, 0, 0, 1, 0, 0, 2, 0, 0, 2],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 2, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0, 1],
    [0, 0, 1, 0, 0, 2, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [2, 0, 0, 1, 0, 0, 2, 0, 0, 1],
    [0, 0, 2, 0, 0, 1, 0, 0, 2, 0],
  ]
};

/**
 * HUSTÝ ŠVÉDSKÝ PATTERN 12x12
 * Ještě více slov, menší průměrná délka
 */
const SWEDISH_DENSE_12x12: GridPattern = {
  name: "Hustá švédská 12x12",
  size: 12,
  description: "Velmi hustý pattern, ideální pro začátečníky",
  density: 88,
  pattern: [
    [1, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0],
    [2, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 2],
    [0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0],
    [2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 2],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [2, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0],
    [0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 1],
  ]
};

/**
 * VELMI HUSTÝ PATTERN 10x10 - PODLE VZOROVÉHO OBRÁZKU
 * Téměř všechny buňky vyplněné, velmi krátká slova (2-4 písmena)
 */
const SWEDISH_ULTRA_DENSE_10x10: GridPattern = {
  name: "Švédská ultra hustá 10x10",
  size: 10,
  description: "VZOROVÝ PATTERN - téměř 100% vyplněných buněk, velmi krátká slova",
  density: 95,
  pattern: [
    [1, 0, 0, 1, 0, 2, 0, 1, 0, 0],
    [2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
    [0, 1, 0, 1, 0, 0, 2, 0, 1, 0],
    [1, 0, 2, 0, 1, 0, 1, 0, 0, 2],
    [0, 2, 0, 1, 0, 2, 0, 1, 0, 0],
    [0, 0, 1, 0, 2, 0, 1, 0, 2, 0],
    [2, 0, 0, 1, 0, 1, 0, 2, 0, 1],
    [0, 1, 0, 2, 0, 0, 1, 0, 1, 0],
    [0, 2, 0, 1, 0, 1, 0, 2, 0, 1],
    [1, 0, 1, 0, 2, 0, 1, 0, 1, 0],
  ]
};

/**
 * VELKÁ ŠVÉDSKÁ PATTERN 18x18
 * Pro pokročilé, delší slova (5-10 písmen)
 */
const SWEDISH_LARGE_18x18: GridPattern = {
  name: "Velká švédská 18x18",
  size: 18,
  description: "Větší pattern s delšími slovy, pro pokročilé",
  density: 87,
  pattern: [
    [1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1],
    [0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0],
  ]
};

/**
 * KOMPAKTNÍ PATTERN 8x8
 * Pro rychlé křížovky, velmi krátká slova
 */
const SWEDISH_COMPACT_8x8: GridPattern = {
  name: "Kompaktní 8x8",
  size: 8,
  description: "Malá rychlá křížovka, ideální pro děti nebo trénink",
  density: 90,
  pattern: [
    [1, 0, 0, 2, 0, 0, 1, 0],
    [2, 0, 1, 0, 0, 2, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 2],
    [2, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 2, 0, 0],
    [2, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 2, 0, 0, 0, 1, 0],
    [1, 0, 0, 2, 0, 0, 2, 0],
  ]
};

/**
 * Všechny dostupné patterny
 */
export const GRID_PATTERNS = {
  compact: SWEDISH_COMPACT_8x8,
  classic: SWEDISH_CLASSIC_10x10,
  dense: SWEDISH_DENSE_12x12,
  ultraDense: SWEDISH_ULTRA_DENSE_10x10,
  large: SWEDISH_LARGE_18x18,
};

/**
 * Výběr patternu podle velikosti gridu
 */
export function getPatternForSize(size: number): GridPattern | null {
  if (size <= 8) return SWEDISH_COMPACT_8x8;
  if (size <= 10) return SWEDISH_ULTRA_DENSE_10x10; // VZOROVÝ PATTERN!
  if (size <= 12) return SWEDISH_ULTRA_DENSE_10x10; 
  if (size <= 15) return SWEDISH_ULTRA_DENSE_10x10;
  if (size <= 18) return SWEDISH_ULTRA_DENSE_10x10;
  
  // Pro větší gridy použij vzorový ultra hustý pattern
  return SWEDISH_ULTRA_DENSE_10x10;
}

/**
 * Náhodný pattern z dostupných
 */
export function getRandomPattern(): GridPattern {
  const patterns = Object.values(GRID_PATTERNS);
  return patterns[Math.floor(Math.random() * patterns.length)];
}

/**
 * KLÍČOVÉ VLASTNOSTI ŠVÉDSKÝCH KŘÍŽOVEK:
 * 
 * 1. HUSTOTA: 85-90% buněk vyplněných (vs 60-70% u amerických)
 * 2. ASYMETRIE: Není nutná rotační symmetrie
 * 3. KRÁTKÁ SLOVA: Průměrná délka 3-5 písmen
 * 4. CLUE BUŇKY: Černé/fialové s textem zadání
 * 5. ŠIPKY: → pro horizontal, ↓ pro vertical
 * 6. KROUŽKY: ● u písmen tajenky
 * 7. HUSTÝ GRID: Minimum prázdných buněk
 * 
 * Reference:
 * - https://cs.wikipedia.org/wiki/Křížovka (Švédské křížovky)
 * - https://en.wikipedia.org/wiki/Crossword#Arroword
 * - Svenska Krysset magazine standards
 */
