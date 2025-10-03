# 🧩 Křižovkovník - Generátor Klasických Českých Křížovek

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Moderní webová aplikace pro generování klasických českých křížovek s tajenkou, nápovědami a exportem do PDF.

## ✨ Hlavní Funkce

### 🎯 Tajenka
- **Žlutá políčka** označují písmena, která tvoří tajné slovo
- Po vyluštění křížovky vytvoří tajenka smysluplné heslo
- Náhodný výběr z hesel: ČESKO, PRAHA, ZÁBAVA, ÚSPĚCH, RADOST, VÍTĚZ, ŠTĚSTÍ

### 💡 Nápovědy
- **Zelené písmenko** v pravém horním rohu některých políček
- Pomáhá při řešení obtížnějších částí
- Cca 10% políček dostane nápovědu

### 🔢 Klasický Formát
- **Čísla otázek** v levém horním rohu bílých políček (modrá barva)
- **Černá políčka** jsou prázdná (bez textu otázek)
- **Seznam otázek** pod mřížkou (Vodorovně → a Svisle ↓)
- **Krátké otázky** - úsporné formulace jako v novinách

### 📄 PDF Export
- **Stránka 1**: Mřížka s tajenkou (prázdná křížovka)
- **Stránka 2**: Seznam otázek + tajenka ve žlutém rámečku
- **Stránka 3**: Řešení (volitelné)
- A4 formát optimalizovaný pro tisk
- České fonty s perfektní diakritikou

### 🎨 Moderní Design
- **Větší políčka** - až 50px pro lepší čitelnost
- **Barevné zvýraznění** - tajenka (žlutá), nápovědy (zelená), čísla (modrá)
- **Framer Motion animace** - plynulé přechody a efekty
- **Responzivní layout** - funguje na desktop i tablet
- **Gradientní pozadí** a moderní UI komponenty

### 🎮 Multi-Select Témat
- Vyberte **až 5 témat** současně
- Badge rozhraní s odstraňováním křížkem
- 25+ témat k výběru

## 🚀 Rychlý Start

### Předpoklady
- Node.js 18.0 nebo vyšší
- npm, yarn nebo pnpm

### Instalace

```bash
# Klonování repozitáře
git clone https://github.com/YOUR_USERNAME/krizovkovnik.git
cd krizovkovnik

# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

### Build pro produkci

```bash
npm run build
npm start
```

## 📖 Použití

1. **Vyberte témata** - až 5 témat najednou (Příroda, Sport, Kultura, atd.)
2. **Nastavte obtížnost** - Lehká, Střední, Těžká
3. **Zvolte velikost** - 10×10 až 25×25 políček
4. **Počet slov** - kolik slov chcete v křížovce (5-50)
5. **Řešení** - zapněte pro zobrazení řešení v PDF
6. **Generovat** - klikněte na tlačítko "Vygenerovat křížovku"
7. **Export** - stáhněte si PDF soubor

## 📊 Databáze Slov

- **300+ českých slov** s krátkými otázkami
- **25+ témat**: Příroda, Sport, Kultura, Věda, Geografie, Historie, Jídlo, Zvířata, Technika, Hudba, Film, Divadlo, Umění, Literatura, Náboženství, Politika, Ekonomie, Medicína, Astronomie, Doprava, Cestování, Móda, Architektura, Zahradnictví
- **3 úrovně obtížnosti**: Lehká, Střední, Těžká
- **Krátké formulace** otázek (2-4 slova) jako v klasických novinových křížovkách

## 🛠️ Technologie

- **Framework**: [Next.js 14.2.5](https://nextjs.org/) - React framework s App Router
- **Jazyk**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animace**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animace
- **PDF**: [jsPDF](https://github.com/parallax/jsPDF) + jsPDF-AutoTable - Generování PDF
- **UI**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable komponenty
- **Icons**: [Lucide React](https://lucide.dev/) - Krásné ikony

## 📁 Struktura Projektu

```
křižovkovník/
├── app/
│   ├── page.tsx              # Hlavní stránka
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Globální styly
│   └── favicon.svg           # Favicon
├── components/
│   ├── crossword-grid.tsx         # Komponenta mřížky
│   ├── crossword-clues-list.tsx   # Seznam otázek
│   ├── settings-form.tsx          # Formulář nastavení
│   └── ui/                        # Reusable UI komponenty
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── slider.tsx
│       └── switch.tsx
├── lib/
│   ├── crossword-generator.ts # Generátor křížovek
│   ├── pdf-export.ts          # PDF export
│   └── utils.ts               # Utility funkce
├── data/
│   └── czech-words.ts         # Databáze 300+ slov
├── types/
│   └── crossword.ts           # TypeScript typy
└── docs/
    ├── KLASICKE_KRIZOVKY.md   # Průvodce klasickým formátem
    ├── MULTI_SELECT_DOCUMENTATION.md
    ├── DOCUMENTATION.md        # Technická dokumentace
    └── CHANGELOG.md            # Historie změn
