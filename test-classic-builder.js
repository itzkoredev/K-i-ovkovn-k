// SIMULACE KLASICKÉHO GENERÁTORU

console.log('🧪 SIMULACE GENEROVÁNÍ KLASICKÉ KŘÍŽOVKY\n');

// Simulace pattern
const pattern = {
  width: 15,
  height: 15,
  tajenkiRows: [7], // Řádek 7 (index 7)
  blackCells: new Set([
    '0,0', '2,0', '6,0', '8,0', '12,0', '14,0',
    '4,3', '7,3', '10,3',
    '3,4', '4,4', '10,4', '11,4',
    '2,5', '3,5', '6,5', '8,5', '11,5', '12,5',
    '0,6', '5,6', '9,6', '14,6',
    '1,7', '13,7', // Tajenka řádek - černá na krajích
    '0,8', '5,8', '9,8', '14,8',
    '2,9', '3,9', '6,9', '8,9', '11,9', '12,9',
    '3,10', '4,10', '10,10', '11,10',
    '4,11', '7,11', '10,11',
    '0,14', '2,14', '6,14', '8,14', '12,14', '14,14'
  ])
};

console.log('📐 Pattern:', pattern.width + '×' + pattern.height);
console.log('⬛ Černá pole:', pattern.blackCells.size);
console.log('🟡 Tajenka: řádek', pattern.tajenkiRows[0] + 1);

// Simulace gridu
const grid = [];
for (let y = 0; y < 15; y++) {
  grid[y] = [];
  for (let x = 0; x < 15; x++) {
    grid[y][x] = {
      letter: '',
      isBlack: pattern.blackCells.has(`${x},${y}`),
      x, y
    };
  }
}

// KROK 1: Najdi sloty v tajence (řádek 7)
console.log('\n🎯 KROK 1: Hledám sloty v tajence (řádek 7)');
const tajenkaRow = 7;
let slotStart = -1;
const tajenkaSlots = [];

for (let x = 0; x <= 15; x++) {
  const isEnd = x === 15 || grid[tajenkaRow][x].isBlack;
  
  if (!isEnd && !grid[tajenkaRow][x].isBlack) {
    if (slotStart === -1) slotStart = x;
  }
  
  if (isEnd && slotStart !== -1) {
    const length = x - slotStart;
    if (length >= 2) {
      tajenkaSlots.push({ x: slotStart, y: tajenkaRow, length });
      console.log(`  📍 Slot [${slotStart},${tajenkaRow}] délka ${length}`);
    }
    slotStart = -1;
  }
}

console.log(`  ✅ Našel jsem ${tajenkaSlots.length} slotů v tajence`);

// KROK 2: Najdi všechny horizontální sloty
console.log('\n📊 KROK 2: Hledám všechny HORIZONTÁLNÍ sloty');
const horizontalSlots = [];

for (let y = 0; y < 15; y++) {
  slotStart = -1;
  
  for (let x = 0; x <= 15; x++) {
    const isEnd = x === 15 || grid[y][x].isBlack;
    
    if (!isEnd && !grid[y][x].isBlack) {
      if (slotStart === -1) slotStart = x;
    }
    
    if (isEnd && slotStart !== -1) {
      const length = x - slotStart;
      if (length >= 2) {
        horizontalSlots.push({ x: slotStart, y, length });
      }
      slotStart = -1;
    }
  }
}

console.log(`  ✅ Našel jsem ${horizontalSlots.length} horizontálních slotů`);

// KROK 3: Najdi všechny vertikální sloty
console.log('\n📊 KROK 3: Hledám všechny VERTIKÁLNÍ sloty');
const verticalSlots = [];

for (let x = 0; x < 15; x++) {
  slotStart = -1;
  
  for (let y = 0; y <= 15; y++) {
    const isEnd = y === 15 || grid[y][x].isBlack;
    
    if (!isEnd && !grid[y][x].isBlack) {
      if (slotStart === -1) slotStart = y;
    }
    
    if (isEnd && slotStart !== -1) {
      const length = y - slotStart;
      if (length >= 2) {
        verticalSlots.push({ x, y: slotStart, length });
      }
      slotStart = -1;
    }
  }
}

console.log(`  ✅ Našel jsem ${verticalSlots.length} vertikálních slotů`);

// FINÁLNÍ STATISTIKA
console.log('\n📈 FINÁLNÍ STATISTIKA:');
console.log(`  🟡 Tajenka: ${tajenkaSlots.length} slotů`);
console.log(`  ➡️  Horizontální: ${horizontalSlots.length} slotů`);
console.log(`  ⬇️  Vertikální: ${verticalSlots.length} slotů`);
console.log(`  📊 CELKEM: ${horizontalSlots.length + verticalSlots.length} slotů k vyplnění`);

// Vizualizace patternu
console.log('\n🎨 PATTERN VIZUALIZACE:');
for (let y = 0; y < 15; y++) {
  let row = '';
  for (let x = 0; x < 15; x++) {
    if (grid[y][x].isBlack) {
      row += '⬛';
    } else if (y === 7) {
      row += '🟡'; // Tajenka
    } else {
      row += '⬜';
    }
  }
  console.log(row);
}

console.log('\n✅ SIMULACE DOKONČENA!');
