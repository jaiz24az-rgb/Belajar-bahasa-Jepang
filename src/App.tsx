import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Layers, MessageSquare, Mic, Volume2, ShieldCheck, Bell, Cloud, Moon, Sun, Flame, Search, BookMarked } from 'lucide-react';
import { UserProgress } from './types';
import { StorageService } from './services/storageService';
import { Header } from './components/Header';
import { ProgressDashboard } from './components/ProgressDashboard';
import { KanaPractice } from './components/KanaPractice';
import { KanjiPractice } from './components/KanjiPractice';
import { DictionaryModule } from './components/DictionaryModule';
import { ConversationModule } from './components/ConversationModule';
import { SpeakingCoach } from './components/SpeakingCoach';
import { ListeningLab } from './components/ListeningLab';
import { JlptSimulator } from './components/JlptSimulator';
import { DailyReminderModal } from './components/DailyReminderModal';
import { DataSyncModal } from './components/DataSyncModal';
import { audioService } from './services/audioService';

type MainTab = 'dashboard' | 'kana' | 'kanji' | 'dictionary' | 'conversation' | 'speaking' | 'listening' | 'jlpt';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(() => StorageService.getProgress());
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('nihongo_theme') === 'dark' ||
        (!('nihongo_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nihongo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nihongo_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
  };

  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard, ja: 'ダッシュボード' },
    { id: 'kana', label: 'Hiragana/Katakana', icon: Layers, ja: 'かな学習' },
    { id: 'kanji', label: 'Kanji N5-N1', icon: BookOpen, ja: '漢字練習' },
    { id: 'dictionary', label: 'Kamus Lengkap', icon: Search, ja: '日本語大辞典' },
    { id: 'conversation', label: 'Percakapan', icon: MessageSquare, ja: '日常会話' },
    { id: 'speaking', label: 'Latihan Bicara AI', icon: Mic, ja: '発音AI' },
    { id: 'listening', label: 'Mendengar (Choukai)', icon: Volume2, ja: '聴解ラボ' },
    { id: 'jlpt', label: 'Simulasi JLPT', icon: ShieldCheck, ja: 'JLPT模試' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#F3F3F3] flex flex-col font-sans transition-colors duration-200">
      {/* Top Application Header */}
      <Header
        progress={progress}
        onOpenReminder={() => setIsReminderOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-gray-200 dark:border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  audioService.playSound('click');
                  setActiveTab(item.id as MainTab);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#BC002D] text-white shadow-md shadow-[#BC002D]/20 scale-[1.01]'
                    : 'bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#BC002D]'}`} />
                <span>{item.label}</span>
                <span className={`text-[10px] hidden md:inline font-japanese opacity-75 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  ({item.ja})
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher */}
        <main className="animate-fadeIn">
          {activeTab === 'dashboard' && (
            <ProgressDashboard
              progress={progress}
              onNavigateTab={(tab) => setActiveTab(tab as MainTab)}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'kana' && (
            <KanaPractice
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'kanji' && (
            <KanjiPractice
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryModule
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigateToKanjiCanvas={() => {
                setActiveTab('kanji');
              }}
            />
          )}

          {activeTab === 'conversation' && (
            <ConversationModule
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'speaking' && (
            <SpeakingCoach
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'listening' && (
            <ListeningLab
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'jlpt' && (
            <JlptSimulator
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}
        </main>
      </div>

      {/* Floating Bottom Nav for Mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                audioService.playSound('click');
                setActiveTab(item.id as MainTab);
              }}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
                isActive
                  ? 'text-[#BC002D] font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 max-w-[54px] truncate">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => {
            audioService.playSound('click');
            setActiveTab('jlpt');
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            activeTab === 'jlpt'
              ? 'text-[#BC002D] font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">JLPT</span>
        </button>
      </nav>

      {/* Daily Reminder Modal */}
      <DailyReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        progress={progress}
        onUpdate={handleUpdateProgress}
      />

      {/* Data Backup & Offline Mode Modal */}
      <DataSyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        progress={progress}
        onUpdate={handleUpdateProgress}
      />
    </div>
  );
}

export default App;
