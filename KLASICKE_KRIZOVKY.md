# Klasické České Křížovky - Průvodce

## 🎯 Co je nového?

Aplikace byla kompletně přepracována podle formátu **klasických českých novinových křížovek**.

## ✨ Hlavní Funkce

### 1. **TAJENKA** ⭐
- Vybraná políčka (označená žlutě) tvoří tajné slovo
- Po vyluštění křížovky vytvoří tajenka smysluplné heslo
- Tajenka je zobrazena i v PDF exportu

### 2. **NÁPOVĚDY V ROHU** 💡
- Některá políčka obsahují nápovědu (písmeno) v pravém horním rohu
- Zelená barva nápovědy = pomoc při řešení
- Cca 10% políček dostane nápovědu

### 3. **ČÍSLA V POLÍČKÁCH** 🔢
- Čísla otázek jsou v levém horním rohu BÍLÝCH políček
- Modrá barva pro lepší viditelnost
- Černá políčka jsou prázdná (bez textu)

### 4. **SEZNAM OTÁZEK** 📝
- Otázky rozděleny na Vodorovně → a Svisle ↓
- Krátké, úsporné formulace (max 2-4 slova)
- Pod mřížkou, ne v políčkách

## 🎨 Design

### Mřížka
- **Větší políčka** - lepší čitelnost (až 50px)
- **Tajenka** - žluté zvýraznění políček
- **Černá políčka** - tmavá, bez textu
- **Bílá políčka** - pro vyplňování odpovědí

### Barvy
- 🔵 Modrá - čísla otázek
- 🟢 Zelená - nápovědy
- 🟡 Žlutá - tajenka
- ⚫ Černá - prázdná políčka

## 📄 PDF Export

PDF obsahuje 3 části:

### Stránka 1: Křížovka
- Mřížka s čísly a nápovědami
- Tajenka označena žlutě
- Černá prázdná políčka

### Stránka 2: Otázky
- **Vodorovně** (levá polovina)
- **Svisle** (pravá polovina)
- **Tajenka** (ve žlutém rámečku)

### Stránka 3: Řešení (volitelné)
- Vyplněná mřížka
- Zelené pozadí
- Tajenka zvýrazněna

## 🎮 Jak použít

1. **Vyberte témata** (max 5)
2. **Nastavte obtížnost** a velikost mřížky
3. **Klikněte na "Vygenerovat"**
4. Prohlédněte si:
   - Mřížku s tajenkou
   - Seznam otázek
   - (Volitelně) Řešení
5. **Exportujte do PDF**

## 📊 Statistiky

- ✅ 300+ českých slov
- ✅ 25+ témat
- ✅ 3 úrovně obtížnosti
- ✅ Tajenka ve všech křížovkách
- ✅ Nápovědy v 10% políček
- ✅ Krátké, úsporné otázky

## 🔧 Technické Detaily

### Typy
```typescript
interface GridCell {
  letter: string;
  number?: number;
  isBlack: boolean;
  isTajenka?: boolean;    // Nová vlastnost
  napoveda?: string;       // Nová vlastnost
  x: number;
  y: number;
}

interface Crossword {
  grid: GridCell[][];
  words: PlacedWord[];
  tajenka: string;         // Nová vlastnost
  settings: CrosswordSettings;
  createdAt: Date;
}
```

### Generování Tajenky
- Náhodný výběr z předpřipravených hesel
- Políčka tajenky označena jako `isTajenka: true`
- 10% políček dostane nápovědu

### PDF Layout
- A4 formát (210×297 mm)
- České fonty s diakritikou
- Profesionální layout
- Barevné zvýraznění

## 🎯 Příklady Změn

### PŘED
- ❌ Otázky v černých políčkách
- ❌ Dlouhé, popisné otázky
- ❌ Žádná tajenka
- ❌ Malá políčka

### PO
- ✅ Čísla v bílých políčkách
- ✅ Krátké otázky pod mřížkou
- ✅ Tajenka ve žlutých políčkách
- ✅ Větší, čitelnější políčka
- ✅ Nápovědy v pravém horním rohu

## 💡 Tipy

1. **Tajenka** - Vyluštěte nejdřív slova, která křížují políčka tajenky
2. **Nápovědy** - Použijte zelené nápovědy když se zaseknete
3. **Čísla** - Modré číslo v levém rohu = pořadí otázky
4. **Export** - PDF je optimalizované pro tisk na A4

## 🚀 Co dál?

Možná budoucí vylepšení:
- [ ] Vlastní zadání tajenky uživatelem
- [ ] Více tajenek v jedné křížovce
- [ ] Různé typy nápověd (synonyma, definice)
- [ ] Tématické tajenky (podle vybraných témat)

---

**Vytvořeno s ❤️ pro milovníky českých křížovek**
