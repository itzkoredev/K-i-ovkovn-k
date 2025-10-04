import { czechWords } from './data/czech-words.js';

console.log('\n📚 DATABÁZE SLOV:');
console.log('Celkem slov:', czechWords.length);

const byLength = {};
czechWords.forEach(w => {
  const len = w.word.length;
  byLength[len] = (byLength[len] || 0) + 1;
});

console.log('\n📊 Rozdělení podle délky:');
Object.keys(byLength).sort((a, b) => parseInt(a) - parseInt(b)).forEach(len => {
  console.log(`  ${len} písmen: ${byLength[len]} slov`);
});

console.log('\n🎯 Pro tajenku (11 písmen):', byLength[11] || 0, 'slov');
console.log('');
