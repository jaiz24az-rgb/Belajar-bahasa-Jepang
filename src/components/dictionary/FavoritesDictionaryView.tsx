import React, { useState } from 'react';
import { BookmarkCheck, Trash2, Volume2, ArrowLeftRight, BookOpen, Layers, Flame, Compass } from 'lucide-react';
import { DictFavoritesState } from '../../types';
import { DICTIONARY_VOCAB_DATA } from '../../data/dictionaryVocabData';
import { EXTENDED_KANJI_DATA } from '../../data/dictionaryKanjiData';
import { DICTIONARY_IDIOMS_DATA } from '../../data/dictionaryIdiomsData';
import { DICTIONARY_SLANG_DATA } from '../../data/dictionarySlangData';
import { DICTIONARY_SYN_ANT_DATA } from '../../data/dictionarySynAntData';
import { audioService } from '../../services/audioService';

interface Props {
  favorites: DictFavoritesState;
  onToggleFavorite: (category: 'vocab' | 'kanji' | 'synAnt' | 'idioms' | 'slang', id: string) => void;
  onClearAllFavorites?: () => void;
}

export function FavoritesDictionaryView({ favorites, onToggleFavorite }: Props) {
  const [activeFavTab, setActiveFavTab] = useState<'all' | 'vocab' | 'kanji' | 'synAnt' | 'idioms' | 'slang'>('all');

  const favVocab = DICTIONARY_VOCAB_DATA.filter((v) => favorites.vocab?.includes(v.id));
  const favKanji = EXTENDED_KANJI_DATA.filter((k) => favorites.kanji?.includes(k.id));
  const favSynAnt = DICTIONARY_SYN_ANT_DATA.filter((sa) => favorites.synAnt?.includes(sa.id));
  const favIdioms = DICTIONARY_IDIOMS_DATA.filter((i) => favorites.idioms?.includes(i.id));
  const favSlang = DICTIONARY_SLANG_DATA.filter((s) => favorites.slang?.includes(s.id));

  const totalFavorites = favVocab.length + favKanji.length + favSynAnt.length + favIdioms.length + favSlang.length;

  const handlePlayAudio = (text: string) => {
    audioService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Category Switcher for Saved Items */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveFavTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'all'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Semua ({totalFavorites})
          </button>
          <button
            onClick={() => setActiveFavTab('vocab')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'vocab'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Kosakata ({favVocab.length})
          </button>
          <button
            onClick={() => setActiveFavTab('kanji')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'kanji'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Kanji ({favKanji.length})
          </button>
          <button
            onClick={() => setActiveFavTab('synAnt')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'synAnt'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sinonim/Antonim ({favSynAnt.length})
          </button>
          <button
            onClick={() => setActiveFavTab('idioms')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'idioms'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Idiom ({favIdioms.length})
          </button>
          <button
            onClick={() => setActiveFavTab('slang')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFavTab === 'slang'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Slang ({favSlang.length})
          </button>
        </div>
      </div>

      {totalFavorites === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
          <BookmarkCheck className="w-14 h-14 text-amber-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Belum Ada Entri yang Disimpan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Klik ikon penanda (bookmark) pada kosakata, kanji, sinonim/antonim, idiom, atau slang mana pun di kamus untuk menyimpannya di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Vocab Section */}
          {(activeFavTab === 'all' || activeFavTab === 'vocab') && favVocab.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#BC002D]" />
                Kosakata Tersimpan ({favVocab.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favVocab.map((v) => (
                  <div key={v.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex items-start justify-between">
                    <div>
                      <div className="font-japanese font-bold text-lg text-gray-900 dark:text-white">{v.kanji}</div>
                      <div className="text-xs text-gray-400">{v.romaji}</div>
                      <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">🇮🇩 {v.meaningId}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handlePlayAudio(v.kanji)} className="p-2 text-gray-400 hover:text-[#BC002D] transition">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onToggleFavorite('vocab', v.id)} className="p-2 text-amber-500 hover:text-red-500 transition" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Kanji Section */}
          {(activeFavTab === 'all' || activeFavTab === 'kanji') && favKanji.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                Kanji Tersimpan ({favKanji.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {favKanji.map((k) => (
                  <div key={k.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-neutral-900 flex items-center justify-center text-2xl font-japanese font-bold text-gray-900 dark:text-white">
                        {k.kanji}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">{k.meaningId}</div>
                        <div className="text-[10px] text-gray-400">JLPT {k.jlpt} • {k.strokes} Goresan</div>
                      </div>
                    </div>
                    <button onClick={() => onToggleFavorite('kanji', k.id)} className="p-2 text-amber-500 hover:text-red-500 transition" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Synonyms & Antonyms Section */}
          {(activeFavTab === 'all' || activeFavTab === 'synAnt') && favSynAnt.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-teal-600" />
                Sinonim & Antonim Tersimpan ({favSynAnt.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favSynAnt.map((sa) => (
                  <div key={sa.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-200 dark:border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-japanese font-bold text-lg text-gray-900 dark:text-white">
                          {sa.baseWord.kanji} <span className="text-xs text-gray-400 font-sans">({sa.baseWord.romaji})</span>
                        </div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">🇮🇩 {sa.baseWord.meaningId}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handlePlayAudio(sa.baseWord.kanji)} className="p-2 text-gray-400 hover:text-[#BC002D] transition">
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => onToggleFavorite('synAnt', sa.id)} className="p-2 text-amber-500 hover:text-red-500 transition" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] grid grid-cols-2 gap-2 pt-1 border-t border-gray-100 dark:border-white/5">
                      {sa.synonyms[0] && (
                        <div className="text-emerald-700 dark:text-emerald-400">
                          <span className="font-bold">Sinonim:</span> {sa.synonyms[0].kanji} ({sa.synonyms[0].meaningId})
                        </div>
                      )}
                      {sa.antonyms[0] && (
                        <div className="text-rose-700 dark:text-rose-400">
                          <span className="font-bold">Antonim:</span> {sa.antonyms[0].kanji} ({sa.antonyms[0].meaningId})
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Idioms Section */}
          {(activeFavTab === 'all' || activeFavTab === 'idioms') && favIdioms.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                Idiom & Peribahasa Tersimpan ({favIdioms.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favIdioms.map((i) => (
                  <div key={i.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex items-start justify-between">
                    <div>
                      <div className="font-japanese font-bold text-lg text-gray-900 dark:text-white">{i.phrase}</div>
                      <div className="text-xs text-gray-400">{i.romaji}</div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">✨ {i.idiomaticMeaningId}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handlePlayAudio(i.phrase)} className="p-2 text-gray-400 hover:text-[#BC002D] transition">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onToggleFavorite('idioms', i.id)} className="p-2 text-amber-500 hover:text-red-500 transition" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Slang Section */}
          {(activeFavTab === 'all' || activeFavTab === 'slang') && favSlang.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Bahasa Gaul & Slang Tersimpan ({favSlang.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favSlang.map((s) => (
                  <div key={s.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex items-start justify-between">
                    <div>
                      <div className="font-japanese font-bold text-lg text-gray-900 dark:text-white">{s.term}</div>
                      <div className="text-xs text-gray-400">{s.romaji}</div>
                      <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-1">🔥 {s.meaningId}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handlePlayAudio(s.term)} className="p-2 text-gray-400 hover:text-[#BC002D] transition">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onToggleFavorite('slang', s.id)} className="p-2 text-amber-500 hover:text-red-500 transition" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
