/**
 * Test constraint-based generování s tajenkou
 */

import { CrosswordBuilder } from './lib/crossword-builder.ts';

console.log('🎯 Test constraint-based generování křížovky s tajenkou\n');

const settings = {
  difficulty: 'lehka',
  themes: ['vsechny'],
  showSolution: false
};

try {
  const builder = new CrosswordBuilder(settings);
  const crossword = builder.build();
  
  console.log('\n✅ VÝSLEDEK:');
  console.log(`   • Počet slov: ${crossword.words.length}`);
  console.log(`   • Tajenka: "${crossword.tajenka}"`);
  console.log(`   • Nápověda: ${crossword.tajenkaClue || 'N/A'}`);
  console.log(`   • Grid: ${crossword.grid.length}×${crossword.grid[0].length}\n`);
  
  // Najít tajenka řádek
  const tajenkaRow = 6; // Middle row pro 13×13
  console.log('📝 Tajenka řádek:');
  let tajenkaLine = '';
  for (let x = 0; x < crossword.grid[tajenkaRow].length; x++) {
    const cell = crossword.grid[tajenkaRow][x];
    if (cell.isBlack) {
      tajenkaLine += '█';
    } else if (cell.isTajenka) {
      tajenkaLine += cell.letter || '.';
    } else {
      tajenkaLine += ' ';
    }
  }
  console.log(`   ${tajenkaLine}\n`);
  
  // Výpis prvních 10 slov
  console.log('📚 První 10 slov:');
  crossword.words.slice(0, 10).forEach(word => {
    console.log(`   ${word.number}. ${word.word} (${word.direction}) - ${word.clue}`);
  });
  
  console.log('\n🎉 Test dokončen!');
  
} catch (error) {
  console.error('❌ Chyba:', error.message);
  console.error(error.stack);
  process.exit(1);
}
