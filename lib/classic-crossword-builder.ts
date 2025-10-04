import type { Word, GridCell, PlacedWord, Crossword, CrosswordSettings } from '@/types/crossword';
import { getRandomWords } from '@/data/czech-words';
import { createBalancedPattern, isBlackCell, isTajenkaRow, type GridPattern } from './symmetric-pattern';

/**
 * GENERÁTOR KLASICKÝCH KŘÍŽOVEK (iDNES formát)
 * 
 * Rozdíly oproti švédským:
 * - SYMETRICKÝ pattern černých polí (rotační symetrie 180°)
 * - BEZ clue buněk v gridu (jen černá pole)
 * - BEZ šipek
 * - Zadání jsou číslov aná a zobrazují se MIMO grid
 * - Tajenka = 2 ŽLUTÉ HORIZONTÁLNÍ řady
 * - Grid má pouze: písmena, černá pole, čísla v rozích
 */

export class ClassicCrosswordBuilder {
  private grid: GridCell[][];
  private gridWidth: number;
  private gridHeight: number;
  private placedWords: PlacedWord[] = [];
  private usedWords: Set<string> = new Set();
  private availableWords: Word[];
  private wordNumber = 1;
  private pattern: GridPattern;

  constructor(width: number, height: number, words: Word[]) {
    this.gridWidth = width;
    this.gridHeight = height;
    this.availableWords = words;
    
    // Vytvoř REALISTICKÝ BALANCED PATTERN podle iDNES křížovek!
    this.pattern = createBalancedPattern();
    console.log(`🎨 BALANCED pattern: ${this.pattern.blackCells.size} černých polí (~${Math.round(this.pattern.blackCells.size / (width * height) * 100)}%)`);
    
    this.grid = this.createEmptyGrid(width, height);
  }

