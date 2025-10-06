/**
 * Jednoduchá databáze slov – pracuje pouze s pečlivě ošetřeným core seznamem.
 */

import type { Word } from '@/types/crossword';
import { czechWords } from '@/data/czech-words';

export class WordDatabase {
  private coreWords: Word[] = czechWords;
  private wordsByLength: Map<number, Word[]> = new Map();

  constructor() {
    for (const word of this.coreWords) {
      const len = word.word.length;
      if (!this.wordsByLength.has(len)) {
        this.wordsByLength.set(len, []);
      }
      this.wordsByLength.get(len)!.push(word);
    }

    console.log(`📚 WordDatabase inicializována: ${this.coreWords.length} slov v jádru`);
  }

  getWordsByLength(length: number): Word[] {
    return this.wordsByLength.get(length) ?? [];
  }

  getRandomWords(count: number): Word[] {
    const shuffled = [...this.coreWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
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
