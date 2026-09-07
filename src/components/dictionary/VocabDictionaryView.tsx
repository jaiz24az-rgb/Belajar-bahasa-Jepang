import React, { useState, useMemo } from 'react';
import { Search, Volume2, Bookmark, BookmarkCheck, Copy, Check, Filter, Sparkles, BookOpen, ArrowRightLeft, Tag, Layers } from 'lucide-react';
import { DictionaryVocabEntry, JLPTLevel } from '../../types';
import { DICTIONARY_VOCAB_DATA } from '../../data/dictionaryVocabData';
import { audioService } from '../../services/audioService';
import { DictionaryService } from '../../services/dictionaryService';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function VocabDictionaryView({ searchQuery, onSearchChange, favorites, onToggleFavorite }: Props) {
  const [selectedJlpt, setSelectedJlpt] = useState<JLPTLevel | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPos, setSelectedPos] = useState<string>('ALL');
  const [direction, setDirection] = useState<'all' | 'id_ja' | 'ja_id'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeEntry, setActiveEntry] = useState<DictionaryVocabEntry | null>(null);

  const categories = [
    { id: 'ALL', label: 'Semua Kategori' },
    { id: 'daily', label: 'Percakapan Harian' },
    { id: 'business', label: 'Bisnis & Kantor' },
    { id: 'food', label: 'Makanan & Kuliner' },
    { id: 'travel', label: 'Wisata & Transportasi' },
    { id: 'it_tech', label: 'Teknologi & IT' },
    { id: 'emotion', label: 'Emosi & Sifat' },
    { id: 'education', label: 'Pendidikan & Karir' },
    { id: 'medical', label: 'Kesehatan' },
    { id: 'nature', label: 'Alam & Lingkungan' },
  ];

  const posList = [
    { id: 'ALL', label: 'Semua Jenis Kata' },
    { id: 'verb', label: 'Kata Kerja (動詞)' },
    { id: 'noun', label: 'Kata Benda (名詞)' },
    { id: 'i-adj', label: 'Kata Sifat-i (い形容詞)' },
    { id: 'na-adj', label: 'Kata Sifat-na (な形容詞)' },
    { id: 'onomatopoeia', label: 'Onomatopoeia (オノマトペ)' },
    { id: 'expression', label: 'Ungkapan (表現)' },
  ];

  const filteredList = useMemo(() => {
    return DICTIONARY_VOCAB_DATA.filter((item) => {
      // JLPT Filter
      if (selectedJlpt !== 'ALL' && item.jlpt !== selectedJlpt) return false;

      // Category Filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      // POS Filter
      if (selectedPos !== 'ALL' && item.posCategory !== selectedPos) return false;

      // Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchJa = item.kanji.toLowerCase().includes(q) || item.furigana.toLowerCase().includes(q);
      const matchRomaji = item.romaji.toLowerCase().includes(q);
      const matchId = item.meaningId.toLowerCase().includes(q);
      const matchEn = item.meaningEn.toLowerCase().includes(q);
      const matchNotes = item.notes?.toLowerCase().includes(q);

      if (direction === 'id_ja') return matchId || matchEn;
      if (direction === 'ja_id') return matchJa || matchRomaji;
      return matchJa || matchRomaji || matchId || matchEn || matchNotes;
    });
  }, [searchQuery, selectedJlpt, selectedCategory, selectedPos, direction]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioService.playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayAudio = (text: string) => {
    audioService.speak(text);
  };

  const handlePickRandom = () => {
    const randomIndex = Math.floor(Math.random() * DICTIONARY_VOCAB_DATA.length);
    const item = DICTIONARY_VOCAB_DATA[randomIndex];
    onSearchChange(item.romaji.split(' ')[0]);
    audioService.playSound('click');
  };

  return (
    <div className="space-y-6">
      {/* Direction & Filter Toolbar */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Direction toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl">
            <button
              onClick={() => {
                setDirection('all');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                direction === 'all'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🔄 Dua Arah (ID ⇄ JA)
            </button>
            <button
              onClick={() => {
                setDirection('id_ja');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                direction === 'id_ja'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🇮🇩 Indo ➔ 🇯🇵 Jepang
            </button>
            <button
              onClick={() => {
                setDirection('ja_id');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                direction === 'ja_id'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🇯🇵 Jepang ➔ 🇮🇩 Indo
            </button>
          </div>

          {/* Randomizer */}
          <button
            onClick={handlePickRandom}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#BC002D] bg-[#BC002D]/10 hover:bg-[#BC002D]/20 rounded-xl transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Acak Kosakata
          </button>
        </div>

        {/* Filters: JLPT, Category, POS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-white/5">
          {/* JLPT Selector */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
              Tingkat JLPT:
            </label>
            <div className="flex flex-wrap gap-1">
              {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedJlpt(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    selectedJlpt === lvl
                      ? 'bg-[#BC002D] text-white'
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
              Tema / Kategori:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-xl px-3 py-1.5 border-none focus:ring-2 focus:ring-[#BC002D]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Part of Speech Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
              Kelas Kata:
            </label>
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value)}
              className="w-full text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-xl px-3 py-1.5 border-none focus:ring-2 focus:ring-[#BC002D]"
            >
              {posList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
        <span>Menampilkan {filteredList.length} entri kosakata</span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-[#BC002D] hover:underline"
          >
            Hapus Pencarian
          </button>
        )}
      </div>

      {/* Vocab Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Kosakata Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Coba gunakan kata kunci dalam Bahasa Indonesia (misal: "makan", "kantor", "sehat") atau Romaji/Kanji (misal: "taberu", "kaigi", "oishii").
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((entry) => {
            const isFav = favorites.includes(entry.id);
            const isCopied = copiedId === entry.id;

            return (
              <div
                key={entry.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#BC002D]/40 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: JLPT, Category, POS, Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                        {entry.jlpt}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
                        {entry.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                        {entry.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleFavorite(entry.id)}
                        className="p-1.5 text-gray-400 hover:text-amber-500 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(`${entry.kanji} (${entry.romaji}) : ${entry.meaningId}`, entry.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title="Salin Entri"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Japanese Headword & Reading */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 font-japanese">
                        {entry.furigana}
                      </div>
                      <h3 className="text-2xl font-bold font-japanese text-gray-900 dark:text-white tracking-wide">
                        {entry.kanji}
                      </h3>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {entry.romaji}
                        {entry.pitchAccent && (
                          <span className="ml-2 text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded">
                            {entry.pitchAccent}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(entry.kanji)}
                      className="p-2.5 rounded-2xl bg-[#BC002D]/10 hover:bg-[#BC002D]/20 text-[#BC002D] transition shrink-0"
                      title="Dengarkan Audio Pelafalan"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Indonesian & English Definition */}
                  <div className="bg-gray-50 dark:bg-neutral-900/60 rounded-2xl p-3 my-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      🇮🇩 {entry.meaningId}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      🇬🇧 {entry.meaningEn}
                    </p>
                  </div>

                  {/* Example Sentences */}
                  {entry.examples && entry.examples.length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Contoh Kalimat:
                      </div>
                      {entry.examples.map((ex, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#181818] p-2.5 rounded-xl border border-gray-100 dark:border-white/5 text-xs space-y-1">
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
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-sans">
                            {ex.romaji}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                            ➔ {ex.meaningId}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes / Cultural tips */}
                  {entry.notes && (
                    <div className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                      💡 <span className="font-medium">{entry.notes}</span>
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
