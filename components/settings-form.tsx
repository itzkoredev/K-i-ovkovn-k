'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { CrosswordSettings, Difficulty, Theme } from '@/types/crossword';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X } from 'lucide-react';

interface SettingsFormProps {
  onGenerate: (settings: CrosswordSettings) => void;
  isGenerating?: boolean;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'lehka', label: 'Lehká' },
  { value: 'stredni', label: 'Střední' },
  { value: 'tezka', label: 'Těžká' },
];

const themes: { value: Theme; label: string; emoji: string }[] = [
  { value: 'vsechny', label: 'Všechna témata', emoji: '🎯' },
  { value: 'priroda', label: 'Příroda', emoji: '🌿' },
  { value: 'sport', label: 'Sport', emoji: '⚽' },
  { value: 'kultura', label: 'Kultura', emoji: '🎭' },
  { value: 'veda', label: 'Věda', emoji: '🔬' },
  { value: 'geografie', label: 'Geografie', emoji: '🗺️' },
  { value: 'historie', label: 'Historie', emoji: '📜' },
  { value: 'jidlo', label: 'Jídlo', emoji: '🍽️' },
  { value: 'zvirata', label: 'Zvířata', emoji: '🐾' },
  { value: 'technika', label: 'Technika', emoji: '💻' },
  { value: 'hudba', label: 'Hudba', emoji: '🎵' },
  { value: 'film', label: 'Film & TV', emoji: '🎬' },
  { value: 'divadlo', label: 'Divadlo', emoji: '🎪' },
  { value: 'umeni', label: 'Umění', emoji: '🎨' },
  { value: 'literatura', label: 'Literatura', emoji: '📚' },
  { value: 'nabozenst vi', label: 'Náboženství', emoji: '⛪' },
  { value: 'politika', label: 'Politika', emoji: '🏛️' },
  { value: 'ekonomie', label: 'Ekonomie', emoji: '💰' },
  { value: 'medicina', label: 'Medicína', emoji: '⚕️' },
  { value: 'astronomie', label: 'Astronomie', emoji: '🌟' },
  { value: 'doprava', label: 'Doprava', emoji: '🚗' },
  { value: 'cestovani', label: 'Cestování', emoji: '✈️' },
  { value: 'moda', label: 'Móda', emoji: '👗' },
  { value: 'architektura', label: 'Architektura', emoji: '🏗️' },
  { value: 'zahradnictvi', label: 'Zahradnictví', emoji: '🌺' },
];

export function SettingsForm({ onGenerate, isGenerating = false }: SettingsFormProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('lehka');
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>(['vsechny']);
  const [showSolution, setShowSolution] = useState(false);

  const MAX_THEMES = 5;

  const handleThemeToggle = (themeValue: Theme) => {
    if (themeValue === 'vsechny') {
      // Pokud vybere "Všechna témata", vymaže ostatní
      setSelectedThemes(['vsechny']);
    } else {
      setSelectedThemes(prev => {
        // Odebrat "Všechna témata" pokud bylo vybráno
        const withoutAll = prev.filter(t => t !== 'vsechny');
        
        if (withoutAll.includes(themeValue)) {
          // Odebrat téma
          const newThemes = withoutAll.filter(t => t !== themeValue);
          // Pokud je prázdné, vrátit "Všechna témata"
          return newThemes.length === 0 ? ['vsechny'] : newThemes;
        } else {
          // Přidat téma (pokud není limit)
          if (withoutAll.length >= MAX_THEMES) {
            return prev; // Už je 5 témat
          }
          return [...withoutAll, themeValue];
        }
      });
    }
  };

  const removeTheme = (themeValue: Theme) => {
    setSelectedThemes(prev => {
      const filtered = prev.filter(t => t !== themeValue);
      return filtered.length === 0 ? ['vsechny'] : filtered;
    });
  };

  const clearAllThemes = () => {
    setSelectedThemes(['vsechny']);
  };

  const handleGenerate = () => {
    const settings: CrosswordSettings = {
      difficulty,
      themes: selectedThemes,
      showSolution,
    };
    onGenerate(settings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nastavení křížovky</CardTitle>
        <CardDescription>
          Vyberte parametry pro pevnou švédskou šablonu s tajenkou
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900 shadow-sm">
          <p className="font-medium">Švédská šablona 10 × 10</p>
          <p>
            Mřížka odpovídá referenčnímu švédskému vzoru: zadání jsou v žlutých políčkách,
            tajenka probíhá ve dvou sloupcích a počet slov je daný šablonou.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Obtížnost</Label>
          <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
            <SelectTrigger id="difficulty">
              <SelectValue placeholder="Vyberte obtížnost" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(d => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Témata křížovky</Label>
            <span className="text-xs text-muted-foreground">
              {selectedThemes[0] === 'vsechny' 
                ? 'Všechna témata' 
                : `${selectedThemes.length}/${MAX_THEMES}`}
            </span>
          </div>
          
          {/* Vybraná témata jako badges */}
          {selectedThemes[0] !== 'vsechny' && selectedThemes.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              {selectedThemes.map(themeValue => {
                const themeData = themes.find(t => t.value === themeValue);
                return themeData ? (
                  <Badge
                    key={themeValue}
                    variant="theme"
                    onRemove={() => removeTheme(themeValue)}
                    className="text-sm py-1 px-3"
                  >
                    <span className="mr-1">{themeData.emoji}</span>
                    {themeData.label}
                  </Badge>
                ) : null;
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllThemes}
                className="h-6 px-2 text-xs hover:bg-red-100"
              >
                <X className="h-3 w-3 mr-1" />
                Smazat vše
              </Button>
            </div>
          )}

          {/* Dropdown pro výběr témat */}
          <div className="border rounded-lg p-3 bg-white max-h-[250px] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {themes.map(t => {
                const isSelected = selectedThemes.includes(t.value);
                const isDisabled = !isSelected && 
                                   selectedThemes[0] !== 'vsechny' && 
                                   selectedThemes.length >= MAX_THEMES;
                
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => !isDisabled && handleThemeToggle(t.value)}
                    disabled={isDisabled}
                    className={`
                      flex items-center gap-3 p-2 rounded-md text-sm transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400 font-semibold' 
                        : 'hover:bg-gray-50 border-2 border-transparent'
                      }
                      ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-600' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xl">{t.emoji}</span>
                    <span className="flex-1 text-left">{t.label}</span>
                    {t.value === 'vsechny' && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Mix
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {selectedThemes[0] !== 'vsechny' && selectedThemes.length >= MAX_THEMES && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <span>⚠️</span>
              Dosažen limit {MAX_THEMES} témat. Odeberte téma pro přidání nového.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="showSolution">Zobrazit řešení</Label>
            <p className="text-sm text-muted-foreground">
              Zahrnout vyplněnou křížovku v PDF
            </p>
          </div>
          <Switch
            id="showSolution"
            checked={showSolution}
            onCheckedChange={setShowSolution}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md" 
            size="lg" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generuji...' : 'Vygenerovat křížovku'}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
