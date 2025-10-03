# 🚀 DEPLOYMENT - KŘIŽOVKOVNÍK

Návod jak nasadit aplikaci na různé platformy.

## 📋 Příprava před deploymentem

### 1. Zkontroluj build
```bash
npm run build
```

Mělo by proběhnout bez chyb.

### 2. Otestuj production build lokálně
```bash
npm start
```

Otevři http://localhost:3000 a otestuj všechny funkce.

### 3. Zkontroluj .gitignore
```
node_modules/
.next/
.env*.local
```

---

## ☁️ Vercel (DOPORUČENO)

Nejjednodušší způsob nasazení Next.js aplikace.

### Postup:

1. **Pushni na GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/krizovkovnik.git
git push -u origin main
```

2. **Jdi na Vercel.com**
- Registruj se/přihlaš
- Import Git Repository
- Vyber svůj GitHub repo

3. **Klikni Deploy**
- Vercel automaticky detekuje Next.js
- Build trvá ~2 minuty
- Dostaneš URL: `krizovkovnik.vercel.app`

### Environment Variables
Pokud budeš mít .env soubory, přidej je v Vercel Settings → Environment Variables

---

## 🌍 Netlify

Alternativa k Vercelu.

### Postup:

1. **Build Command**
```bash
npm run build
```

2. **Publish Directory**
```
.next
```

3. **netlify.toml** (vytvoř v root):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

4. **Deploy**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🐳 Docker

Pro self-hosting.

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  krizovkovnik:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build a spuštění
```bash
docker-compose up -d
```

---

## 🖥️ VPS (Ubuntu/Debian)

### 1. Připrav server
```bash
# SSH na server
ssh user@your-server.com

# Nainstaluj Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Nainstaluj PM2
sudo npm install -g pm2
```

### 2. Nahraj aplikaci
```bash
# Lokálně:
scp -r /path/to/krizovkovnik user@your-server.com:/var/www/

# Na serveru:
cd /var/www/krizovkovnik
npm install
npm run build
```

### 3. Spusť s PM2
```bash
pm2 start npm --name "krizovkovnik" -- start
pm2 save
pm2 startup
```

### 4. Nginx reverse proxy
```nginx
server {
    listen 80;
    server_name krizovkovnik.cz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 HTTPS s Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d krizovkovnik.cz
```

---

## 🌐 Cloudflare Pages

### 1. Připojení
- Jdi na Cloudflare Pages
- Connect GitHub repository
- Vyber repo

### 2. Build Settings
- **Framework**: Next.js
- **Build command**: `npm run build`
- **Build output**: `.next`

### 3. Deploy
- Automaticky při push na main

---

## 📊 Performance Checklist

Po deployi zkontroluj:

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] PDF export funguje
- [ ] Responzivní design
- [ ] SEO meta tags
- [ ] Favicon se zobrazuje

---

## 🔧 Post-Deploy Konfigurace

### Google Analytics (volitelné)

1. **Vytvoř GA4 property**
2. **Přidej tracking code** do `app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout() {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Sitemap

Vytvoř `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://krizovkovnik.cz',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

### robots.txt

Vytvoř `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://krizovkovnik.cz/sitemap.xml',
  }
}
```

---

## 🐛 Debugging v produkci

### Zobrazení chyb
```typescript
// next.config.js
module.exports = {
  // Pouze pro debugging, pak odstraň!
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}
```

### Logy
```bash
# Vercel
vercel logs

# PM2
pm2 logs krizovkovnik

# Docker
docker logs krizovkovnik
```

---

## 📈 Monitoring

### Vercel Analytics
- Jdi do Vercel Dashboard
- Enable Analytics
- Sleduj performance metrics

### Sentry (pro error tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Vytvoř `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      # Deploy steps...
```

---

## ✅ Checklist před live provozem

- [ ] Build bez chyb
- [ ] Všechny funkce otestovány
- [ ] PDF export funguje
- [ ] Responzivní na všech zařízeních
- [ ] HTTPS nastaveno
- [ ] Domain připojena
- [ ] Analytics nastaveny
- [ ] Error tracking aktivní
- [ ] Backup strategie
- [ ] Monitoring aktivní

---

## 🎉 Go Live!

Po nasazení:

1. **Sdílej link** na sociálních sítích
2. **Sleduj metriky** prvních 24 hodin
3. **Reaguj na feedback** uživatelů
4. **Plánuj updates** podle potřeb

---

**Hodně štěstí s deploymementem! 🚀**
