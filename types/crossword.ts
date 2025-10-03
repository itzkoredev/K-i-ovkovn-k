// Typy pro celou aplikaci

export type Difficulty = 'lehka' | 'stredni' | 'tezka';

export type Theme = 
  | 'vsechny'
  | 'priroda'
  | 'sport'
  | 'kultura'
  | 'veda'
  | 'geografie'
  | 'historie'
  | 'jidlo'
  | 'zvirata'
  | 'technika'
  | 'hudba'
  | 'film'
  | 'divadlo'
  | 'umeni'
  | 'literatura'
  | 'nabozenst vi'
  | 'politika'
  | 'ekonomie'
  | 'medicina'
  | 'astronomie'
  | 'doprava'
  | 'cestovani'
  | 'moda'
  | 'architektura'
  | 'zahradnictvi';

export interface Word {
  word: string;
  clue: string;
  difficulty: Difficulty;
  themes: Theme[];
  length: number;
}

export interface CrosswordSettings {
  gridSize: number;
  difficulty: Difficulty;
  themes: Theme[]; // Změněno z theme na themes (pole)
  wordCount: number;
  showSolution: boolean;
}

export interface GridCell {
  letter: string;
  number?: number;
  isBlack: boolean;
  isTajenka?: boolean; // Políčko je součástí tajenky
  napoveda?: string; // Nápověda v pravém horním rohu (jedno písmeno)
  x: number;
  y: number;
}

export interface PlacedWord {
  word: string;
  clue: string;
  number: number;
  startX: number;
  startY: number;
  direction: 'horizontal' | 'vertical';
  length: number;
}

export interface Crossword {
  grid: GridCell[][];
  words: PlacedWord[];
  tajenka: string; // Heslo, které se objeví po vyluštění tajenky
  settings: CrosswordSettings;
  createdAt: Date;
}

export interface CrosswordClue {
  number: number;
  clue: string;
  answer?: string;
}

export interface CrosswordClues {
  horizontal: CrosswordClue[];
  vertical: CrosswordClue[];
}
