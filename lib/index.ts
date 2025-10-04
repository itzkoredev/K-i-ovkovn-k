import type { Crossword, CrosswordSettings } from '@/types/crossword';
import { getRandomWords } from '@/data/czech-words';
import { ClassicCrosswordBuilder } from './classic-crossword-builder';

/**
 * HLAVNÍ GENERÁTOR KŘÍŽOVEK
 * Generuje KLASICKÉ české křížovky (ne švédské!)
 */
export function generateCrossword(settings: CrosswordSettings): Crossword {
  console.log('📰 Generuji KLASICKOU ČESKOU křížovku');
  
  // REALISTICKÉ ROZMĚRY z časopisu: 13×19
  const gridWidth = 13;
  const gridHeight = 19;
  const words = getRandomWords(1000, settings.difficulty, settings.themes);
  
  const builder = new ClassicCrosswordBuilder(gridWidth, gridHeight, words);
  return builder.build();
}

// Alias pro kompatibilitu
export const generateClassicCrossword = generateCrossword;
