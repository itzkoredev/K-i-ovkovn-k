import { getWordDatabase } from './word-database';
import { createBalancedPattern, isBlackCell, isTajenkaRow, type GridPattern } from './symmetric-pattern';
import { tajenky, type TajenkaPhrase } from '@/data/tajenky';
import type { Crossword, CrosswordSettings, GridCell, PlacedWord, Word, Theme } from '@/types/crossword';

interface Slot {
  x: number;
  y: number;
  length: number;
  direction: 'horizontal' | 'vertical';
  pattern: string;
}

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
  private tajenkaDisplay = '';

  constructor(private readonly settings: CrosswordSettings) {
    this.pattern = createBalancedPattern();
    this.width = this.pattern.width;
    this.height = this.pattern.height;
    this.grid = this.createEmptyGrid();

    console.log(`\nÄ‘ĹşÂ§Â© Generuji kÄąâ„˘Ä‚Â­ÄąÄľovku ${this.width} Ä‚â€” ${this.height}`);
    console.log(`Ä‘ĹşĹ˝Ĺ» ObtÄ‚Â­ÄąÄľnost: ${settings.difficulty}`);
    console.log(`Ä‘ĹşĹ˝Â¨ TÄ‚Â©mata: ${(settings.themes ?? ['vsechny']).join(', ')}`);
  }

  public build(): Crossword {
    this.placeTajenka();

    let progress = true;
    let guard = 0;
    while (progress && guard < 20) {
      guard++;
      const verticalPlaced = this.fillSlots('vertical');
      const horizontalPlaced = this.fillSlots('horizontal');
      progress = verticalPlaced + horizontalPlaced > 0;
    }

    this.markTajenka();

    const crossword: Crossword = {
      grid: this.grid,
      words: this.placedWords,
      tajenka: this.extractTajenka(),
      settings: {
        ...this.settings,
        gridSize: this.width,
        wordCount: this.placedWords.length
      },
      createdAt: new Date()
    };

    return crossword;
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

  private placeTajenka(): void {
    if (this.pattern.tajenkiRows.length === 0) {
      return;
    }

    for (const rowIndex of this.pattern.tajenkiRows) {
      const slots = this.findHorizontalSlotsInRow(rowIndex);
      const slotLengths = slots.map(slot => slot.length);
      const selection = this.selectTajenka(slotLengths);

      if (!selection) {
        console.warn('Ă˘ĹˇÂ ÄŹÂ¸Ĺą NenaÄąË‡el jsem vhodnou tajenku pro danÄ‚Ëť vzor.');
        slots.forEach(slot => this.fillSlotFallback(slot));
        continue;
      }

      const { phrase } = selection;
      this.tajenkaPhrase = phrase;
      this.tajenkaDisplay = phrase.display;

      slots.forEach((slot, partIndex) => {
        this.placeTajenkaSegment(slot, phrase.segments[partIndex], phrase, partIndex, slots.length);
      });

      console.log(`Ă˘Ĺ›Â¨ Tajenka vybrÄ‚Ë‡na: ${phrase.display}`);
    }
  }

  private selectTajenka(slotLengths: number[]): { phrase: TajenkaPhrase; index: number } | null {
    const candidates = tajenky
      .map((phrase, index) => ({ phrase, index }))
      .filter(item => item.phrase.segments.length === slotLengths.length &&
        item.phrase.segments.every((segment, i) => segment.length === slotLengths[i]));

    if (candidates.length === 0) {
      return null;
    }

    const choice = candidates[Math.floor(Math.random() * candidates.length)];
    return choice;
  }

  private placeTajenkaSegment(slot: Slot, segment: string, phrase: TajenkaPhrase, partIndex: number, totalParts: number): void {
    const word = segment.toUpperCase();
    const letters = word.split('');

    for (let i = 0; i < letters.length; i++) {
      const cx = slot.x + i;
      const cy = slot.y;
      this.grid[cy][cx].letter = letters[i];
    }

    const startCell = this.grid[slot.y][slot.x];
    let number = startCell.number;
    if (!number) {
      number = this.wordNumber++;
      startCell.number = number;
    }

    this.placedWords.push({
      word,
      clue: `${phrase.clue} (${partIndex + 1}/${totalParts})`,
      startX: slot.x,
      startY: slot.y,
      direction: 'horizontal',
      number,
      length: word.length
    });

    this.usedWords.add(word);
  }

  private fillSlots(direction: 'horizontal' | 'vertical'): number {
    const slots = this.findAllSlots()
      .filter(slot => slot.direction === direction && slot.pattern.includes('.'))
      .sort((a, b) => this.countFilledLetters(b.pattern) - this.countFilledLetters(a.pattern));

    let placed = 0;

    for (const slot of slots) {
      const word = this.findWordForSlot(slot.length, slot.pattern);
      if (!word) continue;

      if (this.canPlaceWord(word.word, slot)) {
        this.placeWord(word, slot);
        placed++;
      }
    }

    return placed;
  }

  private fillSlotFallback(slot: Slot): void {
    const word = this.findWordForSlot(slot.length, slot.pattern);
    if (word && this.canPlaceWord(word.word, slot)) {
      this.placeWord(word, slot);
    }
  }

  private findAllSlots(): Slot[] {
    const slots: Slot[] = [];

    for (let y = 0; y < this.height; y++) {
      let x = 0;
      while (x < this.width) {
        while (x < this.width && this.grid[y][x].isBlack) {
          x++;
        }
        const start = x;
        let pattern = '';
        while (x < this.width && !this.grid[y][x].isBlack) {
          pattern += this.grid[y][x].letter || '.';
          x++;
        }
        const length = x - start;
        if (length >= 2) {
          slots.push({ x: start, y, length, direction: 'horizontal', pattern });
        }
      }
    }

    for (let x = 0; x < this.width; x++) {
      let y = 0;
      while (y < this.height) {
        while (y < this.height && this.grid[y][x].isBlack) {
          y++;
        }
        const start = y;
        let pattern = '';
        while (y < this.height && !this.grid[y][x].isBlack) {
          pattern += this.grid[y][x].letter || '.';
          y++;
        }
        const length = y - start;
        if (length >= 2) {
          slots.push({ x, y: start, length, direction: 'vertical', pattern });
        }
      }
    }

    return slots;
  }

  private findHorizontalSlotsInRow(row: number): Slot[] {
    const slots: Slot[] = [];
    let x = 0;

    while (x < this.width) {
      while (x < this.width && this.grid[row][x].isBlack) {
        x++;
      }
      const start = x;
      let pattern = '';
      while (x < this.width && !this.grid[row][x].isBlack) {
        pattern += this.grid[row][x].letter || '.';
        x++;
      }
      const length = x - start;
      if (length >= 2) {
        slots.push({ x: start, y: row, length, direction: 'horizontal', pattern });
      }
    }

    return slots;
  }

  private findWordForSlot(length: number, pattern: string): Word | null {
    const candidates = this.wordDB.getWordsByLength(length);

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
        for (let i = 0; i < letters.length; i++) {
          if (pattern[i] !== '.' && pattern[i] !== letters[i]) {
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
    const preferred = this.settings.difficulty ?? 'stredni';
    const difficulty = word.difficulty ?? 'stredni';

    if (preferred === 'lehka') {
      return difficulty === 'lehka';
    }
    if (preferred === 'stredni') {
      return difficulty === 'lehka' || difficulty === 'stredni';
    }
    return true;
  }

  private matchesThemes(word: Word): boolean {
    const selected: Theme[] = this.settings.themes && this.settings.themes.length > 0 ? this.settings.themes : (['vsechny'] as Theme[]);
    if (selected.includes('vsechny')) {
      return true;
    }
    const themes: Theme[] = word.themes ?? (['vsechny'] as Theme[]);
    if (themes.includes('vsechny')) {
      return true;
    }
    return selected.some(theme => themes.includes(theme));
  }

  private canPlaceWord(word: string, slot: Slot): boolean {
    const letters = word.toUpperCase();

    for (let i = 0; i < letters.length; i++) {
      const cx = slot.direction === 'horizontal' ? slot.x + i : slot.x;
      const cy = slot.direction === 'horizontal' ? slot.y : slot.y + i;
      const cell = this.grid[cy][cx];
      if (cell.isBlack) return false;
      if (cell.letter && cell.letter !== letters[i]) return false;
    }

    const beforeX = slot.direction === 'horizontal' ? slot.x - 1 : slot.x;
    const beforeY = slot.direction === 'horizontal' ? slot.y : slot.y - 1;
    if (beforeX >= 0 && beforeY >= 0 && !this.grid[beforeY][beforeX].isBlack && this.grid[beforeY][beforeX].letter) {
      return false;
    }

    const afterX = slot.direction === 'horizontal' ? slot.x + slot.length : slot.x;
    const afterY = slot.direction === 'horizontal' ? slot.y : slot.y + slot.length;
    if (afterX < this.width && afterY < this.height && !this.grid[afterY][afterX].isBlack && this.grid[afterY][afterX].letter) {
      return false;
    }

    return true;
  }

  private placeWord(word: Word, slot: Slot): void {
    const letters = word.word.toUpperCase();

    for (let i = 0; i < letters.length; i++) {
      const cx = slot.direction === 'horizontal' ? slot.x + i : slot.x;
      const cy = slot.direction === 'horizontal' ? slot.y : slot.y + i;
      this.grid[cy][cx].letter = letters[i];
    }

    const startCell = this.grid[slot.y][slot.x];
    let number = startCell.number;
    if (!number) {
      number = this.wordNumber++;
      startCell.number = number;
    }

    this.placedWords.push({
      word: letters,
      clue: word.clue,
      startX: slot.x,
      startY: slot.y,
      direction: slot.direction,
      number,
      length: letters.length
    });

    this.usedWords.add(letters);
  }

  private countFilledLetters(pattern: string): number {
    return pattern.split('').filter(char => char !== '.').length;
  }

  private markTajenka(): void {
    for (let y = 0; y < this.height; y++) {
      if (!isTajenkaRow(this.pattern, y)) continue;
      for (let x = 0; x < this.width; x++) {
        if (!this.grid[y][x].isBlack) {
          this.grid[y][x].isTajenka = true;
        }
      }
    }
  }

  private extractTajenka(): string {
    if (this.tajenkaDisplay) {
      return this.tajenkaDisplay;
    }

    let result = '';
    for (const row of this.pattern.tajenkiRows) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[row][x];
        if (cell.isTajenka && cell.letter) {
          result += cell.letter;
        }
      }
    }
    return result;
  }
}
