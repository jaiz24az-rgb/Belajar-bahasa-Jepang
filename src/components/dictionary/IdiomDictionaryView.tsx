import React, { useState, useMemo } from 'react';
import { Search, Volume2, Bookmark, BookmarkCheck, Copy, Check, Filter, Sparkles, BookOpen, Compass, Heart, Eye } from 'lucide-react';
import { DictionaryIdiomEntry, JLPTLevel } from '../../types';
import { DICTIONARY_IDIOMS_DATA } from '../../data/dictionaryIdiomsData';
import { audioService } from '../../services/audioService';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function IdiomDictionaryView({ searchQuery, onSearchChange, favorites, onToggleFavorite }: Props) {
  const [selectedType, setSelectedType] = useState<'ALL' | 'kanyouku' | 'yojijukugo' | 'kotowaza'>('ALL');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bodyParts = [
    { id: 'ALL', label: 'Semua Kategori' },
    { id: 'eye', label: '目 (Mata)' },
    { id: 'mouth', label: '口 (Mulut)' },
    { id: 'ear', label: '耳 (Telinga)' },
    { id: 'hand', label: '手 (Tangan)' },
    { id: 'foot', label: '足 (Kaki)' },
    { id: 'face', label: '首・顔 (Leher & Wajah)' },
    { id: 'philosophy', label: 'Filosofi & Semangat' },
    { id: 'life', label: 'Hikmah Hidup' },
  ];

  const filteredIdioms = useMemo(() => {
    return DICTIONARY_IDIOMS_DATA.filter((item) => {
      if (selectedType !== 'ALL' && item.type !== selectedType) return false;
      if (selectedBodyPart !== 'ALL' && item.bodyPartOrCategory !== selectedBodyPart) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchPhrase = item.phrase.toLowerCase().includes(q) || item.furigana.toLowerCase().includes(q);
      const matchRomaji = item.romaji.toLowerCase().includes(q);
      const matchId = item.idiomaticMeaningId.toLowerCase().includes(q) || item.literalMeaningId.toLowerCase().includes(q);
      const matchEquiv = item.indonesianEquivalent?.toLowerCase().includes(q);
      const matchEn = item.meaningEn.toLowerCase().includes(q);

      return matchPhrase || matchRomaji || matchId || matchEquiv || matchEn;
    });
  }, [searchQuery, selectedType, selectedBodyPart]);

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
      {/* Type & Body Part Filter Toolbar */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Idiom Type Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl">
            <button
              onClick={() => {
                setSelectedType('ALL');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedType === 'ALL'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Semua Jenis
            </button>
            <button
              onClick={() => {
                setSelectedType('kanyouku');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedType === 'kanyouku'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              慣用句 (Kanyouku)
            </button>
            <button
              onClick={() => {
                setSelectedType('yojijukugo');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedType === 'yojijukugo'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              四字熟語 (Yojijukugo)
            </button>
            <button
              onClick={() => {
                setSelectedType('kotowaza');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedType === 'kotowaza'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              ことわざ (Peribahasa)
            </button>
          </div>

          {/* Body Part / Theme Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Tema:</span>
            <select
              value={selectedBodyPart}
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              className="text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-xl px-3 py-1.5 border-none focus:ring-2 focus:ring-[#BC002D]"
            >
              {bodyParts.map((bp) => (
                <option key={bp.id} value={bp.id}>
                  {bp.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Header Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
        <span>Menampilkan {filteredIdioms.length} ungkapan idiom & peribahasa</span>
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="text-[#BC002D] hover:underline">
            Hapus Pencarian
          </button>
        )}
      </div>

      {/* Idioms List Grid */}
      {filteredIdioms.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Idiom Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Coba cari bagian tubuh ("mata", "mulut", "tangan"), makna kiasan ("tergila-gila", "pantang menyerah"), atau Romaji ("ichigo ichie", "me ga nai").
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredIdioms.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#BC002D]/40 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                        {item.typeLabel}
                      </span>
                      {item.bodyPartLabel && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                          {item.bodyPartLabel}
                        </span>
                      )}
                      {item.jlptLevel && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400">
                          JLPT {item.jlptLevel}
                        </span>
                      )}
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
                        onClick={() => handleCopy(`${item.phrase} (${item.romaji}): ${item.idiomaticMeaningId}`, item.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title="Salin Idiom"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Japanese Phrase & Audio */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-xs text-gray-400 font-japanese">{item.furigana}</div>
                      <h3 className="text-2xl font-bold font-japanese text-gray-900 dark:text-white tracking-wide">
                        {item.phrase}
                      </h3>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {item.romaji}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(item.phrase)}
                      className="p-2.5 rounded-2xl bg-[#BC002D]/10 hover:bg-[#BC002D]/20 text-[#BC002D] transition shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Meanings Box */}
                  <div className="space-y-2 bg-gray-50 dark:bg-neutral-900/60 p-4 rounded-2xl">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        ✨ Makna Kiasan / Idiom:
                      </span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                        {item.idiomaticMeaningId}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-200/60 dark:border-white/5 flex flex-col gap-1 text-xs">
                      <div>
                        <span className="text-gray-400">Arti Harfiah: </span>
                        <span className="text-gray-700 dark:text-gray-300 italic font-medium">
                          "{item.literalMeaningId}"
                        </span>
                      </div>
                      {item.indonesianEquivalent && (
                        <div>
                          <span className="text-amber-700 dark:text-amber-400 font-semibold">
                            🇮🇩 Padanan Peribahasa Indonesia:
                          </span>{' '}
                          <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {item.indonesianEquivalent}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Origin Story / Philosophy */}
                  {item.originStory && (
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/30 text-xs text-gray-600 dark:text-gray-300">
                      <span className="font-bold text-amber-800 dark:text-amber-400">🏛️ Asal-Usul & Nuansa: </span>
                      {item.originStory}
                    </div>
                  )}

                  {/* Example sentences */}
                  {item.examples && item.examples.length > 0 && (
                    <div className="mt-3 space-y-2 pt-3 border-t border-gray-100 dark:border-white/5">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Contoh Penggunaan:
                      </div>
                      {item.examples.map((ex, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#181818] p-3 rounded-xl border border-gray-100 dark:border-white/5 text-xs space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-japanese font-medium text-gray-900 dark:text-gray-200">
                              {ex.japanese}
                            </div>
                            <button
                              onClick={() => handlePlayAudio(ex.japanese)}
                              className="text-gray-400 hover:text-[#BC002D] p-1 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">
                            {ex.romaji}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                            ➔ {ex.meaningId}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
