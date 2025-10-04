'use client';

import { motion } from 'framer-motion';
import type { GridCell, PlacedWord } from '@/types/crossword';
import { cn } from '@/lib/utils';

interface ClassicCrosswordGridProps {
  grid: GridCell[][];
  clues: PlacedWord[];
  showSolution?: boolean;
  className?: string;
  tajenka?: string;
}

/**
 * KLASICKÝ FORMÁT KŘÍŽOVKY - přesně jako v novinách (iDNES)
 * 
 * Struktura:
 * - Grid s písmeny, černými poli a ŽLUTÝMI tajenkovými řádky
 * - Čísla v levém horním rohu bílých buněk
 * - Zadání UVNITŘ černých polí (ne v levém panelu!)
 * - 2 ŽLUTÉ horizontální řady jako tajenka
 */
export function ClassicCrosswordGrid({ 
  grid, 
  clues, 
  showSolution = false, 
  className, 
  tajenka 
}: ClassicCrosswordGridProps) {
  const cellSize = 40; // Větší buňky pro čísla + text
  const fontSize = cellSize * 0.55; // ~22px pro písmena
  const numberSize = 9; // Čísla v levém horním rohu
  const clueTextSize = 5.5; // Text v černých polích
  
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      {/* HLAVNÍ GRID */}
      <motion.div 
        className="border-[3px] border-slate-900 bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {grid.map((row, y) => 
          row.map((cell, x) => {
            const index = y * cols + x;
            
            return (
              <motion.div
                key={`${x}-${y}`}
                className={cn(
                  "relative border border-slate-400 flex items-center justify-center",
                  cell.isBlack 
                    ? "bg-slate-900"
                    : cell.isTajenka 
                      ? "bg-yellow-300"
                      : "bg-white"
                )}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.001 }}
              >
                {!cell.isBlack && (
                  <>
                    {cell.number && (
                      <span 
                        className="absolute top-0.5 left-0.5 font-bold text-blue-600"
                        style={{ fontSize: `${numberSize}px` }}
                      >
                        {cell.number}
                      </span>
                    )}

                    {cell.letter && (
                      <motion.span 
                        className="font-bold text-slate-900 uppercase"
                        style={{ fontSize: `${fontSize}px` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.003 }}
                      >
                        {cell.letter}
                      </motion.span>
                    )}
                  </>
                )}
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* ZADÁNÍ - pod gridem */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-6">
        {/* VODOROVNĚ */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
            📍 Vodorovně
          </h3>
          <div className="space-y-2">
            {clues
              .filter(w => w.direction === 'horizontal')
              .sort((a, b) => a.number - b.number)
              .map(word => (
                <div key={word.number} className="text-sm">
                  <span className="font-bold text-blue-600">{word.number}.</span>{' '}
                  <span className="text-slate-700">{word.clue}</span>
                  {showSolution && (
                    <span className="ml-2 font-mono text-green-600">({word.word})</span>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* SVISLE */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-purple-500 pb-2">
            ⬇️ Svisle
          </h3>
          <div className="space-y-2">
            {clues
              .filter(w => w.direction === 'vertical')
              .sort((a, b) => a.number - b.number)
              .map(word => (
                <div key={word.number} className="text-sm">
                  <span className="font-bold text-purple-600">{word.number}.</span>{' '}
                  <span className="text-slate-700">{word.clue}</span>
                  {showSolution && (
                    <span className="ml-2 font-mono text-green-600">({word.word})</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* TAJENKA */}
      {tajenka && (
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-bold text-slate-700 mb-1">🎯 Tajenka:</h3>
          <p className="text-2xl font-bold text-yellow-800 tracking-wider">{tajenka}</p>
        </div>
      )}
    </div>
  );
}
