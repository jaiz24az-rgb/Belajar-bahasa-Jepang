import React, { useState, useRef, useEffect } from 'react';
import { Volume2, CheckCircle2, RotateCcw, PenTool, BookOpen, Sparkles, HelpCircle, Layers, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanaItem, ScriptType, KanaType, UserProgress } from '../types';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../data/kanaData';
import { audioService } from '../services/audioService';
import { StorageService } from '../services/storageService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

type TabMode = 'chart' | 'practice_canvas' | 'quiz' | 'flashcards';

export const KanaPractice: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [script, setScript] = useState<ScriptType>('hiragana');
  const [kanaType, setKanaType] = useState<KanaType>('gojuon');
  const [mode, setMode] = useState<TabMode>('chart');
  const [selectedKana, setSelectedKana] = useState<KanaItem>(HIRAGANA_DATA[0]);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Array<{ item: KanaItem; options: string[]; correct: string; isAudioQuiz?: boolean }>>([]);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizModeType, setQuizModeType] = useState<'standard' | 'listening'>('standard');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentDataset = script === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
  const filteredKana = currentDataset.filter((item) => item.type === kanaType);

  // Initialize canvas
  useEffect(() => {
    if (mode === 'practice_canvas' && canvasRef.current) {
      clearCanvas();
    }
  }, [mode, selectedKana, showGuide]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#BC002D';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Start Quiz
  const startQuiz = (type: 'standard' | 'listening' = 'standard') => {
    setQuizModeType(type);
    const shuffled = [...currentDataset].sort(() => Math.random() - 0.5).slice(0, 10);
    const generated = shuffled.map((item) => {
      const wrongOptions = currentDataset
        .filter((k) => k.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((k) => (type === 'listening' ? k.char : k.romaji));

      const correct = type === 'listening' ? item.char : item.romaji;
      const options = [...wrongOptions, correct].sort(() => Math.random() - 0.5);

      return {
        item,
        options,
        correct,
        isAudioQuiz: type === 'listening',
      };
    });

    setQuizQuestions(generated);
    setQuizCurrentIndex(0);
    setQuizScore(0);
    setQuizTotal(generated.length);
    setQuizAnswered(null);
    setQuizFinished(false);
    setMode('quiz');

    if (type === 'listening' && generated[0]) {
      audioService.speak(generated[0].item.char);
    }
  };

  const handleSelectQuizAnswer = (chosen: string) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(chosen);

    const currentQ = quizQuestions[quizCurrentIndex];
    if (chosen === currentQ.correct) {
      audioService.playSound('correct');
      setQuizScore((prev) => prev + 1);
    } else {
      audioService.playSound('wrong');
    }

    setTimeout(() => {
      if (quizCurrentIndex + 1 < quizQuestions.length) {
        const nextIdx = quizCurrentIndex + 1;
        setQuizCurrentIndex(nextIdx);
        setQuizAnswered(null);
        if (quizQuestions[nextIdx].isAudioQuiz) {
          audioService.speak(quizQuestions[nextIdx].item.char);
        }
      } else {
        setQuizFinished(true);
        const finalScore = quizScore + (chosen === currentQ.correct ? 1 : 0);
        if (finalScore >= 8) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          audioService.playSound('levelup');
        }
        const updated = StorageService.addXP(finalScore * 15, 'Kana Quiz');
        onUpdateProgress(updated);
      }
    }, 1200);
  };

  const toggleMastery = (kana: KanaItem) => {
    audioService.playSound('click');
    const updated = StorageService.markKanaMastered(kana.id);
    onUpdateProgress(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Alphabet Foundation
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">かなマスター</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold">あア</span>
            <span>Mastery Hiragana & Katakana</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fondasi esensial aksara Jepang dengan audio native, kanvas penulisan, & kuis progresif
          </p>
        </div>

        {/* Script selector */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs self-start sm:self-center">
          <button
            onClick={() => {
              setScript('hiragana');
              audioService.playSound('click');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition font-japanese ${
              script === 'hiragana'
                ? 'bg-[#BC002D] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
            }`}
          >
            Hiragana (ひらがな)
          </button>
          <button
            onClick={() => {
              setScript('katakana');
              audioService.playSound('click');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition font-japanese ${
              script === 'katakana'
                ? 'bg-[#BC002D] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
            }`}
          >
            Katakana (カタカナ)
          </button>
        </div>
      </div>

      {/* Mode Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-3">
        <button
          onClick={() => {
            setMode('chart');
            audioService.playSound('click');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition ${
            mode === 'chart'
              ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-xs'
              : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tabel Huruf (Chart)</span>
        </button>

        <button
          onClick={() => {
            setMode('practice_canvas');
            audioService.playSound('click');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition ${
            mode === 'practice_canvas'
              ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-xs'
              : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Kanvas Menulis ({selectedKana.char})</span>
        </button>

        <button
          onClick={() => {
            setMode('flashcards');
            audioService.playSound('click');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition ${
            mode === 'flashcards'
              ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-xs'
              : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Flashcard Cepat</span>
        </button>

        <button
          onClick={() => startQuiz('standard')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-[#BC002D] hover:bg-[#a30027] text-white shadow-xs transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Mulai Kuis Pilihan Ganda</span>
        </button>

        <button
          onClick={() => startQuiz('listening')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition"
        >
          <Volume2 className="w-4 h-4" />
          <span>Kuis Tebak Suara (Listening)</span>
        </button>
      </div>

      {/* ===================== MODE 1: CHART VIEW ===================== */}
      {mode === 'chart' && (
        <div className="space-y-5">
          {/* Kana Type Filter */}
          <div className="flex items-center gap-2">
            {[
              { id: 'gojuon', label: 'Gojūon (46 Dasar)' },
              { id: 'dakuon', label: 'Dakuon (゛/゜)' },
              { id: 'yoon', label: 'Yōon (Kombinasi ゃ/ゅ/ょ)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setKanaType(t.id as KanaType);
                  audioService.playSound('click');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  kanaType === t.id
                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid of Kana Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredKana.map((item) => {
              const isMastered = progress.masteredKana.includes(item.id);
              const isSelected = selectedKana.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedKana(item);
                    audioService.speak(item.char);
                  }}
                  className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer select-none group flex flex-col items-center justify-between text-center ${
                    isSelected
                      ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20 scale-105'
                      : isMastered
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 hover:border-[#BC002D]'
                      : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 hover:border-[#BC002D] shadow-2xs'
                  }`}
                >
                  {/* Mastered check icon */}
                  {isMastered && !isSelected && (
                    <span className="absolute top-2 right-2 text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}

                  {/* Character */}
                  <span className="text-3xl font-japanese font-black tracking-wide my-1">
                    {item.char}
                  </span>

                  {/* Romaji */}
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isSelected ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.romaji}
                  </span>

                  {/* Audio trigger button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioService.speak(item.char);
                    }}
                    className={`mt-2 p-1.5 rounded-full transition ${
                      isSelected
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-500 hover:text-[#BC002D]'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Kana Detail Card */}
          {selectedKana && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center font-japanese font-black text-5xl shadow-md shadow-[#BC002D]/20">
                  {selectedKana.char}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#1A1A1A] dark:text-white uppercase">
                      /{selectedKana.romaji}/
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-bold text-gray-600 dark:text-gray-300">
                      {selectedKana.strokeCount} Goresan
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    💡 Mnemonic: "{selectedKana.mnemonic}"
                  </p>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Contoh Kata: <span className="font-bold text-[#BC002D] font-japanese">{selectedKana.exampleWord}</span> ({selectedKana.exampleWordMeaning})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => audioService.speak(selectedKana.char)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-xs font-bold text-[#1A1A1A] dark:text-white transition"
                >
                  <Volume2 className="w-4 h-4 text-[#BC002D]" />
                  <span>Dengar Suara</span>
                </button>

                <button
                  onClick={() => setMode('practice_canvas')}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1A1A1A] dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-xs font-bold text-white dark:text-[#1A1A1A] transition"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Latih Menulis</span>
                </button>

                <button
                  onClick={() => toggleMastery(selectedKana)}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
                    progress.masteredKana.includes(selectedKana.id)
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{progress.masteredKana.includes(selectedKana.id) ? 'Dikuasai ✓' : 'Tandai Hafal (+20 XP)'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== MODE 2: CANVAS PRACTICE ===================== */}
      {mode === 'practice_canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kana picker sidebar */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pilih Huruf untuk Ditulis:</h3>
            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
              {currentDataset.slice(0, 46).map((k) => (
                <button
                  key={k.id}
                  onClick={() => {
                    setSelectedKana(k);
                    audioService.speak(k.char);
                  }}
                  className={`p-2 rounded-xl text-center font-japanese font-bold text-lg border transition ${
                    selectedKana.id === k.id
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                  }`}
                >
                  {k.char}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Canvas Area */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Latihan Menulis Goresan</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                Karakter: <span className="font-japanese font-black text-rose-600">{selectedKana.char}</span> ({selectedKana.romaji})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gunakan kursor atau jari Anda untuk menggambar di kanvas bergrid.</p>
            </div>

            {/* Canvas Box */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden bg-slate-50 dark:bg-slate-900 canvas-grid flex items-center justify-center touch-none">
              {/* Background Guide Character */}
              {showGuide && (
                <span className="absolute font-japanese font-black text-[180px] text-slate-300/40 dark:text-slate-700/40 select-none pointer-events-none">
                  {selectedKana.char}
                </span>
              )}

              {/* Grid center guidelines */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-rose-500/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-rose-500/20 pointer-events-none" />

              {/* HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="relative z-10 cursor-crosshair w-full h-full"
              />
            </div>

            {/* Canvas Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Hapus Kanvas</span>
              </button>

              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  showGuide
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                    : 'bg-slate-100 dark:bg-slate-700 border-transparent text-slate-600 dark:text-slate-400'
                }`}
              >
                {showGuide ? 'Sembunyikan Pola' : 'Tampilkan Pola'}
              </button>

              <button
                onClick={() => {
                  audioService.speak(selectedKana.char);
                  audioService.playSound('correct');
                  const updated = StorageService.addXP(10, 'Canvas Practice');
                  onUpdateProgress(updated);
                  confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Latihan (+10 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODE 3: KANA QUIZ ===================== */}
      {mode === 'quiz' && (
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
          {!quizFinished ? (
            <>
              {/* Quiz Header */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold">
                  Pertanyaan {quizCurrentIndex + 1} / {quizTotal}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Skor: <span className="text-emerald-500 font-extrabold">{quizScore}</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${((quizCurrentIndex + 1) / quizTotal) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                {quizQuestions[quizCurrentIndex]?.isAudioQuiz ? (
                  <div>
                    <button
                      onClick={() => audioService.speak(quizQuestions[quizCurrentIndex].item.char)}
                      className="w-20 h-20 mx-auto rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 transition transform hover:scale-105"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-semibold">
                      Tekan tombol untuk mendengarkan pelafalan, lalu pilih karakter yang sesuai.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-semibold text-slate-400">Pilihlah Romaji yang tepat:</span>
                    <h3 className="text-6xl font-japanese font-black text-slate-900 dark:text-white my-3">
                      {quizQuestions[quizCurrentIndex]?.item.char}
                    </h3>
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {quizQuestions[quizCurrentIndex]?.options.map((opt, idx) => {
                  const isCorrect = opt === quizQuestions[quizCurrentIndex].correct;
                  const isChosen = quizAnswered === opt;

                  let btnStyle = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-400';
                  if (quizAnswered !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/25';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizAnswer(opt)}
                      disabled={quizAnswered !== null}
                      className={`p-4 rounded-xl border-2 font-bold text-lg transition flex items-center justify-center ${btnStyle} ${
                        quizQuestions[quizCurrentIndex]?.isAudioQuiz ? 'font-japanese text-2xl' : 'uppercase'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Quiz Completion Summary */
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Kuis Selesai!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Skor Anda: <span className="font-extrabold text-rose-500 text-xl">{quizScore} / {quizTotal}</span>
              </p>
              <p className="text-xs text-slate-500">
                {quizScore >= 8 ? '🎉 Luar biasa! Kemampuan mengenali huruf Anda sangat tajam.' : 'Teruslah berlatih untuk mencapai skor 100%!'}
              </p>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => startQuiz(quizModeType)}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-md shadow-rose-500/20"
                >
                  Ulangi Kuis
                </button>
                <button
                  onClick={() => setMode('chart')}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
                >
                  Kembali ke Tabel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== MODE 4: FLASHCARDS ===================== */}
      {mode === 'flashcards' && (
        <div className="max-w-md mx-auto p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Kartu {flashcardIndex + 1} dari {currentDataset.length}</span>
            <button
              onClick={() => audioService.speak(currentDataset[flashcardIndex].char)}
              className="text-rose-500 flex items-center gap-1 hover:underline"
            >
              <Volume2 className="w-4 h-4" /> Dengar
            </button>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white border border-slate-700 shadow-xl flex flex-col items-center justify-center p-6 cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02]"
          >
            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-7xl font-japanese font-black text-rose-400">
                  {currentDataset[flashcardIndex].char}
                </span>
                <p className="text-xs text-slate-400 font-medium">Klik untuk membalik kartu</p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-4xl font-extrabold text-white uppercase tracking-wider">
                  /{currentDataset[flashcardIndex].romaji}/
                </span>
                <p className="text-sm text-rose-300 font-medium italic">
                  "{currentDataset[flashcardIndex].mnemonic}"
                </p>
                <div className="pt-2 border-t border-slate-700 text-xs text-slate-300">
                  Contoh: <span className="font-japanese font-bold text-white">{currentDataset[flashcardIndex].exampleWord}</span> ({currentDataset[flashcardIndex].exampleWordMeaning})
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : currentDataset.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={() => {
                toggleMastery(currentDataset[flashcardIndex]);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-sm"
            >
              Hafal (+20 XP)
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev + 1) % currentDataset.length);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              Berikutnya →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
