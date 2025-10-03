import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Crossword } from '@/types/crossword';

// Funkce pro správné kódování českých znaků
function encodeCzechText(text: string): string {
  return text
    .replace(/á/g, '\u00E1')
    .replace(/č/g, '\u010D')
    .replace(/ď/g, '\u010F')
    .replace(/é/g, '\u00E9')
    .replace(/ě/g, '\u011B')
    .replace(/í/g, '\u00ED')
    .replace(/ň/g, '\u0148')
    .replace(/ó/g, '\u00F3')
    .replace(/ř/g, '\u0159')
    .replace(/š/g, '\u0161')
    .replace(/ť/g, '\u0165')
    .replace(/ú/g, '\u00FA')
    .replace(/ů/g, '\u016F')
    .replace(/ý/g, '\u00FD')
    .replace(/ž/g, '\u017E')
    .replace(/Á/g, '\u00C1')
    .replace(/Č/g, '\u010C')
    .replace(/Ď/g, '\u010E')
    .replace(/É/g, '\u00C9')
    .replace(/Ě/g, '\u011A')
    .replace(/Í/g, '\u00CD')
    .replace(/Ň/g, '\u0147')
    .replace(/Ó/g, '\u00D3')
    .replace(/Ř/g, '\u0158')
    .replace(/Š/g, '\u0160')
    .replace(/Ť/g, '\u0164')
    .replace(/Ú/g, '\u00DA')
    .replace(/Ů/g, '\u016E')
    .replace(/Ý/g, '\u00DD')
    .replace(/Ž/g, '\u017D');
}

