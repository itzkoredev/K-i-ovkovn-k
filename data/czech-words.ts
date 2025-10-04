import type { Word, Difficulty, Theme } from '@/types/crossword';
import { megaDatabaze } from './mega-database';
import { megaWordsExpansion } from './mega-generator'; // 🔥 TISÍCE SLOV!
import { completeDictionary } from './mega-dictionary-complete'; // 📚 KOMPLETNÍ SLOVNÍK!

// Databáze českých slov s nápovědami + MEGA DATABÁZE (planetky, plemena psů, atd.)
export const czechWords: Word[] = [
  // VELMI KRÁTKÁ SLOVA (2-3 písmena) - PRO HUSTÝ PATTERN!
  { word: 'DŮM', clue: 'Budova', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VŮZ', clue: 'Vozidlo', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'LES', clue: 'Stromy', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'SŮL', clue: 'Koření', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 3 },
  { word: 'SÝR', clue: 'Mléčný výrobek', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 3 },
  { word: 'MED', clue: 'Sladký', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 3 },
  { word: 'OKO', clue: 'Zrak', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'UCHO', clue: 'Sluch', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'NOS', clue: 'Čich', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'RET', clue: 'Ústa', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'ZUB', clue: 'Chrup', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VLK', clue: 'Šelma', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'LAN', clue: 'Jelení', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'VYR', clue: 'Pták', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'RAK', clue: 'Korýš', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'KOT', clue: 'Mládě', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'BYK', clue: 'Samec', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'VES', clue: 'Parazit', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'CAP', clue: 'Pták', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'SEN', clue: 'Noční', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'DEN', clue: 'Světlý', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'ROK', clue: '365 dní', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VEK', clue: '100 let', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'HRA', clue: 'Zábava', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'HAJ', clue: 'Lesík', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'PAR', clue: 'Dvojice', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'BOR', clue: 'Les', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'DUB', clue: 'Strom', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'BUK', clue: 'Strom', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'JIL', clue: 'Hlína', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'LED', clue: 'Mrzlý', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'RAJ', clue: 'Nebe', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'PAD', clue: 'Pád', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VŮL', clue: 'Býček', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'SUD', clue: 'Nádoba', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VAL', clue: 'Vlna', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  { word: 'HŮL', clue: 'Pomůcka', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'MYS', clue: 'Polostrov', difficulty: 'lehka', themes: ['geografie', 'vsechny'], length: 3 },
  { word: 'DAR', clue: 'Dárek', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'MÍR', clue: 'Klid', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'BOJ', clue: 'Bitva', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'VÍR', clue: 'Vodní vír', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 3 },
  
  // MASIVNÍ ROZŠÍŘENÍ - 4PÍSMENNÁ SLOVA (KLÍČOVÁ PRO HUSTOU KŘÍŽOVKU!)
  { word: 'DRAK', clue: 'Létající hračka', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'MRAK', clue: 'Bouřkový', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'TRAK', clue: 'Pásový', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'PRAS', clue: 'Prášek', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'KVAS', clue: 'Kvašení', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'HLAS', clue: 'Zvuk řeči', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'KLAS', clue: 'Obilný', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'PLYN', clue: 'Stav skupenský', difficulty: 'lehka', themes: ['veda', 'vsechny'], length: 4 },
  { word: 'TMEL', clue: 'Lepidlo', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'HMAT', clue: 'Dotyk', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'CHOD', clue: 'Jídlo při obědě', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 4 },
  { word: 'SNÍH', clue: 'Bílý puch', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'LÍH', clue: 'Alkohol', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'MECH', clue: 'Rostlina', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'PRACH', clue: 'Nečistota', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'HRACH', clue: 'Lusková zelenina', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'STRACH', clue: 'Bázeň', difficulty: 'lehka', themes: ['vsechny'], length: 6 },
  { word: 'DECH', clue: 'Dýchání', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'TECH', clue: 'Vtip', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'CECH', clue: 'Řemeslnický', difficulty: 'lehka', themes: ['historie', 'vsechny'], length: 4 },
  { word: 'KLEC', clue: 'Ptačí domov', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'PLEC', clue: 'Plavoutev', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'KRUH', clue: 'Tvar', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'DRUH', clue: 'Typ', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'TLAK', clue: 'Síla', difficulty: 'lehka', themes: ['veda', 'vsechny'], length: 4 },
  { word: 'VLAK', clue: 'Koleje', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 4 },
  { word: 'ZNAK', clue: 'Symbol', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'BRAK', clue: 'Odpad', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'STEP', clue: 'Suchá pláň', difficulty: 'lehka', themes: ['geografie', 'vsechny'], length: 4 },
  { word: 'HLAD', clue: 'Apetit', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'SPAD', clue: 'Pokles', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'HRAD', clue: 'Pevnost', difficulty: 'lehka', themes: ['historie', 'vsechny'], length: 4 },
  { word: 'TRAD', clue: 'Jazz', difficulty: 'lehka', themes: ['kultura', 'vsechny'], length: 4 },
  { word: 'SRAZ', clue: 'Setkání', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'KRIZ', clue: 'Obtíže', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'FRIZ', clue: 'Účes', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'TRIZ', clue: 'Štěrbina', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'MOST', clue: 'Přemostění', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'HOST', clue: 'Návštěva', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'POST', clue: 'Půst', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'KOST', clue: 'Část skeletu', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'ROŠT', clue: 'Kovové mříž', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'LIST', clue: 'Papír', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'MIST', clue: 'Mistrovství', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'TISK', clue: 'Tiskoviny', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'DISK', clue: 'Datový nosič', difficulty: 'lehka', themes: ['technika', 'vsechny'], length: 4 },
  { word: 'RISK', clue: 'Riziko', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'BLOK', clue: 'Budova', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'SMOK', clue: 'Drak', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'TROK', clue: 'Trousek', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  
  // 5PÍSMENNÁ SLOVA - KLÍČOVÁ!
  { word: 'HRUZA', clue: 'Strach', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'KRUZA', clue: 'Ledová srážka', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'DRUZA', clue: 'Minerál', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'BURZA', clue: 'Trh', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'KURZ', clue: 'Školení', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'FURZ', clue: 'Plyn (vulg.)', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'HLAVA', clue: 'Část těla', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'SLAVA', clue: 'Sláva', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'STAVA', clue: 'Budování', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'HLINA', clue: 'Zemina', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'SLINA', clue: 'Slin', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'KLIMA', clue: 'Povětrnost', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'DLAHA', clue: 'Ortopedická pomůcka', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'PLAMEN', clue: 'Oheň', difficulty: 'lehka', themes: ['vsechny'], length: 6 },
  { word: 'DRAMA', clue: 'Hra', difficulty: 'lehka', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'TRAMA', clue: 'Osnova', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'KARMA', clue: 'Osud', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'FARMA', clue: 'Statek', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'FORMA', clue: 'Tvar', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'NORMA', clue: 'Pravidlo', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'BORKA', clue: 'Kůra', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'ZORKA', clue: 'Svítání', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'MORKA', clue: 'Mořská', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'KORKA', clue: 'Skořápka', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'DORKA', clue: 'Dívčí jméno', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'HORKA', clue: 'Teplá', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'POLKA', clue: 'Tanec', difficulty: 'lehka', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'HOLKA', clue: 'Děvče', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'KOLKA', clue: 'Bolest', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'MOLKA', clue: 'Hmyz', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 5 },
  { word: 'VOLKA', clue: 'Volání', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'TULKA', clue: 'Toulání', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  
  // Příroda - Lehká
  { word: 'STROM', clue: 'Dřevina', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'KVET', clue: 'Zahradní ozdoba', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'ROSA', clue: 'Ranní vlhko', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'VODA', clue: 'H₂O', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'HORA', clue: 'Vyvýšenina', difficulty: 'lehka', themes: ['priroda', 'geografie', 'vsechny'], length: 4 },
  { word: 'ŘEKA', clue: 'Vodní tok', difficulty: 'lehka', themes: ['priroda', 'geografie', 'vsechny'], length: 4 },
  { word: 'TRÁVA', clue: 'Loučná zeleň', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'SLUNCE', clue: 'Denní svítilo', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'MĚSÍC', clue: 'Noční svítilo', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  { word: 'OBLAK', clue: 'Nebeská bělost', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 5 },
  
  // Zvířata - Lehká
  { word: 'PES', clue: 'Domácí zvíře', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'KOČKA', clue: 'Domácí šelma', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 5 },
  { word: 'KŮŇ', clue: 'Jezdecké zvíře', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'KRÁVA', clue: 'Dojnice', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 5 },
  { word: 'PTÁK', clue: 'Opeřenec', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'RYBA', clue: 'Vodní živočich', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'MYŠ', clue: 'Drobný hlodavec', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'SLON', clue: 'Africký velikán', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 4 },
  { word: 'LEV', clue: 'Král zvířat', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 3 },
  { word: 'MEDVĚD', clue: 'Zimní spáč', difficulty: 'lehka', themes: ['zvirata', 'vsechny'], length: 6 },
  
  // Sport - Lehká
  { word: 'FOTBAL', clue: 'Kopačky', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 6 },
  { word: 'HOKEJ', clue: 'Brusle a puk', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 5 },
  { word: 'TENIS', clue: 'Raketový sport', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 5 },
  { word: 'BĚH', clue: 'Běžecká disciplína', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 3 },
  { word: 'SKOK', clue: 'Skok do výšky', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 4 },
  { word: 'PLAVÁNÍ', clue: 'Plavecký sport', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 7 },
  { word: 'LYŽE', clue: 'Zimní sport', difficulty: 'lehka', themes: ['sport', 'vsechny'], length: 4 },
  
  // Jídlo - Lehká
  { word: 'CHLEB', clue: 'Základní pečivo', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'MASLO', clue: 'Mléčný tuk', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'SALAT', clue: 'Listová zelenina', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 5 },
  { word: 'MASO', clue: 'Živočišná potrava', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 4 },
  { word: 'RÝŽE', clue: 'Obilovin a', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 4 },
  { word: 'SÝR', clue: 'Z mléka', difficulty: 'lehka', themes: ['jidlo', 'vsechny'], length: 3 },
  { word: 'JABLKO', clue: 'Červené ovoce', difficulty: 'lehka', themes: ['jidlo', 'priroda', 'vsechny'], length: 6 },
  { word: 'HRUŠKA', clue: 'Žluté ovoce', difficulty: 'lehka', themes: ['jidlo', 'priroda', 'vsechny'], length: 6 },
  
  // Příroda - Střední
  { word: 'LOŽISKA', clue: 'Místo nálezu', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 7 },
  { word: 'PRAMENY', clue: 'Zdroj řeky', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 7 },
  { word: 'KORYTO', clue: 'Dno řeky', difficulty: 'stredni', themes: ['priroda', 'geografie', 'vsechny'], length: 6 },
  { word: 'POROST', clue: 'Vegetace', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'KORUNA', clue: 'Vrchol stromu', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'KMEN', clue: 'Část stromu', difficulty: 'stredni', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'ŽELEZO', clue: 'Prvek Fe', difficulty: 'stredni', themes: ['veda', 'vsechny'], length: 6 },
  { word: 'UHLÍK', clue: 'Prvek C', difficulty: 'stredni', themes: ['veda', 'vsechny'], length: 5 },
  
  // Kultura - Střední
  { word: 'OPERA', clue: 'Hudební žánr', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'MALÍŘ', clue: 'Výtvarný umělec', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'SOCHA', clue: 'Plastické umění', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'POEZIE', clue: 'Básnické dílo', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 6 },
  { word: 'DIVADLO', clue: 'Jevištní umění', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 7 },
  { word: 'KNIHA', clue: 'Tištěné dílo', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 5 },
  { word: 'FILM', clue: 'Kinematografie', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 4 },
  
  // Historie - Střední
  { word: 'HRAD', clue: 'Středověká pevnost', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 4 },
  { word: 'ZÁMEK', clue: 'Šlechtické sídlo', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  { word: 'VÁLKA', clue: 'Vojenský konflikt', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  { word: 'KRÁLOVNA', clue: 'Panovnice', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 8 },
  { word: 'RYTÍŘ', clue: 'Středověký bojovník', difficulty: 'stredni', themes: ['historie', 'vsechny'], length: 5 },
  
  // Geografie - Střední  
  { word: 'PRAMEN', clue: 'Počátek řeky', difficulty: 'stredni', themes: ['geografie', 'priroda', 'vsechny'], length: 6 },
  { word: 'MĚSÍC', clue: 'Část kalendářního roku', difficulty: 'stredni', themes: ['vsechny'], length: 5 },
  { word: 'POUŠŤ', clue: 'Suchá pustina', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 5 },
  { word: 'OSTROV', clue: 'Země v moři', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 6 },
  { word: 'POLOOSTROV', clue: 'Výběžek do moře', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 10 },
  { word: 'PRŮLIV', clue: 'Mořská úžina', difficulty: 'stredni', themes: ['geografie', 'vsechny'], length: 6 },
  
  // Věda - Těžká
  { word: 'MOLEKULA', clue: 'Chemická částice', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'ELEKTRON', clue: 'Záporná částice', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'FOTOSYNTEZA', clue: 'Rostlinný proces', difficulty: 'tezka', themes: ['veda', 'priroda', 'vsechny'], length: 11 },
  { word: 'GRAVITACE', clue: 'Zemská síla', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 9 },
  { word: 'ATOM', clue: 'Částice hmoty', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 4 },
  { word: 'BAKTERIE', clue: 'Mikroorganismus', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 8 },
  { word: 'ENZYM', clue: 'Biokatalyzátor', difficulty: 'tezka', themes: ['veda', 'vsechny'], length: 5 },
  
  // Technika - Těžká
  { word: 'ALGORITMUS', clue: 'Výpočetní postup', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 10 },
  { word: 'PROCESOR', clue: 'CPU (zkr.)', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'DATABAZE', clue: 'Datové úložiště', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'INTERNET', clue: 'Světová síť', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  { word: 'SOFTWARE', clue: 'Programy (angl.)', difficulty: 'tezka', themes: ['technika', 'vsechny'], length: 8 },
  
  // Historie - Těžká
  { word: 'RENESANCE', clue: 'Kulturní obroda', difficulty: 'tezka', themes: ['historie', 'kultura', 'vsechny'], length: 9 },
  { word: 'REVOLUCE', clue: 'Společenský převrat', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 8 },
  { word: 'MONARCHIE', clue: 'Královská vláda', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 9 },
  { word: 'FEUDALISMUS', clue: 'Středověký řád', difficulty: 'tezka', themes: ['historie', 'vsechny'], length: 11 },
  
  // Geografie - Těžká
  { word: 'EKOSYSTEM', clue: 'Přírodní celek', difficulty: 'tezka', themes: ['geografie', 'priroda', 'veda', 'vsechny'], length: 9 },
  { word: 'KONTINENT', clue: 'Světadíl', difficulty: 'tezka', themes: ['geografie', 'vsechny'], length: 9 },
  { word: 'ROVNÍK', clue: 'Zemský pás', difficulty: 'tezka', themes: ['geografie', 'vsechny'], length: 6 },
  { word: 'ATMOSFÉRA', clue: 'Plynný obal planety', difficulty: 'tezka', themes: ['geografie', 'veda', 'vsechny'], length: 9 },
  
  // Kultura - Těžká
  { word: 'IMPRESIONISMUS', clue: 'Malířský směr', difficulty: 'tezka', themes: ['kultura', 'historie', 'vsechny'], length: 14 },
  { word: 'SYMFONIE', clue: 'Orchestrální dílo', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 8 },
  { word: 'GALERIE', clue: 'Výstavní síň', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 7 },
  { word: 'LITERATURA', clue: 'Písemnictví', difficulty: 'tezka', themes: ['kultura', 'vsechny'], length: 10 },
  
  // Další slova všech obtížností pro lepší pokrytí
  { word: 'DŮM', clue: 'Obytná budova', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'AUTO', clue: 'Osobní vůz', difficulty: 'lehka', themes: ['technika', 'vsechny'], length: 4 },
  { word: 'VLAK', clue: 'Kolejové vozidlo', difficulty: 'lehka', themes: ['technika', 'vsechny'], length: 4 },
  { word: 'TELEFON', clue: 'Přístroj na volání', difficulty: 'stredni', themes: ['technika', 'vsechny'], length: 7 },
  { word: 'POČÍTAČ', clue: 'Výpočetní stroj', difficulty: 'stredni', themes: ['technika', 'vsechny'], length: 7 },
  { word: 'OKNO', clue: 'Okenní otvor', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'DVEŘE', clue: 'Vchodový otvor', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'STŮL', clue: 'Stolní nábytek', difficulty: 'lehka', themes: ['vsechny'], length: 4 },
  { word: 'ŽIDLE', clue: 'Sedací nábytek', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'LAMPA', clue: 'Osvětlovací těleso', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'SVĚTLO', clue: 'Svícení', difficulty: 'lehka', themes: ['vsechny'], length: 6 },
  { word: 'DEN', clue: 'Světlá část doby', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'NOC', clue: 'Temná část doby', difficulty: 'lehka', themes: ['vsechny'], length: 3 },
  { word: 'ZIMA', clue: 'Mrazivé období', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'LETO', clue: 'Teplé období', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'JARO', clue: 'Jarní období', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 4 },
  { word: 'PODZIM', clue: 'Podzimní období', difficulty: 'lehka', themes: ['priroda', 'vsechny'], length: 6 },
  { word: 'ŠKOLA', clue: 'Vzdělávací ústav', difficulty: 'lehka', themes: ['vsechny'], length: 5 },
  { word: 'UČITEL', clue: 'Pedagog', difficulty: 'lehka', themes: ['vsechny'], length: 6 },
  { word: 'STUDENT', clue: 'Vysokoškolák', difficulty: 'stredni', themes: ['vsechny'], length: 7 },
  { word: 'KNIHOVNA', clue: 'Knihovní ústav', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 8 },
  { word: 'MUZEUM', clue: 'Sbírka exponátů', difficulty: 'stredni', themes: ['kultura', 'vsechny'], length: 6 },
  
  // HUDBA - Lehká
  { word: 'PIANO', clue: 'Klávesový nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'KYTARA', clue: 'Strunový nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 6 },
  { word: 'BUBEN', clue: 'Bicí nástroj', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'NOTA', clue: 'Hudební znak', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 4 },
  { word: 'PÍSEŇ', clue: 'Zpěvní skladba', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 5 },
  { word: 'ZPĚV', clue: 'Vokální projev', difficulty: 'lehka', themes: ['hudba', 'vsechny'], length: 4 },
  { word: 'HOUSLE', clue: 'Smyčcový nástroj', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 6 },
  { word: 'ORCHESTR', clue: 'Hudební těleso', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 8 },
  { word: 'DIRIGENT', clue: 'Vedoucí orchestru', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 8 },
  { word: 'MELODIE', clue: 'Hudební nápěv', difficulty: 'stredni', themes: ['hudba', 'vsechny'], length: 7 },
  
  // FILM & TV - Lehká
  { word: 'KINO', clue: 'Místo promítání filmů', difficulty: 'lehka', themes: ['film', 'vsechny'], length: 4 },
  { word: 'HEREC', clue: 'Účinkující ve filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 5 },
  { word: 'ROLE', clue: 'Postava ve filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 4 },
  { word: 'SCENA', clue: 'Část filmu', difficulty: 'lehka', themes: ['film', 'divadlo', 'vsechny'], length: 5 },
  { word: 'REŽISÉR', clue: 'Tvůrce filmu', difficulty: 'stredni', themes: ['film', 'vsechny'], length: 7 },
  { word: 'SCÉNÁŘ', clue: 'Filmový scénář', difficulty: 'stredni', themes: ['film', 'literatura', 'vsechny'], length: 6 },
  { word: 'KAMERA', clue: 'Natáčecí zařízení', difficulty: 'stredni', themes: ['film', 'technika', 'vsechny'], length: 6 },
  { word: 'SERIÁL', clue: 'Televizní pořad na pokračování', difficulty: 'stredni', themes: ['film', 'vsechny'], length: 6 },
  
  // DIVADLO - Střední
  { word: 'JEVIŠTĚ', clue: 'Místo představení', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 7 },
  { word: 'KULISY', clue: 'Divadelní výprava', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 6 },
  { word: 'OPONA', clue: 'Divadelní závěs', difficulty: 'stredni', themes: ['divadlo', 'vsechny'], length: 5 },
  { word: 'PREMIÉRA', clue: 'První představení', difficulty: 'stredni', themes: ['divadlo', 'film', 'vsechny'], length: 8 },
  { word: 'HRA', clue: 'Divadelní kus', difficulty: 'lehka', themes: ['divadlo', 'vsechny'], length: 3 },
  { word: 'MASKÉRNA', clue: 'Místo úpravy vzhledu', difficulty: 'tezka', themes: ['divadlo', 'film', 'vsechny'], length: 8 },
  
  // UMĚNÍ - Střední
  { word: 'OBRAZ', clue: 'Malované dílo', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 5 },
  { word: 'BARVA', clue: 'Pigment pro malování', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 5 },
  { word: 'ŠTĚTEC', clue: 'Nástroj malíře', difficulty: 'lehka', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'PLÁTNO', clue: 'Podklad pro obraz', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'PALETA', clue: 'Destička na barvy', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 6 },
  { word: 'MOZAIKA', clue: 'Obraz ze střípků', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 7 },
  { word: 'GRAFIKA', clue: 'Tiskové umění', difficulty: 'stredni', themes: ['umeni', 'vsechny'], length: 7 },
  { word: 'EXPRESIONISMUS', clue: 'Umělecký směr', difficulty: 'tezka', themes: ['umeni', 'vsechny'], length: 14 },
  
  // LITERATURA - Střední
  { word: 'ROMÁN', clue: 'Dlouhé prozaické dílo', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'BÁSEŇ', clue: 'Veršované dílo', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'POHÁDKA', clue: 'Příběh pro děti', difficulty: 'lehka', themes: ['literatura', 'vsechny'], length: 7 },
  { word: 'AUTOR', clue: 'Tvůrce díla', difficulty: 'lehka', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'BÁSNÍK', clue: 'Tvůrce veršů', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 6 },
  { word: 'VERŠ', clue: 'Řádek básně', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 4 },
  { word: 'SLOKA', clue: 'Básnická strofa', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'PRÓZA', clue: 'Neveršovaný text', difficulty: 'stredni', themes: ['literatura', 'vsechny'], length: 5 },
  { word: 'EPIKA', clue: 'Vypravovací literatura', difficulty: 'tezka', themes: ['literatura', 'vsechny'], length: 5 },
  
  // NÁBOŽENSTVÍ - Střední
  { word: 'KOSTEL', clue: 'Křesťanský chrám', difficulty: 'lehka', themes: ['nabozenstvi', 'vsechny'], length: 6 },
  { word: 'BIBLE', clue: 'Svatá kniha křesťanů', difficulty: 'lehka', themes: ['nabozenstvi', 'literatura', 'vsechny'], length: 5 },
  { word: 'KNĚZ', clue: 'Duchovní pastýř', difficulty: 'lehka', themes: ['nabozenstvi', 'vsechny'], length: 4 },
  { word: 'MODLITBA', clue: 'Rozhovor s Bohem', difficulty: 'stredni', themes: ['nabozenstvi', 'vsechny'], length: 8 },
  { word: 'SVATOST', clue: 'Náboženská hodnota', difficulty: 'stredni', themes: ['nabozenstvi', 'vsechny'], length: 7 },
  { word: 'KŘÍŽ', clue: 'Křesťanský symbol', difficulty: 'lehka', themes: ['nabozenstvi', 'vsechny'], length: 4 },
  { word: 'SVÁTOST', clue: 'Církevní obřad', difficulty: 'stredni', themes: ['nabozenstvi', 'vsechny'], length: 7 },
  { word: 'VÍRA', clue: 'Náboženské přesvědčení', difficulty: 'lehka', themes: ['nabozenstvi', 'vsechny'], length: 4 },
  
  // POLITIKA - Střední
  { word: 'STRANA', clue: 'Politické uskupení', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 6 },
  { word: 'VOLBY', clue: 'Výběr zástupců', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'ZÁKON', clue: 'Právní norma', difficulty: 'lehka', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'SENÁT', clue: 'Horní komora parlamentu', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 5 },
  { word: 'MINISTR', clue: 'Člen vlády', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 7 },
  { word: 'PREZIDENT', clue: 'Hlava státu', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 9 },
  { word: 'PARLAMENT', clue: 'Zastupitelský orgán', difficulty: 'stredni', themes: ['politika', 'vsechny'], length: 9 },
  { word: 'DEMOKRACIE', clue: 'Vláda lidu', difficulty: 'tezka', themes: ['politika', 'vsechny'], length: 10 },
  
  // EKONOMIE - Střední
  { word: 'PENÍZE', clue: 'Platidlo', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 6 },
  { word: 'BANKA', clue: 'Finanční instituce', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'INFLACE', clue: 'Růst cen', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 7 },
  { word: 'DOTACE', clue: 'Finanční podpora', difficulty: 'stredni', themes: ['ekonomie', 'politika', 'vsechny'], length: 6 },
  { word: 'TRHY', clue: 'Místo obchodu', difficulty: 'lehka', themes: ['ekonomie', 'vsechny'], length: 4 },
  { word: 'AKCIE', clue: 'Cenný papír', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'BURZA', clue: 'Místo obchodování', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 5 },
  { word: 'KAPITÁL', clue: 'Základní jmění', difficulty: 'stredni', themes: ['ekonomie', 'vsechny'], length: 7 },
  { word: 'INVESTICE', clue: 'Vložení peněz', difficulty: 'tezka', themes: ['ekonomie', 'vsechny'], length: 9 },
  
  // MEDICÍNA - Střední
  { word: 'LÉKAŘ', clue: 'Lékařský pracovník', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'NEMOC', clue: 'Zdravotní problém', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 5 },
  { word: 'LÉK', clue: 'Lékařský preparát', difficulty: 'lehka', themes: ['medicina', 'vsechny'], length: 3 },
  { word: 'INJEKCE', clue: 'Aplikace léku jehlou', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 7 },
  { word: 'NEMOCNICE', clue: 'Zdravotnické zařízení', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 9 },
  { word: 'CHIRURG', clue: 'Operující lékař', difficulty: 'stredni', themes: ['medicina', 'vsechny'], length: 7 },
  { word: 'VITAMÍN', clue: 'Důležitá látka pro tělo', difficulty: 'stredni', themes: ['medicina', 'veda', 'vsechny'], length: 7 },
  { word: 'DIAGNÓZA', clue: 'Určení nemoci', difficulty: 'tezka', themes: ['medicina', 'vsechny'], length: 8 },
  { word: 'PREVENCE', clue: 'Předcházení nemoci', difficulty: 'tezka', themes: ['medicina', 'vsechny'], length: 8 },
  
  // ASTRONOMIE - Střední
  { word: 'PLANETA', clue: 'Nebeské těleso obíhající hvězdu', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 7 },
  { word: 'MARS', clue: 'Červená planeta', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 4 },
  { word: 'HVĚZDA', clue: 'Svítící kosmické těleso', difficulty: 'lehka', themes: ['astronomie', 'veda', 'vsechny'], length: 6 },
  { word: 'GALAXIE', clue: 'Soustava hvězd', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 7 },
  { word: 'KOMETA', clue: 'Těleso s ocasem', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 6 },
  { word: 'TELESKOP', clue: 'Přístroj na pozorování hvězd', difficulty: 'stredni', themes: ['astronomie', 'technika', 'vsechny'], length: 8 },
  { word: 'ASTEROID', clue: 'Malé planetární těleso', difficulty: 'stredni', themes: ['astronomie', 'veda', 'vsechny'], length: 8 },
  { word: 'SUPERNOVA', clue: 'Explodující hvězda', difficulty: 'tezka', themes: ['astronomie', 'veda', 'vsechny'], length: 9 },
  
  // DOPRAVA - Lehká
  { word: 'SILNICE', clue: 'Cesta pro auta', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'MOST', clue: 'Spojení přes překážku', difficulty: 'lehka', themes: ['doprava', 'architektura', 'vsechny'], length: 4 },
  { word: 'TUNEL', clue: 'Průchod skrz horu', difficulty: 'lehka', themes: ['doprava', 'architektura', 'vsechny'], length: 5 },
  { word: 'LOĎKA', clue: 'Plavidlo', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 5 },
  { word: 'LETADLO', clue: 'Létající dopravní prostředek', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'TRAMVAJ', clue: 'Kolejové vozidlo ve městě', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 7 },
  { word: 'METRO', clue: 'Podzemní dráha', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 5 },
  { word: 'KOLEJ', clue: 'Železniční trať', difficulty: 'lehka', themes: ['doprava', 'vsechny'], length: 5 },
  { word: 'SEMAFOR', clue: 'Světelné dopravní zařízení', difficulty: 'stredni', themes: ['doprava', 'vsechny'], length: 7 },
  
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
  { word: 'VĚŽ', clue: 'Vysoká stavba', difficulty: 'lehka', themes: ['architektura', 'vsechny'], length: 3 },
  { word: 'SLOUP', clue: 'Vertikální nosič', difficulty: 'lehka', themes: ['architektura', 'vsechny'], length: 5 },
  { word: 'KOPULE', clue: 'Zaoblená střecha', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'FASÁDA', clue: 'Vnější stěna budovy', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'NADACE', clue: 'Základy stavby', difficulty: 'stredni', themes: ['architektura', 'vsechny'], length: 6 },
  { word: 'GOTIKA', clue: 'Středověký sloh', difficulty: 'stredni', themes: ['architektura', 'historie', 'vsechny'], length: 6 },
  { word: 'BAROKO', clue: 'Zdobný sloh 17.-18. stol.', difficulty: 'stredni', themes: ['architektura', 'historie', 'umeni', 'vsechny'], length: 6 },
  
  // ZAHRADNICTVÍ - Střední
  { word: 'ZAHRADA', clue: 'Pozemek s rostlinami', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
  { word: 'SEMENO', clue: 'Základ rostliny', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 6 },
  { word: 'KOPÁNÍ', clue: 'Práce s lopatou', difficulty: 'lehka', themes: ['zahradnictvi', 'vsechny'], length: 6 },
  { word: 'KVĚTINA', clue: 'Ozdobná rostlina', difficulty: 'lehka', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
  { word: 'HNOJIVO', clue: 'Výživa pro rostliny', difficulty: 'stredni', themes: ['zahradnictvi', 'vsechny'], length: 7 },
  { word: 'KONEV', clue: 'Nádoba na zalévání', difficulty: 'lehka', themes: ['zahradnictvi', 'vsechny'], length: 5 },
  { word: 'SKLIZEŇ', clue: 'Sběr úrody', difficulty: 'stredni', themes: ['zahradnictvi', 'vsechny'], length: 7 },
  { word: 'KOMPOST', clue: 'Organické hnojivo', difficulty: 'stredni', themes: ['zahradnictvi', 'priroda', 'vsechny'], length: 7 },
  
  // 🔥 MEGA DATABÁZE - PŘIPOJENO Z MEGA-DATABASE/
  // Planetky, Plemena psů, Řecká písmena, Ruské řeky a další TOP kategorie
  ...megaDatabaze,
  
  // 🚀 MEGA EXPANSION - TISÍCE OBECNÝCH SLOV!
  // Tělocvičné prvky, Pobídky, Předložky + běžná česká slova
  ...megaWordsExpansion,
  
  // 📚 KOMPLETNÍ KŘÍŽOVKÁŘSKÝ SLOVNÍK - 700+ slov z 8 kategorií!
  // SPZ, MPZ, Chemické značky, Řecká abeceda, Celní kódy, Solmizační slabiky, Lidové tance, Palmy
  ...completeDictionary,
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
  
  // ❌ FILTR: Žádná jednopísmenná slova!
  availableWords = availableWords.filter(w => w.length >= 2);
  
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
