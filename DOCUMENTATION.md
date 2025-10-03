# Křižovkovník - Dokumentace

## Přehled

Křižovkovník je plně funkční webová aplikace pro generování klasických českých křížovek. Aplikace umožňuje:

- Generování křížovek různých obtížností
- Výběr z různých tematických kategorií
- Nastavení velikosti mřížky a počtu slov
- Export do PDF formátu A4
- Zobrazení řešení

## Architektura

### Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Jazyk**: TypeScript
- **Styling**: Tailwind CSS
- **UI Komponenty**: Shadcn/UI (postavené na Radix UI)
- **PDF Export**: jsPDF
- **State Management**: React hooks (useState)
- **Ikony**: Lucide React

### Struktura složek

```
krizovkovnik/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout s fonty a metadaty
│   ├── page.tsx           # Hlavní stránka aplikace
│   ├── globals.css        # Globální CSS s Tailwind
│   └── favicon.svg        # Ikona aplikace
├── components/            # React komponenty
│   ├── ui/               # Shadc UI komponenty
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── switch.tsx
│   ├── crossword-grid.tsx     # Vizualizace mřížky
│   ├── crossword-clues.tsx    # Seznam otázek
│   └── settings-form.tsx      # Formulář nastavení
├── lib/                   # Utility funkce
│   ├── crossword-generator.ts  # Hlavní generátor
│   ├── pdf-export.ts          # PDF export logika
│   └── utils.ts              # Pomocné funkce
├── types/                # TypeScript definice
│   └── crossword.ts      # Typy pro křížovku
├── data/                 # Datové soubory
│   └── czech-words.ts    # Databáze slov
└── public/              # Statické soubory
```

## Klíčové komponenty

### 1. Generátor křížovky (`lib/crossword-generator.ts`)

Algoritmus pro generování křížovky:

1. **Inicializace**: Vytvoření prázdné mřížky
2. **Výběr slov**: Načtení slov podle obtížnosti a tématu
3. **Umístění prvního slova**: Horizontálně ve středu mřížky
4. **Hledání průsečíků**: Pro každé další slovo hledá společná písmena
5. **Validace**: Kontrola kolizí a správnosti umístění
6. **Optimalizace**: Maximalizace počtu umístěných slov

**Klíčové metody:**
- `createEmptyGrid()` - Vytvoření prázdné mřížky
- `canPlaceWord()` - Validace možnosti umístění slova
- `placeWord()` - Umístění slova do mřížky
- `findIntersection()` - Hledání průsečíků
- `generate()` - Hlavní generovací metoda

### 2. PDF Export (`lib/pdf-export.ts`)

Export do PDF s profesionálním formátováním:

**Stránka 1: Křížovka**
- Titulek a datum
- Informace o obtížnosti
- Mřížka s čísly políček
- Seznam otázek (vodorovně/svisle)

**Stránka 2: Řešení** (volitelně)
- Vyplněná mřížka s písmeny

**Formátování:**
- A4 formát (210×297 mm)
- Optimální velikost buněk
- Číslování políček
- Přehledné rozložení

### 3. Databáze slov (`data/czech-words.ts`)

Obsahuje:
- 100+ českých slov s nápovědami
- 3 úrovně obtížnosti (lehká, střední, těžká)
- 9 tematických kategorií
- Metadata pro každé slovo (délka, témata, obtížnost)

**Kategorie:**
- Příroda
- Sport
- Kultura
- Věda
- Geografie
- Historie
- Jídlo
- Zvířata
- Technika

### 4. UI Komponenty

**SettingsForm** - Formulář pro nastavení:
- Výběr obtížnosti
- Výběr tématu
- Slider pro velikost mřížky (10-25)
- Slider pro počet slov (5-50)
- Switch pro zobrazení řešení

**CrosswordGrid** - Vizualizace mřížky:
- Dynamická velikost buněk
- Responzivní design
- Volitelné zobrazení řešení
- Číslování políček

**CrosswordCluesList** - Seznam otázek:
- Rozdělení na vodorovně/svisle
- Zobrazení délky slova
- Volitelné zobrazení odpovědí

## Použití API

### Generování křížovky

```typescript
import { generateCrossword } from '@/lib/crossword-generator';

const settings = {
  gridSize: 15,
  difficulty: 'lehka',
  theme: 'priroda',
  wordCount: 20,
  showSolution: true
};

const crossword = generateCrossword(settings);
```

### Export do PDF

```typescript
import { exportToPDF } from '@/lib/pdf-export';

exportToPDF(crossword);
```

### Práce se slovy

```typescript
import { 
  getWordsByDifficulty, 
  getWordsByTheme,
  getRandomWords 
} from '@/data/czech-words';

const easyWords = getWordsByDifficulty('lehka');
const natureWords = getWordsByTheme('priroda');
const randomWords = getRandomWords(10, 'stredni', 'sport');
```

## Customizace

### Přidání nových slov

Upravte soubor `data/czech-words.ts`:

```typescript
{
  word: 'NOVÉ_SLOVO',
  clue: 'Nápověda k slovu',
  difficulty: 'lehka',
  themes: ['priroda', 'vsechny'],
  length: 10
}
```

### Změna stylování

Upravte Tailwind konfiguraci v `tailwind.config.ts` nebo CSS proměnné v `app/globals.css`.

### Přidání nového tématu

1. Přidejte typ do `types/crossword.ts`
2. Přidejte do pole `themes` v `components/settings-form.tsx`
3. Označte slova novým tématem v `data/czech-words.ts`

## Performance

- **Build time**: ~15s
- **Page load**: <1s
- **Generování křížovky**: <500ms
- **PDF export**: <2s

## Budoucí vylepšení

- [ ] Uložení křížovek do local storage
- [ ] Historie vygenerovaných křížovek
- [ ] Sdílení křížovek přes URL
- [ ] Možnost přidat vlastní slova
- [ ] Tisk přímo z prohlížeče
- [ ] Dark mode
- [ ] Multi-language podpora
- [ ] API pro generování
- [ ] Mobilní aplikace

## Testování

Pro testování aplikace:

1. Spusťte dev server: `npm run dev`
2. Otevřete http://localhost:3000
3. Vygenerujte křížovku s různými nastaveními
4. Otestujte PDF export
5. Zkontrolujte responzivní design

## Troubleshooting

**Problem**: Křížovka se negeneruje
- **Řešení**: Zkuste snížit počet slov nebo změnit téma

**Problem**: PDF export nefunguje
- **Řešení**: Zkontrolujte, zda je nainstalován jsPDF

**Problem**: Chybějící styly
- **Řešení**: Zkontrolujte Tailwind konfiguraci

## Licence

MIT License - Volně použitelné pro komerční i nekomerční účely
