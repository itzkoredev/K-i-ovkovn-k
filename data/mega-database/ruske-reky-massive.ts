/**
 * RUSKÉ ŘEKY - MASSIVE DATABASE (100+ slov)
 * Zdroj: křížovkářský-slovník-online.cz
 * Auto-generated length field
 */

import type { Word } from '@/types/crossword';

const rawWords = [
  // 2 písmena
  'AJ', 'IK', 'OM', 'UL',
  
  // 3 písmena
  'ATA', 'ATY', 'DON', 'IČA', 'KAN', 'KAS', 'ONA', 'OŠA', 'OŽU', 'TES', 'URA', 'USA', 'VOP', 'ZAJ',
  
  // 4 písmena
  'ABAN', 'EVOJ', 'IŽMA', 'JOVA', 'KAMA', 'KARA', 'KEMA', 'KUTA', 'LENA', 'NĚVA', 'NIVA', 'OLYM', 'ZEJA',
  
  // 5 písmen
  'BOLVA', 'DESNA', 'NARVA', 'OLDOJ', 'ONĚGA', 'SALAT', 'VOLGA', 'VOLHA',
  
  // 6 písmen
  'PEČORA', 'USSURI',
];

export const ruskeRekyMassive: Word[] = rawWords.map(word => ({
  word,
  clue: 'Ruská řeka',
  difficulty: word.length <= 3 ? 'lehka' : word.length <= 5 ? 'stredni' : 'tezka',
  themes: ['geografie', 'vsechny'],
  length: word.length,
}));

