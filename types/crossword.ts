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
  | 'nabozenstvi'
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
  difficulty: Difficulty;
  themes: Theme[]; // ZmÄ›nÄ›no z theme na themes (pole)
  showSolution: boolean;
  gridSize?: number;
  wordCount?: number;
}

export interface GridCell {
  letter: string;
  number?: number;
  isBlack: boolean;
  isTajenka?: boolean; // PolĂ­ÄŤko je souÄŤĂˇstĂ­ tajenky
  hasTajenkaCircle?: boolean; // LegendovĂˇ buĹ?ka mĂˇ krouĹľek pro tajenku
  napoveda?: string; // PomĹŻcka - prvnĂ­ pĂ­smeno pĹ™edvyplnÄ›nĂ© (zelenĂ©)
  clueText?: string; // Text zadĂˇnĂ­ v ÄŤernĂ©m polĂ­ÄŤku (pro ĹˇvĂ©dskou kĹ™Ă­Ĺľovku)
  clueDirection?: 'horizontal' | 'vertical' | 'both'; // SmÄ›r odpovÄ›di (vpravo, dolĹŻ, nebo obojĂ­)
  clueTextHorizontal?: string; // Pro both - hornĂ­ text (vodorovnÄ› vpravo)
  clueTextVertical?: string; // Pro both - dolnĂ­ text (svisle dolĹŻ)
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
  tajenka: string; // Heslo, kterĂ© se objevĂ­ po vyluĹˇtÄ›nĂ­ tajenky
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

