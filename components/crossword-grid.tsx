'use client';

import { motion } from 'framer-motion';
import type { GridCell } from '@/types/crossword';
import { cn } from '@/lib/utils';

interface CrosswordGridProps {
  grid: GridCell[][];
  showSolution?: boolean;
  className?: string;
  tajenka?: string;
}

export function CrosswordGrid({ grid, showSolution = false, className, tajenka }: CrosswordGridProps) {
  // Větší políčka pro lepší čitelnost
  const cellSize = Math.min(650 / grid.length, 50);
  const fontSize = cellSize * 0.5;
  const numberSize = cellSize * 0.22;
  const hintSize = cellSize * 0.20;
  
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div 
        className={cn("inline-block border-3 border-gray-900 bg-white shadow-2xl rounded-sm overflow-hidden", className)}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {grid.map((row, y) => 
          row.map((cell, x) => {
            const index = y * grid.length + x;
            return (
              <motion.div
                key={`${x}-${y}`}
                className={cn(
                  "relative border border-gray-500 flex items-center justify-center transition-all duration-200",
                  cell.isBlack 
                    ? "bg-gray-900" 
                    : cell.isTajenka 
                      ? "bg-amber-100 hover:bg-amber-200 ring-2 ring-amber-400" 
                      : "bg-white hover:bg-blue-50"
                )}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.003,
                  duration: 0.2
                }}
              >
                {!cell.isBlack && (
                  <>
                    {/* Číslo otázky v levém horním rohu */}
                    {cell.number && (
                      <span 
                        className="absolute top-0.5 left-0.5 font-semibold text-blue-700 leading-none"
                        style={{ fontSize: `${numberSize}px` }}
                      >
                        {cell.number}
                      </span>
                    )}
                    
                    {/* Nápověda v pravém horním rohu */}
                    {cell.napoveda && !showSolution && (
                      <span 
                        className="absolute top-0.5 right-0.5 font-bold text-green-600 leading-none"
                        style={{ fontSize: `${hintSize}px` }}
                        title="Nápověda"
                      >
                        {cell.napoveda}
                      </span>
                    )}
                    
                    {/* Písmeno (jen při zobrazení řešení) */}
                    {showSolution && cell.letter && (
                      <motion.span 
                        className="font-bold text-gray-900"
                        style={{ fontSize: `${fontSize}px` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.005 + 0.2 }}
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
      
      {/* Tajenka */}
      {tajenka && (
        <motion.div 
          className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 rounded-lg shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs font-semibold text-amber-900 mb-1">TAJENKA:</p>
          <p className="text-2xl font-bold text-white tracking-wider">{tajenka}</p>
        </motion.div>
      )}
    </div>
  );
}
