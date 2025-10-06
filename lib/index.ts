import type { Crossword, CrosswordSettings } from '@/types/crossword';
import { CrosswordBuilder } from './crossword-builder';

export function generateCrossword(settings: CrosswordSettings): Crossword {
  console.log('📰 Generuji novinovou křížovku 13×13');

  const builder = new CrosswordBuilder(settings);
  return builder.build();
}

export const generateClassicCrossword = generateCrossword;
