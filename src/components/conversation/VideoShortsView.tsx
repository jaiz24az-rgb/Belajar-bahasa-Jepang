import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Flame,
  Volume2,
  Mic,
  Award,
  BookOpen,
  Filter,
  Grid,
  Smartphone,
  ChevronRight,
  Info,
  CheckCircle2,
  Share2,
  Clock,
  Layers,
  Heart
} from 'lucide-react';
import { VideoShortReel, UserProgress, JLPTLevel } from '../../types';
import { VIDEO_REELS_DATA } from '../../data/videoReelsData';
import { VideoReelPlayer } from './VideoReelPlayer';
import { audioService } from '../../services/audioService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const VideoShortsView: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentReelIndex, setCurrentReelIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'player' | 'grid'>('player');

  // Filtered Reels
  const filteredReels = VIDEO_REELS_DATA.filter((r) => {
    const matchCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchLevel = selectedLevel === 'all' || r.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  const activeReel: VideoShortReel = filteredReels[currentReelIndex] || filteredReels[0] || VIDEO_REELS_DATA[0];

  const handleNextReel = () => {
    if (currentReelIndex < filteredReels.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
      audioService.playSound('click');
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
      audioService.playSound('click');
    }
  };

  const categories = [
    { id: 'all', label: 'Semua Video', icon: '🎬' },
    { id: 'numbers_gestures', label: 'Angka & Gestur', icon: '✋' },
    { id: 'daily_greetings', label: 'Salam Sehari-hari', icon: '🌸' },
    { id: 'shopping', label: 'Konbini & Belanja', icon: '🍙' },
    { id: 'natural_reactions', label: 'Reaksi & Aizuchi', icon: '⚡' },
    { id: 'ordering_food', label: 'Pesan Makanan', icon: '🍜' },
    { id: 'travel_directions', label: 'Tanya Arah & Stasiun', icon: '🚅' },
    { id: 'dating_friends', label: 'Teman & Hangout', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Explaining the Video Shadowing & Gesture Method */}
      <div className="bg-gradient-to-r from-red-900/20 via-rose-900/10 to-amber-900/15 dark:from-red-950/40 dark:via-rose-950/20 dark:to-neutral-900/50 rounded-3xl p-5 border border-red-200/60 dark:border-red-500/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center text-2xl shadow-md shadow-[#BC002D]/30 shrink-0">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Video Shorts Percakapan & Shadowing Interaktif
              </h2>
              <span className="bg-[#BC002D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Model Reels
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Belajar percakapan bahasa Jepang layaknya video TikTok / Instagram Reels bersama <strong>Sakura Sensei</strong>.
              Lengkapi dengan <strong>kartu kosakata besar</strong>, <strong>gestur jari khas Jepang</strong>, intonasi asli, dan <strong>evaluasi suara AI</strong> untuk latihan shadowing langsung!
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <div className="bg-white dark:bg-neutral-800 p-1 rounded-2xl border border-gray-200 dark:border-neutral-700 flex items-center">
            <button
              onClick={() => {
                setViewMode('player');
                audioService.playSound('click');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'player'
                  ? 'bg-[#BC002D] text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mode Reels</span>
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                audioService.playSound('click');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'grid'
                  ? 'bg-[#BC002D] text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Daftar Video ({filteredReels.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentReelIndex(0);
              audioService.playSound('click');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-[#BC002D] text-white shadow-sm shadow-[#BC002D]/30 scale-[1.02]'
                : 'bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-gray-200 dark:border-white/10'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'player' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Interactive Reels Player */}
          <div className="lg:col-span-7 xl:col-span-6 flex justify-center">
            {activeReel ? (
              <VideoReelPlayer
                reel={activeReel}
                onNextReel={handleNextReel}
                onPrevReel={handlePrevReel}
                hasNext={currentReelIndex < filteredReels.length - 1}
                hasPrev={currentReelIndex > 0}
                progress={progress}
                onUpdateProgress={onUpdateProgress}
              />
            ) : (
              <div className="w-full max-w-[420px] h-[600px] rounded-3xl bg-neutral-800 flex items-center justify-center text-gray-400">
                Tidak ada video pada kategori ini.
              </div>
            )}
          </div>

          {/* Right: Video Info, Culture Guide & Practice Tips */}
          <div className="lg:col-span-5 xl:col-span-6 space-y-4">
            {/* Active Reel Details Card */}
            {activeReel && (
              <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-100 dark:bg-red-950/60 text-[#BC002D] dark:text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {activeReel.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {activeReel.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {activeReel.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-japanese">
                      {activeReel.titleJa}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span className="font-bold">{activeReel.likesCount}</span>
                  </div>
                </div>

                {/* Tutor Profile Mini Card */}
                <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-3 border border-gray-100 dark:border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-950/70 border border-pink-300/40 flex items-center justify-center text-xl shadow-inner">
                    {activeReel.channelAvatar || '🌸'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">
                        {activeReel.channelName}
                      </span>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold px-1.5 py-0.2 rounded-md">
                        Sensei Terverifikasi
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                      {activeReel.tutorBio}
                    </p>
                  </div>
                </div>

                {/* Culture & Gesture Spotlight */}
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-3.5 border border-amber-200/80 dark:border-amber-700/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                    <span>⛩️</span>
                    <span>Wawasan Budaya & Gestur Asli:</span>
                  </div>
                  <p className="text-xs text-amber-950 dark:text-amber-200/90 leading-relaxed">
                    {activeReel.cultureNote}
                  </p>
                </div>

                {/* Vocabulary / Dialogue Steps Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#BC002D]" />
                    <span>Daftar Ungkapan ({activeReel.items.length} Kata / Frasa):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {activeReel.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 dark:bg-neutral-800/70 p-2.5 rounded-xl border border-gray-200/70 dark:border-white/5 flex items-start justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-gray-400">{idx + 1}.</span>
                            <span className="font-bold text-sm font-japanese text-gray-900 dark:text-white">
                              {item.kanji}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                            {item.romaji}
                          </div>
                          <div className="text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                            {item.meaningId}
                          </div>
                        </div>
                        <button
                          onClick={() => audioService.speak(item.audioText || item.kanji)}
                          className="p-1 rounded-lg text-gray-400 hover:text-[#BC002D] hover:bg-gray-200 dark:hover:bg-neutral-700"
                          title="Dengarkan Suara"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shadowing Practice How-To */}
                <div className="bg-emerald-50 dark:bg-emerald-950/25 rounded-2xl p-3 border border-emerald-200/80 dark:border-emerald-700/40 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-emerald-950 dark:text-emerald-200/90 leading-relaxed">
                    <strong className="block text-emerald-800 dark:text-emerald-300 font-bold mb-0.5">
                      Cara Latihan Shadowing:
                    </strong>
                    Tekan tombol mikrofon merah di samping video, tirukan pengucapan Sensei secara langsung. AI akan menilai kemiripan mora dan artikulasi Anda!
                  </div>
                </div>
              </div>
            )}

            {/* Quick Reel Playlist Selector */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
              <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2.5">
                Video Reels Lainnya:
              </h4>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredReels.map((r, idx) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setCurrentReelIndex(idx);
                      audioService.playSound('click');
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      idx === currentReelIndex
                        ? 'bg-[#BC002D]/10 border-[#BC002D] text-gray-900 dark:text-white'
                        : 'bg-gray-50 dark:bg-neutral-800/40 hover:bg-gray-100 dark:hover:bg-neutral-800 border-gray-200/60 dark:border-white/5 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{r.channelAvatar || '🌸'}</span>
                      <div>
                        <div className="font-bold text-xs line-clamp-1">{r.title}</div>
                        <span className="text-[10px] text-gray-400">{r.items.length} frasa • {r.level}</span>
                      </div>
                    </div>
                    <Play className="w-3.5 h-3.5 text-[#BC002D]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid Gallery Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredReels.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => {
                setCurrentReelIndex(idx);
                setViewMode('player');
                audioService.playSound('click');
              }}
              className="group cursor-pointer bg-white dark:bg-[#1A1A1A] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Reel Card Header Banner with Visual Aesthetic */}
              <div
                className={`h-48 relative p-4 flex flex-col justify-between overflow-hidden ${
                  reel.bgTheme === 'tatami'
                    ? 'bg-gradient-to-br from-[#4a3b2c] to-[#201810]'
                    : reel.bgTheme === 'sakura'
                    ? 'bg-gradient-to-br from-[#5c2e40] to-[#24131b]'
                    : reel.bgTheme === 'izakaya'
                    ? 'bg-gradient-to-br from-[#52251a] to-[#1c0d09]'
                    : reel.bgTheme === 'shibuya_night'
                    ? 'bg-gradient-to-br from-[#1e2a44] to-[#0c121e]'
                    : 'bg-gradient-to-br from-[#233f36] to-[#0d1a15]'
                } text-white`}
              >
                {/* Decorative Kanji in Background */}
                <div className="absolute right-2 -bottom-2 text-7xl font-japanese font-black opacity-15 pointer-events-none select-none">
                  {reel.items[0]?.kanji || '日'}
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {reel.level} • {reel.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>{reel.likesCount}</span>
                  </div>
                </div>

                {/* Central Kanji Spotlight */}
                <div className="relative z-10 text-center my-auto">
                  <div className="text-3xl font-black font-japanese tracking-tight drop-shadow">
                    {reel.items[0]?.kanji}
                  </div>
                  <div className="text-xs text-amber-300 font-mono">
                    {reel.items[0]?.romaji} - {reel.items[0]?.meaningId}
                  </div>
                </div>

                {/* Bottom Tutor Banner */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/15">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{reel.channelAvatar || '🌸'}</span>
                    <span className="text-[11px] font-bold">{reel.channelName}</span>
                  </div>
                  <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-[#BC002D] transition">
                    <Play className="w-3 h-3 fill-white" />
                  </div>
                </div>
              </div>

              {/* Reel Card Info Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#BC002D] transition-colors line-clamp-1">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-japanese line-clamp-1">
                    {reel.titleJa}
                  </p>
                </div>

                {/* Gesture / Tip preview */}
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {reel.cultureNote}
                </p>

                {/* Footer tags */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-neutral-800 text-[11px] text-gray-500">
                  <span>{reel.items.length} Frasa Interaktif</span>
                  <span className="text-[#BC002D] font-bold flex items-center gap-0.5">
                    Latihan <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