  private createEmptyGrid(width: number, height: number): GridCell[][] {
    const grid: GridCell[][] = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = {
          letter: '',
          isBlack: isBlackCell(this.pattern, x, y), // Použij SYMETRICKÝ PATTERN!
          x,
          y,
        };
      }
    }
    return grid;
  }

  /**
   * Zkontroluj jestli slovo můžu umístit
   */
  private canPlaceWord(word: string, x: number, y: number, direction: 'horizontal' | 'vertical'): boolean {
    const letters = word.toUpperCase().split('');
    
    // Hranice
    if (direction === 'horizontal' && x + letters.length > this.gridWidth) return false;
    if (direction === 'vertical' && y + letters.length > this.gridHeight) return false;
    if (x < 0 || y < 0) return false;

    // Před slovem nesmí být písmeno (musí být černá nebo okraj)
    if (direction === 'horizontal' && x > 0) {
      if (!this.grid[y][x - 1].isBlack && this.grid[y][x - 1].letter) return false;
    }
    if (direction === 'vertical' && y > 0) {
      if (!this.grid[y - 1][x].isBlack && this.grid[y - 1][x].letter) return false;
    }

    // Po slově nesmí být písmeno (musí být černá nebo okraj)
    const endX = direction === 'horizontal' ? x + letters.length : x;
    const endY = direction === 'vertical' ? y + letters.length : y;
    if (endX < this.gridWidth && direction === 'horizontal') {
      if (!this.grid[y][endX].isBlack && this.grid[y][endX].letter) return false;
    }
    if (endY < this.gridHeight && direction === 'vertical') {
      if (!this.grid[endY][x].isBlack && this.grid[endY][x].letter) return false;
    }

    // Kontrola každého písmene
    for (let i = 0; i < letters.length; i++) {
      const cx = direction === 'horizontal' ? x + i : x;
      const cy = direction === 'vertical' ? y + i : y;
      const cell = this.grid[cy][cx];

      // Černé pole = nelze
      if (cell.isBlack) return false;

      // Písmeno už tam je - musí sedět
      if (cell.letter) {
        if (cell.letter !== letters[i]) return false;
        continue; // OK, písmeno sedí
      }

      // Prázdné pole - kontrola kolmých sousedů
      if (direction === 'horizontal') {
        // Nahoře/dole nesmí být písmeno (musí být černá nebo prázdná)
        if (cy > 0 && this.grid[cy - 1][cx].letter && !this.grid[cy - 1][cx].isBlack) return false;
        if (cy < this.gridHeight - 1 && this.grid[cy + 1][cx].letter && !this.grid[cy + 1][cx].isBlack) return false;
      } else {
        // Vlevo/vpravo nesmí být písmeno (musí být černá nebo prázdná)
        if (cx > 0 && this.grid[cy][cx - 1].letter && !this.grid[cy][cx - 1].isBlack) return false;
        if (cx < this.gridWidth - 1 && this.grid[cy][cx + 1].letter && !this.grid[cy][cx + 1].isBlack) return false;
      }
    }

    return true;
  }

  /**
   * Umísti slovo - BEZ clue buňky, JEN přidej číslo do první buňky
   */
  private placeWord(word: Word, x: number, y: number, direction: 'horizontal' | 'vertical'): void {
    const letters = word.word.toUpperCase().split('');
    
    // Přidej ČÍSLO do první buňky slova (ne clue!)
    this.grid[y][x].number = this.wordNumber;

    // Umísti písmena + číslo pro první buňku
    for (let i = 0; i < letters.length; i++) {
      const cx = direction === 'horizontal' ? x + i : x;
      const cy = direction === 'vertical' ? y + i : y;
      this.grid[cy][cx].letter = letters[i];
      
      // První buňka dostane číslo slova
      if (i === 0) {
        this.grid[cy][cx].number = this.wordNumber;
      }
    }

    // Zaznamenej
    this.placedWords.push({
      word: word.word.toUpperCase(),
      clue: word.clue,
      direction,
      startX: x,
      startY: y,
      number: this.wordNumber,
      length: letters.length,
    });

    this.usedWords.add(word.word.toUpperCase());
    this.wordNumber++;
    console.log(`✅ ${this.wordNumber - 1}. ${word.word} [${x},${y}] ${direction} - ${word.clue}`);
  }

  /**
   * NAJDI VŠECHNY PRÁZDNÉ SLOTY V GRIDU!
   * Slot = souvislý úsek bílých polí bez černých (min 2 písmena)
   */
  private findAllSlots(): Array<{x: number, y: number, length: number, direction: 'horizontal' | 'vertical', pattern: string}> {
    const slots: Array<{x: number, y: number, length: number, direction: 'horizontal' | 'vertical', pattern: string}> = [];

    // HORIZONTÁLNÍ sloty
    for (let y = 0; y < this.gridHeight; y++) {
      let slotStart = -1;
      let slotPattern = '';
      
      for (let x = 0; x <= this.gridWidth; x++) {
        const isEnd = x === this.gridWidth || this.grid[y][x].isBlack;
        
        if (!isEnd && !this.grid[y][x].isBlack) {
          if (slotStart === -1) slotStart = x;
          slotPattern += this.grid[y][x].letter || '.';
        }
        
        if (isEnd && slotStart !== -1) {
          const length = x - slotStart;
          // MINIMÁLNĚ 2 pole (ne 1!)
          if (length >= 2) {
            slots.push({x: slotStart, y, length, direction: 'horizontal', pattern: slotPattern});
          } else if (length === 1) {
            console.warn(`⚠️ Ignoruji slot délky 1 na [${slotStart},${y}]`);
          }
          slotStart = -1;
          slotPattern = '';
        }
      }
    }

    // VERTIKÁLNÍ sloty
    for (let x = 0; x < this.gridWidth; x++) {
      let slotStart = -1;
      let slotPattern = '';
      
      for (let y = 0; y <= this.gridHeight; y++) {
        const isEnd = y === this.gridHeight || this.grid[y][x].isBlack;
        
        if (!isEnd && !this.grid[y][x].isBlack) {
          if (slotStart === -1) slotStart = y;
          slotPattern += this.grid[y][x].letter || '.';
        }
        
        if (isEnd && slotStart !== -1) {
          const length = y - slotStart;
          // MINIMÁLNĚ 2 pole (ne 1!)
          if (length >= 2) {
            slots.push({x, y: slotStart, length, direction: 'vertical', pattern: slotPattern});
          } else if (length === 1) {
            console.warn(`⚠️ Ignoruji slot délky 1 na [${x},${slotStart}]`);
          }
          slotStart = -1;
          slotPattern = '';
        }
      }
    }

    // DEBUG první volání
    if (this.placedWords.length === 0) {
      const horizontal = slots.filter(s => s.direction === 'horizontal').length;
      const vertical = slots.filter(s => s.direction === 'vertical').length;
      console.log(`🔍 findAllSlots() našel: ${horizontal} H + ${vertical} V = ${slots.length} celkem`);
    }

    return slots;
  }

  /**
   * NAJDI SLOVO PRO SLOT s daným patternem (. = prázdné, A = pevné)
   */
  private findWordForSlot(length: number, pattern: string): Word | null {
    const candidates = this.availableWords.filter(w => {
      if (this.usedWords.has(w.word.toUpperCase())) return false;
      if (w.word.length !== length) return false;
      
      const word = w.word.toUpperCase();
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] !== '.' && pattern[i] !== word[i]) return false;
      }
      
      return true;
    });

    if (candidates.length === 0) return null;
    
    // Prioritizuj podle počtu písmen v patternu (víc křížení = lepší)
    const patternLetters = pattern.split('').filter(c => c !== '.').length;
    
    // Pokud máme hodně křížení, vyber z top 3
    if (patternLetters >= 3) {
      return candidates[Math.floor(Math.random() * Math.min(candidates.length, 3))];
    }
    
    // Pokud máme nějaké křížení, vyber z top 5
    if (patternLetters > 0) {
      return candidates[Math.floor(Math.random() * Math.min(candidates.length, 5))];
    }
    
    // Pokud žádné křížení, vyber z top 10 (abychom měli diverzitu)
    return candidates[Math.floor(Math.random() * Math.min(candidates.length, 10))];
  }

  /**
   * HLAVNÍ ALGORITMUS - ZÁKON GENEROVÁNÍ
   * 1. Vykreslit pattern
   * 2. Vybrat tajenku (1-2 slova pro žlutý řádek)
   * 3. Umístit tajenku
   * 4. Vyplnit vertikální sloty (protínají tajenku)
   * 5. Vyplnit horizontální sloty
   * 6. Iterovat dokud grid 100% plný
   * 7. Dopsat zadání dle databáze
   */
  public build(): Crossword {
    console.log('🏗️ STAVÍM KLASICKOU KŘÍŽOVKU - ZÁKON');
    console.log(`📐 Rozměr: ${this.gridWidth}×${this.gridHeight}`);
    console.log(`📚 K dispozici: ${this.availableWords.length} slov`);
    console.log(`⬛ Pattern: ${this.pattern.blackCells.size} černých polí`);
    console.log(`🟡 Tajenka: řádek ${this.pattern.tajenkiRows[0] + 1}`);

    // ZÁKON KROK 1-3: Umísti TAJENKU
    console.log('\n📍 KROK 1-3: TAJENKA');
    this.placeTajenkaWords();

    // ZÁKON KROK 4: Vyplň VERTIKÁLNÍ sloty
    console.log('\n📍 KROK 4: VERTIKÁLNÍ SLOTY (protínají tajenku)');
    this.fillVerticalSlots();

    // ZÁKON KROK 5: Vyplň HORIZONTÁLNÍ sloty
    console.log('\n📍 KROK 5: HORIZONTÁLNÍ SLOTY');
    this.fillHorizontalSlots();

    // ZÁKON KROK 6: Iteruj dokud 100% plný
    console.log('\n📍 KROK 6: DOPLNĚNÍ DO 100%');
    this.fillRemainingSlots();

    // Nastav tajenku (žluté řady)
    this.setTajenka();

    // ZÁKON KROK 7: Zadání jsou UŽ v databázi (word.clue)
    console.log('\n📍 KROK 7: ZADÁNÍ připravena (z databáze)');

    // FINÁLNÍ STATISTIKA
    const allSlots = this.findAllSlots();
    const emptySlots = allSlots.filter(slot => slot.pattern.includes('.'));
    const fillRate = Math.round(((allSlots.length - emptySlots.length) / allSlots.length) * 100);
    
    console.log(`\n🎉 HOTOVO - ZÁKON SPLNĚN!`);
    console.log(`📝 ${this.placedWords.length} slov umístěno`);
    console.log(`📊 ${allSlots.length - emptySlots.length}/${allSlots.length} slotů (${fillRate}%)`);
    console.log(`🔤 Tajenka: "${this.extractTajenka()}"`);
    if (emptySlots.length > 0) {
      console.warn(`⚠️ ${emptySlots.length} prázdných slotů (nedostatek slov v databázi)`);
    }

    return {
      grid: this.grid,
      words: this.placedWords,
      tajenka: this.extractTajenka(),
      settings: {} as CrosswordSettings,
      createdAt: new Date()
    };
  }

  /**
   * KROK 1: Umísti slova do TAJENKY (žlutý řádek)
   */
  private placeTajenkaWords(): void {
    const tajenkaRow = this.pattern.tajenkiRows[0]; // Řádek 7
    console.log(`\n🎯 KROK 1: Umísťuji TAJENKU do řádku ${tajenkaRow + 1}`);

    // Najdi všechny horizontální sloty v tajenkovém řádku
    const tajenkaSlots = this.findAllSlots().filter(
      slot => slot.direction === 'horizontal' && slot.y === tajenkaRow
    );

    console.log(`📍 Našel jsem ${tajenkaSlots.length} slotů v tajence:`);
    tajenkaSlots.forEach(slot => {
      console.log(`  - [${slot.x},${slot.y}] délka ${slot.length}, pattern: "${slot.pattern}"`);
    });

    for (const slot of tajenkaSlots) {
      const word = this.findWordForSlot(slot.length, slot.pattern);
      if (word) {
        console.log(`  ✅ Našel slovo: ${word.word} (délka ${word.word.length})`);
        if (this.canPlaceWord(word.word, slot.x, slot.y, slot.direction)) {
          this.placeWord(word, slot.x, slot.y, slot.direction);
        } else {
          console.log(`  ❌ Nelze umístit: ${word.word}`);
        }
      } else {
        console.log(`  ⚠️ Nenašel jsem slovo pro slot délky ${slot.length}`);
      }
    }
    
    console.log(`📊 Tajenka: ${this.placedWords.length} slov umístěno`);
  }

  /**
   * KROK 2: Vyplň VERTIKÁLNÍ sloty (protínají tajenku)
   */
  private fillVerticalSlots(): void {
    console.log(`\n📊 KROK 2: Vyplňuji VERTIKÁLNÍ sloty`);
    
    let iterations = 0;
    const maxIterations = 200;

    while (iterations < maxIterations) {
      iterations++;

      const verticalSlots = this.findAllSlots().filter(
        slot => slot.direction === 'vertical' && slot.pattern.includes('.')
      );

      if (verticalSlots.length === 0) break;

      // Prioritizuj sloty s nejvíce písmeny
      verticalSlots.sort((a, b) => {
        const aFilled = a.pattern.split('').filter(c => c !== '.').length;
        const bFilled = b.pattern.split('').filter(c => c !== '.').length;
        return bFilled - aFilled;
      });

      let placed = false;
      for (const slot of verticalSlots.slice(0, 5)) {
        const word = this.findWordForSlot(slot.length, slot.pattern);
        if (word && this.canPlaceWord(word.word, slot.x, slot.y, slot.direction)) {
          this.placeWord(word, slot.x, slot.y, slot.direction);
          placed = true;
          break;
        }
      }

      if (!placed) break;
    }
  }

  /**
   * KROK 3: Vyplň HORIZONTÁLNÍ sloty (mimo tajenku)
   */
  private fillHorizontalSlots(): void {
    console.log(`\n📊 KROK 3: Vyplňuji HORIZONTÁLNÍ sloty`);
    
    let iterations = 0;
    const maxIterations = 200;

    while (iterations < maxIterations) {
      iterations++;

      const horizontalSlots = this.findAllSlots().filter(
        slot => slot.direction === 'horizontal' && slot.pattern.includes('.')
      );

      if (horizontalSlots.length === 0) break;

      horizontalSlots.sort((a, b) => {
        const aFilled = a.pattern.split('').filter(c => c !== '.').length;
        const bFilled = b.pattern.split('').filter(c => c !== '.').length;
        return bFilled - aFilled;
      });

      let placed = false;
      for (const slot of horizontalSlots.slice(0, 5)) {
        const word = this.findWordForSlot(slot.length, slot.pattern);
        if (word && this.canPlaceWord(word.word, slot.x, slot.y, slot.direction)) {
          this.placeWord(word, slot.x, slot.y, slot.direction);
          placed = true;
          break;
        }
      }

      if (!placed) break;
    }
  }

  /**
   * KROK 4: Agresivní vyplnění zbytku
   */
  private fillRemainingSlots(): void {
    console.log(`\n📊 KROK 4: Agresivní doplnění zbytku`);
    
    let iterations = 0;
    const maxIterations = 300;
    let consecutiveFailures = 0;

    while (iterations < maxIterations && consecutiveFailures < 30) {
      iterations++;

      const emptySlots = this.findAllSlots().filter(slot => slot.pattern.includes('.'));
      
      if (emptySlots.length === 0) {
        console.log('✅ Grid je 100% vyplněný!');
        break;
      }

      emptySlots.sort((a, b) => {
        const aFilled = a.pattern.split('').filter(c => c !== '.').length;
        const bFilled = b.pattern.split('').filter(c => c !== '.').length;
        return bFilled - aFilled;
      });

      let placed = false;
      for (const slot of emptySlots.slice(0, 10)) {
        const word = this.findWordForSlot(slot.length, slot.pattern);
        if (word && this.canPlaceWord(word.word, slot.x, slot.y, slot.direction)) {
          this.placeWord(word, slot.x, slot.y, slot.direction);
          placed = true;
          consecutiveFailures = 0;
          break;
        }
      }

      if (!placed) consecutiveFailures++;
    }
  }

  /**
   * Nastav tajenku jako 2 HORIZONTÁLNÍ ŽLUTÉ řady z patternu
   * POUZE BÍLÁ POLE (ne černá!)
   */
  private setTajenka(): void {
    const tajenkiRows = this.pattern.tajenkiRows;

    console.log(`🎯 Tajenka: ŽLUTÉ HORIZONTÁLNÍ řady ${tajenkiRows.map(r => r + 1).join(' a ')}`);

    // Označ řady z patternu jako tajenku (jen bílá pole!)
    for (const row of tajenkiRows) {
      for (let x = 0; x < this.gridWidth; x++) {
        // ❌ NEOZNAČUJ černá pole jako tajenku!
        if (!this.grid[row][x].isBlack) {
          this.grid[row][x].isTajenka = true;
        }
      }
    }
  }

  /**
   * Extrahuj text tajenky
   */
  private extractTajenka(): string {
    const tajenkaLetters: string[] = [];
    
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        if (this.grid[y][x].isTajenka && this.grid[y][x].letter) {
          tajenkaLetters.push(this.grid[y][x].letter);
        }
      }
    }

    return tajenkaLetters.join('');
  }
}
