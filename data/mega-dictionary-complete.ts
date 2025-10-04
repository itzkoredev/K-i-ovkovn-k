
import { Word, Theme } from '@/types/crossword';

// Helper function to generate Word objects from a simple array
const generateWords = (words: string[], clue: string, themeStr: string): Word[] => {
  // Map theme string to valid Theme type
  const themeMap: Record<string, Theme> = {
    'Zkratky': 'technika',
    'Věda': 'veda',
    'Jazyky': 'kultura',
    'Hudba': 'hudba',
    'Kultura': 'kultura',
    'Příroda': 'priroda',
  };
  
  const theme: Theme = themeMap[themeStr] || 'vsechny';
  
  return words.map(word => ({
    word: word.toUpperCase(),
    clue,
    length: word.length,
    themes: [theme, 'vsechny'],
    difficulty: 'lehka' as const,
  }));
};

// --- CATEGORIES ---

// SPZ - Státní poznávací značky (cca 130)
const spzWords = [
  'ALS', 'AM', 'AN', 'AR', 'AP', 'AT', 'KL', 'KO', 'KMA', 'LT', 'DCA', 'PU', 'AKN', 'RO', 'ROA', 'TPA', 'OD', 'BA', 'BB', 'BC', 'BJ', 'BY', 'BN', 'BNB', 'BNA', 'BNC', 'BNE', 'BNK', 'BGD', 'BGL', 'BE', 'BEB', 'BIT', 'BK', 'BKD', 'BKH', 'BKB', 'BKE', 'BO', 'BOT', 'BRA', 'BL', 'BT', 'BH', 'BS', 'BM', 'BRK', 'BMD', 'BZA', 'BZE', 'BZR', 'BR', 'BV', 'BVE', 'CA', 'IC', 'CZ', 'CLC', 'CLD', 'CB', 'CBB', 'CBE', 'CL', 'CKA', 'DC', 'DCE', 'DIN', 'DK', 'DO', 'DOD', 'DOE', 'DOH', 'DOV', 'DS', 'ZI', 'DU', 'EIN', 'EV', 'FE', 'FL', 'FI', 'FMA', 'GA', 'GT', 'EE', 'HM', 'HB', 'HL', 'HOA', 'HOB', 'HO', 'HOE', 'HOR', 'HK', 'HKK', 'HKL', 'HKN', 'HR', 'HN', 'HUS', 'CV', 'CR', 'CRB', 'IN', 'IS', 'DL', 'JN', 'JNA', 'JE', 'JC', 'JI', 'KVI', 'KVE', 'KA', 'KI', 'KIH', 'KIL', 'KIB', 'KLA', 'KLI', 'KD', 'KT', 'KTE', 'KTH', 'KTI', 'KTA', 'KOA', 'KOE', 'KOI', 'KN', 'KNA', 'KE', 'KS', 'KMD', 'KME', 'KC', 'KRU', 'KH', 'KHA', 'LAT', 'LE', 'LEO', 'YR', 'OM', 'LEV', 'LVA', 'LV', 'LBA', 'LBC', 'LBE', 'LIB', 'LB', 'LP', 'LM', 'LT'
];

