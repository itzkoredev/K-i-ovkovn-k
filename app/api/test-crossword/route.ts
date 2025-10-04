import { NextResponse } from 'next/server';
import { generateClassicCrossword } from '@/lib/crossword-generator-new';

export async function GET() {
  try {
    console.log('\n🧪 TEST ENDPOINT - Generuji KLASICKOU křížovku...\n');
    
    const crossword = generateClassicCrossword({
      gridSize: 15,
      wordCount: 50,
      difficulty: 'lehka',
      themes: ['vsechny'],
      showSolution: false,
    });

    // Count cells
    let blackCells = 0;
    let whiteCells = 0;
    let tajenkaCells = 0;
    let cellsWithClues = 0;

    for (const row of crossword.grid) {
      for (const cell of row) {
        if (cell.isBlack) {
          blackCells++;
          if (cell.clueText || cell.clueTextHorizontal || cell.clueTextVertical) {
            cellsWithClues++;
          }
        } else if (cell.letter !== '') {
          whiteCells++;
          if (cell.isTajenka) {
            tajenkaCells++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        gridSize: `${crossword.grid.length}x${crossword.grid[0].length}`,
        wordsPlaced: crossword.words.length,
        blackCells,
        cellsWithClues,
        whiteCells,
        tajenkaCells,
        tajenka: crossword.tajenka,
      },
      words: crossword.words.map(w => ({
        word: w.word,
        clue: w.clue.substring(0, 30) + '...',
        direction: w.direction,
        position: `[${w.startX}, ${w.startY}]`,
      })),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
