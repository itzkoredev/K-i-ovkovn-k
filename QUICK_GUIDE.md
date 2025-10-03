# 🚀 RYCHLÁ PŘÍRUČKA - KŘIŽOVKOVNÍK

## Běžné úkoly a jak je vyřešit

### 📝 Přidání nových slov

**Soubor**: `data/czech-words.ts`

```typescript
// Najdi pole czechWords a přidej nové slovo:
{
  word: 'POCITAC',
  clue: 'Elektronické zařízení na výpočty',
  difficulty: 'stredni',
  themes: ['technika', 'vsechny'],
  length: 7
}
```

**Tipy**:
- Slovo píšeme **VELKÝMI PÍSMENY**
- Délka (length) se vypočítá automaticky, ale je dobré ji uvést
- Můžete přidat více témat: `themes: ['sport', 'zdravi', 'vsechny']`
- Obtížnost: `'lehka'` | `'stredni'` | `'tezka'`

---

### 🎨 Změna barev

**Soubor**: `app/globals.css`

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Modrá */
  --secondary: 210 40% 96.1%;    /* Šedá */
  /* ... další barvy */
}
```

**Nebo v Tailwind configu**: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    DEFAULT: "hsl(221.2 83.2% 53.3%)", // Změň tady
  }
}
```

---

### 📐 Změna výchozích nastavení

**Soubor**: `components/settings-form.tsx`

```typescript
// Najdi tyto řádky a změň hodnoty:
const [gridSize, setGridSize] = useState(15);      // Výchozí velikost
const [difficulty, setDifficulty] = useState<Difficulty>('lehka');
const [theme, setTheme] = useState<Theme>('vsechny');
const [wordCount, setWordCount] = useState(20);     // Výchozí počet slov
const [showSolution, setShowSolution] = useState(false);
```

---

### 🎯 Přidání nového tématu

**1. Přidej typ** (`types/crossword.ts`):
```typescript
export type Theme = 
  | 'vsechny'
  | 'priroda'
  | 'sport'
  | 'nove_tema'  // PŘIDEJ TADY
```

**2. Přidej do UI** (`components/settings-form.tsx`):
```typescript
const themes: { value: Theme; label: string }[] = [
  // ...
  { value: 'nove_tema', label: 'Nové téma' },
];
```

**3. Označ slova** (`data/czech-words.ts`):
```typescript
{
  word: 'SLOVO',
  clue: 'Nápověda',
  difficulty: 'lehka',
  themes: ['nove_tema', 'vsechny'],  // PŘIDEJ TÉMA
  length: 5
}
```

---

### 🔧 Změna rozsahu velikosti mřížky

**Soubor**: `components/settings-form.tsx`

```typescript
<Slider
  id="gridSize"
  min={10}    // MINIMÁLNÍ velikost
  max={25}    // MAXIMÁLNÍ velikost
  step={1}
  value={[gridSize]}
  onValueChange={(value) => setGridSize(value[0])}
/>
```

---

### 📄 Úprava PDF exportu

**Soubor**: `lib/pdf-export.ts`

**Změna formátu**:
```typescript
const doc = new jsPDF({
  orientation: 'portrait',  // nebo 'landscape'
  unit: 'mm',
  format: 'a4',            // nebo 'a3', 'letter'
});
```

**Změna marginu**:
```typescript
const margin = 15;  // ZMĚŇ TADY (v mm)
```

**Změna velikosti písma**:
```typescript
doc.setFontSize(20);  // Titulek
doc.setFontSize(10);  // Normální text
doc.setFontSize(9);   // Otázky
```

---

### 🌐 Změna textu aplikace

**Soubor**: `app/page.tsx`

```typescript
// Titulek
<h1>Křižovkovník</h1>  // ZMĚŇ TADY

// Popisek
<p>Generátor klasických českých křížovek</p>  // ZMĚŇ TADY

// Tlačítka
<Button>Vygenerovat křížovku</Button>  // ZMĚŇ TADY
```

---

### 🎨 Změna favicon

**Soubor**: `app/favicon.svg`

- Nahraď SVG kód vlastním designem
- Nebo použij .ico soubor a přejmenuj na `favicon.ico`

---

### ⚡ Optimalizace výkonu

**Zvýšení rychlosti generování**:

`lib/crossword-generator.ts`
```typescript
private tryPlaceWordRandomly(word: Word): boolean {
  const attempts = 100;  // Sniž na 50 pro rychlejší generování
  // ...
}
```

**Omezení počtu slov**:
```typescript
const words = getRandomWords(
  settings.wordCount * 3,  // Sniž multiplikátor
  settings.difficulty,
  settings.theme
);
```

---

### 🐛 Debug mode

**Přidej do komponenty**:
```typescript
console.log('Vygenerovaná křížovka:', crossword);
console.log('Počet umístěných slov:', crossword.words.length);
```

**Zobraz čísla políček** (pro debugging):

`components/crossword-grid.tsx`
```typescript
{!cell.isBlack && cell.letter && (
  <span className="text-gray-800">{cell.letter}</span>
)}
// Přidej tohle pod:
<span className="text-[6px] absolute bottom-0 right-0">
  {x},{y}
</span>
```

---

### 📱 Responzivní úpravy

**Změna breakpointů**:

`tailwind.config.ts`
```typescript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1400px',  // ZMĚŇ TADY
}
```

---

### 🔐 Přidání validace

**Kontrola minimálního počtu slov**:

`components/settings-form.tsx`
```typescript
const handleGenerate = () => {
  if (wordCount < 5) {
    alert('Minimální počet slov je 5!');
    return;
  }
  
  const settings: CrosswordSettings = {
    // ...
  };
  onGenerate(settings);
};
```

---

### 🎨 Přidání animací

**Instalace**:
```bash
npm install framer-motion
```

**Použití**:
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <CrosswordGrid ... />
</motion.div>
```

---

### 💾 Local Storage

**Uložení křížovky**:
```typescript
localStorage.setItem('lastCrossword', JSON.stringify(crossword));
```

**Načtení křížovky**:
```typescript
const saved = localStorage.getItem('lastCrossword');
if (saved) {
  setCrossword(JSON.parse(saved));
}
```

---

### 🌙 Dark Mode

**1. Přidej toggle** (`components/settings-form.tsx`):
```typescript
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

**2. Barvy jsou již připravené** v `app/globals.css`

---

### 📊 Přidání statistik

```typescript
const [stats, setStats] = useState({
  totalGenerated: 0,
  lastGenerated: null as Date | null,
});

// Po vygenerování:
setStats({
  totalGenerated: stats.totalGenerated + 1,
  lastGenerated: new Date(),
});
```

---

### 🔄 Reset nastavení

```typescript
const resetSettings = () => {
  setGridSize(15);
  setDifficulty('lehka');
  setTheme('vsechny');
  setWordCount(20);
  setShowSolution(false);
};
```

---

## 🆘 Časté problémy

### Křížovka má málo slov

**Řešení**: Zvyš multiplikátor v generátoru:
```typescript
const words = getRandomWords(
  settings.wordCount * 5,  // Bylo 3, změň na 5
```

### PDF se nestahuje

**Řešení**: Zkontroluj Console (F12) pro chyby

### Mřížka je rozbitá

**Řešení**: Vyčisti .next a rebuild:
```bash
rm -rf .next
npm run build
```

---

## 📞 Kam psát dotazy

- GitHub Issues (pokud máš repo)
- Email podpory
- Discord/Slack komunita

---

**Happy coding! 🎉**
