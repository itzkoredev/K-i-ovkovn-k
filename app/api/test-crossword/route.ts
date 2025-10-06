import { NextResponse } from 'next/server';
import { generateClassicCrossword } from '@/lib';

export async function GET() {
  try {
    console.log('\n🧪 TEST ENDPOINT - generuji křížovku...\n');

    const crossword = generateClassicCrossword({
      gridSize: 13,
      wordCount: 50,
      difficulty: 'lehka',
      themes: ['vsechny'],
      showSolution: false,
    });

    let blackCells = 0;
    let whiteCells = 0;
    let tajenkaCells = 0;

    for (const row of crossword.grid) {
      for (const cell of row) {
        if (cell.isBlack) {
          blackCells++;
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
        whiteCells,
        tajenkaCells,
        tajenka: crossword.tajenka,
      },
      words: crossword.words.map(w => ({
        word: w.word,
        clue: w.clue,
        direction: w.direction,
        position: `[${w.startX}, ${w.startY}]`,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
