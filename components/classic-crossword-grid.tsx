'use client';

import { useMemo } from 'react';
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

export function ClassicCrosswordGrid({
  grid,
  clues,
  showSolution = false,
  className,
  tajenka
}: ClassicCrosswordGridProps) {
  const cellSize = 40;
  const fontSize = cellSize * 0.55;
  const numberSize = 9;

  const tajenkaRows = useMemo(() => {
    const rows: number[] = [];
    grid.forEach((row, rowIndex) => {
      if (row.some(cell => cell.isTajenka)) {
        rows.push(rowIndex);
      }
    });
    return rows;
  }, [grid]);

  const firstTajenkaRow = tajenkaRows[0] ?? null;

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <motion.div
        className="relative border-[3px] border-slate-900 bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const index = y * cols + x;
            const isTajenkaCell = cell.isTajenka;
            const isFirstTajenkaRow = firstTajenkaRow !== null && y === firstTajenkaRow;

            const cellClasses = cn(
              'relative flex items-center justify-center border transition-colors duration-150',
              cell.isBlack
                ? 'bg-slate-900 border-slate-900'
                : isTajenkaCell
                  ? 'bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 border-yellow-500 ring-2 ring-yellow-500/70 ring-offset-1 ring-offset-yellow-100 shadow-inner'
                  : 'bg-white border-slate-300'
            );

            const numberClasses = cn(
              'absolute top-0.5 left-0.5 font-bold',
              isTajenkaCell ? 'text-yellow-700' : 'text-blue-600'
            );

            const letterClasses = cn(
              'font-bold uppercase',
              isTajenkaCell ? 'text-yellow-900 tracking-wide' : 'text-slate-900'
            );

            return (
              <motion.div
                key={`${x}-${y}`}
                className={cellClasses}
                style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.001 }}
              >
                {isTajenkaCell && isFirstTajenkaRow && x === 0 && (
                  <span className="absolute -left-10 top-1/2 -translate-y-1/2 rotate-90 text-xs font-semibold tracking-[0.4em] text-yellow-700">
                    TAJENKA
                  </span>
                )}

                {!cell.isBlack && (
                  <>
                    {cell.number && (
                      <span className={numberClasses} style={{ fontSize: `${numberSize}px` }}>
                        {cell.number}
                      </span>
                    )}

                    {cell.letter && (
                      <motion.span
                        className={letterClasses}
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

      <div className="w-full max-w-4xl grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
            Vodorovně
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

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-purple-500 pb-2">
            Svisle
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

      {tajenka && (
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-bold text-slate-700 mb-1">Tajenka:</h3>
          <p className="text-2xl font-bold text-yellow-800 tracking-wider">{tajenka}</p>
        </div>
      )}
    </div>
  );
}
