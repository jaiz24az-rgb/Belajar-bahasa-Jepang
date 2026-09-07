import React, { useState, useMemo } from 'react';
import { Search, Volume2, Bookmark, BookmarkCheck, Copy, Check, Sparkles, MessageCircle, AlertTriangle, Hash, Flame, Smartphone } from 'lucide-react';
import { DictionarySlangEntry } from '../../types';
import { DICTIONARY_SLANG_DATA } from '../../data/dictionarySlangData';
import { audioService } from '../../services/audioService';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function SlangDictionaryView({ searchQuery, onSearchChange, favorites, onToggleFavorite }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'Semua Kategori Slang' },
    { id: 'internet_sns', label: '🌐 Internet & SNS (ネット用語)' },
    { id: 'wakamono_youth', label: '🕶️ Remaja & Gaul (若者言葉)' },
    { id: 'otaku_anime', label: '✨ Otaku & Anime (推し活)' },
    { id: 'buzzword_ryuukou', label: '🔥 Viral & Tren (流行語)' },
    { id: 'abbreviation', label: '⚡ Singkatan Gaul (略語)' },
  ];

  const filteredSlang = useMemo(() => {
    return DICTIONARY_SLANG_DATA.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchTerm = item.term.toLowerCase().includes(q) || item.furigana.toLowerCase().includes(q);
      const matchRomaji = item.romaji.toLowerCase().includes(q);
      const matchId = item.meaningId.toLowerCase().includes(q) || item.meaningDetail.toLowerCase().includes(q);
      const matchOrigin = item.originExplanation.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));

      return matchTerm || matchRomaji || matchId || matchOrigin || matchTags;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioService.playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayAudio = (text: string) => {
    audioService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Toolbar */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#BC002D]" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
              Kategori Bahasa Gaul & Slang Terkini:
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            Era Reiwa (2024-2026) & Internet
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                audioService.playSound('click');
              }}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition ${
                selectedCategory === c.id
                  ? 'bg-[#BC002D] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
        <span>Menampilkan {filteredSlang.length} kata slang & bahasa gaul</span>
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="text-[#BC002D] hover:underline">
            Hapus Pencarian
          </button>
        )}
      </div>

      {/* Slang Cards Grid */}
      {filteredSlang.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Kata Slang Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Coba cari kata populer seperti "kusa", "oshi", "numa", "emoi", "gachi", "wanchan", atau "wkwk".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredSlang.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#BC002D]/40 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                        {item.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {item.formalityLevel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400">
                        {item.eraOrYear}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className="p-1.5 text-gray-400 hover:text-amber-500 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title="Simpan ke Favorit"
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(`${item.term} (${item.romaji}): ${item.meaningId}`, item.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title="Salin Kata Slang"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Japanese Slang Headword */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-xs text-gray-400 font-japanese">{item.furigana}</div>
                      <h3 className="text-2xl font-bold font-japanese text-gray-900 dark:text-white tracking-wide">
                        {item.term}
                      </h3>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {item.romaji}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(item.term)}
                      className="p-2.5 rounded-2xl bg-[#BC002D]/10 hover:bg-[#BC002D]/20 text-[#BC002D] transition shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Definition Box */}
                  <div className="bg-gray-50 dark:bg-neutral-900/60 p-4 rounded-2xl space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#BC002D]">
                        🔥 Arti Gaul / Padanan:
                      </span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                        {item.meaningId}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-1.5 border-t border-gray-200/60 dark:border-white/5">
                      {item.meaningDetail}
                    </p>
                  </div>

                  {/* Origin & Etymology */}
                  <div className="mt-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/50 dark:border-blue-900/30 text-xs text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-blue-800 dark:text-blue-400">🔍 Asal Mula & Etimologi: </span>
                    {item.originExplanation}
                  </div>

                  {/* Simulated LINE/SNS Chat Dialogue */}
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      Contoh Obrolan Chat / LINE ({item.sampleDialogue.context}):
                    </div>

                    <div className="space-y-2 bg-[#F2F4F7] dark:bg-[#161616] p-3.5 rounded-2xl">
                      {/* Line A */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.sampleDialogue.lineA.speaker[0]}
                        </div>
                        <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-2xl rounded-tl-none border border-gray-200/60 dark:border-white/5 text-xs max-w-[85%]">
                          <div className="font-japanese font-medium text-gray-900 dark:text-gray-200">
                            {item.sampleDialogue.lineA.text}
                          </div>
                          <div className="text-[10px] text-gray-400 font-sans mt-0.5">
                            {item.sampleDialogue.lineA.romaji}
                          </div>
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                            ➔ {item.sampleDialogue.lineA.translationId}
                          </div>
                        </div>
                      </div>

                      {/* Line B */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-2xl rounded-tr-none border border-emerald-200/50 dark:border-emerald-900/30 text-xs max-w-[85%]">
                          <div className="font-japanese font-bold text-gray-900 dark:text-gray-100">
                            {item.sampleDialogue.lineB.text}
                          </div>
                          <div className="text-[10px] text-gray-400 font-sans mt-0.5">
                            {item.sampleDialogue.lineB.romaji}
                          </div>
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-0.5">
                            ➔ {item.sampleDialogue.lineB.translationId}
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.sampleDialogue.lineB.speaker[0]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
