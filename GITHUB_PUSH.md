# GitHub Push Instrukce

Po vytvoření repozitáře na GitHub.com spusť tyto příkazy:

```bash
# Přidej remote repozitář (nahraď YOUR_USERNAME svým GitHub jménem)
git remote add origin https://github.com/YOUR_USERNAME/krizovkovnik.git

# Přejmenuj branch na main (pokud ještě není)
git branch -M main

# Pushni kód na GitHub
git push -u origin main
```

Nebo pokud používáš SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/krizovkovnik.git
git branch -M main
git push -u origin main
```

## Po nahrání

1. Přidej screenshot do README (nahraď placeholder obrázky)
2. Nastav GitHub Pages (pokud chceš)
3. Přidej témata (topics): `crossword`, `czech`, `next-js`, `typescript`, `pdf-export`
4. Vytvoř releases pro verze

## Deploy

Můžeš nasadit zdarma na:
- **Vercel** (nejlepší pro Next.js): https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages** (statický export)

### Vercel Deploy (1 klik):
1. Jdi na https://vercel.com/new
2. Import z GitHubu
3. Vyber repozitář `krizovkovnik`
4. Klikni Deploy
5. Hotovo! ✨
