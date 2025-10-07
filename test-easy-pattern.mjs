#!/usr/bin/env node

/**
 * TEST EASY TAJENKA PATTERNU
 */

console.log('🧪 TEST NOVÉHO EASY TAJENKA PATTERNU\n');

// Simulace patternu
const pattern = {
  width: 13,
  height: 13,
  tajenkiRows: [6], // prostřední řádek
};

const layout = [
  '...#...#...#.', // řádek 0
  '...#...#...#.', // řádek 1
  '.#.#.#.#.#.#.', // řádek 2
  '...#...#...#.', // řádek 3
  '...#...#...#.', // řádek 4
  '.#.......#.#.', // řádek 5
  '.............', // řádek 6 - TAJENKA (plně průchozí!)
  '.#.#.......#.', // řádek 7
  '...#...#...#.', // řádek 8
  '...#...#...#.', // řádek 9
  '.#.#.#.#.#.#.', // řádek 10
  '...#...#...#.', // řádek 11
  '...#...#...#.'  // řádek 12
];

console.log('📐 Pattern velikost:', pattern.width + '×' + pattern.height);
console.log('🟡 Tajenka řádek:', pattern.tajenkiRows[0] + 1, '(index', pattern.tajenkiRows[0] + ')');

// Spočítej černá pole
let blackCount = 0;
layout.forEach(row => {
  blackCount += (row.match(/#/g) || []).length;
});
console.log('⬛ Černých polí:', blackCount);
console.log('⬜ Bílých polí:', (13 * 13) - blackCount);

// Tajenka řádek analýza
const tajenkaRowIndex = 6;
const tajenkaRowStr = layout[tajenkaRowIndex];
console.log('\n🎯 TAJENKA ŘÁDEK:');
console.log('   Pattern:', tajenkaRowStr);
console.log('   Délka:', tajenkaRowStr.replace(/#/g, '').length, 'písmen');
console.log('   Černých polí:', (tajenkaRowStr.match(/#/g) || []).length);

// Analýza vertikálních slotů
console.log('\n📊 VERTIKÁLNÍ SLOTY KŘÍŽÍCÍ TAJENKU:');
let crossingSlots = 0;
for (let x = 0; x < 13; x++) {
  let hasSlot = false;
  for (let y = 0; y < 13; y++) {
    if (layout[y][x] !== '#' && y === 6) {
      // Je to bílá buňka v tajenka řádku
      // Zkontroluj jestli je součástí vertikálního slotu
      let slotLength = 0;
      let slotStart = y;
      while (slotStart > 0 && layout[slotStart - 1][x] !== '#') {
        slotStart--;
      }
      for (let sy = slotStart; sy < 13 && layout[sy][x] !== '#'; sy++) {
        slotLength++;
      }
      if (slotLength >= 2) {
        hasSlot = true;
        console.log(`   Sloupec ${x + 1}: vertikální slot délky ${slotLength} (kříží tajenku)`);
        crossingSlots++;
      }
      break;
    }
  }
}
console.log('\n✅ Celkem vertikálních slotů křížících tajenku:', crossingSlots);

// Analýza horizontálních slotů
console.log('\n📊 HORIZONTÁLNÍ SLOTY (mimo tajenku):');
let horizontalSlots = 0;
for (let y = 0; y < 13; y++) {
  if (y === 6) continue; // přeskoč tajenka řádek
  
  let slotStart = -1;
  for (let x = 0; x <= 13; x++) {
    const isBlack = x === 13 || layout[y][x] === '#';
    
    if (!isBlack && slotStart === -1) {
      slotStart = x;
    } else if (isBlack && slotStart !== -1) {
      const slotLength = x - slotStart;
      if (slotLength >= 2) {
        console.log(`   Řádek ${y + 1}: horizontal slot délky ${slotLength}`);
        horizontalSlots++;
      }
      slotStart = -1;
    }
  }
}
console.log('\n✅ Celkem horizontálních slotů:', horizontalSlots);

console.log('\n📈 SHRNUTÍ:');
console.log('   Vertikální sloty:', crossingSlots);
console.log('   Horizontální sloty:', horizontalSlots);
console.log('   Celkem slotů:', crossingSlots + horizontalSlots);
console.log('   Tajenka délka:', tajenkaRowStr.replace(/#/g, '').length, 'písmen');

console.log('\n✅ Pattern vypadá OK pro generování křížovky s tajenkou!');
