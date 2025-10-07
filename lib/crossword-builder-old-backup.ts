import { getWordDatabase } from './word-database';
import { createEasyTajenkaPattern, isBlackCell, type GridPattern } from './symmetric-pattern';
import { getRandomTajenka, type TajenkaPhrase } from '@/data/tajenky';
import type { Crossword, CrosswordSettings, GridCell, PlacedWord, Word } from '@/types/crossword';

interface Slot {
  x: number;
  y: number;
  length: number;
  direction: 'horizontal' | 'vertical';
  pattern: string;
}

/**
 * CONSTRAINT-BASED CROSSWORD BUILDER
 * 
 * Implementuje algoritmus podle dokumentace:
 * 1. Pebble & Sand Ranking - slova s méně průniky první
 * 2. Constraint Satisfaction - tajenka se skládá z požadovaných písmen
 * 3. Backtracking - když selže, zkusí jinou tajenku nebo iteruje
 */
export class CrosswordBuilder {
  private readonly width: number;
  private readonly height: number;
  private readonly pattern: GridPattern;
  private readonly wordDB = getWordDatabase();
  private readonly grid: GridCell[][];

  private usedWords = new Set<string>();
  private placedWords: PlacedWord[] = [];
  private wordNumber = 1;

  private tajenkaPhrase?: TajenkaPhrase;
  private rankedWords: Word[] = [];

  constructor(private readonly settings: CrosswordSettings) {
    this.pattern = createEasyTajenkaPattern();
    this.width = this.pattern.width;
    this.height = this.pattern.height;
    this.grid = this.createEmptyGrid();

    console.log(`\n🔨 Generuji křížovku ${this.width} × ${this.height}`);
    console.log(`📊 Obtížnost: ${settings.difficulty}`);
    console.log(`🎨 Témata: ${(settings.themes ?? ['vsechny']).join(', ')}`);
  }

  public build(): Crossword {
    // KROK 1: Vybrat cílovou tajenku
    const tajenkaLength = this.countTajenkaSlots();
    console.log(`🎯 Hledám tajenku pro ${tajenkaLength} písmen...`);
    
    const targetTajenka = getRandomTajenka(tajenkaLength, this.settings.difficulty);
    if (!targetTajenka) {
      console.warn(`⚠️ Nenašel jsem tajenku pro ${tajenkaLength} písmen`);
      this.tajenkaPhrase = getRandomTajenka(11, 'lehka') ?? undefined;
    } else {
      this.tajenkaPhrase = targetTajenka;
    }
    
    if (this.tajenkaPhrase) {
      console.log(`✨ Cílová tajenka: "${this.tajenkaPhrase.display}" (${this.tajenkaPhrase.clue})`);
    }

    // KROK 2: Rankovat slova (Pebble & Sand strategie)
    this.rankedWords = this.rankWordsPebbleAndSand();
    console.log(`📚 Seřazeno ${this.rankedWords.length} slov (pebbles first)`);

    // KROK 3: Vyplnit křížovku s constraint pro tajenku
    let progress = true;
    let guard = 0;
    const MAX_ITERATIONS = 150; // Zvýšeno pro constraint-based approach
    
    while (progress && guard < MAX_ITERATIONS) {
      guard++;
      
      // DŮLEŽITÉ: Nejdřív vertical (sestaví tajenku), pak horizontal
      const verticalPlaced = this.fillSlots('vertical');
      const horizontalPlaced = this.fillSlots('horizontal');
      progress = verticalPlaced + horizontalPlaced > 0;
      
      if (guard % 20 === 0) {
        console.log(`🔄 Iterace ${guard}: ${this.placedWords.length} slov`);
      }
    }

    console.log(`✅ Vyplněno ${this.placedWords.length} slov za ${guard} iterací`);
    this.markTajenka();

    const crossword: Crossword = {
      grid: this.grid,
      words: this.placedWords,
      tajenka: this.extractTajenka(),
      tajenkaClue: this.tajenkaPhrase?.clue,
      settings: {
        ...this.settings,
        gridSize: this.width,
        wordCount: this.placedWords.length
      },
      createdAt: new Date()
    };

    return crossword;
  }

  /**
   * PEBBLE & SAND RANKING
   * 
   * Slova s méně průniky (pebbles) umístit PRVNÍ
   * Slova s více průniky (sand) umístit POZDĚJI
   * 
   * Proč funguje: Pebbles otevírají více možností pro budoucí umístění
   */
  private rankWordsPebbleAndSand(): Word[] {
    const allWords = this.wordDB.getAllWords();
    
    const ranked = allWords.map((word: Word) => {
      const intersectionCount = this.countIntersections(word, allWords);
      const intersectionRatio = intersectionCount / allWords.length;
      
      return {
        word,
        score: intersectionRatio // Nízký score = pebble, vysoký = sand
      };
    });

    // Seřadit VZESTUPNĚ - pebbles (nízký score) first!
    ranked.sort((a: any, b: any) => a.score - b.score);
    
    return ranked.map((r: any) => r.word);
  }