// MPZ - Mezinárodní poznávací značky (cca 205)
const mpzWords = [
  'AFG', 'AL', 'DZ', 'AND', 'ANG', 'AG', 'RA', 'ARM', 'AUS', 'AZ', 'BS', 'BRN', 'BD', 'BDS', 'B', 'BH', 'BZ', 'BY', 'BHT', 'BOL', 'BIH', 'BW', 'RB', 'BR', 'BVI', 'BRU', 'BG', 'BF', 'BU', 'TCH', 'MNE', 'CZ', 'PRC', 'DK', 'CD', 'WD', 'DOM', 'DJI', 'ET', 'EC', 'ER', 'EST', 'ETH', 'FO', 'FJI', 'RP', 'FIN', 'F', 'G', 'WAG', 'GH', 'GBZ', 'WG', 'GE', 'GCA', 'GBG', 'GW', 'RGB', 'RG', 'GUY', 'RH', 'HN', 'HK', 'RCH', 'HR', 'IND', 'RI', 'IRQ', 'IR', 'IRL', 'IS', 'I', 'IL', 'JA', 'J', 'YAR', 'GBJ', 'ZA', 'ROK', 'JOR', 'K', 'CAM', 'CDN', 'CV', 'Q', 'KZ', 'EAK', 'KIR', 'CO', 'COM', 'RCB', 'CR', 'C', 'KWT', 'CY', 'KS', 'LAO', 'LS', 'RL', 'LB', 'LAR', 'FL', 'LT', 'LV', 'L', 'RM', 'H', 'NMK', 'MAL', 'MW', 'MV', 'RMM', 'M', 'MA', 'MS', 'RIM', 'MEX', 'FSM', 'MD', 'MC', 'MGL', 'MOC', 'MYA', 'NAM', 'NAU', 'D', 'NEP', 'RN', 'WAN', 'NIC', 'NL', 'N', 'NZ', 'OM', 'GBM', 'PK', 'PAL', 'PS', 'PA', 'PNG', 'PY', 'PE', 'CI', 'PL', 'P', 'A', 'RE', 'GQ', 'RO', 'RUS', 'RWA', 'GR', 'ES', 'WS', 'RSM', 'KSA', 'SN', 'DVRK', 'SY', 'SGP', 'SK', 'SLO', 'SP', 'UAE', 'GB', 'USA', 'SRB', 'CL', 'RCA', 'SUD', 'SME', 'WL', 'SCN', 'STP', 'WV', 'SD', 'SYR', 'SOL', 'E', 'S', 'CH', 'TJ', 'EAT', 'THA', 'RC', 'RT', 'TO', 'TT', 'TN', 'TR', 'TM', 'TUV', 'EAU', 'UA', 'ROU', 'UZ', 'VU', 'V', 'YV', 'VN', 'TL', 'Z', 'DARS', 'ZW'
];

// Chemické značky (118)
const chemicalElementWords = [
  'H', 'HE', 'LI', 'BE', 'B', 'C', 'N', 'O', 'F', 'NE', 'NA', 'MG', 'AL', 'SI', 'P', 'S', 'CL', 'AR', 'K', 'CA', 'SC', 'TI', 'V', 'CR', 'MN', 'FE', 'CO', 'NI', 'CU', 'ZN', 'GA', 'GE', 'AS', 'SE', 'BR', 'KR', 'RB', 'SR', 'Y', 'ZR', 'NB', 'MO', 'TC', 'RU', 'RH', 'PD', 'AG', 'CD', 'IN', 'SN', 'SB', 'TE', 'I', 'XE', 'CS', 'BA', 'LA', 'CE', 'PR', 'ND', 'PM', 'SM', 'EU', 'GD', 'TB', 'DY', 'HO', 'ER', 'TM', 'YB', 'LU', 'HF', 'TA', 'W', 'RE', 'OS', 'IR', 'PT', 'AU', 'HG', 'TL', 'PB', 'BI', 'PO', 'AT', 'RN', 'FR', 'RA', 'AC', 'TH', 'PA', 'U', 'NP', 'PU', 'AM', 'CM', 'BK', 'CF', 'ES', 'FM', 'MD', 'NO', 'LR', 'RF', 'DB', 'SG', 'BH', 'HS', 'MT', 'DS', 'RG', 'CN', 'NH', 'FL', 'MC', 'LV', 'TS', 'OG'
];

// Řecká abeceda (24)
const greekAlphabetWords = [
  'ALFA', 'BETA', 'GAMA', 'DELTA', 'EPSILON', 'ZETA', 'ETA', 'THETA', 'IOTA', 'KAPPA', 'LAMBDA', 'MI', 'NI', 'KSI', 'OMIKRON', 'PI', 'RO', 'SIGMA', 'TAU', 'YPSILON', 'FI', 'CHI', 'PSI', 'OMEGA'
];