export function exportToPDF(crossword: Crossword): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  }) as jsPDF & { autoTable: typeof autoTable };

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const usableWidth = pageWidth - 2 * margin;
  
  // === STRÁNKA 1: TITULKA ===
  
  // Gradient pozadí - modrá hlavička
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Dekorativní pruhy
  doc.setFillColor(96, 165, 250);
  doc.rect(0, 50, pageWidth, 3, 'F');
  doc.setFillColor(147, 197, 253);
  doc.rect(0, 53, pageWidth, 2, 'F');
  
  // Hlavní titulek
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.text(encodeCzechText('ČESKÁ KŘÍŽOVKA'), pageWidth / 2, 30, { align: 'center' });
  
  // Podnadpis
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(encodeCzechText('Profesionální generátor křížovek'), pageWidth / 2, 40, { align: 'center' });
  
  // Informační box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, 65, usableWidth, 25, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 65, usableWidth, 25, 3, 3, 'S');
  
  // Metadata
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  
  const difficultyLabels = {
    lehka: 'Lehká',
    stredni: 'Střední',
    tezka: 'Těžká',
  };
  
  const themeLabels: Record<string, string> = {
    vsechny: 'Všechna témata',
    priroda: 'Příroda',
    sport: 'Sport',
    kultura: 'Kultura',
    veda: 'Věda',
    geografie: 'Geografie',
    historie: 'Historie',
    jidlo: 'Jídlo',
    zvirata: 'Zvířata',
    technika: 'Technika',
    hudba: 'Hudba',
    film: 'Film & TV',
    divadlo: 'Divadlo',
    umeni: 'Umění',
    literatura: 'Literatura',
    'nabozenst vi': 'Náboženství',
    politika: 'Politika',
    ekonomie: 'Ekonomie',
    medicina: 'Medicína',
    astronomie: 'Astronomie',
    doprava: 'Doprava',
    cestovani: 'Cestování',
    moda: 'Móda',
    architektura: 'Architektura',
    zahradnictvi: 'Zahradnictví',
  };
  
  const date = new Date().toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  // Formátovat témata
  const themesText = crossword.settings.themes.includes('vsechny')
    ? 'Všechna témata'
    : crossword.settings.themes.map(t => themeLabels[t] || t).join(', ');
  
  // První řádek metadat
  doc.text(encodeCzechText('📊 Obtížnost: '), margin + 5, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(encodeCzechText(difficultyLabels[crossword.settings.difficulty]), margin + 35, 75);
  
  doc.setFont('helvetica', 'bold');
  doc.text(encodeCzechText('🎨 Témata: '), margin + 70, 75);
  doc.setFont('helvetica', 'normal');
  
  // Pokud je text moc dlouhý, zkrátit nebo zabalit
  const maxThemeWidth = usableWidth - 90;
  const themeTextWidth = doc.getTextWidth(encodeCzechText(themesText));
  
  if (themeTextWidth > maxThemeWidth) {
    // Zkrátit text s "..."
    const shortened = themesText.length > 30 ? themesText.substring(0, 27) + '...' : themesText;
    doc.text(encodeCzechText(shortened), margin + 92, 75);
  } else {
    doc.text(encodeCzechText(themesText), margin + 92, 75);
  }
  
  // Druhý řádek metadat
  doc.setFont('helvetica', 'bold');
  doc.text(encodeCzechText('📐 Velikost: '), margin + 5, 83);
  doc.setFont('helvetica', 'normal');
  doc.text(`${crossword.grid.length} × ${crossword.grid.length}`, margin + 35, 83);
  
  doc.setFont('helvetica', 'bold');
  doc.text(encodeCzechText('📅 Datum: '), margin + 70, 83);
  doc.setFont('helvetica', 'normal');
  doc.text(encodeCzechText(date), margin + 90, 83);
  
  // === KŘÍŽOVKA ===
  
  const gridSize = crossword.grid.length;
  const maxCellSize = 8;
  const cellSize = Math.min((usableWidth - 10) / gridSize, maxCellSize);
  const gridWidth = cellSize * gridSize;
  const gridX = (pageWidth - gridWidth) / 2;
  let currentY = 100;
  
  // Sekce s křížovkou
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(gridX - 5, currentY - 5, gridWidth + 10, gridWidth + 10, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.roundedRect(gridX - 5, currentY - 5, gridWidth + 10, gridWidth + 10, 2, 2, 'S');
  
  // Kreslení mřížky s lepším stylingem
  doc.setLineWidth(0.3);
  doc.setDrawColor(71, 85, 105);
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = crossword.grid[y][x];
      const cellX = gridX + x * cellSize;
      const cellY = currentY + y * cellSize;
      
      if (cell.isBlack) {
        // Černá buňka
        doc.setFillColor(50, 50, 50);
        doc.rect(cellX, cellY, cellSize, cellSize, 'FD');
      } else {
        // Bílá buňka pro vyplňování
        if (cell.isTajenka) {
          // Tajenka - žlutý zvýraznění
          doc.setFillColor(255, 248, 220);
          doc.rect(cellX, cellY, cellSize, cellSize, 'FD');
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(cellX, cellY, cellSize, cellSize, 'FD');
        }
        
        // Číslo políčka v levém horním rohu
        if (cell.number) {
          doc.setTextColor(30, 64, 175);
          doc.setFontSize(Math.max(5, cellSize * 0.35));
          doc.setFont('helvetica', 'bold');
          doc.text(cell.number.toString(), cellX + 0.8, cellY + 2.2);
        }
        
        // Nápověda v pravém horním rohu
        if (cell.napoveda) {
          doc.setTextColor(22, 163, 74);
          doc.setFontSize(Math.max(4, cellSize * 0.30));
          doc.setFont('helvetica', 'bold');
          doc.text(cell.napoveda, cellX + cellSize - 2, cellY + 2);
        }
      }
    }
  }
  
  currentY += gridWidth + 20;
  
  // === OTÁZKY ===
  doc.addPage();
  
  // Hlavička otázek
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(encodeCzechText('OTÁZKY'), pageWidth / 2, 22, { align: 'center' });
  
  const horizontal = crossword.words
    .filter(w => w.direction === 'horizontal')
    .sort((a, b) => a.number - b.number);
  
  const vertical = crossword.words
    .filter(w => w.direction === 'vertical')
    .sort((a, b) => a.number - b.number);
  
  currentY = 50;
  
  // Vodorovně - levá polovina
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(margin, currentY - 5, (usableWidth / 2) - 5, 15, 2, 2, 'F');
  
  doc.setTextColor(29, 78, 216);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(encodeCzechText('→ Vodorovně'), margin + 3, currentY + 5);
  currentY += 18;
  
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const startYHorizontal = currentY;
  
  horizontal.forEach((word) => {
    if (currentY > pageHeight - margin - 15) {
      currentY = startYHorizontal;
      return;
    }
    
    const clueText = `${word.number}. ${encodeCzechText(word.clue)} (${word.length})`;
    const lines = doc.splitTextToSize(clueText, (usableWidth / 2) - 10);
    
    lines.forEach((line: string) => {
      doc.text(line, margin + 2, currentY);
      currentY += 4.5;
    });
    currentY += 1;
  });
  
  // Svisle - pravá polovina
  currentY = 50;
  const rightColumn = margin + (usableWidth / 2) + 5;
  
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(rightColumn, currentY - 5, (usableWidth / 2) - 5, 15, 2, 2, 'F');
  
  doc.setTextColor(124, 58, 237);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(encodeCzechText('↓ Svisle'), rightColumn + 3, currentY + 5);
  currentY += 18;
  
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  vertical.forEach((word) => {
    if (currentY > pageHeight - margin - 15) {
      doc.addPage();
      currentY = margin + 10;
    }
    
    const clueText = `${word.number}. ${encodeCzechText(word.clue)} (${word.length})`;
    const lines = doc.splitTextToSize(clueText, (usableWidth / 2) - 10);
    
    lines.forEach((line: string) => {
      doc.text(line, rightColumn + 2, currentY);
      currentY += 4.5;
    });
    currentY += 1;
  });
  
  // === TAJENKA ===
  if (crossword.tajenka) {
    currentY += 20;
    if (currentY > pageHeight - margin - 40) {
      doc.addPage();
      currentY = margin + 20;
    }
    
    doc.setFillColor(252, 211, 77);
    doc.roundedRect(margin, currentY, usableWidth, 30, 3, 3, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(1.5);
    doc.roundedRect(margin, currentY, usableWidth, 30, 3, 3, 'S');
    
    doc.setTextColor(146, 64, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(encodeCzechText('TAJENKA:'), pageWidth / 2, currentY + 10, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(120, 53, 15);
    doc.text(encodeCzechText(crossword.tajenka), pageWidth / 2, currentY + 22, { align: 'center' });
  }
  
  // === ŘEŠENÍ ===
  if (crossword.settings.showSolution) {
    doc.addPage();
    
    // Hlavička řešení
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(encodeCzechText('✓ ŘEŠENÍ'), pageWidth / 2, 22, { align: 'center' });
    
    currentY = 50;
    
    // Mřížka s řešením
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(gridX - 5, currentY - 5, gridWidth + 10, gridWidth + 10, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.roundedRect(gridX - 5, currentY - 5, gridWidth + 10, gridWidth + 10, 2, 2, 'S');
    
    doc.setLineWidth(0.3);
    doc.setDrawColor(71, 85, 105);
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = crossword.grid[y][x];
        const cellX = gridX + x * cellSize;
        const cellY = currentY + y * cellSize;
        
        if (cell.isBlack) {
          // Černá buňka
          doc.setFillColor(50, 50, 50);
          doc.rect(cellX, cellY, cellSize, cellSize, 'FD');
        } else {
          // Zelené pozadí pro řešení
          if (cell.isTajenka) {
            doc.setFillColor(255, 248, 220);
          } else {
            doc.setFillColor(240, 253, 244);
          }
          doc.rect(cellX, cellY, cellSize, cellSize, 'FD');
          
          // Číslo políčka v levém horním rohu
          if (cell.number) {
            doc.setTextColor(30, 64, 175);
            doc.setFontSize(Math.max(5, cellSize * 0.35));
            doc.setFont('helvetica', 'bold');
            doc.text(cell.number.toString(), cellX + 0.8, cellY + 2.2);
          }
          
          // Nápověda v pravém horním rohu
          if (cell.napoveda) {
            doc.setTextColor(22, 163, 74);
            doc.setFontSize(Math.max(4, cellSize * 0.30));
            doc.setFont('helvetica', 'bold');
            doc.text(cell.napoveda, cellX + cellSize - 2, cellY + 2);
          }
          
          // Písmeno řešení - VĚTŠÍ A TUČNĚJŠÍ
          if (cell.letter) {
            doc.setTextColor(5, 150, 105);
            doc.setFontSize(Math.max(7, cellSize * 0.65));
            doc.setFont('helvetica', 'bold');
            const letter = encodeCzechText(cell.letter);
            doc.text(
              letter,
              cellX + cellSize / 2,
              cellY + cellSize / 2 + 1.5,
              { align: 'center' }
            );
          }
        }
      }
    }
    
    // Gratulace
    currentY += gridWidth + 15;
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, currentY, usableWidth, 20, 2, 2, 'F');
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(margin, currentY, usableWidth, 20, 2, 2, 'S');
    
    doc.setTextColor(6, 95, 70);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(
      encodeCzechText('✓ Gratulujeme! Pokud jste vyluštili celou křížovku správně!'),
      pageWidth / 2,
      currentY + 12,
      { align: 'center' }
    );
  }
  
  // Patička na všech stránkách
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Čára nad patičkou
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    // Text patičky
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(
      encodeCzechText('Vygenerováno na Křižovkovník.cz'),
      margin,
      pageHeight - 10
    );
    doc.text(
      encodeCzechText(`Stránka ${i} z ${pageCount}`),
      pageWidth - margin,
      pageHeight - 10,
      { align: 'right' }
    );
  }
  
  // Uložení PDF
  const filename = `krizovka-${crossword.settings.difficulty}-${Date.now()}.pdf`;
  doc.save(filename);
}
