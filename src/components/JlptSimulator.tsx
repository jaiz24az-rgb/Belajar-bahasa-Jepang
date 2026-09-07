import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, XCircle, AlertCircle, Sparkles, Volume2, Award, ArrowRight, ArrowLeft, RefreshCw, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { JLPTExam, JLPTExamResult, JLPTQuestion, JLPTLevel, UserProgress } from '../types';
import { JLPT_EXAMS } from '../data/jlptData';
import { audioService } from '../services/audioService';
import { getAIJlptExplanation } from '../services/geminiService';
import { StorageService } from '../services/storageService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const JlptSimulator: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [activeExam, setActiveExam] = useState<JLPTExam>(JLPT_EXAMS[0]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Time remaining in seconds
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);

  // Current question index in flattened pool
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [examResult, setExamResult] = useState<JLPTExamResult | null>(null);

  // AI Explanation state
  const [aiLoadingForQ, setAiLoadingForQ] = useState<string | null>(null);
  const [aiExplanations, setAiExplanations] = useState<{ [qId: string]: any }>({});

  // Flatten questions from all sections
  const allQuestions: JLPTQuestion[] = [
    ...activeExam.sections.mojigoi,
    ...activeExam.sections.dokkai,
    ...activeExam.sections.choukai,
  ];

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (examStarted && !examFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, examFinished, timeLeft]);

  const handleStartExam = (exam: JLPTExam) => {
    setActiveExam(exam);
    setTimeLeft(exam.durationMinutes * 60);
    setUserAnswers({});
    setCurrentIndex(0);
    setExamStarted(true);
    setExamFinished(false);
    setExamResult(null);
    setAiExplanations({});
    audioService.playSound('click');
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
    audioService.playSound('click');
  };

  const handleSubmitExam = () => {
    setExamFinished(true);
    setExamStarted(false);

    // Calculate score
    let mojigoiCorrect = 0;
    let dokkaiCorrect = 0;
    let choukaiCorrect = 0;

    activeExam.sections.mojigoi.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) mojigoiCorrect++;
    });

    activeExam.sections.dokkai.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) dokkaiCorrect++;
    });

    activeExam.sections.choukai.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) choukaiCorrect++;
    });

    const mojigoiScore = Math.round((mojigoiCorrect / Math.max(1, activeExam.sections.mojigoi.length)) * 60);
    const dokkaiScore = Math.round((dokkaiCorrect / Math.max(1, activeExam.sections.dokkai.length)) * 60);
    const choukaiScore = Math.round((choukaiCorrect / Math.max(1, activeExam.sections.choukai.length)) * 60);
    const totalEarned = mojigoiScore + dokkaiScore + choukaiScore;
    const passed = totalEarned >= activeExam.passingScore;

    const result: JLPTExamResult = {
      id: `jlpt_${Date.now()}`,
      examId: activeExam.id,
      level: activeExam.level,
      date: new Date().toISOString(),
      totalScore: totalEarned,
      maxScore: activeExam.totalScore,
      passed,
      sectionScores: {
        mojigoi: mojigoiScore,
        dokkai: dokkaiScore,
        choukai: choukaiScore,
      },
      answers: userAnswers,
    };

    setExamResult(result);
    if (passed) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      audioService.playSound('levelup');
    } else {
      audioService.playSound('wrong');
    }

    const updated = StorageService.recordJLPTResult(result);
    onUpdateProgress(updated);
  };

  const fetchAIExplanation = async (q: JLPTQuestion) => {
    setAiLoadingForQ(q.id);
    const userSelectedIdx = userAnswers[q.id];
    const userAns = userSelectedIdx !== undefined ? q.options[userSelectedIdx] : 'Belum Dijawab';
    const correctAns = q.options[q.correctIndex];

    try {
      const expl = await getAIJlptExplanation(
        q.prompt,
        q.options,
        userAns,
        correctAns,
        activeExam.level,
        q.section
      );
      setAiExplanations((prev) => ({ ...prev, [q.id]: expl }));
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoadingForQ(null);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = allQuestions[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Standard Certification
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">日本語能力試験</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold">試験</span>
            <span>Simulasi Ujian Resmi JLPT (N5 - N1)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Format ujian Japanese Language Proficiency Test autentik dengan batasan waktu & analisis AI Gemini
          </p>
        </div>

        {!examStarted && !examFinished && (
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs self-start sm:self-center">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  const found = JLPT_EXAMS.find((e) => e.level === lvl);
                  if (found) setActiveExam(found);
                  audioService.playSound('click');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedLevel === lvl
                    ? 'bg-[#BC002D] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===================== VIEW 1: EXAM OVERVIEW / START SCREEN ===================== */}
      {!examStarted && !examFinished && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#BC002D]/10 text-[#BC002D] border border-[#BC002D]/20 text-xs font-bold">
                LEVEL JLPT {activeExam.level}
              </span>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-2">
                {activeExam.title}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#BC002D]/10 text-[#BC002D] flex items-center justify-center font-japanese font-bold text-2xl border border-[#BC002D]/20 shadow-2xs">
              合
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
              <span className="text-xs text-gray-400 font-medium">Durasi Waktu</span>
              <p className="text-lg font-bold text-[#1A1A1A] dark:text-white mt-0.5">{activeExam.durationMinutes} Menit</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
              <span className="text-xs text-gray-400 font-medium">Ambang Kelulusan</span>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{activeExam.passingScore} / {activeExam.totalScore}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
              <span className="text-xs text-gray-400 font-medium">Jumlah Soal</span>
              <p className="text-lg font-bold text-[#1A1A1A] dark:text-white mt-0.5">{allQuestions.length} Soal</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-neutral-900/60 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800">
            <p className="font-bold text-[#BC002D]">Struktur Komprehensif Ujian:</p>
            <p>1. <strong>言語知識・文字・語彙 (Vocabulary):</strong> {activeExam.sections.mojigoi.length} Soal cara baca dan makna kanji.</p>
            <p>2. <strong>読解・文法 (Reading & Grammar):</strong> {activeExam.sections.dokkai.length} Soal partikel dan bacaan pendek.</p>
            <p>3. <strong>聴解 (Listening Audio):</strong> {activeExam.sections.choukai.length} Soal mendengarkan audio penutur asli.</p>
          </div>

          <button
            onClick={() => handleStartExam(activeExam)}
            className="w-full py-4 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white font-bold text-sm shadow-md shadow-[#BC002D]/20 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Mulai Ujian Simulasi Resmi Sekarang</span>
          </button>
        </div>
      )}

      {/* ===================== VIEW 2: ACTIVE EXAM SCREEN ===================== */}
      {examStarted && !examFinished && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Navigation Drawer */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-4">
            {/* Timer Box */}
            <div className="p-4 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-between border border-neutral-800">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-rose-400 animate-spin" />
                <span className="text-xs font-medium text-gray-400">Sisa Waktu:</span>
              </div>
              <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-[#BC002D] animate-pulse' : 'text-emerald-400'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Daftar Soal Ujian:</span>
              <div className="grid grid-cols-5 gap-2">
                {allQuestions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = currentIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl font-bold text-xs border transition ${
                        isCurrent
                          ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-xs'
                          : isAnswered
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-neutral-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSubmitExam}
              className="w-full py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-[#1A1A1A] dark:text-white text-xs font-bold transition shadow-2xs"
            >
              Kumpulkan Lembar Jawaban
            </button>
          </div>

          {/* Active Question Box */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
            {/* Section Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <span className="px-3.5 py-1 rounded-full bg-[#BC002D]/10 text-[#BC002D] border border-[#BC002D]/20 text-xs font-bold uppercase">
                Bagian: {currentQ.section === 'mojigoi' ? '文字・語彙 (Kosakata & Kanji)' : currentQ.section === 'dokkai' ? '読解・文法 (Tata Bahasa & Bacaan)' : '聴解 (Mendengar)'}
              </span>
              <span className="text-xs font-bold text-gray-400">
                Soal {currentIndex + 1} dari {allQuestions.length}
              </span>
            </div>

            {/* If audio listening question */}
            {currentQ.audioText && (
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-200 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#BC002D]">Audio Percakapan Penutur Asli:</span>
                  <p className="text-xs text-gray-500">Dengarkan rekaman lalu pilih jawaban yang tepat.</p>
                </div>
                <button
                  onClick={() => audioService.speak(currentQ.audioText!)}
                  className="px-4 py-2.5 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#BC002D]/20 transition shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Putar Audio Soal</span>
                </button>
              </div>
            )}

            {/* If reading passage */}
            {currentQ.passage && (
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 font-japanese text-sm leading-relaxed whitespace-pre-line text-[#1A1A1A] dark:text-white">
                {currentQ.passage}
              </div>
            )}

            {/* Prompt */}
            <div className="space-y-2">
              <h4 className="text-lg font-japanese font-bold text-[#1A1A1A] dark:text-white leading-relaxed whitespace-pre-line">
                {currentQ.prompt}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full p-4 rounded-2xl border text-left font-japanese font-bold text-base transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20'
                        : 'bg-gray-50 dark:bg-neutral-900/60 border-gray-200 dark:border-neutral-800 text-gray-800 dark:text-gray-200 hover:border-[#BC002D]'
                    }`}
                  >
                    <span>{idx + 1}. {opt}</span>
                    {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gray-100 dark:bg-neutral-800 disabled:opacity-40 text-xs font-bold text-gray-700 dark:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4" /> Soal Sebelumnya
              </button>

              {currentIndex + 1 < allQuestions.length ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(allQuestions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold shadow-xs"
                >
                  Soal Berikutnya <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Selesaikan Ujian ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================== VIEW 3: COMPREHENSIVE SCORE REPORT ===================== */}
      {examFinished && examResult && (
        <div className="space-y-6">
          {/* Certificate / Score Banner */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs text-center space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-md ${
                examResult.passed
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-[#BC002D] text-white shadow-[#BC002D]/20'
              }`}>
                {examResult.passed ? '💮' : '📖'}
              </div>
              <h3 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mt-2">
                {examResult.passed ? 'Selamat! Anda Dinyatakan LULUS (合格)' : 'Belum Mencapai Ambang Kelulusan (不合格)'}
              </h3>
              <p className="text-xs text-gray-500">
                Hasil Simulasi Ujian JLPT Level {activeExam.level} • {new Date().toLocaleDateString('id-ID')}
              </p>
            </div>

            {/* Score Breakdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
                <span className="text-[11px] text-gray-400 font-bold uppercase">文字・語彙</span>
                <p className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-1">{examResult.sectionScores.mojigoi} / 60</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
                <span className="text-[11px] text-gray-400 font-bold uppercase">読解・文法</span>
                <p className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-1">{examResult.sectionScores.dokkai} / 60</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
                <span className="text-[11px] text-gray-400 font-bold uppercase">聴解</span>
                <p className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-1">{examResult.sectionScores.choukai} / 60</p>
              </div>
              <div className={`p-4 rounded-2xl border ${
                examResult.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-[#BC002D]/10 border-[#BC002D]/30 text-[#BC002D] dark:text-rose-400'
              }`}>
                <span className="text-[11px] font-bold uppercase">Skor Total</span>
                <p className="text-2xl font-bold mt-0.5">{examResult.totalScore} / {activeExam.totalScore}</p>
                <span className="text-[10px] font-bold">Min. {activeExam.passingScore} untuk Lulus</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleStartExam(activeExam)}
                className="px-6 py-2.5 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold shadow-md shadow-[#BC002D]/20 transition"
              >
                Ulangi Ujian Ini
              </button>
              <button
                onClick={() => {
                  setExamFinished(false);
                  setExamStarted(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-[#1A1A1A] dark:text-white text-xs font-bold transition"
              >
                Pilih Level Lain
              </button>
            </div>
          </div>

          {/* Detailed Question Review with AI Guru Explanations */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
            <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#BC002D]" />
              <span>Pembahasan Soal Lengkap & Analisis AI Guru Gemini</span>
            </h4>

            <div className="space-y-4">
              {allQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                const aiExpl = aiExplanations[q.id];
                const isAiLoading = aiLoadingForQ === q.id;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          isCorrect ? 'bg-emerald-500' : 'bg-[#BC002D]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs uppercase text-gray-500">
                          {q.section}
                        </span>
                      </div>

                      <button
                        onClick={() => fetchAIExplanation(q)}
                        disabled={isAiLoading}
                        className="px-3.5 py-1.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 hover:border-[#BC002D] text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition shadow-2xs"
                      >
                        <Sparkles className={`w-3.5 h-3.5 text-[#BC002D] ${isAiLoading ? 'animate-spin' : ''}`} />
                        <span>{isAiLoading ? 'Menganalisis...' : 'Minta Analisis AI Gemini'}</span>
                      </button>
                    </div>

                    <p className="text-base font-japanese font-bold text-[#1A1A1A] dark:text-white leading-relaxed">
                      {q.prompt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
                        <span className="text-gray-400 font-semibold">Jawaban Anda: </span>
                        <span className={`font-bold font-japanese ${isCorrect ? 'text-emerald-600' : 'text-[#BC002D]'}`}>
                          {userAns !== undefined ? q.options[userAns] : '(Tidak Dijawab)'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
                        <span className="text-gray-400 font-semibold">Jawaban Benar: </span>
                        <span className="font-bold text-emerald-600 font-japanese">
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                    </div>

                    {/* Standard static explanation */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      💡 <strong>Kunci Jawaban:</strong> {q.explanation}
                    </p>

                    {/* Dynamic Gemini AI Breakdown */}
                    {aiExpl && (
                      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-gray-800 dark:text-gray-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                          <Sparkles className="w-4 h-4" />
                          <span>Analisis Mendalam AI Guru:</span>
                        </div>
                        <p>{aiExpl.correctExplanation}</p>
                        <p className="text-gray-600 dark:text-gray-300"><strong>Pengecoh Soal:</strong> {aiExpl.distractorAnalysis}</p>
                        {aiExpl.examTip && (
                          <p className="text-amber-700 dark:text-amber-300 font-semibold">🎯 Tips Ujian: {aiExpl.examTip}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
