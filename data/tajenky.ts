/**
 * Tajenka pro křížovky - smysluplná fráze která se skládá z písmen na průsečících
 */
export interface TajenkaPhrase {
  phrase: string; // Tajenka bez mezer (např. "PRAVDAVITEZI")
  display: string; // Tajenka s mezerami (např. "PRAVDA VÍTĚZÍ")
  clue: string; // Nápověda/téma pro uživatele
  difficulty: 'lehka' | 'stredni' | 'tezka';
  length: number; // Počet písmen bez mezer
}

/**
 * Seznam smysluplných tajenek pro klasické křížovky
 * Tajenky jsou optimalizované pro 13 písmen (13×13 pattern)
 */
export const tajenky: TajenkaPhrase[] = [
  // 13 PÍSMENNÉ TAJENKY (optimální pro 13×13 pattern)
  {
    phrase: 'VESELEVANOCE',
    display: 'VESELÉ VÁNOCE',
    clue: 'Pozdrav z vánočních pohlednic',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'KRASNEPOCASI',
    display: 'KRÁSNÉ POČASÍ',
    clue: 'Po čem touží výletníci',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'ZDRAVISTESTI',
    display: 'ZDRAVÍ ŠTĚSTÍ',
    clue: 'Klasické narozeninové přání',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'ZIMNIRADOSTI',
    display: 'ZIMNÍ RADOSTI',
    clue: 'Sněhové radovánky',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'STASTNACESTA',
    display: 'ŠŤASTNÁ CESTA',
    clue: 'Přání před cestou',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'KRASNESVÁTKY',
    display: 'KRÁSNÉ SVÁTKY',
    clue: 'Vánoční přání',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'HEZKYVECEREK',
    display: 'HEZKÝ VEČEREK',
    clue: 'Pozdrav v podvečer',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'DOBROUNOCEK',
    display: 'DOBROU NOČKU',
    clue: 'Přání před spánkem',
    difficulty: 'lehka',
    length: 12
  },
  {
    phrase: 'PEKNYDENECEK',
    display: 'PĚKNÝ DENEČEK',
    clue: 'Ranní pozdrav',
    difficulty: 'lehka',
    length: 13
  },
  {
    phrase: 'DOBREJVICEND',
    display: 'DOBREJ VÍKEND',
    clue: 'Páteční přání',
    difficulty: 'lehka',
    length: 13
  },
  
  // OSTATNÍ DÉLKY
  {
    phrase: 'PRAVDAVITEZI',
    display: 'PRAVDA VÍTĚZÍ',
    clue: 'Prezidentské heslo na standardě ČR',
    difficulty: 'lehka',
    length: 12
  },
  {
    phrase: 'JARNIKVETY',
    display: 'JARNÍ KVĚTY',
    clue: 'Sněženky a krokusy',
    difficulty: 'lehka',
    length: 11
  },
  {
    phrase: 'ZLATAPRAHRA',
    display: 'ZLATÁ PRAHA',
    clue: 'Hlavní město',
    difficulty: 'lehka',
    length: 11
  },
  {
    phrase: 'PRAZSKYHRAD',
    display: 'PRAŽSKÝ HRAD',
    clue: 'Sídlo prezidenta',
    difficulty: 'lehka',
    length: 11
  },
  {
    phrase: 'KRASNYDEN',
    display: 'KRÁSNÝ DEN',
    clue: 'Hezký den',
    difficulty: 'lehka',
    length: 9
  }
];

/**
 * Získat tajenky podle délky
 */
export function getTajenkiByLength(length: number, difficulty?: 'lehka' | 'stredni' | 'tezka'): TajenkaPhrase[] {
  let filtered = tajenky.filter(t => t.length === length);
  
  if (difficulty) {
    filtered = filtered.filter(t => t.difficulty === difficulty);
  }
  
  return filtered;
}

/**
 * Vybrat náhodnou tajenku podle délky
 */
export function getRandomTajenka(length: number, difficulty?: 'lehka' | 'stredni' | 'tezka'): TajenkaPhrase | null {
  const tajenky = getTajenkiByLength(length, difficulty);
  
  if (tajenky.length === 0) {
    return null;
  }
  
  return tajenky[Math.floor(Math.random() * tajenky.length)];
}
