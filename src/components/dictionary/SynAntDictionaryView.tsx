import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  ArrowLeftRight,
  Sparkles,
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DictionarySynAntEntry, JLPTLevel } from '../../types';
import { DICTIONARY_SYN_ANT_DATA } from '../../data/dictionarySynAntData';
import { audioService } from '../../services/audioService';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function SynAntDictionaryView({
  searchQuery,
  onSearchChange,
  favorites,
  onToggleFavorite,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedJlpt, setSelectedJlpt] = useState<string>('ALL');
  const [activeFilterMode, setActiveFilterMode] = useState<'all' | 'synonyms_only' | 'antonyms_only' | 'quiz'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Drill / Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const categories = [
    { id: 'ALL', label: 'Semua Kategori' },
    { id: 'personality_emotion', label: '😊 Sifat & Perasaan' },
    { id: 'size_quantity', label: '📊 Ukuran & Kuantitas' },
    { id: 'time_speed', label: '⏱️ Waktu & Kecepatan' },
    { id: 'nature_state', label: '🌿 Kondisi & Alam' },
    { id: 'action_movement', label: '⚡ Aksi & Kompetisi' },
    { id: 'abstract_logic', label: '🧠 Logika & Filsafat' },
    { id: 'work_business', label: '💼 Bisnis & Pasar' },
  ];

  const jlptLevels = ['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'];

  const filteredEntries = useMemo(() => {
    return DICTIONARY_SYN_ANT_DATA.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedJlpt !== 'ALL' && item.baseWord.jlpt !== selectedJlpt) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchBase =
        item.baseWord.kanji.toLowerCase().includes(q) ||
        item.baseWord.furigana.toLowerCase().includes(q) ||
        item.baseWord.romaji.toLowerCase().includes(q) ||
        item.baseWord.meaningId.toLowerCase().includes(q);

      const matchSyn = item.synonyms.some(
        (s) =>
          s.kanji.toLowerCase().includes(q) ||
          s.furigana.toLowerCase().includes(q) ||
          s.romaji.toLowerCase().includes(q) ||
          s.meaningId.toLowerCase().includes(q)
      );

      const matchAnt = item.antonyms.some(
        (a) =>
          a.kanji.toLowerCase().includes(q) ||
          a.furigana.toLowerCase().includes(q) ||
          a.romaji.toLowerCase().includes(q) ||
          a.meaningId.toLowerCase().includes(q)
      );

      const matchNuance = item.nuanceComparisonId?.toLowerCase().includes(q);

      return matchBase || matchSyn || matchAnt || matchNuance;
    });
  }, [searchQuery, selectedCategory, selectedJlpt]);

  // Quiz items generator
  const quizItems = useMemo(() => {
    return DICTIONARY_SYN_ANT_DATA.flatMap((entry) => {
      const items = [];
      if (entry.antonyms.length > 0) {
        const primaryAnt = entry.antonyms[0];
        // generate distractors from other entries
        const otherWords = DICTIONARY_SYN_ANT_DATA.filter((e) => e.id !== entry.id).map((e) => e.baseWord.kanji);
        const distractors = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [primaryAnt.kanji, ...distractors].sort(() => 0.5 - Math.random());

        items.push({
          type: 'antonym' as const,
          questionWord: entry.baseWord.kanji,
          questionReading: entry.baseWord.furigana,
          questionMeaning: entry.baseWord.meaningId,
          targetType: '対義語 (Lawan Kata / Antonim)',
          correctAnswer: primaryAnt.kanji,
          correctReading: primaryAnt.furigana,
          correctMeaning: primaryAnt.meaningId,
          explanation: entry.nuanceComparisonId || `${entry.baseWord.kanji} berlawanan dengan ${primaryAnt.kanji}`,
          options,
        });
      }

      if (entry.synonyms.length > 0) {
        const primarySyn = entry.synonyms[0];
        const otherWords = DICTIONARY_SYN_ANT_DATA.filter((e) => e.id !== entry.id).map((e) => e.baseWord.kanji);
        const distractors = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [primarySyn.kanji, ...distractors].sort(() => 0.5 - Math.random());

        items.push({
          type: 'synonym' as const,
          questionWord: entry.baseWord.kanji,
          questionReading: entry.baseWord.furigana,
          questionMeaning: entry.baseWord.meaningId,
          targetType: '類義語 (Persamaan Kata / Sinonim)',
          correctAnswer: primarySyn.kanji,
          correctReading: primarySyn.furigana,
          correctMeaning: primarySyn.meaningId,
          explanation: entry.nuanceComparisonId || `${entry.baseWord.kanji} bersinonim dengan ${primarySyn.kanji}`,
          options,
        });
      }
      return items;
    }).sort(() => 0.5 - Math.random());
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioService.playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayAudio = (text: string) => {
    audioService.speak(text);
  };

  const handleSelectQuizOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const currentQuiz = quizItems[quizIndex];
    if (option === currentQuiz.correctAnswer) {
      setQuizScore((prev) => prev + 1);
      audioService.playSound('correct');
    } else {
      audioService.playSound('wrong');
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      audioService.playSound('click');
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    audioService.playSound('click');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Mode Controller */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl">
            <button
              onClick={() => {
                setActiveFilterMode('all');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilterMode === 'all'
                  ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Semua (類語・対義語)
            </button>
            <button
              onClick={() => {
                setActiveFilterMode('synonyms_only');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilterMode === 'synonyms_only'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Hanya Sinonim (類義語)
            </button>
            <button
              onClick={() => {
                setActiveFilterMode('antonyms_only');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilterMode === 'antonyms_only'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Hanya Antonim (対義語)
            </button>
            <button
              onClick={() => {
                setActiveFilterMode('quiz');
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeFilterMode === 'quiz'
                  ? 'bg-[#BC002D] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Kuis Kilat Antonim/Sinonim
            </button>
          </div>

          {/* JLPT Selector */}
          {activeFilterMode !== 'quiz' && (
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl overflow-x-auto">
              <span className="text-[11px] font-bold text-gray-400 px-2">JLPT:</span>
              {jlptLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedJlpt(lvl);
                    audioService.playSound('click');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedJlpt === lvl
                      ? 'bg-[#BC002D] text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Pill Filters (when not in quiz mode) */}
        {activeFilterMode !== 'quiz' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  audioService.playSound('click');
                }}
                className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === c.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* QUIZ MODE INTERFACE */}
      {activeFilterMode === 'quiz' ? (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-sm space-y-6 max-w-2xl mx-auto">
          {/* Quiz Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#BC002D]/10 text-[#BC002D]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Kuis Cepat: Tebak Sinonim & Lawan Kata
                </h3>
                <p className="text-xs text-gray-400">
                  Pertanyaan {quizIndex + 1} dari {quizItems.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Skor Anda</div>
              <div className="text-lg font-black text-[#BC002D]">
                {quizScore} <span className="text-xs font-normal text-gray-400">/ {quizIndex + (isAnswered ? 1 : 0)}</span>
              </div>
            </div>
          </div>

          {/* Current Question */}
          {quizItems[quizIndex] && (
            <div className="space-y-5">
              <div className="text-center py-6 px-4 bg-gray-50 dark:bg-neutral-900/60 rounded-3xl border border-gray-100 dark:border-white/5">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold mb-3 bg-[#BC002D]/10 text-[#BC002D]">
                  {quizItems[quizIndex].targetType}
                </div>

                <div className="text-xs text-gray-400 font-japanese">
                  {quizItems[quizIndex].questionReading}
                </div>
                <div className="text-4xl font-bold font-japanese text-gray-900 dark:text-white my-1">
                  {quizItems[quizIndex].questionWord}
                </div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  "{quizItems[quizIndex].questionMeaning}"
                </div>

                <button
                  onClick={() => handlePlayAudio(quizItems[quizIndex].questionWord)}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-neutral-800 text-xs text-gray-600 dark:text-gray-300 shadow-sm hover:text-[#BC002D]"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Dengarkan Pelafalan
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizItems[quizIndex].options.map((opt, idx) => {
                  const isCorrect = opt === quizItems[quizIndex].correctAnswer;
                  const isChosen = selectedOption === opt;

                  let btnStyle = 'bg-gray-50 dark:bg-neutral-800/80 border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-[#BC002D]/40';

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 font-bold';
                    } else {
                      btnStyle = 'opacity-50 border-gray-200 dark:border-white/5';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectQuizOption(opt)}
                      className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between ${btnStyle}`}
                    >
                      <div>
                        <div className="text-xl font-bold font-japanese">{opt}</div>
                      </div>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isAnswered && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/30 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Penjelasan & Jawaban Benar:
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Jawaban yang tepat adalah <span className="font-japanese font-bold text-gray-900 dark:text-white">{quizItems[quizIndex].correctAnswer}</span> ({quizItems[quizIndex].correctReading}) = {quizItems[quizIndex].correctMeaning}.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    💡 {quizItems[quizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next Question / Restart Controls */}
              {isAnswered && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Ulangi dari Awal
                  </button>

                  <button
                    onClick={handleNextQuiz}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#BC002D] hover:bg-[#A00026] text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    <span>Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* DICTIONARY CARDS VIEW */
        <div className="space-y-6">
          {/* Header Count */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
            <span>Menampilkan {filteredEntries.length} entri pasangan sinonim & antonim</span>
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="text-[#BC002D] hover:underline">
                Hapus Pencarian
              </button>
            )}
          </div>

          {filteredEntries.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-white/10 p-8">
              <ArrowLeftRight className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Kata Tidak Ditemukan</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                Coba cari kata sifat, kerja, atau konsep seperti "yasashii", "kirei", "ookii", "fueru", "katsu", "rakkan", "genin", atau "ramah".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredEntries.map((item) => {
                const isFav = favorites.includes(item.id);
                const isCopied = copiedId === item.id;

                const showSynonyms = activeFilterMode === 'all' || activeFilterMode === 'synonyms_only';
                const showAntonyms = activeFilterMode === 'all' || activeFilterMode === 'antonyms_only';

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#BC002D]/40 transition duration-200 space-y-5"
                  >
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-white/5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BC002D]/10 text-[#BC002D]">
                          JLPT {item.baseWord.jlpt}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300">
                          {item.baseWord.partOfSpeech}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                          {item.categoryLabel}
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
                          onClick={() =>
                            handleCopy(
                              `${item.baseWord.kanji} (${item.baseWord.romaji}): ${item.baseWord.meaningId}`,
                              item.id
                            )
                          }
                          className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                          title="Salin Entri"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Central Base Word Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/80 border border-gray-100 dark:border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                          Kata Pokok (見出し語)
                        </span>
                        <div className="text-xs text-gray-400 font-japanese">{item.baseWord.furigana}</div>
                        <h3 className="text-2xl sm:text-3xl font-black font-japanese text-gray-900 dark:text-white tracking-wide">
                          {item.baseWord.kanji}
                        </h3>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {item.baseWord.romaji}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="text-right sm:text-left">
                          <span className="text-xs font-bold text-gray-900 dark:text-white block">
                            🇮🇩 {item.baseWord.meaningId}
                          </span>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(item.baseWord.kanji)}
                          className="p-3 rounded-2xl bg-[#BC002D]/10 hover:bg-[#BC002D]/20 text-[#BC002D] transition shrink-0"
                          title="Dengarkan Audio"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Synonyms & Antonyms Two-Column Comparison Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* SYNONYMS (類義語) */}
                      {showSynonyms && item.synonyms.length > 0 && (
                        <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-emerald-200/50 dark:border-emerald-900/30 pb-2">
                            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              類義語 (Sinonim / Persamaan Kata)
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {item.synonyms.length} Kata
                            </span>
                          </div>

                          <div className="space-y-3">
                            {item.synonyms.map((syn, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-white dark:bg-[#181818] border border-emerald-100 dark:border-white/5 space-y-1.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="text-[10px] text-gray-400 font-japanese">{syn.furigana}</div>
                                    <div className="text-base font-bold font-japanese text-gray-900 dark:text-white">
                                      {syn.kanji}{' '}
                                      <span className="text-xs font-normal text-gray-400 font-sans">
                                        ({syn.romaji})
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                      = {syn.meaningId}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {syn.jlpt && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-neutral-800 text-gray-500">
                                        {syn.jlpt}
                                      </span>
                                    )}
                                    <button
                                      onClick={() => handlePlayAudio(syn.kanji)}
                                      className="p-1 text-gray-400 hover:text-emerald-600 transition"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {syn.nuanceExplanationId && (
                                  <p className="text-[11px] text-gray-600 dark:text-gray-300 pt-1 border-t border-gray-100 dark:border-white/5">
                                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                                      Nuansa:
                                    </span>{' '}
                                    {syn.nuanceExplanationId}
                                  </p>
                                )}

                                {syn.exampleSentence && (
                                  <div className="pt-1 text-[11px] text-gray-500 dark:text-gray-400 font-japanese">
                                    💬 {syn.exampleSentence.japanese}
                                    <div className="text-[10px] text-gray-400 font-sans">
                                      ➔ {syn.exampleSentence.meaningId}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ANTONYMS (対義語) */}
                      {showAntonyms && item.antonyms.length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-rose-200/50 dark:border-rose-900/30 pb-2">
                            <span className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                              対義語 (Antonim / Lawan Kata)
                            </span>
                            <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                              {item.antonyms.length} Kata
                            </span>
                          </div>

                          <div className="space-y-3">
                            {item.antonyms.map((ant, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-white dark:bg-[#181818] border border-rose-100 dark:border-white/5 space-y-1.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="text-[10px] text-gray-400 font-japanese">{ant.furigana}</div>
                                    <div className="text-base font-bold font-japanese text-gray-900 dark:text-white">
                                      {ant.kanji}{' '}
                                      <span className="text-xs font-normal text-gray-400 font-sans">
                                        ({ant.romaji})
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">
                                      ≠ {ant.meaningId}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {ant.jlpt && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-neutral-800 text-gray-500">
                                        {ant.jlpt}
                                      </span>
                                    )}
                                    <button
                                      onClick={() => handlePlayAudio(ant.kanji)}
                                      className="p-1 text-gray-400 hover:text-rose-600 transition"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {ant.nuanceExplanationId && (
                                  <p className="text-[11px] text-gray-600 dark:text-gray-300 pt-1 border-t border-gray-100 dark:border-white/5">
                                    <span className="font-semibold text-rose-800 dark:text-rose-400">
                                      Penjelasan:
                                    </span>{' '}
                                    {ant.nuanceExplanationId}
                                  </p>
                                )}

                                {ant.exampleSentence && (
                                  <div className="pt-1 text-[11px] text-gray-500 dark:text-gray-400 font-japanese">
                                    💬 {ant.exampleSentence.japanese}
                                    <div className="text-[10px] text-gray-400 font-sans">
                                      ➔ {ant.exampleSentence.meaningId}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Nuance Comparison & JLPT Exam Tips */}
                    <div className="space-y-2 pt-2">
                      {item.nuanceComparisonId && (
                        <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs text-gray-700 dark:text-gray-300">
                          <span className="font-bold text-blue-800 dark:text-blue-400 flex items-center gap-1 mb-1">
                            <Lightbulb className="w-3.5 h-3.5" />
                            Perbedaan Nuansa Pemakaian:
                          </span>
                          {item.nuanceComparisonId}
                        </div>
                      )}

                      {item.jlptExamTip && (
                        <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-300">
                          <span className="font-bold text-amber-800 dark:text-amber-400">
                            🎯 Tips Ujian JLPT:
                          </span>{' '}
                          {item.jlptExamTip}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