  /**
   * Spočítat kolik jiných slov má průnik s tímto slovem
   */
  private countIntersections(word: Word, wordList: Word[]): number {
    const letters = new Set(word.word.toUpperCase());
    
    return wordList.filter(other => {
      if (other.word === word.word) return false;
      
      const otherLetters = new Set(other.word.toUpperCase());
      // Mají společné písmeno?
      for (const letter of letters) {
        if (otherLetters.has(letter)) return true;
      }
      return false;
    }).length;
  }

  /**
   * Spočítat kolik písmen má tajenka (kolik slotů v žlutém řádku)
   */
  private countTajenkaSlots(): number {
    if (this.pattern.tajenkiRows.length === 0) {
      return 0;
    }
    
    const tajenkaRow = this.pattern.tajenkiRows[0];
    let count = 0;
    
    for (let x = 0; x < this.width; x++) {
      if (!isBlackCell(this.pattern, x, tajenkaRow)) {
        count++;
      }
    }
    
    return count;
  }

  private createEmptyGrid(): GridCell[][] {
    const grid: GridCell[][] = [];

    for (let y = 0; y < this.height; y++) {
      const row: GridCell[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push({
          letter: '',
          isBlack: isBlackCell(this.pattern, x, y),
          x,
          y
        });
      }
      grid.push(row);
    }

    return grid;
  }

  private fillSlots(direction: 'horizontal' | 'vertical'): number {
    const slots = this.findAllSlots()
      .filter(slot => {
        if (slot.direction !== direction) return false;
        if (!slot.pattern.includes('.')) return false;
        
        // Přeskočit horizontální sloty v řádku s tajenkou
        if (direction === 'horizontal' && this.pattern.tajenkiRows.includes(slot.y)) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => this.countFilledLetters(b.pattern) - this.countFilledLetters(a.pattern));

    let placed = 0;
    const MAX_ATTEMPTS_PER_SLOT = 15; // Více pokusů pro constraint-based

    for (const slot of slots) {
      let slotFilled = false;
      
      // Vypočítat tajenka constraint pro vertikální slot
      let tajenkaConstraint: { position: number; letter: string } | undefined;
      
      if (direction === 'vertical' && this.tajenkaPhrase) {
        const tajenkaRow = this.pattern.tajenkiRows[0];
        // Zjistit, zda tento vertikální slot křiží tajenku
        if (slot.y <= tajenkaRow && slot.y + slot.length > tajenkaRow) {
          const tajenkaPosition = this.getTajenkaPosition(slot.x);
          if (tajenkaPosition >= 0 && tajenkaPosition < this.tajenkaPhrase.phrase.length) {
            const targetLetter = this.tajenkaPhrase.phrase[tajenkaPosition];
            const positionInWord = tajenkaRow - slot.y;
            tajenkaConstraint = { position: positionInWord, letter: targetLetter };
            
            console.log(`🔗 Slot (${slot.x},${slot.y}) musí mít '${targetLetter}' na pozici ${positionInWord}`);
          }
        }
      }
      
      for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_SLOT && !slotFilled; attempt++) {
        const word = this.findWordForSlot(slot.length, slot.pattern, tajenkaConstraint);
        if (!word) break;
        
        if (this.canPlaceWord(word.word, slot)) {
          this.placeWord(word, slot);
          placed++;
          slotFilled = true;
        }
      }
    }

    return placed;
  }

  /**
   * Najít pozici buňky v tajence (index v tajenka.phrase)
   */
  private getTajenkaPosition(x: number): number {
    if (this.pattern.tajenkiRows.length === 0) {
      return -1;
    }
    
    const tajenkaRow = this.pattern.tajenkiRows[0];
    let position = 0;
    
    for (let cx = 0; cx < x; cx++) {
      if (!isBlackCell(this.pattern, cx, tajenkaRow)) {
        position++;
      }
    }
    
    return position;
  }

