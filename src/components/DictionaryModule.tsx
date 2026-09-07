import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Layers, Compass, Flame, Bookmark, Sparkles, X, Volume2, History, Trash2, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { UserProgress, DictTab, DictFavoritesState } from '../types';
import { VocabDictionaryView } from './dictionary/VocabDictionaryView';
import { KanjiDictionaryView } from './dictionary/KanjiDictionaryView';
import { SynAntDictionaryView } from './dictionary/SynAntDictionaryView';
import { IdiomDictionaryView } from './dictionary/IdiomDictionaryView';
import { SlangDictionaryView } from './dictionary/SlangDictionaryView';
import { FavoritesDictionaryView } from './dictionary/FavoritesDictionaryView';
import { DictionaryService } from '../services/dictionaryService';
import { audioService } from '../services/audioService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
  onNavigateToKanjiCanvas?: (kanjiChar: string) => void;
}

export function DictionaryModule({ progress, onUpdateProgress, onNavigateToKanjiCanvas }: Props) {
  const [activeTab, setActiveTab] = useState<DictTab>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<DictFavoritesState>(() => DictionaryService.getFavorites());
  const [searchHistory, setSearchHistory] = useState<string[]>(() => DictionaryService.getSearchHistory());
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);

  const handleToggleFavorite = (category: 'vocab' | 'kanji' | 'synAnt' | 'idioms' | 'slang', id: string) => {
    const updated = DictionaryService.toggleFavorite(category, id);
    setFavorites({ ...updated });
    audioService.playSound('click');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      DictionaryService.addSearchHistory(searchQuery);
      setSearchHistory(DictionaryService.getSearchHistory());
    }
    setShowHistoryDropdown(false);
  };

  const handleSelectHistory = (query: string) => {
    setSearchQuery(query);
    setShowHistoryDropdown(false);
    audioService.playSound('click');
  };

  const handleClearHistory = () => {
    DictionaryService.clearSearchHistory();
    setSearchHistory([]);
    audioService.playSound('click');
  };

  const subTabs = [
    { id: 'vocab', label: 'Kamus Kosakata (ID ⇄ JA)', ja: '日イ・イ日単語', icon: BookOpen, count: '100+' },
    { id: 'kanji', label: 'Kamus Kanji Lengkap', ja: '漢字大辞典', icon: Layers, count: 'N5-N1' },
    { id: 'synonyms', label: 'Sinonim & Antonim', ja: '類語・対義語', icon: ArrowLeftRight, count: 'N5-N1' },
    { id: 'idioms', label: 'Idiom & Yojijukugo', ja: '慣用句・四字熟語', icon: Compass, count: 'Kanyouku' },
    { id: 'slang', label: 'Slang & Bahasa Gaul', ja: '若者言葉・流行語', icon: Flame, count: 'Reiwa 2026' },
    { id: 'favorites', label: 'Favorit Tersimpan', ja: 'ブックマーク', icon: Bookmark, count: Object.values(favorites).flat().length },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] dark:from-[#181818] dark:to-[#222222] rounded-3xl p-6 sm:p-8 text-white border border-gray-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BC002D]/20 text-[#FF4D6D] border border-[#BC002D]/40 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kamus Jepang Super Lengkap (日本語大辞典)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Kamus Kosakata, Kanji, Idiom & Bahasa Terkini
          </h1>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            Pencarian cerdas dua arah Indonesia ⇄ Jepang, kamus kanji lengkap dengan radikal dan kata majemuk (熟語), idiom peribahasa 4 karakter (四字熟語), serta bahasa gaul anak muda & internet slang terkini.
          </p>

          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative mt-6 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowHistoryDropdown(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik kata dalam Bahasa Indonesia, Kanji, Hiragana, atau Romaji..."
                className="w-full pl-12 pr-28 py-3.5 bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl text-sm font-medium border-2 border-transparent focus:border-[#BC002D] focus:outline-none shadow-lg placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-14 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-3.5 py-2 bg-[#BC002D] hover:bg-[#A00026] text-white text-xs font-bold rounded-xl transition"
              >
                Cari
              </button>
            </div>

            {/* History Dropdown */}
            {showHistoryDropdown && searchHistory.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-3 z-30 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 px-2 py-1">
                  <span className="flex items-center gap-1">
                    <History className="w-3 h-3" /> Riwayat Pencarian Terakhir
                  </span>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Bersihkan
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {searchHistory.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectHistory(q)}
                      className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-[#BC002D]/10 hover:text-[#BC002D] rounded-xl transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Decorative Watermark Kanji */}
        <div className="absolute -right-6 -bottom-8 text-9xl font-japanese font-black text-white/5 select-none pointer-events-none">
          辞書
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200 dark:border-white/10">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playSound('click');
                setActiveTab(tab.id as DictTab);
              }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? 'bg-[#BC002D] text-white shadow-md shadow-[#BC002D]/20 scale-[1.01]'
                  : 'bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#BC002D]'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === 'vocab' && (
          <VocabDictionaryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favorites={favorites.vocab}
            onToggleFavorite={(id) => handleToggleFavorite('vocab', id)}
          />
        )}

        {activeTab === 'kanji' && (
          <KanjiDictionaryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favorites={favorites.kanji}
            onToggleFavorite={(id) => handleToggleFavorite('kanji', id)}
            onOpenCanvas={onNavigateToKanjiCanvas}
          />
        )}

        {activeTab === 'synonyms' && (
          <SynAntDictionaryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favorites={favorites.synAnt || []}
            onToggleFavorite={(id) => handleToggleFavorite('synAnt', id)}
          />
        )}

        {activeTab === 'idioms' && (
          <IdiomDictionaryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favorites={favorites.idioms}
            onToggleFavorite={(id) => handleToggleFavorite('idioms', id)}
          />
        )}

        {activeTab === 'slang' && (
          <SlangDictionaryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favorites={favorites.slang}
            onToggleFavorite={(id) => handleToggleFavorite('slang', id)}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesDictionaryView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}
