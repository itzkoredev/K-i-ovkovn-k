/**
 * ZPRACOVAT ÚJČ DATABÁZI - 275K OFICIÁLNÍCH ČESKÝCH SLOV!
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('📚 ZPRACOVÁVÁM ÚJČ DATABÁZI...\n');

const csvPath = path.join(__dirname, '..', 'data', 'ujc', 'czphlexcorp_29-06-16.csv');
const outputPath = path.join(__dirname, '..', 'data', 'ujc-words.ts');

// Načti CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8').replace(/^\uFEFF/, ''); // Odstranit BOM
const lines = csvContent.split('\n');

console.log(`📄 Načteno ${lines.length} řádků z CSV`);

// První řádek = header
const header = lines[0].split(';');
console.log(`📋 Header: ${header.slice(0, 10).join(', ')}...`);

const orthoIndex = header.indexOf('Ortho');

if (orthoIndex === -1) {
  console.error('❌ Sloupec "Ortho" nenalezen!');
  console.error(`   Dostupné sloupce: ${header.join(', ')}`);
  process.exit(1);
}

console.log(`✅ Sloupec "Ortho" na indexu ${orthoIndex}\n`);

// Zpracuj slova
const words = new Set();
let processed = 0;
let skipped = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const cols = line.split(';');
  const word = cols[orthoIndex];
  
  if (!word || word.length < 2 || word.length > 15) {
    skipped++;
    continue;
  }
  
  // Jen česká písmena (bez mezer, pomlček, apod.)
  if (!/^[a-záčďéěíňóřšťúůýžĎŇŤŮÁÉÍÓÚŮÝČŘŠŽĚ]+$/i.test(word)) {
    skipped++;
    continue;
  }
  
  words.add(word.toLowerCase());
  processed++;
  
  if (processed % 10000 === 0) {
    console.log(`  ⏳ Zpracováno ${processed} slov...`);
  }
}

console.log(`\n✅ Zpracováno: ${processed} slov`);
console.log(`⚠️  Přeskočeno: ${skipped} (moc krátké/dlouhé/neplatné)`);
console.log(`📊 Unikátní slova: ${words.size}\n`);

// Rozdělení po délce
const byLength = {};
for (const word of words) {
  const len = word.length;
  if (!byLength[len]) byLength[len] = [];
  byLength[len].push(word);
}

// Generuj TypeScript
let tsContent = `/**
 * ÚJČ DATABÁZE - OFICIÁLNÍ ČESKÁ SLOVA
 * Zdroj: Ústav pro jazyk český AV ČR (Phonological Corpus of Czech)
 * URL: https://ujc.cas.cz/cs/phword/
 * Celkem: ${words.size} slov
 * Generováno: ${new Date().toISOString()}
 */

export const UJC_CZECH_WORDS: Record<number, string[]> = {\n`;

for (const [len, wordList] of Object.entries(byLength).sort((a, b) => a[0] - b[0])) {
  wordList.sort();
  tsContent += `  ${len}: [\n`;
  
  // Po 10 slovech na řádek
  for (let i = 0; i < wordList.length; i += 10) {
    const chunk = wordList.slice(i, i + 10);
    tsContent += `    ${chunk.map(w => `'${w}'`).join(', ')},\n`;
  }
  
  tsContent += `  ],\n\n`;
}

tsContent += `};\n\nexport const UJC_WORDS_COUNT = ${words.size};\n`;

// Statistiky po délce
tsContent += `\n// STATISTIKY PO DÉLCE:\n`;
for (const [len, wordList] of Object.entries(byLength).sort((a, b) => a[0] - b[0])) {
  tsContent += `// Délka ${len}: ${wordList.length} slov\n`;
}

fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`💾 Uloženo do: ${outputPath}`);
console.log(`\n🎉 HOTOVO! ${words.size} oficiálních českých slov!`);

// Výpis statistik
console.log('\n📊 STATISTIKY PO DÉLCE:');
for (const [len, wordList] of Object.entries(byLength).sort((a, b) => a[0] - b[0])) {
  console.log(`   Délka ${len.padStart(2)}: ${wordList.length.toString().padStart(6)} slov`);
}
