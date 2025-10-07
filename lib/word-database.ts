/**
 * Databáze slov s podporou MEGA DATABÁZE + GENERÁTORU pro bohatší slovník.
 */

import type { Word } from '@/types/crossword';
import { czechWords } from '@/data/czech-words';
import { megaDatabaze } from '@/data/mega-database';
import { megaWordsExpansion } from '@/data/mega-generator';

export class WordDatabase {
  private coreWords: Word[] = [];
  private wordsByLength: Map<number, Word[]> = new Map();

  constructor() {
    // 🚀 KOMBINUJ: základní + mega databázi + generované slova
    this.coreWords = [
      ...czechWords,
      ...megaDatabaze,
      ...megaWordsExpansion // NOVÉ! Tisíce vygenerovaných slov
    ];
    
    // Odstraň duplicity
    const uniqueWords = new Map<string, Word>();
    for (const word of this.coreWords) {
      const key = word.word.toUpperCase();
      if (!uniqueWords.has(key)) {
        uniqueWords.set(key, word);
      }
    }
    this.coreWords = Array.from(uniqueWords.values());
    
    // Indexuj podle délky
    for (const word of this.coreWords) {
      const len = word.word.length;
      if (!this.wordsByLength.has(len)) {
        this.wordsByLength.set(len, []);
      }
      this.wordsByLength.get(len)!.push(word);
    }

    console.log(`📚 WordDatabase inicializována: ${this.coreWords.length} slov celkem`);
    console.log(`   - Základní slova: ${czechWords.length}`);
    console.log(`   - Mega databáze: ${megaDatabaze.length}`);
    console.log(`   - Generované slova: ${megaWordsExpansion.length}`);
  }

  getWordsByLength(length: number): Word[] {
    return this.wordsByLength.get(length) ?? [];
  }

  getRandomWords(count: number): Word[] {
    const shuffled = [...this.coreWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  getAllWords(): Word[] {
    return this.coreWords;
  }

  getStats() {
    return {
      coreWords: this.coreWords.length,
      lengths: Array.from(this.wordsByLength.entries()).map(([len, words]) => ({ length: len, count: words.length }))
    };
  }
}

let dbInstance: WordDatabase | null = null;

export function getWordDatabase(): WordDatabase {
  if (!dbInstance) {
    dbInstance = new WordDatabase();
  }
  return dbInstance;
}
