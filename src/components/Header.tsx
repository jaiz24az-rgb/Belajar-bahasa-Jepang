import React from 'react';
import { Flame, Bell, Cloud, Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';
import { audioService } from '../services/audioService';

interface Props {
  progress: UserProgress;
  onOpenReminder: () => void;
  onOpenSync: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<Props> = ({
  progress,
  onOpenReminder,
  onOpenSync,
  darkMode,
  onToggleDarkMode,
}) => {
  // XP in current level
  const currentLevelBaseXP = (progress.level - 1) * 250;
  const xpInCurrentLevel = Math.max(0, progress.xp - currentLevelBaseXP);
  const xpRequiredForNext = 250;
  const xpPercent = Math.min(100, Math.round((xpInCurrentLevel / xpRequiredForNext) * 100));

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#BC002D] flex items-center justify-center text-white shadow-xs font-japanese font-bold text-xl select-none">
            日
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1A1A1A] dark:text-white text-base sm:text-lg tracking-tight">
                Nihongo<span className="text-[#BC002D]">Master</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                JLPT {progress.currentJLPTTarget} Track
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden xs:block font-japanese">
              日本語マスター • 総合学習システム
            </p>
          </div>
        </div>

        {/* Gamified Stats Header Bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Daily Streak Pill */}
          <div
            title={`Streak Belajar: ${progress.streak} Hari Berturut-turut`}
            className="flex items-center gap-2 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-900/50 text-xs sm:text-sm font-bold select-none"
          >
            <span className="text-base">🔥</span>
            <span>{progress.streak} Day Streak</span>
          </div>

          {/* XP Pill */}
          <div
            title={`Total Poin Pengalaman: ${progress.xp} XP`}
            className="flex items-center gap-2 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/50 text-xs sm:text-sm font-bold select-none"
          >
            <span className="text-base">💎</span>
            <span>{progress.xp} XP</span>
          </div>

          {/* Level & XP bar */}
          <div className="hidden lg:flex flex-col gap-1 w-28">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#BC002D] dark:text-[#FF5A79] flex items-center gap-1">
                <Zap className="w-3 h-3 fill-[#BC002D]" /> Lv.{progress.level}
              </span>
              <span className="text-gray-400 dark:text-gray-500">{xpPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#BC002D] rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Daily Reminder button */}
            <button
              onClick={() => {
                audioService.playSound('click');
                onOpenReminder();
              }}
              title="Pengingat Belajar Harian"
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {progress.reminderEnabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BC002D] ring-2 ring-white dark:ring-neutral-900" />
              )}
            </button>

            {/* Offline & Sync button */}
            <button
              onClick={() => {
                audioService.playSound('click');
                onOpenSync();
              }}
              title="Sinkronisasi & Mode Offline"
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition relative"
            >
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                audioService.playSound('click');
                onToggleDarkMode();
              }}
              title="Ganti Tema Gelap / Terang"
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
