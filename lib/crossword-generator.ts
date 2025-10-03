import type { Crossword, GridCell, Word } from '@/types/crossword';
import { czechWords } from '@/data/czech-words';

// Swedish crossword configuration matching reference image
const ROWS = 25;
const COLS = 17;
const TAJENKA_COL = 8; // Middle column for tajenka (blue)

interface WordPlacement {
  word: string;
  row: number;
  col: number;
  direction: 'horizontal' | 'vertical';
  clue: string;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomWord(length: number, usedWords: Set<string>): Word | null {
  const candidates = shuffle(
    czechWords.filter(w => w.word.length === length && !usedWords.has(w.word))
  );
  return candidates[0] || null;
}

function shortenClue(clue: string, maxLength: number = 14): string {
  if (clue.length <= maxLength) return clue;
  const words = clue.split(' ');
  let result = '';
  for (const word of words) {
    if ((result + word).length > maxLength - 1) break;
    result += (result ? ' ' : '') + word;
  }
  return result || clue.substring(0, maxLength);
}

export function generateSwedishCrossword(): Crossword {
  // Initialize empty grid
  const grid: GridCell[][] = Array(ROWS)
    .fill(null)
    .map((_, row) =>
      Array(COLS)
        .fill(null)
        .map((_, col) => ({
          x: col,
          y: row,
          letter: '',
          isBlack: false,
          isTajenka: false,
          number: undefined,
          clueText: undefined,
          clueTextHorizontal: undefined,
          clueTextVertical: undefined,
          clueDirection: undefined,
        }))
    );

  const placements: WordPlacement[] = [];
  const usedWords = new Set<string>();

  // Swedish pattern: clue cells in EVERY even row and EVERY even column
  // Row 0, 2, 4, 6, 8... = clue rows
  // Col 0, 2, 4, 6, 8... = clue columns
  
  // Mark all even rows as clue rows
  for (let row = 0; row < ROWS; row += 2) {
    for (let col = 0; col < COLS; col++) {
      grid[row][col].isBlack = true;
    }
  }

  // Mark all even columns as clue columns (in non-clue rows)
  for (let col = 0; col < COLS; col += 2) {
    for (let row = 0; row < ROWS; row++) {
      if (!grid[row][col].isBlack) {
        grid[row][col].isBlack = true;
      }
    }
  }

  // Mark tajenka column (override clue status for middle column)
  for (let row = 0; row < ROWS; row++) {
    if (row % 2 === 1) { // Only in non-clue rows
      grid[row][TAJENKA_COL].isBlack = false;
      grid[row][TAJENKA_COL].isTajenka = true;
    }
  }

  // Generate horizontal words (in odd rows)
  for (let row = 1; row < ROWS; row += 2) {
    let col = 1; // Start from first odd column
    
    while (col < COLS) {
      // Skip tajenka column
      if (col === TAJENKA_COL) {
        col += 2;
        continue;
      }
      
      // Find segment length (until next clue column or end)
      let length = 0;
      let startCol = col;
      
      while (col < COLS && !grid[row][col].isBlack && col !== TAJENKA_COL) {
        length++;
        col++;
      }
      
      // If tajenka is in the middle, count it
      if (col === TAJENKA_COL && col < COLS) {
        length++;
        col++;
        while (col < COLS && !grid[row][col].isBlack) {
          length++;
          col++;
        }
      }

      // Place word if segment is long enough
      if (length >= 2 && length <= 6) {
        const word = getRandomWord(length, usedWords);
        if (word) {
          usedWords.add(word.word);
          
          // Place letters
          let letterIndex = 0;
          for (let c = startCol; c < startCol + length && c < COLS; c++) {
            if (!grid[row][c].isBlack) {
              grid[row][c].letter = word.word[letterIndex++];
            }
          }

          // Place clue in cell before word (to the left)
          const clueCol = startCol - 1;
          if (clueCol >= 0 && grid[row][clueCol].isBlack) {
            grid[row][clueCol].clueTextHorizontal = shortenClue(word.clue);
            if (!grid[row][clueCol].clueDirection) {
              grid[row][clueCol].clueDirection = 'horizontal';
            }
          }

          placements.push({
            word: word.word,
            row,
            col: startCol,
            direction: 'horizontal',
            clue: word.clue,
          });
        }
      }

      col += 2; // Move to next odd column
    }
  }

  // Generate vertical words (in odd columns, skip tajenka)
  for (let col = 1; col < COLS; col += 2) {
    if (col === TAJENKA_COL) continue; // Skip tajenka column

    let row = 1; // Start from first odd row
    
    while (row < ROWS) {
      // Find segment length
      let length = 0;
      let startRow = row;
      
      while (row < ROWS && !grid[row][col].isBlack) {
        length++;
        row++;
      }

      // Place word if segment is long enough
      if (length >= 2 && length <= 6) {
        const word = getRandomWord(length, usedWords);
        if (word) {
          usedWords.add(word.word);

          // Place letters (only if cell is empty or matches)
          for (let i = 0; i < length; i++) {
            const r = startRow + i;
            if (r < ROWS && (!grid[r][col].letter || grid[r][col].letter === word.word[i])) {
              grid[r][col].letter = word.word[i];
            }
          }

          // Place clue in cell above word
          const clueRow = startRow - 1;
          if (clueRow >= 0 && grid[clueRow][col].isBlack) {
            grid[clueRow][col].clueTextVertical = shortenClue(word.clue);
            if (grid[clueRow][col].clueDirection === 'horizontal') {
              grid[clueRow][col].clueDirection = 'both';
            } else {
              grid[clueRow][col].clueDirection = 'vertical';
            }
          }

          placements.push({
            word: word.word,
            row: startRow,
            col,
            direction: 'vertical',
            clue: word.clue,
          });
        }
      }

      row += 2; // Move to next odd row
    }
  }

  // Generate tajenka word
  const tajenkaLength = ROWS - grid.filter((row) => row[TAJENKA_COL].isBlack).length;
  const tajenkaWord = getRandomWord(tajenkaLength, usedWords);
  
  let tajenkaIndex = 0;
  if (tajenkaWord) {
    for (let row = 0; row < ROWS; row++) {
      if (!grid[row][TAJENKA_COL].isBlack && grid[row][TAJENKA_COL].isTajenka) {
        grid[row][TAJENKA_COL].letter = tajenkaWord.word[tajenkaIndex++] || '';
      }
    }
  }

  return {
    grid,
    words: [],
    tajenka: tajenkaWord?.word.toUpperCase() || 'TAJENKA',
    settings: {
      difficulty: 'stredni',
      themes: ['vsechny'],
      showSolution: false,
    },
    createdAt: new Date(),
  };
}

// Export as default generateCrossword for compatibility
export function generateCrossword(): Crossword {
  return generateSwedishCrossword();
}
