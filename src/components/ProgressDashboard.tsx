import React, { useState, useEffect } from 'react';
import { 
  Flame, Trophy, Award, Zap, BookOpen, Volume2, Mic, 
  CheckCircle2, Star, Calendar, ArrowRight, ShieldCheck, 
  Play, Sparkles, Target, Layers, BookmarkCheck, Clock,
  RefreshCw, BarChart2, Eye, Printer, AlertTriangle, FileText
} from 'lucide-react';
import { UserProgress, ModuleMetric, WeeklyMonthlyGoals, PersonalizedFeedbackReport } from '../types';
import { BADGES_DATA } from '../data/badgesData';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { audioService } from '../services/audioService';
import { StorageService, DEFAULT_GOALS } from '../services/storageService';
import { getAIProgressDiagnostics } from '../services/geminiService';
import { RadarChart8D } from './progress/RadarChart8D';
import { ModuleBreakdownView } from './progress/ModuleBreakdownView';
import { PersonalizedDiagnosticsView } from './progress/PersonalizedDiagnosticsView';
import { GoalManagerModal } from './progress/GoalManagerModal';
import { CertificateModal } from './progress/CertificateModal';
import { CelebrationModal } from './progress/CelebrationModal';

interface Props {
  progress: UserProgress;
  onNavigateTab: (tab: any) => void;
  onUpdateProgress?: (progress: UserProgress) => void;
}