// Celní kódy (cca 250)
const customsCodeWords = [
  'AF', 'AFG', 'AX', 'ALA', 'AL', 'ALB', 'DZ', 'DZA', 'AS', 'ASM', 'VI', 'VIR', 'AD', 'AND', 'AO', 'AGO', 'AI', 'AIA', 'AQ', 'ATA', 'AG', 'ATG', 'AR', 'ARG', 'AM', 'ARM', 'AW', 'ABW', 'AU', 'AUS', 'AZ', 'AZE', 'BS', 'BHS', 'BH', 'BHR', 'BD', 'BGD', 'BB', 'BRB', 'BE', 'BEL', 'BZ', 'BLZ', 'BY', 'BLR', 'BJ', 'BEN', 'BM', 'BMU', 'BT', 'BTN', 'BO', 'BOL', 'BQ', 'BES', 'BA', 'BIH', 'BW', 'BWA', 'BV', 'BVT', 'BR', 'BRA', 'IO', 'IOT', 'VG', 'VGB', 'BN', 'BRN', 'BG', 'BGR', 'BF', 'BFA', 'BI', 'BDI', 'CK', 'COK', 'CW', 'CUW', 'TD', 'TCD', 'ME', 'MNE', 'CZ', 'CZE', 'CN', 'CHN', 'DK', 'DNK', 'CD', 'COD', 'DM', 'DMA', 'DO', 'DOM', 'DJ', 'DJI', 'EG', 'EGY', 'EC', 'ECU', 'ER', 'ERI', 'EE', 'EST', 'ET', 'ETH', 'FO', 'FRO', 'FK', 'FLK', 'FJ', 'FJI', 'PH', 'PHL', 'FI', 'FIN', 'FR', 'FRA', 'GF', 'GUF', 'TF', 'ATF', 'PF', 'PYF', 'GA', 'GAB', 'GM', 'GMB', 'GH', 'GHA', 'GI', 'GIB', 'GD', 'GRD', 'GL', 'GRL', 'GE', 'GEO', 'GP', 'GLP', 'GU', 'GUM', 'GT', 'GTM', 'GG', 'GGY', 'GW', 'GNB', 'GN', 'GIN', 'GY', 'GUY', 'HT', 'HTI', 'HM', 'HMD', 'HN', 'HND', 'HK', 'HKG', 'CL', 'CHL', 'HR', 'HRV', 'IN', 'IND', 'ID', 'IDN', 'IQ', 'IRQ', 'IR', 'IRN', 'IE', 'IRL', 'IS', 'ISL', 'IT', 'ITA', 'IL', 'ISR', 'JM', 'JAM', 'JP', 'JPN', 'YE', 'YEM', 'JE', 'JEY', 'ZA', 'ZAF', 'GS', 'SGS', 'KR', 'KOR', 'SS', 'SSD', 'JO', 'JOR', 'KY', 'CYM', 'KH', 'KHM', 'CM', 'CMR', 'CA', 'CAN', 'CV', 'CPV', 'QA', 'QAT', 'KZ', 'KAZ', 'KE', 'KEN', 'KI', 'KIR', 'CC', 'CCK', 'CO', 'COL', 'KM', 'COM', 'CG', 'COG', 'CR', 'CRI', 'CU', 'CUB', 'KW', 'KWT', 'CY', 'CYP', 'KG', 'KGZ', 'LA', 'LAO', 'LS', 'LSO', 'LB', 'LBN', 'LR', 'LBR', 'LY', 'LBY', 'LI', 'LIE', 'LT', 'LTU', 'LV', 'LVA', 'LU', 'LUX', 'MO', 'MAC', 'MG', 'MDG', 'HU', 'HUN', 'MK', 'MKD', 'MY', 'MYS', 'MW', 'MWI', 'MV', 'MDV', 'ML', 'MLI', 'MT', 'MLT', 'MA', 'MAR', 'MH', 'MHL', 'MQ', 'MTQ', 'MU', 'MUS', 'MR', 'MRT', 'YT', 'MYT', 'UM', 'UMI', 'MX', 'MEX', 'FM', 'FSM', 'MD', 'MDA', 'MC', 'MCO', 'MN', 'MNG', 'MS', 'MSR', 'MZ', 'MOZ', 'MM', 'MMR', 'NA', 'NAM', 'NR', 'NRU', 'DE', 'DEU', 'NP', 'NPL', 'NE', 'NER', 'NG', 'NGA', 'NI', 'NIC', 'NU', 'NIU', 'NL', 'NLD', 'NF', 'NFK', 'NO', 'NOR', 'NC', 'NCL', 'NZ', 'NZL', 'OM', 'OMN', 'IM', 'IMN', 'PK', 'PAK', 'PW', 'PLW', 'PS', 'PSE', 'PA', 'PAN', 'PG', 'PNG', 'PY', 'PRY', 'PE', 'PER', 'PN', 'PCN', 'CI', 'CIV', 'PL', 'POL', 'PR', 'PRI', 'PT', 'PRT', 'AT', 'AUT', 'RE', 'REU', 'GQ', 'GNQ', 'RO', 'ROU', 'RU', 'RUS', 'RW', 'RWA', 'GR', 'GRC', 'PM', 'SPM', 'SV', 'SLV', 'WS', 'WSM', 'SM', 'SMR', 'SA', 'SAU', 'SN', 'SEN', 'KP', 'PRK', 'MP', 'MNP', 'SC', 'SYC', 'SL', 'SLE', 'SG', 'SGP', 'SK', 'SVK', 'SI', 'SVN', 'SO', 'SOM', 'AE', 'ARE', 'GB', 'GBR', 'US', 'USA', 'RS', 'SRB', 'LK', 'LKA', 'CF', 'CAF', 'SD', 'SDN', 'SR', 'SUR', 'SH', 'SHN', 'LC', 'LCA', 'BL', 'BLM', 'KN', 'KNA', 'MF', 'MAF', 'SX', 'SXM', 'ST', 'STP', 'VC', 'VCT', 'SZ', 'SWZ', 'SY', 'SYR', 'SB', 'SLB', 'ES', 'ESP', 'SJ', 'SJM', 'SE', 'SWE', 'CH', 'CHE', 'TJ', 'TJK', 'TZ', 'TZA', 'TH', 'THA', 'TW', 'TWN', 'TG', 'TGO', 'TK', 'TKL', 'TO', 'TON', 'TT', 'TTO', 'TN', 'TUN', 'TR', 'TUR', 'TM', 'TKM', 'TC', 'TCA', 'TV', 'TUV', 'UG', 'UGA', 'UA', 'UKR', 'UY', 'URY', 'UZ', 'UZB', 'CX', 'CXR', 'VU', 'VUT', 'VA', 'VAT', 'VE', 'VEN', 'VN', 'VNM', 'TL', 'TLS', 'WF', 'WLF', 'ZM', 'ZMB', 'EH', 'ESH', 'ZW', 'ZWE'
];

