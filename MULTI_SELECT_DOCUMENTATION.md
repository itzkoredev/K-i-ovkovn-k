# 🎯 Multi-Select Témat - Dokumentace

## 📋 Přehled

Nový systém výběru témat umožňuje uživatelům vybrat **až 5 různých témat** současně pro vytvoření různorodější a zajímavější křížovky.

---

## ✨ Hlavní Vlastnosti

### 1. Multi-Select s Limitem
- ✅ **Maximum 5 témat** najednou
- ✅ **Checkbox interface** - intuitivní výběr
- ✅ **Visual feedback** - vybraná témata mají gradientní pozadí
- ✅ **Disabled state** - po dosažení limitu se ostatní témata deaktivují

### 2. Vizuální Badges
- 🎨 **Gradientní design** - modrá → fialová
- 🏷️ **Emoji + Text** - např. "🎵 Hudba"
- ❌ **Odebrání jedním kliknutím** - X tlačítko na každém badge
- 📦 **Scrollable kontejner** - když je více témat

### 3. Speciální "Všechna Témata"
- 🎯 **Výchozí volba** - pokud není nic vybráno
- 🔄 **Automatické přepnutí** - když uživatel odebere všechna témata
- 📝 **Badge "Mix"** - vizuální indikace speciální volby

---

## 🎨 UI Komponenty

### Multi-Select Checkbox List
```tsx
<div className="border rounded-lg p-3 bg-white max-h-[250px] overflow-y-auto">
  {themes.map(t => (
    <button
      onClick={() => handleThemeToggle(t.value)}
      className={isSelected ? 'bg-gradient-to-r from-blue-100 to-purple-100' : ''}
    >
      <CheckboxIcon />
      <Emoji>{t.emoji}</Emoji>
      <Label>{t.label}</Label>
    </button>
  ))}
</div>
```

### Badge Kontejner
```tsx
<div className="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50">
  {selectedThemes.map(theme => (
    <Badge variant="theme" onRemove={() => removeTheme(theme)}>
      {emoji} {label}
    </Badge>
  ))}
  <Button onClick={clearAllThemes}>Smazat vše</Button>
</div>
```

---

## 🔧 Logika

### Přidání Tématu
```typescript
const handleThemeToggle = (themeValue: Theme) => {
  if (themeValue === 'vsechny') {
    // Vymaže ostatní a nastaví jen "Všechna témata"
    setSelectedThemes(['vsechny']);
  } else {
    // Odebere "vsechny" a přidá vybrané téma
    // Max 5 témat
  }
};
```

### Odebrání Tématu
```typescript
const removeTheme = (themeValue: Theme) => {
  const filtered = prev.filter(t => t !== themeValue);
  // Pokud je prázdné, vrátí "vsechny"
  return filtered.length === 0 ? ['vsechny'] : filtered;
};
```

### Generování Křížovky
```typescript
// V crossword-generator.ts
const words = getRandomWords(
  count,
  difficulty,
  themes // Pole témat místo jednoho
);

// V czech-words.ts
export function getRandomWords(count, difficulty, themes: Theme[]) {
  if (themes.includes('vsechny')) {
    // Vrátí všechna slova
  } else {
    // Filtruje slova která mají alespoň jedno z vybraných témat
    availableWords.filter(w => 
      w.themes.some(wordTheme => themes.includes(wordTheme))
    );
  }
}
```

---

## 📊 Stavy UI

### 1. Prázdný Stav (Výchozí)
```
Vybraná témata: ['vsechny']
Zobrazení: Badge "🎯 Všechna témata (Mix)"
Limit: -
```

### 2. Nějaká Témata Vybrána (1-4)
```
Vybraná témata: ['hudba', 'film', 'literatura']
Zobrazení: 3 barevné badges s X tlačítky
Limit: "3/5"
```

### 3. Maximum Témat (5)
```
Vybraná témata: ['hudba', 'film', 'literatura', 'umeni', 'divadlo']
Zobrazení: 5 badges + upozornění
Limit: "5/5"
Ostatní témata: DISABLED
```

---

## 🎨 Styling

### Barevné Schéma

#### Nevybrané Téma
```css
border: 2px transparent
background: white
hover: bg-gray-50
```

#### Vybrané Téma
```css
background: linear-gradient(to right, #DBEAFE, #E9D5FF)
border: 2px #3B82F6
font-weight: 600
```

#### Badge
```css
background: linear-gradient(to right, #3B82F6, #9333EA)
color: white
border-radius: 9999px
padding: 0.25rem 0.75rem
```

#### Checkbox
```css
/* Nevybrané */
border: 2px #D1D5DB
background: white

/* Vybrané */
background: linear-gradient(to right, #3B82F6, #9333EA)
border: 2px #3B82F6
✓ white checkmark
```

---

## 📝 Příklady Použití

### Výběr Uměleckých Témat
```
Vybraná témata: Hudba, Film, Umění, Literatura, Divadlo
Výsledek: Křížovka s hudebními nástroji, filmovými termíny, 
          uměleckými technikami, literárními pojmy a divadelními prvky
```