export const ProgressDashboard: React.FC<Props> = ({ progress, onNavigateTab, onUpdateProgress }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'modules' | 'diagnostics' | 'goals' | 'achievements'>('overview');
  
  // Modals state
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [celebrationState, setCelebrationState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    rewardXP: number;
    badgeName?: string;
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    rewardXP: 0,
  });

  // Diagnostics AI state
  const [diagnosticsReport, setDiagnosticsReport] = useState<PersonalizedFeedbackReport | null>(
    progress.aiDiagnostics || null
  );
  const [isEvaluatingAI, setIsEvaluatingAI] = useState(false);

  // Compute speech averages
  const speechEntries: Array<{ bestScore: number; attempts: number; lastDate: string }> = Object.values(progress.speechPractices || {});
  const avgSpeechScore = speechEntries.length > 0 
    ? Math.round(speechEntries.reduce((acc: number, curr) => acc + curr.bestScore, 0) / speechEntries.length)
    : 92;

  // Compute 8 Detailed Module Metrics
  const hiraganaCount = progress.masteredKana.filter(id => id.startsWith('h_')).length || 10;
  const katakanaCount = progress.masteredKana.filter(id => id.startsWith('k_') || id.startsWith('s_')).length || 5;
  const kanjiCount = progress.masteredKanji.length || 5;
  const grammarCount = progress.masteredGrammar?.length || 4;
  const vocabCount = progress.masteredVocab?.length || 6;
  const listeningMinutes = progress.listeningMinutesSpent || 28;
  const speechCount = Object.keys(progress.speechPractices || {}).length || 3;
  const jlptExamsCount = progress.jlptHistory.length;

  const moduleMetrics: ModuleMetric[] = [
    {
      id: 'hiragana',
      name: 'Hiragana',
      nameJa: 'ひらがな',
      category: 'Aksara Dasar',
      progressPercent: Math.min(100, Math.round((hiraganaCount / 46) * 100)),
      currentCount: hiraganaCount,
      targetCount: 46,
      unit: 'Huruf',
      accuracy: 98,
      status: hiraganaCount >= 30 ? 'Mastered' : 'On Track',
      color: '#F43F5E',
      routeTab: 'kana',
      highlights: ['46 Gojuon Dasar', 'Dakuon & Handakuon', 'Yoon Kombinasi']
    },
    {
      id: 'katakana',
      name: 'Katakana',
      nameJa: 'カタカナ',
      category: 'Kata Serapan',
      progressPercent: Math.min(100, Math.round((katakanaCount / 46) * 100)),
      currentCount: katakanaCount,
      targetCount: 46,
      unit: 'Huruf',
      accuracy: 94,
      status: katakanaCount >= 20 ? 'Mastered' : 'On Track',
      color: '#F59E0B',
      routeTab: 'kana',
      highlights: ['Kata Pinjaman Asing', 'Panjang Vokal Choonpu', 'Kombinasi Modern']
    },
    {
      id: 'kanji',
      name: 'Kanji N5–N1',
      nameJa: '漢字学習',
      category: 'Karakter Tionghoa',
      progressPercent: Math.min(100, Math.round((kanjiCount / 20) * 100)),
      currentCount: kanjiCount,
      targetCount: 20,
      unit: 'Kanji',
      accuracy: 88,
      status: kanjiCount >= 10 ? 'On Track' : 'Needs Practice',
      color: '#6366F1',
      routeTab: 'kanji',
      highlights: ['Onyomi & Kunyomi', 'Contoh Kalimat Kontekstual', 'Urutan Goresan']
    },
    {
      id: 'grammar',
      name: 'Tata Bahasa',
      nameJa: '文法マスター',
      category: 'Struktur Kalimat',
      progressPercent: Math.min(100, Math.round((grammarCount / 10) * 100)),
      currentCount: grammarCount,
      targetCount: 10,
      unit: 'Pola',
      accuracy: 86,
      status: grammarCount >= 6 ? 'On Track' : 'Needs Practice',
      color: '#10B981',
      routeTab: 'conversation',
      highlights: ['Partikel (は, が, を, に)', 'Bentuk Te-form & Masu', 'Kalimat Sopan Desu']
    },
    {
      id: 'vocab',
      name: 'Kosakata & Kamus Lengkap',
      nameJa: '語彙・大辞典',
      category: 'Kamus Kosakata & Idiom',
      progressPercent: Math.min(100, Math.round((vocabCount / 25) * 100)),
      currentCount: vocabCount,
      targetCount: 25,
      unit: 'Kata',
      accuracy: 92,
      status: 'On Track',
      color: '#14B8A6',
      routeTab: 'dictionary',
      highlights: ['Kamus Dwiarah ID ⇄ JA', 'Idiom Kanyouku & Yojijukugo', 'Slang & Wakamono Kotoba']
    },
    {
      id: 'listening',
      name: 'Pendengaran',
      nameJa: '聴解ラボ',
      category: 'Choukai Native',
      progressPercent: Math.min(100, Math.round((listeningMinutes / 60) * 100)),
      currentCount: listeningMinutes,
      targetCount: 60,
      unit: 'Menit',
      accuracy: 94,
      status: 'On Track',
      color: '#3B82F6',
      routeTab: 'listening',
      highlights: ['Audio Penutur Asli', 'Percakapan Stasiun & Resto', 'Variasi Kecepatan']
    },
    {
      id: 'speaking',
      name: 'Percakapan & Bicara',
      nameJa: '会話・発音',
      category: 'Pengenalan Suara AI',
      progressPercent: Math.min(100, Math.round((speechCount / 6) * 100)),
      currentCount: speechCount,
      targetCount: 6,
      unit: 'Sesi',
      accuracy: avgSpeechScore,
      status: 'Mastered',
      color: '#A855F7',
      routeTab: 'speaking',
      highlights: ['Uji Intonasi Pitch Accent', 'Analisis Mora Suku Kata', 'Roleplay Interaktif']
    },
    {
      id: 'jlpt',
      name: 'Simulasi JLPT',
      nameJa: '日本語能力試験',
      category: 'Ujian Standar',
      progressPercent: jlptExamsCount > 0 ? 85 : 35,
      currentCount: jlptExamsCount,
      targetCount: 3,
      unit: 'Ujian',
      accuracy: jlptExamsCount > 0 ? 77 : 60,
      status: jlptExamsCount > 0 ? 'On Track' : 'Needs Practice',
      color: '#BC002D',
      routeTab: 'jlpt',
      highlights: ['Format Standar N5–N1', 'Timer Realistis', 'Pembahasan Analisis AI']
    }
  ];

  // Calendar dates for the last 14 days
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
    const dayNumber = d.getDate();
    const isStudied = progress.studiedDates.includes(dateStr);
    const isToday = dateStr === new Date().toISOString().split('T')[0];

    return { dateStr, dayName, dayNumber, isStudied, isToday };
  });

  const goals = progress.goals || DEFAULT_GOALS;

  // Load diagnostics if not present
  useEffect(() => {
    if (!diagnosticsReport) {
      handleGenerateAIDiagnostics();
    }
  }, []);

  const handleGenerateAIDiagnostics = async () => {
    setIsEvaluatingAI(true);
    try {
      const report = await getAIProgressDiagnostics({
        userName: progress.userName,
        metrics: moduleMetrics,
        streak: progress.streak,
        xp: progress.xp,
        targetJLPT: progress.currentJLPTTarget,
        lastExams: progress.jlptHistory,
        speechStats: {
          sessionsCount: speechCount,
          avgScore: avgSpeechScore,
        }
      });
      setDiagnosticsReport(report);
      StorageService.saveAIDiagnostics(report);
    } catch (e) {
      console.error('Failed to generate AI diagnostics:', e);
    } finally {
      setIsEvaluatingAI(false);
    }
  };

  const handleSaveGoals = (updated: WeeklyMonthlyGoals) => {
    const updatedProg = StorageService.updateGoals(updated);
    if (onUpdateProgress) onUpdateProgress(updatedProg);
    setCelebrationState({
      isOpen: true,
      title: 'Target Belajar Berhasil Ditetapkan!',
      subtitle: `Target baru: ${updated.weeklyGoalMinutes} menit belajar & ${updated.weeklyGoalKanji} kanji minggu ini.`,
      rewardXP: 50,
    });
  };

  const handlePlayAudio = (text: string) => {
    audioService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Bento Grid Header Title & Navigation Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Pusat Pelacakan Kemajuan & Analitik
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">総合学習進捗システム</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-white">
            Selamat Datang, {progress.userName}! 🌸
          </h2>
        </div>

        {/* Action Pills: Target, Level, & Certificate Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              audioService.playSound('click');
              setIsCertificateModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Sertifikat Kelulusan</span>
          </button>

          <button
            onClick={() => {
              audioService.playSound('click');
              setIsGoalModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-[#BC002D] transition flex items-center gap-1.5 shadow-2xs"
          >
            <Target className="w-3.5 h-3.5 text-[#BC002D]" />
            <span>Target: <span className="text-[#BC002D] font-extrabold">{progress.currentJLPTTarget}</span></span>
          </button>

          <span className="px-3.5 py-1.5 rounded-full bg-[#BC002D] text-white text-xs font-bold shadow-2xs">
            Level {progress.level} • {progress.xp} XP
          </span>
        </div>
      </div>

      {/* Progress Hub Sub-Navigation Bento Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'overview', label: 'Ringkasan Bento', icon: BarChart2 },
          { id: 'modules', label: '8 Modul Lengkap', icon: Layers },
          { id: 'diagnostics', label: 'Evaluasi AI Sensei', icon: Sparkles },
          { id: 'goals', label: 'Target Mingguan & Bulanan', icon: Target },
          { id: 'achievements', label: 'Pencapaian & Lencana', icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playSound('click');
                setActiveSubTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-[#BC002D] text-white shadow-sm shadow-[#BC002D]/20'
                  : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#BC002D]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-VIEW 1: OVERVIEW BENTO GRID */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-in fade-in duration-200">
          {/* Bento 1: Active Recommendation Spotlight (Col Span 8) */}
          <div className="md:col-span-12 lg:col-span-8 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            <div className="absolute top-0 right-0 p-6 pointer-events-none select-none">
              <span className="text-7xl sm:text-8xl opacity-5 dark:opacity-10 font-bold font-japanese">達人</span>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
                    Pusat Pembelajaran Hari Ini
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#BC002D]/10 text-[#BC002D] font-bold">
                    Target {progress.currentJLPTTarget}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">
                  Kuasai Percakapan Praktis & Uji Pemahaman Fonetik AI
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed mt-2">
                  Tingkatkan kefasihan pengucapan vokal dan pemahaman partikel bahasa Jepang dengan modul percakapan interaktif dan studio pelafalan berbasis audio penutur asli.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      audioService.playSound('click');
                      onNavigateTab('conversation');
                    }}
                    className="bg-[#BC002D] hover:bg-[#a30027] text-white px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-[#BC002D]/20 transition flex items-center gap-2"
                  >
                    <span>Lanjut Belajar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      audioService.playSound('click');
                      setActiveSubTab('diagnostics');
                    }}
                    className="bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-[#1A1A1A] dark:text-white px-4 py-3 rounded-2xl font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#BC002D]" />
                    <span>Evaluasi Sensei</span>
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="flex flex-col min-w-[140px]">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">
                    <span>Target Hari Ini</span>
                    <span className="text-[#BC002D] font-bold">
                      {Math.min(100, Math.round((progress.todayMinutesSpent / progress.dailyGoalMinutes) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#BC002D] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (progress.todayMinutesSpent / progress.dailyGoalMinutes) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 2: 8-Dimension Radar Visualizer Card (Col Span 4) */}
          <div className="md:col-span-12 lg:col-span-4 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">Radar 8 Pilar Kemampuan</h4>
                <p className="text-[11px] text-gray-400">Distribusi keseimbangan skill</p>
              </div>
              <button
                onClick={() => {
                  audioService.playSound('click');
                  setActiveSubTab('modules');
                }}
                className="text-xs font-bold text-[#BC002D] hover:underline"
              >
                Detail
              </button>
            </div>

            <div className="flex items-center justify-center my-1">
              <RadarChart8D metrics={moduleMetrics} size={250} />
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500">
              <span>Rata-rata Penguasaan</span>
              <span className="font-bold text-[#BC002D]">
                {Math.round(moduleMetrics.reduce((acc, m) => acc + m.progressPercent, 0) / moduleMetrics.length)}%
              </span>
            </div>
          </div>

          {/* Bento 3: Weekly & Monthly Goals Progress Card (Col Span 6) */}
          <div className="md:col-span-12 lg:col-span-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">Target Belajar Mingguan</h4>
                  <p className="text-[11px] text-gray-400">Kemajuan minggu ini ({goals.weeklySpentMinutes} / {goals.weeklyGoalMinutes} menit)</p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioService.playSound('click');
                  setIsGoalModalOpen(true);
                }}
                className="text-xs font-bold text-[#BC002D] hover:underline"
              >
                Ubah Target
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {/* Minutes Goal */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600 dark:text-gray-300">Waktu Belajar (Menit)</span>
                  <span className="font-bold text-[#BC002D]">
                    {Math.round((goals.weeklySpentMinutes / goals.weeklyGoalMinutes) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#BC002D] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (goals.weeklySpentMinutes / goals.weeklyGoalMinutes) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Kanji Goal */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600 dark:text-gray-300">Target Hafalan Kanji ({kanjiCount}/{goals.weeklyGoalKanji})</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.min(100, Math.round((kanjiCount / goals.weeklyGoalKanji) * 100))}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (kanjiCount / goals.weeklyGoalKanji) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Speech Sessions Goal */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600 dark:text-gray-300">Latihan Bicara AI ({speechCount}/{goals.weeklyGoalSpeechSessions})</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {Math.min(100, Math.round((speechCount / goals.weeklyGoalSpeechSessions) * 100))}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (speechCount / goals.weeklyGoalSpeechSessions) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bento 4: Strengths & Weaknesses Snapshot (Col Span 6) */}
          <div className="md:col-span-12 lg:col-span-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">Diagnostik Performa Sensei</h4>
                  <p className="text-[11px] text-gray-400">Ulasan kekuatan & fokus latihan terarah</p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioService.playSound('click');
                  setActiveSubTab('diagnostics');
                }}
                className="text-xs font-bold text-[#BC002D] hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Kekuatan: {diagnosticsReport?.strengths[0]?.title || "Pelafalan Intonasi Sangat Baik"}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-[11px] line-clamp-1">{diagnosticsReport?.strengths[0]?.description}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-2.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-800 dark:text-amber-300 block">Area Perbaikan: {diagnosticsReport?.weaknesses[0]?.title || "Kanji On'yomi & Kun'yomi"}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-[11px] line-clamp-1">{diagnosticsReport?.weaknesses[0]?.description}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 5: 14-Day Consistency & Streak Activity Matrix (Col Span 12) */}
          <div className="md:col-span-12 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center text-xl border border-orange-200 dark:border-orange-900/50">
                  🔥
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white">
                    Matriks Konsistensi Belajar:{' '}
                    <span className="text-orange-600 font-extrabold">{progress.streak} Hari Berturut-turut</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Target harian: {progress.dailyGoalMinutes} menit ({progress.todayMinutesSpent} menit tercapai hari ini)
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">Aktivitas 14 Hari Terakhir</span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-1">
              {last14Days.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-2xl border text-center transition flex flex-col items-center justify-between ${
                    day.isStudied
                      ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/40 text-orange-600 dark:text-orange-400'
                      : 'bg-gray-50 dark:bg-neutral-900/40 border-gray-100 dark:border-neutral-800 text-gray-400'
                  } ${day.isToday ? 'ring-2 ring-[#BC002D]' : ''}`}
                >
                  <span className="text-[9px] font-semibold uppercase">{day.dayName}</span>
                  <span className="text-xs font-bold my-1">{day.dayNumber}</span>
                  <Flame
                    className={`w-3.5 h-3.5 ${day.isStudied ? 'text-orange-500 animate-pulse' : 'text-gray-300 dark:text-neutral-700'}`}
                    fill={day.isStudied ? 'currentColor' : 'none'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: 8 MODULES BREAKDOWN */}
      {activeSubTab === 'modules' && (
        <div className="animate-in fade-in duration-200">
          <ModuleBreakdownView
            metrics={moduleMetrics}
            onNavigateTab={onNavigateTab}
          />
        </div>
      )}

      {/* SUB-VIEW 3: PERSONALIZED SENSEI DIAGNOSTICS */}
      {activeSubTab === 'diagnostics' && (
        <div className="animate-in fade-in duration-200">
          <PersonalizedDiagnosticsView
            report={diagnosticsReport}
            isLoading={isEvaluatingAI}
            onRefreshAI={handleGenerateAIDiagnostics}
            onNavigateTab={onNavigateTab}
          />
        </div>
      )}

      {/* SUB-VIEW 4: GOALS PLANNER */}
      {activeSubTab === 'goals' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                    Pusat Pengaturan & Monitoring Target
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-japanese">目標管理 • Mingguan & Bulanan</p>
                </div>
              </div>

              <button
                onClick={() => setIsGoalModalOpen(true)}
                className="bg-[#BC002D] hover:bg-[#a30027] text-white px-6 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span>Sesuaikan Target Sekarang</span>
              </button>
            </div>

            {/* Target Comparison Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Goals Card */}
              <div className="p-6 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-neutral-700 pb-3">
                  <span className="font-bold text-sm text-[#1A1A1A] dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BC002D]"></span>
                    Target Mingguan (週間目標)
                  </span>
                  <span className="text-xs font-bold text-[#BC002D]">
                    {Math.round((goals.weeklySpentMinutes / goals.weeklyGoalMinutes) * 100)}% Selesai
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <span>Waktu Belajar: {goals.weeklySpentMinutes} / {goals.weeklyGoalMinutes} Menit</span>
                      <span className="font-bold text-[#BC002D]">{goals.weeklyGoalMinutes - goals.weeklySpentMinutes > 0 ? `${goals.weeklyGoalMinutes - goals.weeklySpentMinutes} menit lagi` : 'Tuntas!'}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#BC002D] rounded-full" style={{ width: `${Math.min(100, (goals.weeklySpentMinutes / goals.weeklyGoalMinutes) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <span>Hafalan Kanji Baru: {kanjiCount} / {goals.weeklyGoalKanji} Kanji</span>
                      <span className="font-bold text-indigo-600">{goals.weeklyGoalKanji - kanjiCount > 0 ? `${goals.weeklyGoalKanji - kanjiCount} kanji lagi` : 'Tuntas!'}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, (kanjiCount / goals.weeklyGoalKanji) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <span>Latihan Bicara AI: {speechCount} / {goals.weeklyGoalSpeechSessions} Sesi</span>
                      <span className="font-bold text-purple-600">{goals.weeklyGoalSpeechSessions - speechCount > 0 ? `${goals.weeklyGoalSpeechSessions - speechCount} sesi lagi` : 'Tuntas!'}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(100, (speechCount / goals.weeklyGoalSpeechSessions) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Goals Card */}
              <div className="p-6 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-neutral-700 pb-3">
                  <span className="font-bold text-sm text-[#1A1A1A] dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Target Bulanan & Kelulusan JLPT (月間目標)
                  </span>
                  <span className="text-xs font-bold text-amber-600">
                    Target: {goals.monthlyGoalJLPTLevel}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <span>Akumulasi Menit Bulanan: {goals.monthlySpentMinutes} / {goals.monthlyGoalMinutes} Menit</span>
                      <span className="font-bold text-amber-600">{Math.round((goals.monthlySpentMinutes / goals.monthlyGoalMinutes) * 100)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (goals.monthlySpentMinutes / goals.monthlyGoalMinutes) * 100)}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-neutral-800 rounded-2xl border border-gray-100 dark:border-neutral-700 space-y-1">
                    <span className="font-bold text-xs text-gray-800 dark:text-gray-200 block">Kesiapan Simulasi Ujian JLPT {goals.monthlyGoalJLPTLevel}</span>
                    <p className="text-gray-500 text-[11px]">
                      {jlptExamsCount > 0 ? `Anda telah menyelesaikan ${jlptExamsCount} simulasi dengan hasil passing grade yang baik.` : 'Belum mengikuti ujian simulasi bulan ini. Selesaikan 1 simulasi penuh.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: ACHIEVEMENTS, BADGES & CERTIFICATE */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Certificate Action Banner */}
          <div className="bg-gradient-to-r from-[#8C1D2A] to-[#BC002D] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-rose-200 font-bold text-xs uppercase tracking-widest">
                Prestasi Pembelajar Terverifikasi
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Sertifikat Kompetensi Bahasa Jepang Digital
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 max-w-lg leading-relaxed">
                Tampilkan dan cetak sertifikat resmi pencapaian belajar tingkat JLPT {progress.currentJLPTTarget} lengkap dengan stempel Hanko tradisional Jepang.
              </p>
            </div>

            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-[#8C1D2A] px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0"
            >
              <Award className="w-4 h-4 text-[#8C1D2A]" />
              <span>Buka & Cetak Sertifikat</span>
            </button>
          </div>

          {/* Badges Grid */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white">Lencana Prestasi (Badges Collection)</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Koleksi pencapaian belajar bahasa Jepang</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600">
                {progress.unlockedBadgeIds.length} / {BADGES_DATA.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              {BADGES_DATA.map((badge) => {
                const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                      isUnlocked
                        ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30 shadow-2xs'
                        : 'bg-gray-50 dark:bg-neutral-900/30 border-gray-100 dark:border-neutral-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-lg shadow-2xs ${
                        isUnlocked
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-200 dark:bg-neutral-800 text-gray-400'
                      }`}
                    >
                      {isUnlocked ? '🏆' : '🔒'}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-bold text-xs text-[#1A1A1A] dark:text-white truncate">{badge.name}</h4>
                      <span className="text-[10px] font-japanese text-gray-400 block">{badge.titleJa}</span>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight line-clamp-2 mt-1">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Goal Manager Modal */}
      <GoalManagerModal
        isOpen={isGoalModalOpen}
        currentGoals={goals}
        onClose={() => setIsGoalModalOpen(false)}
        onSaveGoals={handleSaveGoals}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        progress={progress}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      {/* Milestone Celebration Modal */}
      <CelebrationModal
        isOpen={celebrationState.isOpen}
        title={celebrationState.title}
        subtitle={celebrationState.subtitle}
        rewardXP={celebrationState.rewardXP}
        badgeName={celebrationState.badgeName}
        onClose={() => setCelebrationState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