// Solmizační slabiky (7)
const solfegeSyllableWords = [
  'DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'UT'
];

// České lidové tance (20)
const czechFolkDanceWords = [
  'BAVORAK', 'DAJC', 'DUDAK', 'DUPAK', 'DYMAK', 'FLAMIS', 'FURIANT', 'HAJDUCH', 'HAMBALKY', 'HULAN', 'KLOUZAK', 'KOLECKO', 'KVAPIK', 'MADERA', 'MATENIK', 'MEDVED', 'MINET', 'MOTAK', 'MOTOVIDLO', 'NATRASAK'
];

// Druhy palem (8)
const palmTreeWords = [
  'AKI', 'AREKA', 'ITA', 'KALAPA', 'PASACHOL', 'RAFIE', 'RATAN', 'TALIPOT'
];


// --- COMBINE ALL CATEGORIES ---

const spzGenerated: Word[] = generateWords(spzWords, 'SPZ', 'Zkratky');
const mpzGenerated: Word[] = generateWords(mpzWords, 'MPZ', 'Zkratky');
const chemicalElementsGenerated: Word[] = generateWords(chemicalElementWords, 'Chemická značka', 'Věda');
const greekAlphabetGenerated: Word[] = generateWords(greekAlphabetWords, 'Řecké písmeno', 'Jazyky');
const customsCodesGenerated: Word[] = generateWords(customsCodeWords, 'Celní kód', 'Zkratky');
const solfegeSyllablesGenerated: Word[] = generateWords(solfegeSyllableWords, 'Solmizační slabika', 'Hudba');
const czechFolkDancesGenerated: Word[] = generateWords(czechFolkDanceWords, 'Český lidový tanec', 'Kultura');
const palmTreesGenerated: Word[] = generateWords(palmTreeWords, 'Druh palmy', 'Příroda');


export const completeDictionary: Word[] = [
  ...spzGenerated,
  ...mpzGenerated,
  ...chemicalElementsGenerated,
  ...greekAlphabetGenerated,
  ...customsCodesGenerated,
  ...solfegeSyllablesGenerated,
  ...czechFolkDancesGenerated,
  ...palmTreesGenerated,
];

// Log the total count
console.log(`📚 KOMPLETNÍ SLOVNÍK VYTVOŘEN: ${completeDictionary.length} slov z 8 hlavních kategorií.`);
