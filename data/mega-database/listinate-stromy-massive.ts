/**
 * LISTNATÉ STROMY - MASSIVE DATABASE
 * Zdroj: křížovkářský-slovník-online.cz
 */

import type { Word } from '@/types/crossword';

const rawWords = [
  // 3 písmena
  'BUK', 'DUB', 'MUK', 'VIČ',
  
  // 4 písmena
  'KLEN', 'LÍPA', 'VRBA', 'JILM',
  
  // 5 písmen
  'BŘÍZA', 'HABR', 'JAVOR', 'JINAN', 'LÍSKA', 'OLŠE', 'OSIKA', 'TOPOL',
  
  // 6 písmen
  'AKÁT', 'KAŠTAN', 'PLATAN', 'TŘEŠEŇ',
  
  // 7 písmen
  'LISTNÁČ', 'PAJASAN', 'ŠVESTKA',
];

export const listinateStromyMassive: Word[] = rawWords.map(word => ({
  word,
  clue: 'Listnatý strom',
  difficulty: word.length <= 4 ? 'lehka' : word.length <= 6 ? 'stredni' : 'tezka',
  themes: ['priroda', 'vsechny'],
  length: word.length,
}));

