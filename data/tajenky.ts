export interface TajenkaPhrase {
  segments: [string, string];
  display: string;
  clue: string;
}

export const tajenky: TajenkaPhrase[] = [
  {
    segments: ['PRAVDA', 'VITEZI'],
    display: 'PRAVDA VÍTĚZÍ',
    clue: 'Prezidentské heslo na standardě České republiky'
  },
  {
    segments: ['ZDRAVI', 'STESTI'],
    display: 'ZDRAVÍ ŠTĚSTÍ',
    clue: 'Klasické narozeninové přání'
  },
  {
    segments: ['VESELE', 'VANOCE'],
    display: 'VESELÉ VÁNOCE',
    clue: 'Pozdrav z vánočních pohlednic'
  },
  {
    segments: ['KRASNE', 'POCASI'],
    display: 'KRÁSNÉ POČASÍ',
    clue: 'Po čem touží výletníci'
  },
  {
    segments: ['JARNIM', 'KVETUM'],
    display: 'JARNÍM KVĚTŮM',
    clue: 'Přání pečlivého zahradníka'
  },
  {
    segments: ['ZIMNIM', 'SPORTUM'],
    display: 'ZIMNÍM SPORTŮM',
    clue: 'Rubrika pro lyžaře a bruslaře'
  },
  {
    segments: ['TICHEM', 'LESICH'],
    display: 'TICHÉM LESÍCH',
    clue: 'Poetický obraz z romantických básní'
  }
];
