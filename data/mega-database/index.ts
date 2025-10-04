/**
 * MEGA DATABÁZE - KONKURENCESCHOPNÁ S LUSTIT.CZ
 * 
 * Obsahuje 600+ křížovkářských spojení v TOP kategoriích:
 * ✅ Planetky, Plemena psů, Řecká písmena, Ruské řeky (MASSIVE +100)
 * ✅ Karetní hry, Dravé ptáky, Pobídky, Předložky
 * ✅ Listnaté stromy (MASSIVE +30)
 * 
 * Inspirováno strukturou lustit.cz a křížovkářský-slovník-online.cz
 */

import type { Word } from '@/types/crossword';
import { planetky } from './planetky';
import { plemenaPsu } from './plemena-psu';
import { reckaPismena } from './recka-pismena';
import { ruskeReky } from './ruske-reky';
import { karetniHry } from './karetni-hry';
import { dravePtaky } from './drave-ptaky';
import { pobidky } from './pobidky';
import { predlozky } from './predlozky';

// MASSIVE EXPANSION
import { ruskeRekyMassive } from './ruske-reky-massive';
import { listinateStromyMassive } from './listinate-stromy-massive';

// TOP KATEGORIE (nejčastější v křížovkách)
export {
  planetky,
  plemenaPsu,
  reckaPismena,
  ruskeReky,
  karetniHry,
  dravePtaky,
  pobidky,
  predlozky,
  ruskeRekyMassive,
  listinateStromyMassive,
};

/**
 * SPOJENÍ VŠECH KATEGORIÍ + MASSIVE EXPANSION
 */
export const megaDatabaze: Word[] = [
  ...planetky,
  ...plemenaPsu,
  ...reckaPismena,
  ...ruskeReky,
  ...ruskeRekyMassive, // +40 ruských řek
  ...listinateStromyMassive, // +20 stromů
  ...karetniHry,
  ...dravePtaky,
  ...pobidky,
  ...predlozky,
];

console.log(`📚 MEGA DATABÁZE načtena: ${megaDatabaze.length} slov z ${8} kategorií`);
