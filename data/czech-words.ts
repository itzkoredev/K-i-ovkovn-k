import type { Word, Difficulty, Theme } from '@/types/crossword';

// Databáze českých slov s nápovědami
export const czechWords: Word[] = [
  // Příroda - Lehká
  { word: 'STROM', clue: 'Dřevina', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'KVET', clue: 'Ozdoba zahrady', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'ROSA', clue: 'Vlhko na trávě', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'VODA', clue: 'H₂O', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'HORA', clue: 'Vyvýšenina', difficulty: 'lehka', themes: ['priroda', 'geografie', 'vsechny'], length: 4 },
  { word: 'REKA', clue: 'Vodní tok', difficulty: 'lehka', themes: ['priroda', 'geografie', 'vsechny'], length: 4 },
  { word: 'TRAVA', clue: 'Zelená louka', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'SLUNCE', clue: 'Denní hvězda', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'MESIC', clue: 'Noční svítilo', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'OBLAK', clue: 'Bílý na obloze', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  
  // Zvířata - Lehká
  { word: 'PES', clue: 'Štěká', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'KOCKA', clue: 'Mňouká', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 5 },
  { word: 'KUN', clue: 'Pro jízdu', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'KRAVA', clue: 'Dává mléko', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 5 },
  { word: 'PTAK', clue: 'Létá', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'RYBA', clue: 'Plave', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'MYSI', clue: 'Malý hlodavec', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'SLON', clue: 'Chobot', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'LEV', clue: 'Král zvířat', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'MEDVED', clue: 'Spal v zimě', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 6 },
  
  // Sport - Lehká
  { word: 'FOTBAL', clue: 'Míč a branka', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 6 },
  { word: 'HOKEJ', clue: 'Puk a hůl', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 5 },
  { word: 'TENIS', clue: 'Raketa', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 5 },
  { word: 'BEH', clue: 'Rychlá chůze', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 3 },
  { word: 'SKOK', clue: 'Odraz', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 4 },
  { word: 'PLANI', clue: 'Ve vodě', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 5 },
  { word: 'LYZE', clue: 'Zimní sport', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 4 },
  
  // Jídlo - Lehká
  { word: 'CHLEB', clue: 'Pečivo', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'MASLO', clue: 'Tuk z mléka', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'SALAT', clue: 'Zelená zelenina', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'MASO', clue: 'Ze zvířat', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 4 },
  { word: 'RYZE', clue: 'Obilovinou', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 4 },
  { word: 'SYR', clue: 'Z mléka', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 3 },
  { word: 'JABLKO', clue: 'Červené ovoce', difficulty: 'lehka', themes: ['jidlo', 'priroda', 'vsechny'], length: 6 },
  { word: 'HRUSKA', clue: 'Žluté ovoce', difficulty: 'lehka', themes: ['jidlo', 'priroda', 'vsechny'], length: 6 },
  
  // Příroda - Střední
  { word: 'LOZISKA', clue: 'Místo nálezu', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 7 },
  { word: 'PRAMENY', clue: 'Zdroj řeky', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 7 },
  { word: 'KORYTO', clue: 'Dno řeky', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 6 },
  { word: 'POROST', clue: 'Vegetace', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'KORUNA', clue: 'Vrchol stromu', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'KMEN', clue: 'Část stromu', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'ZELEZO', clue: 'Prvek Fe', difficulty: 'stredni', themes: ['veda', 'vsechny'], length: 6 },
  { word: 'UHLIK', clue: 'Prvek C', difficulty: 'stredni', themes: ['veda', 'vsechny'], length: 5 },
  
  // Kultura - Střední
  { word: 'OPERA', clue: 'Hudební žánr', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'MALIR', clue: 'Maluje', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'SOCHA', clue: '3D umění', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'POEZIE', clue: 'Básně', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 6 },
  { word: 'DIVADLO', clue: 'Jeviště', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 7 },
  { word: 'KNIHA', clue: 'K četbě', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'FILM', clue: 'Kino', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 4 },
  
  // Historie - Střední
  { word: 'HRAD', clue: 'Pevnost', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 4 },
  { word: 'ZAMEK', clue: 'Šlechtické sídlo', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  { word: 'VALKA', clue: 'Konflikt', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  { word: 'KRALOVNA', clue: 'Panovnice', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 8 },
  { word: 'RYTIR', clue: 'Bojovník', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  
  // Geografie - Střední  
  { word: 'PRAMEN', clue: 'Počátek řeky', difficulty: 'stredni', themes: ['geografie', 'priroda', 'vsechny'], length: 6 },
  { word: 'MESIC', clue: 'Část roku', difficulty: 'stredni', themes: ['vsechny'], length: 5 },
  { word: 'POUST', clue: 'Suchá oblast', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 5 },
  { word: 'OSTROV', clue: 'V moři', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 6 },
  { word: 'POLOSTROV', clue: 'Téměř ostrov', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 9 },
  { word: 'PRULIV', clue: 'Úžina', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 6 },
  
  // Věda - Těžká
  { word: 'MOLEKULA', clue: 'Částice', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'ELEKTRON', clue: 'Záporná částice', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'FOTOSYNTEZA', clue: 'Proces v rostlinách', difficulty: 'tezka', themes: ['veda', 'priroda', 'vsechny'], length: 11 },
  { word: 'GRAVITACE', clue: 'Přitažlivost', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 9 },
  { word: 'ATOM', clue: 'Stavební část', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 4 },
  { word: 'BAKTERIE', clue: 'Mikrob', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'ENZYM', clue: 'Katalyzátor', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 5 },
  
  // Technika - Těžká
  { word: 'ALGORITMUS', clue: 'Postup', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 10 },
  { word: 'PROCESOR', clue: 'CPU', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'DATABAZE', clue: 'Úložiště dat', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'INTERNET', clue: 'Síť', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'SOFTWARE', clue: 'Programy', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  
  // Historie - Těžká
  { word: 'RENESANCE', clue: 'Kulturní rozkvět', difficulty: 'tezka', themes: ['historie', 'kultura', 'vsechny'], length: 9 },
  { word: 'REVOLUCE', clue: 'Převrat', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 8 },
  { word: 'MONARCHIE', clue: 'Vláda krále', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 9 },
  { word: 'FEUDALISMUS', clue: 'Středověký společenský systém', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 11 },
  
  // Geografie - Těžká
  { word: 'EKOSYSTEM', clue: 'Soustava organismů a prostředí', difficulty: 'tezka', themes: ['geografie', 'priroda', 'veda', 'vsechny'], length: 9 },
  { word: 'KONTINENT', clue: 'Velká pevnina', difficulty: 'tezka', themes: ['geografie', 'vsechny'], length: 9 },
  { word: 'ROVNIK', clue: 'Pomyslná čára dělící Zemi', difficulty: 'tezka', themes: ['geografie', 'vsechny'], length: 6 },
  { word: 'ATMOSFERA', clue: 'Plynný obal Země', difficulty: 'tezka', themes: ['geografie', 'veda', 'vsechny'], length: 9 },
  
  // Kultura - Těžká
  { word: 'IMPRESIONISMUS', clue: 'Umělecký směr 19. století', difficulty: 'tezka', themes: ['kultura', 'historie', 'vsechny'], length: 14 },
  { word: 'SYMFONIE', clue: 'Velké orchestrální dílo', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 8 },
  { word: 'GALERIE', clue: 'Místo pro výstavy umění', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 7 },
  { word: 'LITERATURA', clue: 'Písemná slovesnost', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 10 },
  
  // Další slova všech obtížností pro lepší pokrytí
  { word: 'DUM', clue: 'Stavba pro bydlení', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'AUTO', clue: 'Dopravní prostředek', difficulty: 'lehka', themes: ['technika', 'vsechny'], length: 4 },
  { word: 'VLAK', clue: 'Jezdí po kolejích', difficulty: 'lehka', themes: ['technika', 'vsechny'], length: 4 },
  { word: 'TELEFON', clue: 'Zařízení pro volání', difficulty: 'stredni', themes: ['technika', 'vsechny'], length: 7 },
  { word: 'POCITAC', clue: 'Elektronické zařízení', difficulty: 'stredni', themes: ['technika', 'vsechny'], length: 7 },
  { word: 'OKNO', clue: 'Otvor ve zdi', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'DVERE', clue: 'Vstup do místnosti', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'STUL', clue: 'Nábytek na jídlo', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'ZIDLE', clue: 'Nábytek na sezení', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'LAMPA', clue: 'Zdroj světla', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'SVET', clue: 'Celý svět', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'DEN', clue: 'Světlá část dne', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'NOC', clue: 'Tmavá část dne', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'ZIMA', clue: 'Roční období se sněhem', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'LETO', clue: 'Nejteplejší roční období', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'JARO', clue: 'Období probouzení přírody', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'PODZIM', clue: 'Období padání listí', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'SKOLA', clue: 'Místo vzdělávání', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'UCITEL', clue: 'Vzdělavatel', difficulty: 'lehka', themes: ['vsechny'], length: 6 },
  { word: 'STUDENT', clue: 'Vysokoškolský žák', difficulty: 'stredni', themes: ['vsechny'], length: 7 },
  { word: 'KNIHOVNA', clue: 'Místo s knihami', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 8 },
  { word: 'MUSEUM', clue: 'Místo s exponáty', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 6 },
  
  // HUDBA - Lehká
  { word: 'PIANO', clue: 'Klávesový nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'KYTARA', clue: 'Strunový nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 6 },
  { word: 'BUBEN', clue: 'Bicí nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'NOTA', clue: 'Hudební znak', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 4 },
  { word: 'PISEN', clue: 'Zpívaná melodie', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'ZPEV', clue: 'Hlasový projev', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 4 },
  { word: 'HOUSLE', clue: 'Smyčcový nástroj', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 6 },
  { word: 'ORCHESTR', clue: 'Velké hudební těleso', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 8 },
  { word: 'DIRIGENT', clue: 'Vůdce orchestru', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 8 },
  { word: 'MELODIE', clue: 'Hudební motiv', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 7 },
  
  // FILM & TV - Lehká
  { word: 'KINO', clue: 'Místo promítání filmů', difficulty: 'lehka', themes: ['film', 'vsechny'], length: 4 },
  { word: 'HEREC', clue: 'Účinkující ve filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 5 },
  { word: 'ROLE', clue: 'Postava ve filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 4 },
  { word: 'SCENA', clue: 'Část filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 5 },
  { word: 'REZISER', clue: 'Tvůrce filmu', difficulty: 'stredni', themes: ['film', 'vsechny'], length: 7 },
  { word: 'SCENARIO', clue: 'Filmový scénář', difficulty: 'stredni', themes: ['film', 'literatura', 'vsechny'], length: 8 },
  { word: 'KAMERA', clue: 'Natáčecí zařízení', difficulty: 'stredni', themes: ['film', 'technika', 'vsechny'], length: 6 },
  { word: 'SERIAL', clue: 'Televizní pořad na pokračování', difficulty: 'stredni', themes: ['film', 'vsechny'], length: 6 },
  
  // DIVADLO - Střední
  { word: 'JEVIS TE', clue: 'Místo představení', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 7 },
  { word: 'KULISY', clue: 'Divadelní výprava', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 6 },
  { word: 'OPONA', clue: 'Divadelní závěs', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 5 },
  { word: 'PREMIERA', clue: 'První představení', difficulty: 'stredni', themes: ['divadlo', 'film', 'vsechny'], length: 8 },
  { word: 'HRA', clue: 'Divadelní kus', difficulty: 'lehka', themes: ['divadlo', 'vsechny'], length: 3 },
  { word: 'MASKÉRNA', clue: 'Místo úpravy vzhledu', difficulty: 'tezka', themes: ['divadlo', 'film', 'vsechny'], length: 8 },
  
  // UMĚNÍ - Střední
  { word: 'OBRAZ', clue: 'Malované dílo', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 5 },
  { word: 'BARVA', clue: 'Pigment pro malování', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 5 },
  { word: 'STETEC', clue: 'Nástroj malíře', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'PLATNO', clue: 'Podklad pro obraz', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'PALETA', clue: 'Destička na barvy', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'MOZAIKA', clue: 'Obraz ze střípků', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 7 },
  { word: 'GRAFIKA', clue: 'Tiskové umění', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 7 },
  { word: 'EXPRESIONISMUS', clue: 'Umělecký směr', difficulty: 'tezka', themes: ['umeni', 'vsechny'], length: 14 },
  
  // LITERATURA - Střední
  { word: 'ROMAN', clue: 'Dlouhé prozaické dílo', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'BASEN', clue: 'Veršované dílo', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'POHADKA', clue: 'Příběh pro děti', difficulty: 'lehka', themes: ['literatura', 'vsechny'], length: 7 },
  { word: 'AUTOR', clue: 'Tvůrce díla', difficulty: 'lehka', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'BASIC', clue: 'Tvůrce veršů', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'VERŠ', clue: 'Řádek básně', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 4 },
  { word: 'SLOKA', clue: 'Básnická strofa', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'PROЗА', clue: 'Neveršovaný text', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'EPIKA', clue: 'Vypravovací literatura', difficulty: 'tezka', themes: ['literatura', 'vsechny'], length: 5 },
  
  // NÁBOŽENSTVÍ - Střední
  { word: 'KOSTEL', clue: 'Křesťanský chrám', difficulty: 'lehka', themes: ['nabozenst vi', 'vsechny'], length: 6 },
  { word: 'BIBLE', clue: 'Svatá kniha křesťanů', difficulty: 'lehka', themes: ['nabozenst vi', 'literatura', 'vsechny'], length: 5 },
  { word: 'KNEZ', clue: 'Duchovní pastýř', difficulty: 'lehka', themes: ['nabozenst vi', 'vsechny'], length: 4 },
  { word: 'MODLITBA', clue: 'Rozhovor s Bohem', difficulty: 'stredni', themes: ['nabozenst vi', 'vsechny'], length: 8 },
  { word: 'SVATOST', clue: 'Náboženská hodnota', difficulty: 'stredni', themes: ['nabozenst vi', 'vsechny'], length: 7 },
  { word: 'KRIZ', clue: 'Křesťanský symbol', difficulty: 'lehka', themes: ['nabozenst vi', 'vsechny'], length: 4 },
  { word: 'SVATE K', clue: 'Církevní obřad', difficulty: 'stredni', themes: ['nabozenst vi', 'vsechny'], length: 6 },
  { word: 'VIRA', clue: 'Náboženské přesvědčení', difficulty: 'lehka', themes: ['nabozenst vi', 'vsechny'], length: 4 },
  
  // POLITIKA - Střední
  { word: 'STRANA', clue: 'Politické uskupení', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 6 },
  { word: 'VOLBY', clue: 'Výběr zástupců', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'ZAKON', clue: 'Právní norma', difficulty: 'lehka', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'SENAT', clue: 'Horní komora parlamentu', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'MINISTR', clue: 'Člen vlády', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 7 },
  { word: 'PREZIDENT', clue: 'Hlava státu', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 9 },
  { word: 'PARLAMENT', clue: 'Zastupitelský orgán', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 9 },
  { word: 'DEMOKRACIE', clue: 'Vláda lidu', difficulty: 'tezka', themes: ['politika', 'vsechny'], length: 10 },
  
  // EKONOMIE - Střední
  { word: 'PENIZE', clue: 'Platidlo', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 6 },
  { word: 'BANKA', clue: 'Finanční instituce', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'INFLACE', clue: 'Růst cen', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 7 },
  { word: 'DOTACE', clue: 'Finanční podpora', difficulty: 'stredni', themes: ['ekonomie', 'politika', 'vsechny'], length: 6 },
  { word: 'TRHY', clue: 'Místo obchodu', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 4 },
  { word: 'AKCIE', clue: 'Cenný papír', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'BURZA', clue: 'Místo obchodování', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'KAPITAL', clue: 'Základní jmění', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 7 },
  { word: 'INVESTICE', clue: 'Vložení peněz', difficulty: 'tezka', themes: ['ekonomie', 'vsechny'], length: 9 },
  
  // MEDICÍNA - Střední
  { word: 'LEKAR', clue: 'Lékařský pracovník', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'NEMOC', clue: 'Zdravotní problém', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'LEK', clue: 'Lékařský preparát', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 3 },
  { word: 'INJEKCE', clue: 'Aplikace léku jehlou', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 7 },
  { word: 'NEMOCNICE', clue: 'Zdravotnické zařízení', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 9 },
  { word: 'CHIRURG', clue: 'Operující lékař', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 7 },
  { word: 'VITAMÍN', clue: 'Důležitá látka pro tělo', difficulty: 'stredni', themes: ['medicina', 'veda', 'vsechny'], length: 7 },
  { word: 'DIAGNOZA', clue: 'Určení nemoci', difficulty: 'tezka', themes: ['medicina', 'vsechny'], length: 8 },
  { word: 'PREVENCE', clue: 'Předcházení nemoci', difficulty: 'tezka', themes: ['medicina', 'vsechny'], length: 8 },
  
  // ASTRONOMIE - Střední
  { word: 'PLANETA', clue: 'Nebeské těleso obíhající hvězdu', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 7 },
  { word: 'MARS', clue: 'Červená planeta', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 4 },
  { word: 'HVEZDA', clue: 'Svítící kosmické těleso', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 6 },
  { word: 'GALAXIE', clue: 'Soustava hvězd', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 7 },
  { word: 'KOMETA', clue: 'Těleso s ocasem', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 6 },
  { word: 'TELESKOP', clue: 'Přístroj na pozorování hvězd', difficulty: 'stredni', themes: ['astronomie', 'technika', 'vsechny'], length: 8 },
  { word: 'ASTEROID', clue: 'Malé planetární těleso', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 8 },
  { word: 'SUPERNOVA', clue: 'Explodující hvězda', difficulty: 'tezka', themes: ['astronomie', 'veda', 'vsechny'], length: 9 },
  
  // DOPRAVA - Lehká
  { word: 'SILNICE', clue: 'Cesta pro auta', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'MOST', clue: 'Spojení přes překážku', difficulty: 'lehka', themes: ['doprava', 'architektura', 'vsechny'], length: 4 },
  { word: 'TUNEL', clue: 'Průchod skrz horu', difficulty: 'lehka', themes: ['doprava', 'architektura', 'vsechny'], length: 5 },
  { word: 'LOD', clue: 'Plavidlo', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 3 },
  { word: 'LETADLO', clue: 'Létající dopravní prostředek', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'TRAMVAJ', clue: 'Kolejové vozidlo ve městě', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'METRO', clue: 'Podzemní dráha', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 5 },
  { word: 'KOLEJ', clue: 'Železniční trať', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 5 },
  { word: 'SEMAF OR', clue: 'Světelné dopravní zařízení', difficulty: 'stredni', themes: ['doprava', 'vsechny'], length: 7 },
  
  // CESTOVÁNÍ - Střední
  { word: 'DOVOLENA', clue: 'Čas odpočinku', difficulty: 'lehka', themes: ['cestovani', 'vsechny'], length: 8 },
  { word: 'HOTEL', clue: 'Ubytovací zařízení', difficulty: 'lehka', themes: ['cestovani', 'vsechny'], length: 5 },
  { word: 'PENZION', clue: 'Malé ubytování', difficulty: 'lehka', themes: ['cestovani', 'vsechny'], length: 7 },
  { word: 'ZAVAZADLO', clue: 'Cestovní batoh', difficulty: 'stredni', themes: ['cestovani', 'vsechny'], length: 9 },
  { word: 'MAPA', clue: 'Průvodce terénem', difficulty: 'lehka', themes: ['cestovani', 'geografie', 'vsechny'], length: 4 },
  { word: 'PRUVODCE', clue: 'Osoba vedoucí turisty', difficulty: 'stredni', themes: ['cestovani', 'vsechny'], length: 8 },
  { word: 'ZAJEZD', clue: 'Organizovaná cesta', difficulty: 'stredni', themes: ['cestovani', 'vsechny'], length: 6 },
  { word: 'TURISTIKA', clue: 'Pěší procházky v přírodě', difficulty: 'stredni', themes: ['cestovani', 'sport', 'vsechny'], length: 9 },
  
  // MÓDA - Střední
  { word: 'ODEV', clue: 'Oblečení', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 4 },
  { word: 'BOTY', clue: 'Obuv', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 4 },
  { word: 'SATY', clue: 'Dámský oděv', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 4 },
  { word: 'KABAT', clue: 'Svrchní oděv', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 5 },
  { word: 'MODEL', clue: 'Předvádějící oblečení', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 5 },
  { word: 'PREHLÍDKA', clue: 'Módní show', difficulty: 'stredni', themes: ['moda', 'vsechny'], length: 9 },
  { word: 'NAVRHÁŘ', clue: 'Tvůrce oděvů', difficulty: 'stredni', themes: ['moda', 'vsechny'], length: 7 },
  { word: 'KRAVATA', clue: 'Doplněk k košili', difficulty: 'lehka', themes: ['moda', 'vsechny'], length: 7 },
  
  // ARCHITEKTURA - Střední
  { word: 'BUDOVA', clue: 'Postavená stavba', difficulty: 'lehka', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'VEZ', clue: 'Vysoká stavba', difficulty: 'lehka', themes: ['architektura', 'vsechny'], length: 3 },
  { word: 'SLOUP', clue: 'Vertikální nosič', difficulty: 'lehka', themes: ['architektura', 'vsechny'], length: 5 },
  { word: 'KUPOLE', clue: 'Zaoblená střecha', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'FASADA', clue: 'Vnější stěna budovy', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'NADACE', clue: 'Základy stavby', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'GOTIKA', clue: 'Středověký sloh', difficulty: 'stredni', themes: ['architektura', 'historie', 'vsechny'], length: 6 },
  { word: 'BAROKO', clue: 'Zdobný sloh 17.-18. stol.', difficulty: 'stredni', themes: ['architektura', 'historie', 'umeni', 'vsechny'], length: 6 },
  
  // ZAHRADNICTVÍ - Střední
  { word: 'ZAHRADA', clue: 'Pozemek s rostlinami', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
  { word: 'SEMENO', clue: 'Základ rostliny', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 6 },
  { word: 'KOPANI', clue: 'Práce s lopatou', difficulty: 'lehka', themes: ['zahradnictvi', 'vsechny'], length: 6 },
  { word: 'KVETINA', clue: 'Ozdobná rostlina', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
  { word: 'HNOJIVO', clue: 'Výživa pro rostliny', difficulty: 'stredni', themes: ['zahradnictvi', 'vsechny'], length: 7 },
  { word: 'KONEV', clue: 'Nádoba na zalévání', difficulty: 'lehka', themes: ['zahradnictvi', 'vsechny'], length: 5 },
  { word: 'SKLIZEN', clue: 'Sběr úrody', difficulty: 'stredni', themes: ['zahradnictvi', 'vsechny'], length: 7 },
  { word: 'KOMPOST', clue: 'Organické hnojivo', difficulty: 'stredni', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
];

// Pomocné funkce pro práci s databází
export function getWordsByDifficulty(difficulty: Difficulty): Word[] {
  return czechWords.filter(w => w.difficulty === difficulty);
}

export function getWordsByTheme(theme: Theme): Word[] {
  if (theme === 'vsechny') return czechWords;
  return czechWords.filter(w => w.themes.includes(theme));
}

export function getWordsByDifficultyAndTheme(difficulty: Difficulty, theme: Theme): Word[] {
  let words = czechWords;
  
  if (theme !== 'vsechny') {
    words = words.filter(w => w.themes.includes(theme));
  }
  
  return words.filter(w => w.difficulty === difficulty);
}

export function getRandomWords(count: number, difficulty?: Difficulty, themes?: Theme[]): Word[] {
  let availableWords = czechWords;
  
  if (difficulty) {
    availableWords = availableWords.filter(w => w.difficulty === difficulty);
  }
  
  if (themes && themes.length > 0) {
    // Pokud je vybráno "vsechny", vrátit všechna slova
    if (themes.includes('vsechny')) {
      // Necháme availableWords jak jsou
    } else {
      // Filtrovat slova která mají alespoň jedno z vybraných témat
      availableWords = availableWords.filter(w => 
        w.themes.some(wordTheme => themes.includes(wordTheme))
      );
    }
  }
  
  // Shuffle array
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