```

## 🎯 Algoritmus Generování

1. **Výběr slov** - náhodný výběr podle vybraných témat a obtížnosti
2. **Umístění prvního slova** - horizontálně uprostřed mřížky
3. **Hledání průsečíků** - inteligentní algoritmus hledá společná písmena
4. **Kontrola kolizí** - validace že slova nemají nežádoucí sousední buňky
5. **Generování tajenky** - náhodný výběr políček, která tvoří tajné slovo
6. **Přidání nápověd** - 10% náhodných políček dostane nápovědu (první písmeno)
7. **Čísování** - automatické přiřazení čísel otázkám podle pozice

## 📝 Dokumentace

- [KLASICKE_KRIZOVKY.md](KLASICKE_KRIZOVKY.md) - Kompletní průvodce klasickým formátem
- [MULTI_SELECT_DOCUMENTATION.md](MULTI_SELECT_DOCUMENTATION.md) - Multi-select témat
- [DOCUMENTATION.md](DOCUMENTATION.md) - Technická dokumentace
- [QUICK_GUIDE.md](QUICK_GUIDE.md) - Rychlý průvodce
- [CHANGELOG.md](CHANGELOG.md) - Historie změn

## 🎨 Ukázky

### Mřížka s tajenkou a nápovědami
- Žlutá políčka = tajenka
- Zelená písmena = nápovědy
- Modrá čísla = odkazy na otázky
- Černá prázdná políčka

### Seznam otázek
- Vodorovně → (modrá sekce)
- Svisle ↓ (fialová sekce)
- Krátké, úsporné formulace
- Číslo délky slova v závorce

### PDF Export
- Stránka 1: Prázdná křížovka
- Stránka 2: Otázky + tajenka
- Stránka 3: Vyplněné řešení
- Profesionální layout, české fonty

## 🤝 Přispívání

Příspěvky jsou vítány! Pokud chcete přispět:

1. Forkněte repozitář
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitujte změny (`git commit -m '✨ Add amazing feature'`)
4. Pushněte do branche (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

### Nápady na příspěvky
- 🆕 Přidání nových slov do databáze
- 🎨 Nová témata křížovek
- 🐛 Opravy bugů
- 📖 Vylepšení dokumentace
- ✨ Nové funkce (např. vlastní tajenka, více typů nápověd)

## 📄 Licence

Tento projekt je licencován pod MIT licencí - viz [LICENSE](LICENSE) soubor.

## 👤 Autor

GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🎉 Plánované Funkce

- [ ] Vlastní zadání tajenky uživatelem
- [ ] Více tajenek v jedné křížovce
- [ ] Různé typy nápověd (synonyma, definice, obrázky)
- [ ] Tématické tajenky (podle vybraných témat)
- [ ] Local storage pro ukládání křížovek
- [ ] Sdílení křížovek přes URL
- [ ] Tisk přímo z prohlížeče (bez PDF)
- [ ] Dark mode
- [ ] Mobilní aplikace (React Native)
- [ ] API pro externí integrace

## 💖 Podpora

Pokud se vám projekt líbí, dejte mu ⭐ na GitHubu!

Chcete podpořit vývoj? [Buy me a coffee](https://www.buymeacoffee.com/YOUR_USERNAME) ☕

## 🙏 Poděkování

- Inspirováno klasickými českými novinovými křížovkami
- Děkuji komunitě Next.js a React za skvělé nástroje
- shadcn/ui za krásné UI komponenty

---

**Vytvořeno s ❤️ pro milovníky českých křížovek**