### Vědecká Křížovka
```
Vybraná témata: Věda, Astronomie, Medicína
Výsledek: Mix vědeckých termínů z různých oblastí
```

### Cestovatelská Křížovka
```
Vybraná témata: Cestování, Geografie, Doprava
Výsledek: Otázky o místech, dopravních prostředcích a geografii
```

---

## 🔄 Interakce

### Kliknutí na Téma
1. **Pokud není vybráno:**
   - Přidá se do seznamu (pokud limit < 5)
   - Odebere se "Všechna témata" pokud bylo vybráno
   - Zobrazí se nový badge

2. **Pokud je vybráno:**
   - Odebere se ze seznamu
   - Badge zmizí
   - Pokud byl poslední, automaticky se vybere "Všechna témata"

### Kliknutí na "Všechna Témata"
- Vymaže všechna ostatní témata
- Nastaví jen "vsechny"
- Všechny badges zmizí

### Kliknutí na X na Badge
- Odebere konkrétní téma
- Stejné chování jako kliknutí v seznamu

### Kliknutí na "Smazat vše"
- Vymaže všechna vybraná témata
- Vrátí se k "Všechna témata"

---

## 💡 UX Vylepšení

### 1. Vizuální Feedback
- ✅ Gradientní pozadí pro vybrané položky
- ✅ Barevné badges s emoji
- ✅ Smooth transitions
- ✅ Hover efekty

### 2. Jasné Informace
- ✅ Počítadlo "3/5"
- ✅ Upozornění při dosažení limitu
- ✅ Disabled state pro nedostupné volby

### 3. Snadné Ovládání
- ✅ Jedno kliknutí = přidání/odebrání
- ✅ X tlačítko na každém badge
- ✅ "Smazat vše" pro rychlé resetování
- ✅ Scrollable list pro všechna témata

---

## 📄 PDF Export

### Zobrazení Témat v PDF
```typescript
// Pokud je vybráno "vsechny"
"🎨 Témata: Všechna témata"

// Pokud jsou vybrána konkrétní témata
"🎨 Témata: Hudba, Film, Literatura"

// Pokud je text příliš dlouhý (> 30 znaků)
"🎨 Témata: Hudba, Film, Literat..."
```

---

## 🚀 Výhody Multi-Selectu

### Před (Single Select)
- ❌ Pouze 1 téma nebo všechny
- ❌ Nemožnost kombinovat témata
- ❌ Omezená variabilita křížovek
- ❌ Dropdown s 25 možnostmi

### Po (Multi-Select)
- ✅ Kombinace až 5 témat
- ✅ Kreativní mix otázek
- ✅ Personalizované křížovky
- ✅ Vizuální checkbox interface
- ✅ Badges pro rychlý přehled
- ✅ Limit zabraňuje přetížení

---

## 🎯 Technická Implementace

### Type Changes
```typescript
// Před
interface CrosswordSettings {
  theme: Theme;
}

// Po
interface CrosswordSettings {
  themes: Theme[]; // Pole témat
}
```

### State Management
```typescript
const [selectedThemes, setSelectedThemes] = useState<Theme[]>(['vsechny']);
```

### Filtering Logic
```typescript
// Filtruje slova která mají alespoň jedno z vybraných témat
availableWords.filter(w => 
  w.themes.some(wordTheme => themes.includes(wordTheme))
);
```

---

## 📊 Statistiky

| Metrika | Hodnota |
|---------|---------|
| **Max témat** | 5 |
| **Dostupných témat** | 25 |
| **Kombinací** | 53,130 |
| **Slova v databázi** | 300+ |
| **Průměrná slova/téma** | 12-20 |

---

## 🎨 Design Inspirace

Multi-select je inspirován:
- 🏷️ **Tag selectors** - např. GitHub topics
- 🎨 **Chip components** - Material Design
- 📋 **Filter systems** - e-commerce weby
- ✅ **Checkbox groups** - formuláře

---

## 🔮 Budoucí Vylepšení

### Plánované Funkce
- [ ] **Oblíbené kombinace** - uložit často používané sety
- [ ] **Náhodný výběr** - tlačítko "Překvap mě" (náhodně vybere 3-5 témat)
- [ ] **Doporučené kombinace** - přednastavené zajímavé kombinace
- [ ] **Statistiky** - kolikrát bylo téma použito
- [ ] **Drag & Drop** - přeuspořádání témat v badges

---

## ✅ Testing Checklist

### Testovací Scénáře
- [x] Výběr 1 tématu
- [x] Výběr 5 témat (maximum)
- [x] Pokus o výběr 6. tématu (mělo by být disabled)
- [x] Odebrání tématu kliknutím v seznamu
- [x] Odebrání tématu kliknutím na X v badge
- [x] Kliknutí na "Smazat vše"
- [x] Výběr "Všechna témata" když jsou jiná vybraná
- [x] Odebrání posledního tématu (mělo by se vrátit "Všechna témata")
- [x] Generování křížovky s multi-select tématy
- [x] PDF export s více tématy

---

**Stav:** ✅ Implementováno a funkční
**Datum:** Říjen 2025
**Version:** 2.0

*Vytvořeno s ❤️ pro lepší uživatelský zážitek*
