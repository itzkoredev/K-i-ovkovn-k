'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Crossword, CrosswordSettings } from '@/types/crossword';
import { generateCrossword } from '@/lib';
import { exportToPDF } from '@/lib/pdf-export';
import { SettingsForm } from '@/components/settings-form';
import { ClassicCrosswordGrid } from '@/components/classic-crossword-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw, Sparkles, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [crossword, setCrossword] = useState<Crossword | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (settings: CrosswordSettings) => {
    try {
      setIsGenerating(true);
      setTimeout(() => {
        console.log('🚀 Začínám generovat křížovku s nastavením:', settings);
        const newCrossword = generateCrossword(settings);
        console.log('✅ Křížovka vygenerována:', newCrossword);
        setCrossword(newCrossword);
        setIsGenerating(false);
      }, 100);
    } catch (error) {
      console.error('❌ Chyba při generování křížovky:', error);
      setIsGenerating(false);
    }
  };

  const handleExportPDF = () => {
    if (crossword) {
      exportToPDF(crossword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.header
        className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-2 shadow-md"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Křížovkovník
              </h1>
              <p className="text-sm text-muted-foreground">
                Generátor klasických českých křížovek
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SettingsForm onGenerate={handleGenerate} isGenerating={isGenerating} />

            <AnimatePresence>
              {crossword && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Export</CardTitle>
                      <CardDescription>
                        Stáhněte si křížovku ve formátu PDF
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={handleExportPDF}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Stáhnout PDF (A4)
                      </Button>

                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={() => handleGenerate(crossword.settings)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Vygenerovat novou
                      </Button>

                      <div className="pt-3 border-t text-xs text-muted-foreground space-y-1">
                        <p>🔢 Počet slov: {crossword.words.length}</p>
                        <p>📐 Velikost: {crossword.grid.length} × {crossword.grid.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-[400px] flex items-center justify-center">
                    <CardContent className="text-center space-y-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="h-12 w-12 text-primary mx-auto" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Generuji křížovku...
                        </h3>
                        <p className="text-muted-foreground">
                          Chvilku strpení, tvořím pro vás dokonalou křížovku ✨
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        {[0, 1, 2].map(index => (
                          <motion.div
                            key={index}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : crossword ? (
                <motion.div
                  key="crossword-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Křížovka</CardTitle>
                        <CardDescription>
                          Klasická křížovka – legendy jsou vypsané mimo mřížku
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center overflow-x-auto">
                        <ClassicCrosswordGrid
                          grid={crossword.grid}
                          clues={crossword.words}
                          showSolution={false}
                          tajenka={crossword.tajenka}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {crossword.settings.showSolution && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Řešení</CardTitle>
                          <CardDescription>
                            Toto bude také součástí PDF exportu
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center overflow-x-auto">
                          <ClassicCrosswordGrid
                            grid={crossword.grid}
                            clues={crossword.words}
                            showSolution
                            tajenka={crossword.tajenka}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-[400px] flex items-center justify-center">
                    <CardContent className="text-center space-y-4">
                      <motion.div
                        className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles className="h-8 w-8 text-muted-foreground" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Vítejte v Křížovkovníku!
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Nastavte obtížnost, témata a další parametry vlevo a klikněte na tlačítko pro
                          vygenerování vlastní české křížovky.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Křížovkovník © 2025 | Generátor klasických českých křížovek s exportem do PDF</p>
        </div>
      </footer>
    </div>
  );
}
