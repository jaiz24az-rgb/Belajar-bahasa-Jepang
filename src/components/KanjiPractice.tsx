import React, { useState } from 'react';
import {
  Search,
  Volume2,
  CheckCircle2,
  Eye,
  EyeOff,
  BookOpen,
  Award,
  Sparkles,
  PenTool,
  Lightbulb,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { KanjiItem, JLPTLevel, UserProgress } from '../types';
import { KANJI_DATA } from '../data/kanjiData';
import { audioService } from '../services/audioService';
import { StorageService } from '../services/storageService';
import confetti from 'canvas-confetti';
import { KanjiWritingStudio } from './kanji/KanjiWritingStudio';
import { KanjiStrokePrinciplesView } from './kanji/KanjiStrokePrinciplesView';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

type KanjiViewTab = 'writing_studio' | 'stroke_principles' | 'catalog' | 'quiz';

export const KanjiPractice: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [activeTab, setActiveTab] = useState<KanjiViewTab>('writing_studio');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem>(KANJI_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFurigana, setShowFurigana] = useState(true);

  // Kanji Quiz State
  const [quizQuestions, setQuizQuestions] = useState<
    { kanji: KanjiItem; options: string[]; correct: string }[]
  >([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredList = KANJI_DATA.filter((k) => {
    const matchesLevel = k.jlpt === selectedLevel;
    const matchesSearch =
      k.kanji.includes(searchQuery) ||
      k.meaningId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.onyomi.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
      k.kunyomi.some((ku) => ku.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const startKanjiQuiz = () => {
    audioService.playSound('click');
    const levelPool = KANJI_DATA.filter((k) => k.jlpt === selectedLevel);
    const pool = levelPool.length >= 4 ? levelPool : KANJI_DATA;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);

    const questions = shuffled.map((item) => {
      const wrong = pool
        .filter((k) => k.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((k) => k.meaningId);
      const options = [...wrong, item.meaningId].sort(() => Math.random() - 0.5);
      return { kanji: item, options, correct: item.meaningId };
    });

    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(null);
    setQuizFinished(false);
    setActiveTab('quiz');
  };

  const handleSelectQuizAnswer = (chosen: string) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(chosen);

    const currentQ = quizQuestions[quizIndex];
    if (chosen === currentQ.correct) {
      audioService.playSound('correct');
      setQuizScore((prev) => prev + 1);
    } else {
      audioService.playSound('wrong');
    }

    setTimeout(() => {
      if (quizIndex + 1 < quizQuestions.length) {
        setQuizIndex((prev) => prev + 1);
        setQuizAnswered(null);
      } else {
        setQuizFinished(true);
        const finalScore = quizScore + (chosen === currentQ.correct ? 1 : 0);
        if (finalScore >= 4) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          audioService.playSound('levelup');
        }
        const updated = StorageService.addXP(finalScore * 25, 'Kanji Quiz');
        onUpdateProgress(updated);
      }
    }, 1200);
  };

  const toggleMastery = (kanji: KanjiItem) => {
    audioService.playSound('click');
    const updated = StorageService.markKanjiMastered(kanji.id);
    onUpdateProgress(updated);
  };

  const handleSelectKanjiForPractice = (kanjiItem: KanjiItem) => {
    setSelectedKanji(kanjiItem);
    setSelectedLevel(kanjiItem.jlpt);
    setActiveTab('writing_studio');
    audioService.playSound('click');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
                Kanji Shodo & Mastery
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-xs text-gray-500 font-japanese">筆順・書き方・漢字</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold shadow-xs">漢字</span>
              <span>Latihan Menulis & Cara Penulisan Kanji</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pelajari urutan goresan (Hitsujun), aturan shodo, latihan di kanvas 田字格, serta contoh kalimat sehari-hari
            </p>
          </div>

          {/* Quick Mastery Count Pill */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-[#BC002D]/10 border border-[#BC002D]/20 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Hafal & Kuasai</span>
              <span className="text-base font-black text-[#BC002D]">
                {progress.masteredKanji.length} <span className="text-xs font-normal text-gray-400">/ {KANJI_DATA.length} Kanji</span>
              </span>
            </div>
          </div>
        </div>

        {/* Feature Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs">
            <button
              onClick={() => {
                setActiveTab('writing_studio');
                audioService.playSound('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'writing_studio'
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Studio Menulis Kanji</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('stroke_principles');
                audioService.playSound('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'stroke_principles'
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>8 Aturan Cara Penulisan (筆順)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('catalog');
                audioService.playSound('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kamus & Contoh Kalimat</span>
            </button>

            <button
              onClick={startKanjiQuiz}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kuis Cepat</span>
            </button>
          </div>

          {/* Level Filter (for Catalog & Writing) */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 p-1 rounded-xl">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  const firstOfLevel = KANJI_DATA.find((k) => k.jlpt === lvl);
                  if (firstOfLevel) setSelectedKanji(firstOfLevel);
                  audioService.playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  selectedLevel === lvl
                    ? 'bg-[#BC002D] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== TAB 1: WRITING STUDIO ===================== */}
      {activeTab === 'writing_studio' && (
        <KanjiWritingStudio
          selectedKanji={selectedKanji}
          onSelectKanji={setSelectedKanji}
          progress={progress}
          onUpdateProgress={onUpdateProgress}
          onOpenPrinciples={() => setActiveTab('stroke_principles')}
        />
      )}

      {/* ===================== TAB 2: STROKE ORDER PRINCIPLES ===================== */}
      {activeTab === 'stroke_principles' && (
        <KanjiStrokePrinciplesView
          onSelectKanjiForPractice={handleSelectKanjiForPractice}
        />
      )}

      {/* ===================== TAB 3: CATALOG & DEEP DIVE ===================== */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Kanji List & Search */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search and Furigana Toggle */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kanji, arti, atau romaji..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-2xl text-xs text-[#1A1A1A] dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#BC002D]"
                />
              </div>

              <button
                onClick={() => setShowFurigana(!showFurigana)}
                title="Tampilkan / Sembunyikan Furigana"
                className={`p-2.5 rounded-2xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  showFurigana
                    ? 'bg-rose-50 dark:bg-[#BC002D]/10 border-[#BC002D]/30 text-[#BC002D]'
                    : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 text-gray-500'
                }`}
              >
                {showFurigana ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">Furigana</span>
              </button>
            </div>

            {/* Kanji Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredList.map((item) => {
                const isSelected = selectedKanji.id === item.id;
                const isMastered = progress.masteredKanji.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedKanji(item);
                      audioService.speak(item.kanji);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none text-center relative ${
                      isSelected
                        ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20 scale-[1.02]'
                        : isMastered
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 hover:border-[#BC002D]'
                        : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 hover:border-[#BC002D] shadow-2xs'
                    }`}
                  >
                    {isMastered && !isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute top-2 right-2" />
                    )}

                    <span className="text-3xl font-japanese font-black block my-1">
                      {item.kanji}
                    </span>
                    <span className={`text-xs font-bold block truncate ${
                      isSelected ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.meaningId}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${
                      isSelected ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {item.strokes} Goresan
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Kanji Deep Dive & Sentence Practice */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
            {/* Top header of selected kanji */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-japanese font-black text-5xl shadow-md border border-neutral-800">
                  {selectedKanji.kanji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                      {selectedKanji.meaningId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold">
                      JLPT {selectedKanji.jlpt}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Radikal: <span className="font-japanese font-bold text-gray-700 dark:text-gray-200">{selectedKanji.radical}</span> • {selectedKanji.strokes} Goresan
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => audioService.speak(selectedKanji.kanji)}
                  className="p-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-white transition"
                  title="Dengar Suara Kanji"
                >
                  <Volume2 className="w-4 h-4 text-[#BC002D]" />
                </button>

                <button
                  onClick={() => handleSelectKanjiForPractice(selectedKanji)}
                  className="px-4 py-2.5 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Latihan Tulis</span>
                </button>

                <button
                  onClick={() => toggleMastery(selectedKanji)}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
                    progress.masteredKanji.includes(selectedKanji.id)
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-gray-700 dark:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{progress.masteredKanji.includes(selectedKanji.id) ? 'Dikuasai ✓' : 'Tandai Hafal'}</span>
                </button>
              </div>
            </div>

            {/* Onyomi & Kunyomi Readings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  On'yomi (音読み - Cara Baca Cina)
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedKanji.onyomi.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => audioService.speak(r)}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#1A1A1A] text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 flex items-center gap-1 hover:border-[#BC002D] font-japanese shadow-2xs"
                    >
                      <span>{r}</span>
                      <Volume2 className="w-3 h-3 text-[#BC002D] opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Kun'yomi (訓読み - Cara Baca Jepang)
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedKanji.kunyomi.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => audioService.speak(r.replace(/\./g, ''))}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#1A1A1A] text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 flex items-center gap-1 hover:border-[#BC002D] font-japanese shadow-2xs"
                    >
                      <span>{r}</span>
                      <Volume2 className="w-3 h-3 text-[#BC002D] opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Real-World Sentences Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#BC002D]" />
                <span>Contoh Penggunaan dalam Kalimat Sehari-hari</span>
              </h4>

              <div className="space-y-2.5">
                {selectedKanji.examples.map((sent, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 space-y-2 hover:border-[#BC002D]/40 transition group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base sm:text-lg font-japanese font-bold text-[#1A1A1A] dark:text-white leading-relaxed">
                          {showFurigana ? (
                            <span className="text-[#BC002D] dark:text-rose-400">{sent.furigana}</span>
                          ) : (
                            sent.japanese
                          )}
                        </p>
                        <p className="text-xs text-gray-500 italic mt-0.5">
                          {sent.romaji}
                        </p>
                      </div>

                      <button
                        onClick={() => audioService.speak(sent.japanese)}
                        className="p-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:text-[#BC002D] shadow-2xs transition shrink-0"
                        title="Dengarkan Kalimat"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 pt-1 border-t border-gray-200/60 dark:border-neutral-800">
                      🇮🇩 {sent.meaningId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: KANJI QUIZ MODE ===================== */}
      {activeTab === 'quiz' && (
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] text-xs font-bold border border-[#BC002D]/20">
                  Kuis Kanji {selectedLevel}: Soal {quizIndex + 1} / {quizQuestions.length}
                </span>
                <span className="text-xs font-bold text-gray-500">
                  Skor: <span className="text-emerald-500 font-extrabold">{quizScore}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#BC002D] rounded-full transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 text-center space-y-3">
                <span className="text-xs font-semibold text-gray-400">Pilihlah arti yang tepat untuk Kanji ini:</span>
                <h3 className="text-6xl font-japanese font-bold text-[#1A1A1A] dark:text-white my-2">
                  {quizQuestions[quizIndex]?.kanji.kanji}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-japanese">
                  Onyomi: {quizQuestions[quizIndex]?.kanji.onyomi.join(', ') || '-'} • Kunyomi: {quizQuestions[quizIndex]?.kanji.kunyomi.join(', ') || '-'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[quizIndex]?.options.map((opt, idx) => {
                  const isCorrect = opt === quizQuestions[quizIndex].correct;
                  const isChosen = quizAnswered === opt;

                  let btnStyle = 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-[#BC002D]';
                  if (quizAnswered !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 border-emerald-500 text-white shadow-xs';
                    } else if (isChosen) {
                      btnStyle = 'bg-[#BC002D] border-[#BC002D] text-white shadow-xs';
                    } else {
                      btnStyle = 'opacity-40 border-gray-200 dark:border-neutral-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizAnswer(opt)}
                      disabled={quizAnswered !== null}
                      className={`p-3.5 rounded-2xl border-2 font-bold text-sm transition flex items-center justify-center ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">Kuis Kanji Selesai!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Skor Anda: <span className="font-extrabold text-[#BC002D] text-xl">{quizScore} / {quizQuestions.length}</span>
              </p>
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={startKanjiQuiz}
                  className="px-5 py-2.5 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold transition shadow-xs"
                >
                  Ulangi Kuis
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-5 py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold transition"
                >
                  Kembali ke Daftar Kanji
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
