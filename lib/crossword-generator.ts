import type { Word, GridCell, PlacedWord, Crossword, CrosswordSettings } from '@/types/crossword';
import { getRandomWords } from '@/data/czech-words';

// Generátor křížovky
export class CrosswordGenerator {
  private grid: GridCell[][];
  private placedWords: PlacedWord[] = [];
  private gridSize: number;
  private wordNumber: number = 1;

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
          isBlack: true,
          x,
          y,
        };
      }
    }
    return grid;
  }

  private canPlaceWord(
    word: string,
    x: number,
    y: number,
    direction: 'horizontal' | 'vertical'
  ): boolean {
    if (direction === 'horizontal') {
      // Kontrola, zda se slovo vejde do mřížky
      if (x + word.length > this.gridSize) return false;

      // Kontrola kolizí
      for (let i = 0; i < word.length; i++) {
        const cell = this.grid[y][x + i];
        
        // Pokud je buňka obsazená jiným písmenem
        if (cell.letter !== '' && cell.letter !== word[i]) {
          return false;
        }

        // Kontrola vedlejších buněk (nesmí být písmo vedle, pokud není průsečík)
        if (y > 0) {
          const above = this.grid[y - 1][x + i];
          if (above.letter !== '' && cell.letter === '') return false;
        }
        if (y < this.gridSize - 1) {
          const below = this.grid[y + 1][x + i];
          if (below.letter !== '' && cell.letter === '') return false;
        }
      }

      // Kontrola buněk před a za slovem
      if (x > 0 && this.grid[y][x - 1].letter !== '') return false;
      if (x + word.length < this.gridSize && this.grid[y][x + word.length].letter !== '') return false;

    } else {
      // Vertical
      if (y + word.length > this.gridSize) return false;

      for (let i = 0; i < word.length; i++) {
        const cell = this.grid[y + i][x];
        
        if (cell.letter !== '' && cell.letter !== word[i]) {
          return false;
        }

        // Kontrola vedlejších buněk
        if (x > 0) {
          const left = this.grid[y + i][x - 1];
          if (left.letter !== '' && cell.letter === '') return false;
        }
        if (x < this.gridSize - 1) {
          const right = this.grid[y + i][x + 1];
          if (right.letter !== '' && cell.letter === '') return false;
        }
      }

      if (y > 0 && this.grid[y - 1][x].letter !== '') return false;
      if (y + word.length < this.gridSize && this.grid[y + word.length][x].letter !== '') return false;
    }

    return true;
  }

  private placeWord(
    word: Word,
    x: number,
    y: number,
    direction: 'horizontal' | 'vertical'
  ): void {
    const wordStr = word.word;
    
    // Přiřazení čísla na začátek slova (pokud tam ještě není)
    if (!this.grid[y][x].number) {
      this.grid[y][x].number = this.wordNumber;
    }
    
    const placedWord: PlacedWord = {
      word: wordStr,
      clue: word.clue,
      number: this.grid[y][x].number!,
      startX: x,
      startY: y,
      direction,
      length: wordStr.length,
    };

    this.wordNumber++;
    this.placedWords.push(placedWord);

    // Umístění písmen do mřížky
    for (let i = 0; i < wordStr.length; i++) {
      if (direction === 'horizontal') {
        this.grid[y][x + i].letter = wordStr[i];
        this.grid[y][x + i].isBlack = false;
      } else {
        this.grid[y + i][x].letter = wordStr[i];
        this.grid[y + i][x].isBlack = false;
      }
    }
  }

  private findIntersection(
    existingWord: PlacedWord,
    newWord: string
  ): { x: number; y: number; direction: 'horizontal' | 'vertical' } | null {
    const existingWordStr = existingWord.word;
    
    // Zkusíme najít společné písmeno
    for (let i = 0; i < existingWordStr.length; i++) {
      for (let j = 0; j < newWord.length; j++) {
        if (existingWordStr[i] === newWord[j]) {
          // Máme shodu písmen
          let x, y, direction: 'horizontal' | 'vertical';
          
          if (existingWord.direction === 'horizontal') {
            // Nové slovo bude vertikální
            direction = 'vertical';
            x = existingWord.startX + i;
            y = existingWord.startY - j;
          } else {
            // Nové slovo bude horizontální
            direction = 'horizontal';
            x = existingWord.startX - j;
            y = existingWord.startY + i;
          }
          
          // Kontrola, zda se vejde
          if (x >= 0 && y >= 0 && this.canPlaceWord(newWord, x, y, direction)) {
            return { x, y, direction };
          }
        }
      }
    }
    
    return null;
  }

  private tryPlaceWordWithIntersection(word: Word): boolean {
    // Pokusíme se najít průsečík s existujícími slovy
    for (const placedWord of this.placedWords) {
      const intersection = this.findIntersection(placedWord, word.word);
      if (intersection) {
        this.placeWord(word, intersection.x, intersection.y, intersection.direction);
        return true;
      }
    }
    return false;
  }

  private tryPlaceWordRandomly(word: Word): boolean {
    const attempts = 100;
    
    for (let attempt = 0; attempt < attempts; attempt++) {
      const direction: 'horizontal' | 'vertical' = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      const x = Math.floor(Math.random() * this.gridSize);
      const y = Math.floor(Math.random() * this.gridSize);
      
      if (this.canPlaceWord(word.word, x, y, direction)) {
        this.placeWord(word, x, y, direction);
        return true;
      }
    }
    
    return false;
  }

  public generate(settings: CrosswordSettings): Crossword {
    // Získání slov podle nastavení
    const words = getRandomWords(
      settings.wordCount * 3, // Vezmeme víc slov, abychom měli z čeho vybírat
      settings.difficulty,
      settings.themes // Nyní pole témat
    );

    if (words.length === 0) {
      throw new Error('Nenalezena žádná slova pro zadané kritérium');
    }

    // Seřadíme slova podle délky (delší slova mají přednost)
    words.sort((a, b) => b.length - a.length);

    // Umístíme první slovo uprostřed mřížky horizontálně
    const firstWord = words[0];
    const startX = Math.floor((this.gridSize - firstWord.length) / 2);
    const startY = Math.floor(this.gridSize / 2);
    this.placeWord(firstWord, startX, startY, 'horizontal');

    // Pokusíme se umístit zbylá slova
    let placedCount = 1;
    for (let i = 1; i < words.length && placedCount < settings.wordCount; i++) {
      const word = words[i];
      
      // Nejprve zkusíme najít průsečík
      if (this.tryPlaceWordWithIntersection(word)) {
        placedCount++;
      } else if (placedCount < 5) {
        // Pro první slova zkusíme náhodné umístění
        if (this.tryPlaceWordRandomly(word)) {
          placedCount++;
        }
      }
    }

    // === GENEROVÁNÍ TAJENKY ===
    const tajenkaWords = ['ČESKO', 'PRAHA', 'ZÁBAVA', 'ÚSPĚCH', 'RADOST', 'VÍTĚZ', 'ŠTĚSTÍ'];
    const tajenka = tajenkaWords[Math.floor(Math.random() * tajenkaWords.length)];
    
    // Najdeme všechny bílé buňky (s písmeny)
    const whiteCells: { x: number; y: number }[] = [];
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        if (!this.grid[y][x].isBlack && this.grid[y][x].letter !== '') {
          whiteCells.push({ x, y });
        }
      }
    }
    
    // Náhodně vybereme políčka pro tajenku
    const shuffled = whiteCells.sort(() => Math.random() - 0.5);
    const tajenkaLength = Math.min(tajenka.length, shuffled.length);
    
    for (let i = 0; i < tajenkaLength; i++) {
      const cell = shuffled[i];
      this.grid[cell.y][cell.x].isTajenka = true;
    }
    
    // === PŘIDÁNÍ NÁPOVĚD (10% políček dostane nápovědu) ===
    const napovyCount = Math.floor(whiteCells.length * 0.1);
    for (let i = 0; i < napovyCount; i++) {
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

// Hlavní funkce pro generování křížovky
export function generateCrossword(settings: CrosswordSettings): Crossword {
  const generator = new CrosswordGenerator(settings.gridSize);
  return generator.generate(settings);
}
