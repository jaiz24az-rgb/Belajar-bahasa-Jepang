import React, { useState, useMemo } from 'react';
import { Search, Volume2, Bookmark, BookmarkCheck, Copy, Check, Filter, Layers, BookOpen, PenTool, Sparkles, ChevronRight } from 'lucide-react';
import { JLPTLevel } from '../../types';
import { EXTENDED_KANJI_DATA, COMMON_RADICALS, ExtendedKanjiEntry } from '../../data/dictionaryKanjiData';
import { audioService } from '../../services/audioService';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenCanvas?: (kanjiChar: string) => void;
}

export function KanjiDictionaryView({ searchQuery, onSearchChange, favorites, onToggleFavorite, onOpenCanvas }: Props) {
  const [selectedJlpt, setSelectedJlpt] = useState<JLPTLevel | 'ALL'>('ALL');
  const [selectedRadical, setSelectedRadical] = useState<string>('ALL');
  const [maxStrokes, setMaxStrokes] = useState<number>(25);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedKanjiModal, setSelectedKanjiModal] = useState<ExtendedKanjiEntry | null>(null);

  const filteredKanji = useMemo(() => {
    return EXTENDED_KANJI_DATA.filter((k) => {
      if (selectedJlpt !== 'ALL' && k.jlpt !== selectedJlpt) return false;
      if (selectedRadical !== 'ALL' && !k.radical.includes(selectedRadical.split(' ')[0])) return false;
      if (k.strokes > maxStrokes) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchChar = k.kanji.includes(q);
      const matchOn = k.onyomi.some((o) => o.toLowerCase().includes(q));
      const matchKun = k.kunyomi.some((ku) => ku.toLowerCase().includes(q));
      const matchId = k.meaningId.toLowerCase().includes(q);
      const matchEn = k.meaningEn.toLowerCase().includes(q);
      const matchRadical = k.radical.toLowerCase().includes(q);

      return matchChar || matchOn || matchKun || matchId || matchEn || matchRadical;
    });
  }, [searchQuery, selectedJlpt, selectedRadical, maxStrokes]);

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
      {/* Kanji Filter Toolbar */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
        {/* Top Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* JLPT Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
              Level JLPT:
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

          {/* Radicals Picker */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
              Filter Radikal Utama (部首):
            </label>
            <select
              value={selectedRadical}
              onChange={(e) => setSelectedRadical(e.target.value)}
              className="w-full text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-xl px-3 py-1.5 border-none focus:ring-2 focus:ring-[#BC002D]"
            >
              <option value="ALL">Semua Radikal</option>
              {COMMON_RADICALS.map((r) => (
                <option key={r.radical} value={r.radical}>
                  {r.radical} — {r.nameId}
                </option>
              ))}
            </select>
          </div>

          {/* Max Strokes Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                Jumlah Goresan Maksimal:
              </label>
              <span className="text-xs font-bold text-[#BC002D]">{maxStrokes} Goresan</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={maxStrokes}
              onChange={(e) => setMaxStrokes(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#BC002D]"
            />
          </div>
        </div>
      </div>

      {/* Kanji Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
        <span>Menampilkan {filteredKanji.length} karakter kanji</span>
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="text-[#BC002D] hover:underline">
            Hapus Pencarian
          </button>
        )}
      </div>

      {/* Kanji Grid */}
      {filteredKanji.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Karakter Kanji Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Coba cari dengan arti Indonesia ("matahari", "air", "orang"), On'yomi ("nichi", "sui"), atau Kun'yomi ("hi", "mizu").
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKanji.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#BC002D]/40 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                        {item.jlpt}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
                        {item.strokes} Goresan
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                        {item.radical}
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
                        onClick={() => handleCopy(`${item.kanji} (${item.meaningId})`, item.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                        title="Salin Kanji"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Big Kanji Display */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50/60 dark:bg-neutral-900 border border-amber-200/50 dark:border-white/10 flex items-center justify-center text-4xl font-japanese font-bold text-gray-900 dark:text-white shadow-inner">
                      {item.kanji}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.meaningId}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.meaningEn}
                      </p>
                      {item.joyoGrade && (
                        <span className="inline-block mt-1 text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                          Grade: {item.joyoGrade}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Readings Table */}
                  <div className="space-y-1.5 text-xs bg-gray-50 dark:bg-neutral-900/60 p-3 rounded-2xl">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/50 px-1.5 py-0.5 rounded shrink-0">
                        ON (音)
                      </span>
                      <span className="font-japanese text-gray-800 dark:text-gray-200 font-medium">
                        {item.onyomi.join('、 ')}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50 px-1.5 py-0.5 rounded shrink-0">
                        KUN (訓)
                      </span>
                      <span className="font-japanese text-gray-800 dark:text-gray-200 font-medium">
                        {item.kunyomi.join('、 ')}
                      </span>
                    </div>
                  </div>

                  {/* Compounds Preview */}
                  {item.compounds && item.compounds.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Kata Majemuk (熟語 Jukugo):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.compounds.slice(0, 3).map((cmp, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-xl text-gray-800 dark:text-gray-200"
                          >
                            <span className="font-japanese font-bold text-[#BC002D]">{cmp.word}</span>
                            <span className="text-[10px] text-gray-500 font-normal">({cmp.meaningId})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePlayAudio(item.kanji)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#BC002D] transition py-1"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Audio</span>
                  </button>

                  <button
                    onClick={() => setSelectedKanjiModal(item)}
                    className="flex items-center gap-1 text-xs font-bold text-[#BC002D] hover:underline"
                  >
                    Detail Lengkap
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Kanji Detail Modal */}
      {selectedKanjiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl max-w-lg w-full p-6 border border-gray-200 dark:border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-neutral-900 border border-amber-200 dark:border-white/10 flex items-center justify-center text-5xl font-japanese font-bold text-gray-900 dark:text-white shadow-inner">
                  {selectedKanjiModal.kanji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                      {selectedKanjiModal.jlpt}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedKanjiModal.strokes} Goresan
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedKanjiModal.meaningId}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedKanjiModal.meaningEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedKanjiModal(null)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {/* Mnemonic origin */}
            {selectedKanjiModal.mnemonicsDescription && (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300">💡 Makna & Mnemonic Asal:</span>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {selectedKanjiModal.mnemonicsDescription}
                </p>
              </div>
            )}

            {/* Readings Detail */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-neutral-900 p-3 rounded-2xl">
                <div className="text-[10px] font-bold text-red-600 uppercase mb-1">On'yomi (Katakana):</div>
                <div className="text-sm font-japanese font-bold text-gray-900 dark:text-gray-100">
                  {selectedKanjiModal.onyomi.join('、 ')}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-900 p-3 rounded-2xl">
                <div className="text-[10px] font-bold text-blue-600 uppercase mb-1">Kun'yomi (Hiragana):</div>
                <div className="text-sm font-japanese font-bold text-gray-900 dark:text-gray-100">
                  {selectedKanjiModal.kunyomi.join('、 ')}
                </div>
              </div>
            </div>

            {/* All Compounds List */}
            {selectedKanjiModal.compounds && (
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Daftar Kosakata Gabungan (熟語):
                </h4>
                <div className="space-y-2">
                  {selectedKanjiModal.compounds.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-white/5"
                    >
                      <div>
                        <div className="font-japanese font-bold text-gray-900 dark:text-white">
                          {c.word} <span className="text-xs font-normal text-gray-400">({c.furigana})</span>
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                          {c.meaningId}
                        </div>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(c.word)}
                        className="p-2 text-gray-400 hover:text-[#BC002D] transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedKanjiModal(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl transition"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handlePlayAudio(selectedKanjiModal.kanji);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#BC002D] hover:bg-[#A00026] rounded-xl shadow-md transition"
              >
                <Volume2 className="w-4 h-4" />
                Dengarkan Suara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
