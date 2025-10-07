<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# KOMPLETNÍ TECHNICKÝ POPIS GENERÁTORU KŘÍŽOVEK PRO AI AGENTA

## 1. ZÁKLADNÍ KONCEPT KŘÍŽOVEK

Křížovka je slovní puzzle, který se skládá z mřížky (gridu) obsahující **bílá pole** (kam se píší písmena) a **černá pole** (bloky/separátory). Slova se umísťují **horizontálně** (zleva doprava) a **vertikálně** (shora dolů) tak, že se **protínají ve společných písmenech**.[^1][^2][^3]

### Typy křížovek:

- **Symetrické**: Mají horizontální nebo rotační symetrii layoutu
- **Asymetrické**: Nemají žádnou symetrii
- **Constrained**: Grid je předem definovaný, jen se vyplňují slova
- **Unconstrained**: Grid se generuje dynamicky podle slov[^4][^5]


## 2. DATOVÉ STRUKTURY

### 2.1 Reprezentace Gridu

Grid reprezentuj jako **2D matici souřadnic (x, y)**, kde každá buňka obsahuje buď:

- `písmeno` (a-z)
- `null` nebo `#` (černé pole/blok)
- `empty` (prázdné bílé pole)[^4]

```typescript
type Cell = string | null; // 'A'-'Z' nebo null pro blok
type Grid = Cell[][];
type Position = { x: number, y: number };
```


### 2.2 Reprezentace Slova v Gridu

```typescript
interface WordPlacement {
  word: string;
  startX: number;
  startY: number;
  direction: 'horizontal' | 'vertical';
  length: number;
}
```


### 2.3 Pool Slov s Optimalizovaným Vyhledáváním

Pro **rychlé vyhledávání** slov s konkrétními constrainty použij **multi-level sorting**:

```typescript
// Slova seřazená podle prvního písmene, délky a dalších písmen
interface WordPool {
  [firstLetter: string]: {
    [length: number]: {
      [pattern: string]: string[]
    }
  }
}
```

Tato struktura **redukuje search time z O(n) na O(1)** při hledání slov s constraints.[^4]

## 3. CONSTRAINT SATISFACTION PROBLEM (CSP)

Generování křížovky je **NP-complete problém**. Každé slovo má constraints:[^5][^6][^7]

### 3.1 Typy Constraints

```typescript
interface Constraints {
  length: number;
  requiredChars: Map<number, string>; // pozice -> písmeno
  invalidLengths: number[]; // délky, které by způsobily overlap
  mustConnect: boolean; // musí se dotýkat existujících slov
}
```

**Příklad**: Pokud chceš umístit slovo na pozici (2, -2) a na pozici 0 musí být 'S', na pozici 4 musí být 'W', a slovo nesmí mít délku 4 (protože by překrylo jiné slovo).[^4]

### 3.2 Validační Pravidla

Před umístěním slova **MUSÍŠ** zkontrolovat:

1. **Connectivity**: Slovo se dotýká alespoň jednoho existujícího slova (sdílí písmeno)[^2][^4]
2. **No Overlap**: Nesmí přepsat existující písmena (kromě intersection pointů)[^4]
3. **Valid Intersections**: Všechna protnutí tvoří platná slova
4. **No Adjacent Words**: Slova nesmí být vedle sebe bez černého pole mezi nimi

## 4. ALGORITMUS GENEROVÁNÍ - BACKTRACKING S HEURISTIKAMI

### 4.1 Hlavní Flow

```typescript
function generateCrossword(wordList: string[], gridSize?: number) {
  // 1. SEED PHASE - inicializace
  const grid = initializeGrid(gridSize || longestWord(wordList).length);
  const rankedWords = rankWords(wordList); // Pebble & Sand strategie
  
  // 2. Umístění seed slova (nejdelší nebo nejvíce constraint-friendly)
  placeSeedWord(grid, rankedWords[^0]);
  
  // 3. POPULATE PHASE - iterativní vyplňování
  let candidates = getAllCandidatePositions(grid);
  let iteration = 0;
  const MAX_ITERATIONS = 500;
  
  while (candidates.length > 0 && rankedWords.length > 0 && iteration < MAX_ITERATIONS) {
    const candidate = candidates.shift(); // BFS approach
    const constraints = getConstraints(grid, candidate);
    const word = findBestWord(rankedWords, constraints);
    
    if (word) {
      placeWord(grid, word, candidate);
      rankedWords.remove(word);
      candidates.push(...getNewCandidates(word));
    } else {
      // BACKTRACKING STRATEGIES
      if (!applyGreedyRemoval(grid, rankedWords, candidates)) {
        applyLIFO(grid, rankedWords);
      }
    }
    iteration++;
  }
  
  // 4. GRID RESIZING pokud potřeba
  if (rankedWords.length > threshold) {
    return generateCrossword(wordList, gridSize + 1);
  }
  
  return grid;
}
```


### 4.2 Pebble and Sand Ranking Strategie

**Klíčová heuristika** pro výběr pořadí slov :[^5]

