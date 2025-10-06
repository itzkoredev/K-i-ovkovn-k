/**
 * STÁHNOUT PLNOU ČESKOU DATABÁZI SLOV
 * Zdroj: GitHub - hermitdave/FrequencyWords (299k+ slov)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SOURCES = [
  {
    name: 'FrequencyWords (GitHub)',
    url: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/cs/cs_50k.txt',
    outputFile: path.join(__dirname, '..', 'data', 'czech-words-50k.txt'),
    description: '50,000 nejčastějších českých slov'
  },
  {
    name: 'Czech Wordlist',
    url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/cs_CZ/cs_CZ.dic',
    outputFile: path.join(__dirname, '..', 'data', 'czech-words-libreoffice.txt'),
    description: 'LibreOffice český slovník (~180k slov)'
  }
];

console.log('🚀 STAHUJI PLNOU ČESKOU DATABÁZI SLOV...\n');

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Redirect
        return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function processWordlist(inputFile, outputFile) {
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n');
  
  const words = lines
    .map(line => {
      // FrequencyWords formát: "slovo 12345"
      const match = line.match(/^(\S+)/);
      return match ? match[1].toLowerCase() : null;
    })
    .filter(word => word && word.length >= 2 && word.length <= 15)
    .filter(word => /^[a-záčďéěíňóřšťúůýž]+$/i.test(word)); // Jen česká písmena
  
  // Odstranit duplicity
  const uniqueWords = [...new Set(words)];
  
  return uniqueWords;
}

async function main() {
  // Vytvoř data složku
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let allWords = new Set();

  for (const source of SOURCES) {
    try {
      console.log(`📥 Stahuji: ${source.description}...`);
      await downloadFile(source.url, source.outputFile);
      console.log(`✅ Staženo: ${source.outputFile}\n`);
      
      // Zpracuj slova
      const words = await processWordlist(source.outputFile, null);
      console.log(`   → ${words.length} slov načteno`);
      
      words.forEach(w => allWords.add(w));
      
    } catch (error) {
      console.error(`❌ Chyba u ${source.name}:`, error.message);
    }
  }

  console.log(`\n✨ CELKEM: ${allWords.size} unikátních českých slov!\n`);

  // Ulož jako TypeScript
  const outputPath = path.join(dataDir, 'czech-words-full.ts');
  const wordsArray = Array.from(allWords).sort();
  
  // Rozdělení po délce
  const byLength = {};
  wordsArray.forEach(word => {
    const len = word.length;
    if (!byLength[len]) byLength[len] = [];
    byLength[len].push(word);
  });

  let tsContent = `/**
 * PLNÁ ČESKÁ DATABÁZE SLOV
 * Zdroj: FrequencyWords + LibreOffice
 * Celkem: ${wordsArray.size} slov
 * Generováno: ${new Date().toISOString()}
 */

export const FULL_CZECH_WORDS: Record<number, string[]> = {\n`;

  for (const [len, words] of Object.entries(byLength)) {
    tsContent += `  ${len}: [\n`;
    
    // Po 10 slovech na řádek
    for (let i = 0; i < words.length; i += 10) {
      const chunk = words.slice(i, i + 10);
      tsContent += `    ${chunk.map(w => `'${w}'`).join(', ')},\n`;
    }
    
    tsContent += `  ],\n\n`;
  }

  tsContent += `};\n\n`;
  tsContent += `export const FULL_WORDS_COUNT = ${wordsArray.length};\n`;

  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`💾 Uloženo do: ${outputPath}`);
  console.log(`\n🎉 HOTOVO! Databáze obsahuje ${wordsArray.length} slov.`);
}

main().catch(console.error);
