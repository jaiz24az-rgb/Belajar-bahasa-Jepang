import React, { useState } from 'react';
import { WeeklyMonthlyGoals, JLPTLevel } from '../../types';
import { X, Target, Calendar, Clock, BookOpen, Mic, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface Props {
  isOpen: boolean;
  currentGoals: WeeklyMonthlyGoals;
  onClose: () => void;
  onSaveGoals: (updated: WeeklyMonthlyGoals) => void;
}

export const GoalManagerModal: React.FC<Props> = ({
  isOpen,
  currentGoals,
  onClose,
  onSaveGoals,
}) => {
  const [weeklyMinutes, setWeeklyMinutes] = useState(currentGoals.weeklyGoalMinutes || 120);
  const [weeklyKanji, setWeeklyKanji] = useState(currentGoals.weeklyGoalKanji || 15);
  const [weeklySpeech, setWeeklySpeech] = useState(currentGoals.weeklyGoalSpeechSessions || 5);
  const [weeklyJLPT, setWeeklyJLPT] = useState(currentGoals.weeklyGoalJLPTSections || 3);
  
  const [monthlyMinutes, setMonthlyMinutes] = useState(currentGoals.monthlyGoalMinutes || 500);
  const [monthlyJLPTLevel, setMonthlyJLPTLevel] = useState<JLPTLevel>(currentGoals.monthlyGoalJLPTLevel || 'N5');
  const [monthlyScenarios, setMonthlyScenarios] = useState(currentGoals.monthlyGoalScenarios || 6);

  if (!isOpen) return null;

  const applyPreset = (preset: 'casual' | 'balanced' | 'intensive') => {
    audioService.playSound('click');
    if (preset === 'casual') {
      setWeeklyMinutes(60);
      setWeeklyKanji(5);
      setWeeklySpeech(3);
      setWeeklyJLPT(1);
      setMonthlyMinutes(250);
      setMonthlyScenarios(3);
    } else if (preset === 'balanced') {
      setWeeklyMinutes(120);
      setWeeklyKanji(15);
      setWeeklySpeech(5);
      setWeeklyJLPT(3);
      setMonthlyMinutes(500);
      setMonthlyScenarios(6);
    } else {
      setWeeklyMinutes(240);
      setWeeklyKanji(30);
      setWeeklySpeech(10);
      setWeeklyJLPT(6);
      setMonthlyMinutes(1000);
      setMonthlyScenarios(12);
    }
  };

  const handleSave = () => {
    audioService.playSound('click');
    const updated: WeeklyMonthlyGoals = {
      ...currentGoals,
      weeklyGoalMinutes: weeklyMinutes,
      weeklyGoalKanji: weeklyKanji,
      weeklyGoalSpeechSessions: weeklySpeech,
      weeklyGoalJLPTSections: weeklyJLPT,
      monthlyGoalMinutes: monthlyMinutes,
      monthlyGoalJLPTLevel: monthlyJLPTLevel,
      monthlyGoalScenarios: monthlyScenarios,
    };
    onSaveGoals(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] dark:text-white">
                Pengaturan Target Belajar
              </h3>
              <p className="text-xs text-gray-500 font-japanese">目標設定 • Mingguan & Bulanan</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Pilih Paket Ritme Belajar Cepat
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => applyPreset('casual')}
              className={`p-3 rounded-2xl border text-center transition ${
                weeklyMinutes === 60
                  ? 'bg-rose-50 dark:bg-[#BC002D]/15 border-[#BC002D] text-[#BC002D]'
                  : 'bg-gray-50 dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="font-bold text-xs block">🌱 Santai</span>
              <span className="text-[10px] text-gray-500">60m / mgg</span>
            </button>
            <button
              onClick={() => applyPreset('balanced')}
              className={`p-3 rounded-2xl border text-center transition ${
                weeklyMinutes === 120
                  ? 'bg-rose-50 dark:bg-[#BC002D]/15 border-[#BC002D] text-[#BC002D]'
                  : 'bg-gray-50 dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="font-bold text-xs block">⭐ Konsisten</span>
              <span className="text-[10px] text-gray-500">120m / mgg</span>
            </button>
            <button
              onClick={() => applyPreset('intensive')}
              className={`p-3 rounded-2xl border text-center transition ${
                weeklyMinutes === 240
                  ? 'bg-rose-50 dark:bg-[#BC002D]/15 border-[#BC002D] text-[#BC002D]'
                  : 'bg-gray-50 dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="font-bold text-xs block">🔥 Ambisius</span>
              <span className="text-[10px] text-gray-500">240m / mgg</span>
            </button>
          </div>
        </div>

        {/* Section 1: Weekly Goals */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BC002D]"></span>
            <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">
              Target Mingguan (週間目標)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Weekly Minutes */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#BC002D]" />
                  Waktu Belajar
                </span>
                <span className="font-bold text-[#BC002D]">{weeklyMinutes} Menit</span>
              </div>
              <input
                type="range"
                min="30"
                max="360"
                step="15"
                value={weeklyMinutes}
                onChange={(e) => setWeeklyMinutes(Number(e.target.value))}
                className="w-full accent-[#BC002D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>30 min</span>
                <span>6 jam</span>
              </div>
            </div>

            {/* Weekly Kanji */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  Hafalan Kanji Baru
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{weeklyKanji} Kanji</span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                step="1"
                value={weeklyKanji}
                onChange={(e) => setWeeklyKanji(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>3 Kanji</span>
                <span>50 Kanji</span>
              </div>
            </div>

            {/* Weekly Speech */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-purple-500" />
                  Latihan Bicara AI
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{weeklySpeech} Sesi</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={weeklySpeech}
                onChange={(e) => setWeeklySpeech(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 Sesi</span>
                <span>20 Sesi</span>
              </div>
            </div>

            {/* Weekly JLPT */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BC002D]" />
                  Latihan Soal JLPT
                </span>
                <span className="font-bold text-[#BC002D]">{weeklyJLPT} Bagian</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={weeklyJLPT}
                onChange={(e) => setWeeklyJLPT(Number(e.target.value))}
                className="w-full accent-[#BC002D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 Ujian</span>
                <span>10 Ujian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Monthly Goals */}
        <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">
              Target Bulanan & Kelulusan (月間目標)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Target Level JLPT */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <span className="font-medium text-gray-700 dark:text-gray-300 block">
                Target Tingkat JLPT Bulan Ini
              </span>
              <div className="flex gap-1.5">
                {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMonthlyJLPTLevel(lvl)}
                    className={`flex-1 py-1.5 rounded-xl font-bold transition text-xs ${
                      monthlyJLPTLevel === lvl
                        ? 'bg-[#BC002D] text-white shadow-2xs'
                        : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Scenarios */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Target Percakapan Selesai
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{monthlyScenarios} Skenario</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={monthlyScenarios}
                onChange={(e) => setMonthlyScenarios(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2 Kasus</span>
                <span>20 Kasus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white text-xs font-bold shadow-md shadow-[#BC002D]/20 transition flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Target Belajar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