```typescript
function rankWords(words: string[]): string[] {
  // "Pebbles" = slova s MÉNĚ průniky (umístit PRVNÍ)
  // "Sand" = slova s VÍCE průniky (umístit POZDĚJI)
  
  const ranks = words.map(word => ({
    word,
    score: countWordsWithIntersection(word, words) / words.length
  }));
  
  // Seřaď VZESTUPNĚ - pebbles first!
  return ranks.sort((a, b) => a.score - b.score).map(r => r.word);
}

function countWordsWithIntersection(word: string, wordList: string[]): number {
  return wordList.filter(other => 
    other !== word && hasCommonLetter(word, other)
  ).length;
}
```

**Proč funguje**: Umístění "pebbles" (izolovanějších slov) první otevírá více možností pro budoucí umístění. Pokud začneš s "sand" (slova s mnoha průniky), rychle vyčerpáš prostor.[^5]

### 4.3 Backtracking Strategie

#### A) LIFO (Last In First Out)

```typescript
function applyLIFO(grid: Grid, wordList: string[]): void {
  const lastWord = grid.removeLastWord();
  wordList.push(lastWord); // vrať na konec seznamu
}
```

Používej když **žádné slovo nelze umístit**.[^5]

#### B) Greedy Removal (Victim Strategy)

```typescript
function applyGreedyRemoval(grid: Grid, wordList: string[]): boolean {
  // Najdi slovo v gridu, které když odstraníš, umožní umístit jiné slovo
  for (const gridWord of grid.words) {
    const tempGrid = grid.clone().remove(gridWord);
    if (wordList.some(w => canPlace(w, tempGrid))) {
      grid.remove(gridWord);
      wordList.push(gridWord);
      return true;
    }
  }
  return false;
}
```

**Inteligentnější** než LIFO - aktivně hledá, které slovo blokuje progress.[^5]

## 5. SYMETRICKÉ GENEROVÁNÍ

Pro symetrickou křížovku s **horizontální osou symetrie**:

```typescript
function generateSymmetric(wordList: string[]): Grid {
  // 1. Seed musí mít LICHOU délku a protínat osu symetrie
  const seed = wordList.find(w => w.length % 2 === 1);
  placeSeedOnSymmetryLine(grid, seed);
  
  // 2. Pro každé slovo v dolní polovině najdi mirror word stejné délky
  while (candidates.length > 0) {
    const bottomCandidate = candidates.shift();
    const constraints = getConstraints(grid, bottomCandidate);
    
    // Zkus najít word pro dolní polovinu
    for (let len = maxLength; len >= minLength; len--) {
      const bottomWord = findWord(wordList, {...constraints, length: len});
      if (!bottomWord) continue;
      
      // Najdi odpovídající word pro horní polovinu (mirror)
      const topConstraints = getMirrorConstraints(bottomCandidate, len);
      const topWord = findWord(wordList, topConstraints);
      
      if (topWord) {
        placeWord(grid, bottomWord, bottomCandidate);
        placeWord(grid, topWord, mirrorPosition(bottomCandidate));
        break;
      }
    }
  }
}
```

**Klíč**: Slova buď protínají osu symetrie (lichá délka) nebo se umísťují v zrcadlových párech.[^4]

## 6. GENEROVÁNÍ INDICIÍ (CLUES)

### 6.1 Dictionary-based Clues

```typescript
function generateClue(word: string, dictionary: Dictionary): string {
  const definition = dictionary.lookup(word);
  // Definice neobsahuje target word
  return definition; // "Extremely poor or bad" pro "ABYSMAL"
}
```


### 6.2 AI-powered Clues

Pro modernější přístup použij **LLM** (GPT, Gemini) :[^8][^9][^10]

```typescript
async function generateAIClue(word: string, difficulty: 'easy' | 'hard'): Promise<string> {
  const prompt = `Generate a ${difficulty} crossword clue for the word "${word}". 
  The clue should not contain the word itself.`;
  return await callLLM(prompt);
}
```


### 6.3 Context-based Clues

```typescript
function generateContextClue(word: string, corpus: string[]): string {
  const usage = corpus.find(sentence => sentence.includes(word));
  return usage.replace(word, '________'); // "They were living in ________ ignorance"
}
```


## 7. OPTIMALIZACE PERFORMANCE

### 7.1 Grid Resizing Strategy

```typescript
function optimizeGridSize(words: string[]): number {
  let gridSize = Math.max(...words.map(w => w.length));
  let bestGrid = null;
  let bestWordCount = 0;
  
  // Iteruj přes velikosti gridu
  for (let size = gridSize; size <= gridSize + 5; size++) {
    const grid = generateCrossword(words, size);
    if (grid.wordCount > bestWordCount) {
      bestGrid = grid;
      bestWordCount = grid.wordCount;
    }
  }
  
  return bestGrid;
}
```

Začni s gridem = délka nejdelšího slova, pak **iterativně zvětšuj** dokud nenajdeš optimální packing.[^5]

### 7.2 Grid Repacking

Pokud je jedna strana sparse a druhá dense, **přerozděl prostor**:

