import type { Word, GridCell, PlacedWord, Crossword, CrosswordSettings } from '@/types/crossword';
import { getRandomWords } from '@/data/czech-words';

// Arroword / Swedish-style crossword generator
// Clues are placed IN BLACK CELLS before each word, not in external lists
export class CrosswordGenerator {
  private grid: GridCell[][];
  private placedWords: PlacedWord[] = [];
  private gridSize: number;
  private wordNumber = 1;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.grid = this.createEmptyGrid(gridSize);
  }

  private createEmptyGrid(size: number): GridCell[][] {
    const grid: GridCell[][] = [];
    for (let y = 0; y < size; y++) {
      grid[y] = [];
      for (let x = 0; x < size; x++) {
        grid[y][x] = {
          letter: '',
          isBlack: false,
          x,
          y,
        };
      }
    }
    return grid;
  }

  // Check if we can place a word WITH its clue cell
  // For horizontal: need [clue cell][word letters...]
  // For vertical: need [clue cell above][word letters below...]
  private canPlaceWord(
    word: string,
    x: number,
    y: number,
    direction: 'horizontal' | 'vertical',
    intersectionIndex: number = -1
  ): boolean {
    const upperWord = word.toUpperCase();
    const len = upperWord.length;

    if (direction === 'horizontal') {
      // Need: clue cell at (x-1, y) + word from (x, y) to (x+len-1, y)
      if (x <= 0 || x + len > this.gridSize || y < 0 || y >= this.gridSize) return false;

      // Check clue cell position (unless this is at grid edge)
      const clueCell = this.grid[y][x - 1];
      if (clueCell.letter !== '' && !clueCell.isBlack) return false; // Clue cell must be empty or already black

      // Check each letter position
      for (let i = 0; i < len; i++) {
        const cell = this.grid[y][x + i];
        
        if (cell.letter !== '') {
          // OK if this is intersection and letters match
          if (i === intersectionIndex && cell.letter === upperWord[i]) {
            continue;
          }
          return false;
        }
        
        // Check cells above/below (except at intersection)
        if (i !== intersectionIndex) {
          if (y > 0 && this.grid[y - 1][x + i].letter !== '' && !this.grid[y - 1][x + i].isBlack) return false;
          if (y < this.gridSize - 1 && this.grid[y + 1][x + i].letter !== '' && !this.grid[y + 1][x + i].isBlack) return false;
        }
      }
      
      // Check cell after word
      if (x + len < this.gridSize && this.grid[y][x + len].letter !== '' && !this.grid[y][x + len].isBlack) return false;
      
    } else {
      // Vertical: need clue cell at (x, y-1) + word from (x, y) to (x, y+len-1)
      if (y <= 0 || y + len > this.gridSize || x < 0 || x >= this.gridSize) return false;

      // Check clue cell position
      const clueCell = this.grid[y - 1][x];
      if (clueCell.letter !== '' && !clueCell.isBlack) return false;

      // Check each letter position
      for (let i = 0; i < len; i++) {
        const cell = this.grid[y + i][x];
        
        if (cell.letter !== '') {
          if (i === intersectionIndex && cell.letter === upperWord[i]) {
            continue;
          }
          return false;
        }
        
        // Check cells left/right (except at intersection)
        if (i !== intersectionIndex) {
          if (x > 0 && this.grid[y + i][x - 1].letter !== '' && !this.grid[y + i][x - 1].isBlack) return false;
          if (x < this.gridSize - 1 && this.grid[y + i][x + 1].letter !== '' && !this.grid[y + i][x + 1].isBlack) return false;
        }
      }
      
      // Check cell after word
      if (y + len < this.gridSize && this.grid[y + len][x].letter !== '' && !this.grid[y + len][x].isBlack) return false;
    }

    return true;
  }

  // Place word WITH clue cell (Arroword / Swedish style)
  // Czech format: black cell with clue text + arrow → word follows
  private placeWord(
    word: Word,
    x: number,
    y: number,
    direction: 'horizontal' | 'vertical'
  ): void {
    const wordStr = word.word.toUpperCase();
    const len = wordStr.length;

    // Place CLUE CELL before the word with arrow indicator
    if (direction === 'horizontal') {
      const clueCell = this.grid[y][x - 1];
      clueCell.isBlack = true;
      clueCell.letter = '';
      
      // Handle multiple directions (if cell already has vertical clue)
      if (clueCell.clueDirection === 'vertical' || clueCell.clueTextVertical) {
        clueCell.clueDirection = 'both';
        clueCell.clueTextHorizontal = word.clue;
      } else {
        clueCell.clueDirection = 'horizontal';
        clueCell.clueText = word.clue;
      }
    } else {
      const clueCell = this.grid[y - 1][x];
      clueCell.isBlack = true;
      clueCell.letter = '';
      
      // Handle multiple directions (if cell already has horizontal clue)
      if (clueCell.clueDirection === 'horizontal' || clueCell.clueTextHorizontal) {
        clueCell.clueDirection = 'both';
        clueCell.clueTextVertical = word.clue;
      } else {
        clueCell.clueDirection = 'vertical';
        clueCell.clueText = word.clue;
      }
    }

    // Place the word letters
    for (let i = 0; i < len; i++) {
      if (direction === 'horizontal') {
        this.grid[y][x + i].letter = wordStr[i];
        this.grid[y][x + i].isBlack = false;
      } else {
        this.grid[y + i][x].letter = wordStr[i];
        this.grid[y + i][x].isBlack = false;
      }
    }

    // Record placed word
    const placedWord: PlacedWord = {
      word: wordStr,
      clue: word.clue,
      number: this.wordNumber,
      startX: x,
      startY: y,
      direction,
      length: len,
    };

    this.wordNumber++;
    this.placedWords.push(placedWord);
  }

  // Find possible intersection between a new word and existing words
  private findIntersection(
    newWord: string,
    existingWord: PlacedWord
  ): { x: number; y: number; newIndex: number; existingIndex: number } | null {
    const newUpper = newWord.toUpperCase();
    const existingUpper = existingWord.word;

    // Try each letter of new word
    for (let newIdx = 0; newIdx < newUpper.length; newIdx++) {
      // Try each letter of existing word
      for (let existingIdx = 0; existingIdx < existingUpper.length; existingIdx++) {
        // Letters must match
        if (newUpper[newIdx] !== existingUpper[existingIdx]) continue;

        // Calculate intersection position
        let x: number, y: number;
        let newDirection: 'horizontal' | 'vertical';

        if (existingWord.direction === 'horizontal') {
          // Existing word is horizontal → new word must be vertical
          newDirection = 'vertical';
          x = existingWord.startX + existingIdx;
          y = existingWord.startY - newIdx;
        } else {
          // Existing word is vertical → new word must be horizontal
          newDirection = 'horizontal';
          x = existingWord.startX - newIdx;
          y = existingWord.startY + existingIdx;
        }

        // Check if this placement is valid
        if (this.canPlaceWord(newWord, x, y, newDirection, newIdx)) {
          return { x, y, newIndex: newIdx, existingIndex: existingIdx };
        }
      }
    }

    return null;
  }

  // Try to place word using intersection with existing words
  private tryPlaceWordWithIntersection(word: Word): boolean {
    if (this.placedWords.length === 0) return false;

    // Shuffle placed words to try different intersections
    const shuffledWords = [...this.placedWords].sort(() => Math.random() - 0.5);

    for (const placedWord of shuffledWords) {
      const intersection = this.findIntersection(word.word, placedWord);
      
      if (intersection) {
        const newDirection = placedWord.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.placeWord(word, intersection.x, intersection.y, newDirection);
        return true;
      }
    }

    return false;
  }

  // Try to place word randomly in the grid
  private tryPlaceWordRandomly(word: Word): boolean {
    const wordLen = word.word.length;
    const attempts = 100;

    for (let attempt = 0; attempt < attempts; attempt++) {
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      
      // Random position with space for clue cell
      const x = direction === 'horizontal' 
        ? Math.floor(Math.random() * (this.gridSize - wordLen - 1)) + 1 // +1 for clue cell space
        : Math.floor(Math.random() * this.gridSize);
      
      const y = direction === 'vertical'
        ? Math.floor(Math.random() * (this.gridSize - wordLen - 1)) + 1 // +1 for clue cell space
        : Math.floor(Math.random() * this.gridSize);

      if (this.canPlaceWord(word.word, x, y, direction, -1)) {
        this.placeWord(word, x, y, direction);
        return true;
      }
    }

    return false;
  }

  public generate(settings: CrosswordSettings): Crossword {
    const targetCount = settings.wordCount ?? 20; // More words for dense grid
    const words = getRandomWords(targetCount * 5, settings.difficulty, settings.themes);

    if (words.length === 0) {
      throw new Error('Nepodařilo se najít slova pro zadané kriterium.');
    }

    // Sort: mix of long and short words for better crossings
    const longWords = words.filter(w => w.length >= 6).sort((a, b) => b.length - a.length);
    const shortWords = words.filter(w => w.length < 6).sort((a, b) => b.length - a.length);
    const sortedWords = [...longWords.slice(0, targetCount), ...shortWords.slice(0, targetCount)];

    console.log(`🎯 Cíl: ${targetCount} slov, K dispozici: ${sortedWords.length} slov`);

    // Place first word in the center (longer word preferred)
    const firstWord = longWords[0] || sortedWords[0];
    const startDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    let startX: number, startY: number;
    
    if (startDirection === 'horizontal') {
      startX = Math.floor((this.gridSize - firstWord.length) / 2) + 1; // +1 for clue cell
      startY = Math.floor(this.gridSize / 2);
    } else {
      startX = Math.floor(this.gridSize / 2);
      startY = Math.floor((this.gridSize - firstWord.length) / 2) + 1; // +1 for clue cell
    }
    
    this.placeWord(firstWord, startX, startY, startDirection);
    console.log(`✓ První slovo: "${firstWord.word}" (${startDirection}) na [${startX}, ${startY}]`);

    // Try to place remaining words - prioritize intersections for dense grid
    let placedCount = 1;
    let intersectionCount = 0;
    let randomCount = 0;
    let failCount = 0;
    
    for (let i = 1; i < sortedWords.length && placedCount < targetCount; i++) {
      const word = sortedWords[i];

      // Try intersection first (better quality and density)
      if (this.tryPlaceWordWithIntersection(word)) {
        placedCount++;
        intersectionCount++;
        console.log(`✓ Slovo ${placedCount}: "${word.word}" (průsečík)`);
      } 
      // Fallback to random only if we have very few words
      else if (placedCount < 5 && this.tryPlaceWordRandomly(word)) {
        placedCount++;
        randomCount++;
        console.log(`✓ Slovo ${placedCount}: "${word.word}" (náhodně)`);
      } else {
        failCount++;
      }
    }

    console.log(`📊 Celkem umístěno: ${placedCount} slov (průsečíky: ${intersectionCount}, náhodně: ${randomCount}, selhalo: ${failCount})`);
    console.log(`📝 Seznam slov: ${this.placedWords.map(w => w.word).join(', ')}`);

    // Add tajenka (mystery word) - Czech crossword feature
    const tajenkaWords = ['CESKO', 'PRAHA', 'ZABAVA', 'USPECH', 'RADOST', 'VITEZ', 'STESTI', 'SILA', 'DOMOV', 'KULTURA'];
    const tajenka = tajenkaWords[Math.floor(Math.random() * tajenkaWords.length)];

    // Collect all white cells with letters
    const whiteCells: { x: number; y: number }[] = [];
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        if (!this.grid[y][x].isBlack && this.grid[y][x].letter !== '') {
          whiteCells.push({ x, y });
        }
      }
    }

    console.log(`📦 Celkem ${whiteCells.length} vyplněných buněk`);

    // Shuffle and assign tajenka letters
    const shuffled = whiteCells.sort(() => Math.random() - 0.5);
    const tajenkaLength = Math.min(tajenka.length, shuffled.length);

    for (let i = 0; i < tajenkaLength; i++) {
      const cell = shuffled[i];
      this.grid[cell.y][cell.x].isTajenka = true;
      this.grid[cell.y][cell.x].letter = tajenka[i];
      
      // Přidej kroužek do legendové buňky před tímto písmenem
      // Najdi legendovou buňku (černou) která je před touto buňkou
      // Horizontální slovo: legenda je vlevo
      if (cell.x > 0 && this.grid[cell.y][cell.x - 1].isBlack) {
        this.grid[cell.y][cell.x - 1].hasTajenkaCircle = true;
      }
      // Vertikální slovo: legenda je nahoře
      if (cell.y > 0 && this.grid[cell.y - 1][cell.x].isBlack) {
        this.grid[cell.y - 1][cell.x].hasTajenkaCircle = true;
      }
    }

    // Add hints (pre-filled letters) - about 10% of cells
    const hintCount = Math.floor(whiteCells.length * 0.1);
    for (let i = 0; i < hintCount; i++) {
      const cell = shuffled[i + tajenkaLength];
      if (cell) {
        this.grid[cell.y][cell.x].napoveda = this.grid[cell.y][cell.x].letter;
      }
    }

    return {
      grid: this.grid,
      words: this.placedWords,
      tajenka,
      settings,
      createdAt: new Date(),
    };
  }

  public getGrid(): GridCell[][] {
    return this.grid;
  }

  public getPlacedWords(): PlacedWord[] {
    return this.placedWords;
  }
}

export function generateCrossword(settings: CrosswordSettings): Crossword {
  // VZOROVÝ ULTRA HUSTÝ PATTERN: 10x10 s krátkými slovy!
  const size = 10; // FIXNÍ VELIKOST PRO VZOROVÝ PATTERN
  const wordCount = 40; // HODNĚ slov pro hustý pattern (2-4 písmena)

  const normalizedSettings: CrosswordSettings = {
    ...settings,
    gridSize: size,
    wordCount,
    themes: settings.themes?.length ? settings.themes : ['vsechny'],
  };

  const generator = new CrosswordGenerator(size);
  return generator.generate(normalizedSettings);
}






