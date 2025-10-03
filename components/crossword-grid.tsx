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
  // Swedish crosswords - smaller cells for large grid
  const cellSize = 28; // Smaller for 17x25 grid
  const fontSize = cellSize * 0.6; // ~17px for letters
  const clueSize = 5.5; // Very small clues to fit
  const numberSize = 7;
  const pomuckaSize = cellSize * 0.45;
  
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div 
        className={cn("inline-block border-[3px] border-slate-900 bg-white shadow-[0_25px_50px_-12px_rgb(30,41,59,0.45)] rounded-xl overflow-hidden", className)}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {grid.map((row, y) => 
          row.map((cell, x) => {
            const index = y * cols + x;
            return (
              <motion.div
                key={`${x}-${y}`}
                className={cn(
                  "relative border border-gray-700 flex items-start justify-start p-0.5 transition-all duration-200",
                  cell.isBlack 
                    ? "bg-purple-100" 
                    : cell.isTajenka 
                      ? "bg-blue-200 hover:bg-blue-300"
                      : "bg-white hover:bg-blue-50"
                )}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.002,
                  duration: 0.2
                }}
              >
                {/* LEGENDOVÉ POLÍČKO (fialové se zadáním) - švédský formát */}
                {cell.isBlack && (
                  (() => {
                    const horizontalClue = cell.clueTextHorizontal ?? (cell.clueDirection !== 'vertical' ? cell.clueText : undefined);
                    const verticalClue = cell.clueTextVertical ?? (cell.clueDirection !== 'horizontal' ? cell.clueText : undefined);
                    const hasClue = Boolean(horizontalClue || verticalClue);

                    if (!hasClue) {
                      // Prázdné legendové políčko
                      return null;
                    }

                    if (cell.clueDirection === 'both') {
                      return (
                        <div className="w-full h-full flex flex-col text-left leading-none gap-px p-px">
                          <div 
                            className="text-gray-900 font-medium uppercase overflow-hidden"
                            style={{ 
                              fontSize: `${clueSize}px`, 
                              lineHeight: `${clueSize + 0.5}px`,
                              maxHeight: '48%',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {horizontalClue}
                          </div>
                          <div className="h-px w-full bg-purple-300/40" />
                          <div 
                            className="text-gray-900 font-medium uppercase overflow-hidden"
                            style={{ 
                              fontSize: `${clueSize}px`, 
                              lineHeight: `${clueSize + 0.5}px`,
                              maxHeight: '48%',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {verticalClue}
                          </div>
                        </div>
                      );
                    }

                    const clueText = cell.clueDirection === 'horizontal' ? horizontalClue : verticalClue;

                    return (
                      <div className="w-full h-full flex items-center justify-center p-px">
                        <span 
                          className="text-gray-900 font-medium uppercase text-center overflow-hidden leading-tight"
                          style={{ 
                            fontSize: `${clueSize}px`, 
                            lineHeight: `${clueSize + 0.5}px`,
                            maxHeight: '100%',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            hyphens: 'auto'
                          }}
                        >
                          {clueText}
                        </span>
                      </div>
                    );
                  })()
                )}
                
                {/* BÍLÉ POLÍČKO - písmeno nebo pomůcka */}
                {!cell.isBlack && (
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Pomůcka (zelené předvyplněné písmeno) */}
                    {cell.pomucka && !showSolution && (
                      <motion.span 
                        className="font-bold text-green-600 uppercase"
                        style={{ fontSize: `${pomuckaSize}px` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.005 }}
                      >
                        {cell.pomucka}
                      </motion.span>
                    )}
                    
                    {/* Písmeno (jen při zobrazení řešení) */}
                    {showSolution && cell.letter && (
                      <motion.span 
                        className="font-bold text-gray-900 uppercase"
                        style={{ fontSize: `${fontSize}px` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.005 + 0.2 }}
                      >
                        {cell.letter}
                      </motion.span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </motion.div>
      
      {/* Tajenka - vždy zobrazit v puzzle módu prázdná políčka, v solution módu slovo */}
      {tajenka && (
        <motion.div 
          className={cn(
            "px-6 py-3 rounded-lg shadow-lg mt-4",
            showSolution 
              ? "bg-gradient-to-r from-green-500 to-green-600" 
              : "bg-gradient-to-r from-blue-500 to-blue-600"
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className={cn(
            "text-xs font-semibold mb-1",
            showSolution ? "text-green-100" : "text-blue-100"
          )}>
            TAJENKA:
          </p>
          {showSolution ? (
            <p className="text-2xl font-bold text-white tracking-wider">{tajenka}</p>
          ) : (
            <p className="text-sm text-white">
              {/* Prázdná políčka pro vyluštění tajenky */}
              {tajenka.split('').map((_, i) => (
                <span key={i} className="inline-block w-6 h-6 border-2 border-white mx-0.5 rounded"></span>
              ))}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
