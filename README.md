# Křižovkovník

![Křižovkovník](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Křižovkovník** je moderní webová aplikace pro generování klasických českých křížovek s možností exportu do PDF formátu připraveného k tisku na formát A4.

## ✨ Funkce

- 🎯 **Generování křížovek** - Automatické vytváření křížovek podle vašich preferencí
- 📊 **Volba obtížnosti** - Lehká, střední nebo těžká obtížnost
- 🎨 **Různá témata** - Příroda, sport, kultura, věda, geografie, historie, jídlo, zvířata, technika
- ⚙️ **Customizace** - Nastavení velikosti mřížky (10×10 až 25×25)
- 📝 **Počet slov** - Volba od 5 do 50 slov
- 📄 **PDF Export** - Profesionální export do PDF formátu A4
- ✅ **Řešení** - Volitelné zahrnutí řešení v PDF
- 🇨🇿 **Česká lokalizace** - Plně v češtině s českými slovy

## 🚀 Rychlý start

### Předpoklady

- Node.js 18+ 
- npm nebo yarn

### Instalace

1. Naklonujte repozitář:
```bash
git clone https://github.com/your-username/krizovkovnik.git
cd krizovkovnik
```

2. Nainstalujte závislosti:
```bash
npm install
```

3. Spusťte vývojový server:
```bash
npm run dev
```

4. Otevřete prohlížeč na adrese [http://localhost:3000](http://localhost:3000)

## 📦 Build pro produkci

```bash
npm run build
npm start
```

## 🛠️ Technologie

- **Next.js 14** - React framework s App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Kvalitní React komponenty
- **jsPDF** - PDF generování
- **Radix UI** - Headless UI primitives
- **Lucide React** - Moderní ikony

## 📁 Struktura projektu

```
krizovkovnik/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Hlavní stránka
│   └── globals.css        # Globální styly
├── components/            # React komponenty
│   ├── ui/               # Shadcn/UI komponenty
│   ├── crossword-grid.tsx
│   ├── crossword-clues.tsx
│   └── settings-form.tsx
├── lib/                   # Utility funkce
│   ├── crossword-generator.ts  # Algoritmus generování
│   ├── pdf-export.ts          # PDF export
│   └── utils.ts              # Pomocné funkce
├── types/                # TypeScript typy
│   └── crossword.ts
├── data/                 # Data
│   └── czech-words.ts    # Databáze českých slov
└── public/              # Statické soubory
```

## 🎮 Použití

1. **Nastavte parametry** - Vyberte obtížnost, téma, velikost mřížky a počet slov
2. **Vygenerujte křížovku** - Klikněte na "Vygenerovat křížovku"
3. **Prohlédněte si náhled** - Zkontrolujte vygenerovanou křížovku
4. **Exportujte do PDF** - Stáhněte si PDF připravené k tisku

## 🧩 Algoritmus generování

Křížovka se generuje pomocí pokročilého algoritmu:

1. **Výběr slov** - Slova jsou vybrána podle obtížnosti a tématu
2. **Umístění** - První slovo se umístí do středu horizontálně
3. **Průsečíky** - Další slova se přidávají pomocí hledání společných písmen
4. **Optimalizace** - Algoritmus se snaží maximalizovat počet slov a průsečíků

## 📝 Databáze slov

Aplikace obsahuje rozsáhlou databázi českých slov s:
- Více než 100 slov
- Kategorizace podle témat
- Rozdělení podle obtížnosti
- Kvalitní nápovědy

## 🤝 Přispívání

Příspěvky jsou vítány! Pokud chcete přispět:

1. Forkněte projekt
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## 📄 Licence

Tento projekt je licencován pod MIT licencí.

## 👨‍💻 Autor

Vytvořeno s ❤️ pro milovníky křížovek

## 🙏 Poděkování

- Shadcn pro úžasné UI komponenty
- Radix UI team
- Next.js team
- Všem přispěvatelům

---

**Bavte se s generováním křížovek! 🎉**
