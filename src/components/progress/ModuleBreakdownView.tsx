import React, { useState } from 'react';
import { ModuleMetric } from '../../types';
import { 
  Sparkles, Zap, BookOpen, Layers, BookmarkCheck, 
  Volume2, Mic, ShieldCheck, ArrowRight, CheckCircle2, 
  TrendingUp, Award, Play 
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface Props {
  metrics: ModuleMetric[];
  onNavigateTab: (tab: string) => void;
}

export const ModuleBreakdownView: React.FC<Props> = ({ metrics, onNavigateTab }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'characters' | 'grammar_vocab' | 'audio_speech' | 'exam'>('all');

  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'hiragana':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'katakana':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'kanji':
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'grammar':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'vocab':
        return <BookmarkCheck className="w-5 h-5 text-teal-500" />;
      case 'listening':
        return <Volume2 className="w-5 h-5 text-blue-500" />;
      case 'speaking':
        return <Mic className="w-5 h-5 text-purple-500" />;
      case 'jlpt':
        return <ShieldCheck className="w-5 h-5 text-[#BC002D]" />;
      default:
        return <Award className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredMetrics = metrics.filter(m => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'characters') return ['hiragana', 'katakana', 'kanji'].includes(m.id);
    if (selectedFilter === 'grammar_vocab') return ['grammar', 'vocab'].includes(m.id);
    if (selectedFilter === 'audio_speech') return ['listening', 'speaking'].includes(m.id);
    if (selectedFilter === 'exam') return m.id === 'jlpt';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
                Modul Kurikulum Terstruktur
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-xs text-gray-500 font-japanese">8大学習分野</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
              Visualisasi Penguasaan 8 Modul Bahasa Jepang
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
              Lacak detail progres hafalan, tingkat akurasi kuis, serta catatan kemahiran dari aksara dasar hingga simulasi ujian resmi JLPT.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Semua Modul (8)' },
              { id: 'characters', label: 'Aksara & Kanji' },
              { id: 'grammar_vocab', label: 'Tata Bahasa & Kosakata' },
              { id: 'audio_speech', label: 'Audio & Percakapan' },
              { id: 'exam', label: 'Simulasi JLPT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  audioService.playSound('click');
                  setSelectedFilter(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#BC002D] text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Module Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMetrics.map((metric) => {
          const isHighMastery = metric.progressPercent >= 75;
          const isMediumMastery = metric.progressPercent >= 40 && metric.progressPercent < 75;

          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all"
                style={{ backgroundColor: metric.color }}
              />

              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-neutral-800/80 border border-gray-100 dark:border-neutral-700 flex items-center justify-center">
                      {getModuleIcon(metric.id)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#BC002D] transition-colors">
                        {metric.name}
                      </h4>
                      <span className="text-[11px] font-japanese text-gray-400">
                        {metric.nameJa}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isHighMastery
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
                        : isMediumMastery
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                    }`}
                  >
                    {metric.status}
                  </span>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="my-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Tingkat Kemahiran</span>
                    <span className="font-black text-sm text-[#1A1A1A] dark:text-white">
                      {metric.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${metric.progressPercent}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                </div>

                {/* Stats Breakdown */}
                <div className="grid grid-cols-2 gap-2 my-3 py-2 px-3 bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-gray-100 dark:border-neutral-800 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Tercapai</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {metric.currentCount} / {metric.targetCount} {metric.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Akurasi</span>
                    <span className="font-bold text-[#BC002D]">
                      {metric.accuracy}%
                    </span>
                  </div>
                </div>

                {/* Module Highlights */}
                <div className="space-y-1 my-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Fokus & Kemampuan
                  </span>
                  {metric.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  audioService.playSound('click');
                  onNavigateTab(metric.routeTab);
                }}
                className="w-full mt-3 py-2.5 px-3 bg-gray-100 dark:bg-neutral-800 hover:bg-[#BC002D] hover:text-white dark:hover:bg-[#BC002D] text-[#1A1A1A] dark:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 group-hover:bg-[#BC002D] group-hover:text-white shadow-2xs"
              >
                <span>Buka Modul {metric.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
