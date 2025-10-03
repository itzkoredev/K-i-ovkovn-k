'use client';

import { motion } from 'framer-motion';
import type { PlacedWord } from '@/types/crossword';

interface CrosswordCluesListProps {
  words: PlacedWord[];
}

export function CrosswordCluesList({ words }: CrosswordCluesListProps) {
  const horizontal = words
    .filter(w => w.direction === 'horizontal')
    .sort((a, b) => a.number - b.number);
  
  const vertical = words
    .filter(w => w.direction === 'vertical')
    .sort((a, b) => a.number - b.number);

  return (
    <motion.div 
      className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Vodorovně */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">→</span>
          Vodorovně
        </h3>
        <div className="space-y-2">
          {horizontal.map((word) => (
            <motion.div
              key={word.number}
              className="text-sm text-gray-700 hover:text-blue-700 transition-colors"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + word.number * 0.02 }}
            >
              <span className="font-bold text-blue-600">{word.number}.</span>{' '}
              <span>{word.clue}</span>{' '}
              <span className="text-gray-500">({word.length})</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Svisle */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">↓</span>
          Svisle
        </h3>
        <div className="space-y-2">
          {vertical.map((word) => (
            <motion.div
              key={word.number}
              className="text-sm text-gray-700 hover:text-purple-700 transition-colors"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + word.number * 0.02 }}
            >
              <span className="font-bold text-purple-600">{word.number}.</span>{' '}
              <span>{word.clue}</span>{' '}
              <span className="text-gray-500">({word.length})</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
