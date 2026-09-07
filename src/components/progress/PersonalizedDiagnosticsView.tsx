import React, { useState } from 'react';
import { PersonalizedFeedbackReport } from '../../types';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ArrowRight, 
  Volume2, RefreshCw, Calendar, Clock, Target, 
  TrendingUp, Award, BookOpen, ShieldAlert, CheckCircle 
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface Props {
  report: PersonalizedFeedbackReport | null;
  isLoading: boolean;
  onRefreshAI: () => void;
  onNavigateTab: (tab: string) => void;
}

export const PersonalizedDiagnosticsView: React.FC<Props> = ({
  report,
  isLoading,
  onRefreshAI,
  onNavigateTab
}) => {
  const [playingAudio, setPlayingAudio] = useState(false);

  const handlePlayMotto = (text: string) => {
    setPlayingAudio(true);
    audioService.speak(text);
    setTimeout(() => setPlayingAudio(false), 2500);
  };

  if (!report && !isLoading) {
    return (
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] flex items-center justify-center mx-auto text-2xl">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
          Sensei Kenji Siap Menganalisis Kemajuan Anda
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Dapatkan umpan balik personal yang mendalam tentang kekuatan, area perbaikan, dan rekomendasi jadwal belajar mingguan yang disesuaikan secara dinamis.
        </p>
        <button
          onClick={onRefreshAI}
          className="bg-[#BC002D] hover:bg-[#a30027] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Mulai Evaluasi AI Sensei</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sensei Feedback Spotlight Banner */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        {/* Background Calligraphy */}
        <div className="absolute top-0 right-0 p-6 pointer-events-none select-none opacity-5 dark:opacity-10">
          <span className="text-8xl font-japanese font-bold">先生</span>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center font-japanese font-bold text-xl shadow-md shadow-[#BC002D]/20">
                先生
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#BC002D]">
                    Sensei Kenji's Diagnostic Feedback
                  </span>
                  {report?.isAIGenerated && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-900/40 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini Live AI
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                  {report?.overallProficiencyTitle || "Evaluasi Performa Pembelajar"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">Overall Score</span>
                <span className="text-2xl font-black text-[#BC002D]">{report?.overallScore || 80}/100</span>
              </div>
              <button
                onClick={onRefreshAI}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-xs font-bold text-[#1A1A1A] dark:text-white transition flex items-center gap-2 border border-gray-200 dark:border-neutral-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#BC002D]' : ''}`} />
                <span>{isLoading ? 'Menganalisis...' : 'Perbarui Analisis'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-rose-50/50 dark:bg-[#BC002D]/10 rounded-2xl border border-rose-100 dark:border-[#BC002D]/20">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
              "{report?.senseiComment}"
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column: Strengths vs Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths Card */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] dark:text-white">
                  Kekuatan Utama Anda (強み)
                </h4>
                <p className="text-[11px] text-gray-400">Poin keunggulan dan kemahiran yang telah terbukti</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-900/40">
              {report?.strengths.length || 0} Teridentifikasi
            </span>
          </div>

          <div className="space-y-3">
            {report?.strengths.map((str) => (
              <div
                key={str.id}
                className="p-4 rounded-2xl bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {str.title}
                  </span>
                  {str.scoreOrAccuracy && (
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-neutral-700">
                      {str.scoreOrAccuracy}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {str.description}
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block pt-0.5">
                  Modul: {str.module}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement / Weaknesses Card */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-amber-200 dark:border-amber-900/30 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] dark:text-white">
                  Area Butuh Latihan (弱点)
                </h4>
                <p className="text-[11px] text-gray-400">Langkah terarah untuk mendongkrak skor dan kelancaran</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-900/40">
              {report?.weaknesses.length || 0} Prioritas
            </span>
          </div>

          <div className="space-y-3">
            {report?.weaknesses.map((weak) => (
              <div
                key={weak.id}
                className="p-4 rounded-2xl bg-amber-50/30 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {weak.title}
                  </span>
                  {weak.scoreOrAccuracy && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-amber-200 dark:border-neutral-700">
                      {weak.scoreOrAccuracy}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {weak.description}
                </p>

                {weak.actionableStep && (
                  <div className="pt-2 border-t border-amber-100/60 dark:border-amber-900/30 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                      💡 {weak.actionableStep}
                    </p>
                    {weak.actionTab && (
                      <button
                        onClick={() => {
                          audioService.playSound('click');
                          onNavigateTab(weak.actionTab!);
                        }}
                        className="shrink-0 px-2.5 py-1 bg-[#BC002D] hover:bg-[#a30027] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <span>Latih</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Personalized Schedule & Japanese Wisdom Motto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 7-Day Schedule Bento (Col Span 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#1A1A1A] dark:text-white">
                  Rekomendasi Jadwal Belajar 7 Hari
                </h4>
                <p className="text-[11px] text-gray-400">Rencana belajar adaptif terbagi rata per hari</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#BC002D]">Konsisten Setiap Hari</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {report?.recommendedSchedule.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  audioService.playSound('click');
                  onNavigateTab(item.actionTab);
                }}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800 hover:border-[#BC002D] cursor-pointer transition flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-10 h-8 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-gray-700 dark:text-gray-300 shrink-0">
                    {item.day.slice(0, 3)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#1A1A1A] dark:text-white truncate group-hover:text-[#BC002D] transition-colors">
                      {item.focus}
                    </p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {item.duration}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#BC002D] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Sensei's Japanese Wisdom Motto Card (Col Span 4) */}
        <div className="lg:col-span-4 bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-7 border border-neutral-800 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              Sensei's Wisdom • 今日の格言
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-rose-300 font-bold">
              Yojijukugo
            </span>
          </div>

          <div className="my-4 text-center space-y-2">
            <h3 className="text-3xl font-japanese font-black text-white tracking-wide">
              {report?.japaneseMotto.japanese || "継続は力なり"}
            </h3>
            <p className="text-xs text-rose-300 font-japanese italic">
              {report?.japaneseMotto.romaji || "Keizoku wa chikara nari"}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10 max-w-xs mx-auto">
              "{report?.japaneseMotto.indonesian || "Konsistensi dan ketekunan adalah kunci kekuatan sejati."}"
            </p>
          </div>

          <button
            onClick={() => handlePlayMotto(report?.japaneseMotto.japanese || "継続は力なり")}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2"
          >
            <Volume2 className={`w-3.5 h-3.5 text-[#BC002D] ${playingAudio ? 'animate-bounce' : ''}`} />
            <span>Dengarkan Pengucapan Sensei</span>
          </button>
        </div>
      </div>
    </div>
  );
};
