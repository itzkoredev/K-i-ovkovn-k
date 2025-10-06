// Test velikosti gridu
import { generateCrossword } from './lib/index.ts';

const settings = {
  difficulty: 'lehka',
  themes: ['vsechny'],
  gridSize: 13 // ignorováno
};

console.log('\n🧪 TESTUJU VELIKOST GRIDU:\n');

const crossword = generateCrossword(settings);

console.log(`📐 Grid rozměry: ${crossword.grid[0].length} × ${crossword.grid.length}`);
console.log(`📝 Počet slov: ${crossword.words.length}`);
console.log(`🎯 Tajenka: "${crossword.tajenka}"`);
console.log(`⬛ První řádek černých polí: ${crossword.grid[0].filter(c => c.isBlack).length} z ${crossword.grid[0].length}`);