  private findAllSlots(): Slot[] {
    const slots: Slot[] = [];

    // Horizontální sloty
    for (let y = 0; y < this.height; y++) {
      let x = 0;
      while (x < this.width) {
        while (x < this.width && this.grid[y][x].isBlack) x++;
        const start = x;
        let pattern = '';
        while (x < this.width && !this.grid[y][x].isBlack) {
          pattern += this.grid[y][x].letter || '.';
          x++;
        }
        if (x - start >= 2) {
          slots.push({ x: start, y, length: x - start, direction: 'horizontal', pattern });
        }
      }
    }

    // Vertikální sloty
    for (let x = 0; x < this.width; x++) {
      let y = 0;
      while (y < this.height) {
        while (y < this.height && this.grid[y][x].isBlack) y++;
        const start = y;
        let pattern = '';
        while (y < this.height && !this.grid[y][x].isBlack) {
          pattern += this.grid[y][x].letter || '.';
          y++;
        }
        if (y - start >= 2) {
          slots.push({ x, y: start, length: y - start, direction: 'vertical', pattern });
        }
      }
    }

    return slots;
  }

  /**
   * Najít slovo pro slot s podporou constraint pro tajenku
   */
  private findWordForSlot(
    length: number,
    pattern: string,
    tajenkaConstraint?: { position: number; letter: string }
  ): Word | null {
    // Použít ranked words místo celé databáze
    const candidates = this.rankedWords.filter(w => w.length === length);

    // Zkusíme různé úrovně filtrování
    const filters: ((word: Word) => boolean)[] = [
      word => this.matchesDifficulty(word) && this.matchesThemes(word),
      word => this.matchesDifficulty(word),
      word => this.matchesThemes(word),
      () => true
    ];

    for (const filter of filters) {
      const filtered = candidates.filter(word => {
        if (this.usedWords.has(word.word.toUpperCase())) return false;
        if (!filter(word)) return false;

        const letters = word.word.toUpperCase();
        if (letters.length !== pattern.length) return false;
        
        // Pattern match
        for (let i = 0; i < letters.length; i++) {
          if (pattern[i] !== '.' && pattern[i] !== letters[i]) {
            return false;
          }
        }
        
        // CONSTRAINT PRO TAJENKU!
        if (tajenkaConstraint) {
          if (letters[tajenkaConstraint.position] !== tajenkaConstraint.letter) {
            return false;
          }
        }
        
        return true;
      });

      if (filtered.length > 0) {
        return filtered[Math.floor(Math.random() * filtered.length)];
      }
    }

    return null;
  }

  private matchesDifficulty(word: Word): boolean {
    return word.difficulty === this.settings.difficulty;
  }

  private matchesThemes(word: Word): boolean {
    const selectedThemes = this.settings.themes ?? ['vsechny'];
    if (selectedThemes.includes('vsechny')) return true;
    return word.themes.some(theme => selectedThemes.includes(theme));
  }

  private canPlaceWord(word: string, slot: Slot): boolean {
    const letters = word.toUpperCase();
    
    for (let i = 0; i < letters.length; i++) {
      const x = slot.direction === 'horizontal' ? slot.x + i : slot.x;
      const y = slot.direction === 'vertical' ? slot.y + i : slot.y;
      
      if (this.grid[y][x].letter && this.grid[y][x].letter !== letters[i]) {
        return false;
      }
    }
    
    return true;
  }

  private placeWord(word: Word, slot: Slot): void {
    const letters = word.word.toUpperCase().split('');
    
    for (let i = 0; i < letters.length; i++) {
      const x = slot.direction === 'horizontal' ? slot.x + i : slot.x;
      const y = slot.direction === 'vertical' ? slot.y + i : slot.y;
      this.grid[y][x].letter = letters[i];
    }

    const startCell = this.grid[slot.y][slot.x];
    if (!startCell.number) {
      startCell.number = this.wordNumber++;
    }

    this.placedWords.push({
      word: word.word.toUpperCase(),
      clue: word.clue,
      startX: slot.x,
      startY: slot.y,
      direction: slot.direction,
      number: startCell.number,
      length: word.length
    });

    this.usedWords.add(word.word.toUpperCase());
  }

  private countFilledLetters(pattern: string): number {
    return pattern.split('').filter(c => c !== '.').length;
  }

  private markTajenka(): void {
    for (const row of this.pattern.tajenkiRows) {
      for (let x = 0; x < this.width; x++) {
        if (!this.grid[row][x].isBlack) {
          this.grid[row][x].isTajenka = true;
        }
      }
    }
  }

  private extractTajenka(): string {
    let result = '';
    
    for (const row of this.pattern.tajenkiRows) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[row][x];
        if (cell.isTajenka && cell.letter) {
          result += cell.letter;
        }
      }
    }
    
    console.log(`🎯 Tajenka složena: "${result}"`);
    if (this.tajenkaPhrase) {
      console.log(`🎯 Cílová tajenka byla: "${this.tajenkaPhrase.phrase}"`);
    }
    
    return result;
  }
}