```typescript
function repackGrid(grid: Grid): Grid {
  // Odstraň prázdný sloupec z levé strany
  // Přidej sloupec na pravou stranu
  // Umožní umístit více slov
}
```


## 8. EDGE CASES A HANDLING

### 8.1 Disconnected Components

Po greedy removal můžou vzniknout **izolované části** :[^5]

```typescript
function connectComponents(grid: Grid): void {
  const components = findDisconnectedComponents(grid);
  if (components.length > 1) {
    // Použij regex pattern matching pro nalezení connecting word
    const connector = findConnectingWord(components[^0], components[^1]);
    if (connector) placeWord(grid, connector);
  }
}
```


### 8.2 Cyclic Removals

Implementuj **tabu list** pro prevenci opakovaného odstraňování stejných slov :[^5]

```typescript
const tabuList: string[] = [];
const TABU_TENURE = 5;

function removeWithTabu(grid: Grid, word: string): void {
  tabuList.push(word);
  if (tabuList.length > TABU_TENURE) {
    tabuList.shift(); // word může být znovu použito po 5 moves
  }
}
```


## 9. KOMPLEXITA A SCALABILITA

- **Time Complexity**: S optimalizovaným word pool O(1) lookup, celková komplexita je **přibližně lineární** vzhledem k počtu slov[^5]
- **Space Complexity**: O(n × m) pro grid + O(w) pro word pool
- **Scalabilita**: Algoritmus zvládá **80k+ slov** s rychlým generováním[^4]


## 10. PŘÍKLAD KOMPLETNÍ IMPLEMENTACE

```typescript
interface CrosswordGenerator {
  wordPool: WordPool;
  grid: Grid;
  placedWords: WordPlacement[];
  
  generate(words: string[], symmetric: boolean): Grid;
  rankWords(words: string[]): string[];
  placeWord(word: string, pos: Position, dir: Direction): boolean;
  getConstraints(pos: Position, dir: Direction): Constraints;
  findBestWord(constraints: Constraints): string | null;
  backtrack(): void;
}
```


## 11. TESTOVÁNÍ A VALIDACE

Validuj vygenerovanou křížovku:

```typescript
function validateCrossword(grid: Grid): boolean {
  return (
    allWordsConnected(grid) &&
    noInvalidOverlaps(grid) &&
    allIntersectionsValid(grid) &&
    gridDensity(grid) > MIN_DENSITY
  );
}
```


***

**Tento popis poskytuje AI agentovi kompletní pochopení**:

1. ✅ Co jsou křížovky (2D grid, horizontální/vertikální slova, průniky)
2. ✅ Jak reprezentovat data (Grid, WordPlacement, Constraints)
3. ✅ Které algoritmy použít (Backtracking + CSP, Pebble \& Sand ranking)
4. ✅ Jak optimalizovat (sorted word pool, BFS expansion, tabu search)
5. ✅ Jak generovat indicie (dictionary, AI, context-based)
6. ✅ Jak řešit edge cases (disconnected components, cyclic removal)
7. ✅ Implementační detaily v TypeScript syntaxi[^3][^7][^1][^2][^4][^5]
<span style="display:none">[^11][^12][^13][^14][^15][^16][^17][^18][^19][^20]</span>

<div align="center">⁂</div>

[^1]: https://aclanthology.org/2024.konvens-main.10.pdf

[^2]: https://allalgorithms.com/docs/crossword-puzzle

[^3]: https://www.baeldung.com/cs/generate-crossword-puzzle

[^4]: https://verygood.ventures/blog/how-we-developed-a-scalable-incredibly-fast-crossword-generator

[^5]: https://arxiv.org/abs/2007.04663

[^6]: https://arxiv.org/pdf/2109.11203.pdf

[^7]: https://www.sciencedirect.com/science/article/abs/pii/S0304397523005881

[^8]: https://firebase.blog/posts/2024/06/ai-powered-crossword-genkit/

[^9]: https://arxiv.org/pdf/2404.06186.pdf

[^10]: https://arxiv.org/abs/2405.07035

[^11]: https://cs50.harvard.edu/ai/projects/3/crossword/

[^12]: https://arxiv.org/abs/2205.09665

[^13]: https://amuselabs.com/games/crossword/

[^14]: https://aclanthology.org/2022.acl-long.219.pdf

[^15]: https://github.com/MichaelWehar/Automatic-Crossword-Puzzle-Filling

[^16]: https://github.com/MichaelWehar/Crossword-Layout-Generator

[^17]: https://www.semanticscholar.org/paper/Automatic-Generation-of-Crossword-Puzzles-Rigutini-Diligenti/4fb31d014f3f94a40cc7735f411f169568868e8a

[^18]: https://stackoverflow.com/questions/13353848/helping-with-crossword-filling-algorithm

[^19]: https://dspace.cvut.cz/bitstream/handle/10467/94587/F8-DP-2021-Benda-Adam-DP_Benda_Adam_2021.pdf?sequence=-1\&isAllowed=y

[^20]: https://www.reddit.com/r/algorithms/comments/x47fqx/help_crossword_puzzle_construction_algorithm/

