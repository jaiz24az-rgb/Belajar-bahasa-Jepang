import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  CheckCircle2,
  Flame,
  Info,
  Layers,
  Repeat,
  Radio,
  HelpCircle,
  X
} from 'lucide-react';
import { VideoShortReel, VideoCardItem, UserProgress } from '../../types';
import { audioService } from '../../services/audioService';
import { speechRecognitionService } from '../../services/speechRecognitionService';
import { StorageService } from '../../services/storageService';

interface Props {
  reel: VideoShortReel;
  onNextReel: () => void;
  onPrevReel: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onClose?: () => void;
}

export const VideoReelPlayer: React.FC<Props> = ({
  reel,
  onNextReel,
  onPrevReel,
  hasNext,
  hasPrev,
  progress,
  onUpdateProgress,
  onClose,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopingSingle, setIsLoopingSingle] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [hideFurigana, setHideFurigana] = useState(false);
  const [hideTranslation, setHideTranslation] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likesCount);
  const [showItemList, setShowItemList] = useState(false);
  const [showCultureModal, setShowCultureModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Speech Recognition & Shadowing state
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  // Video loop & mouth animation state
  const [isSpeakingAnimation, setIsSpeakingAnimation] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentItem: VideoCardItem = reel.items[currentItemIndex] || reel.items[0];

  // Reset index when reel changes
  useEffect(() => {
    setCurrentItemIndex(0);
    setIsPlaying(false);
    setSpeechScore(null);
    setSpeechFeedback(null);
    setRecognizedTranscript('');
    setLikesCount(reel.likesCount);
  }, [reel.id]);

  // Audio speech on current item change
  const speakCurrentItem = async (rate = playbackSpeed) => {
    if (isMuted) return;
    setIsSpeakingAnimation(true);
    try {
      const textToSpeak = currentItem.audioText || currentItem.kanji;
      await audioService.speak(textToSpeak, rate, 1.05);
    } finally {
      setIsSpeakingAnimation(false);
    }
  };

  // Step autoplay loop
  useEffect(() => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    if (isPlaying) {
      speakCurrentItem();

      playTimerRef.current = setTimeout(() => {
        if (isLoopingSingle) {
          // Loop same word
          speakCurrentItem();
        } else {
          // Advance to next card
          if (currentItemIndex < reel.items.length - 1) {
            setCurrentItemIndex((prev) => prev + 1);
          } else {
            // Finished all cards in this reel
            setCurrentItemIndex(0);
            setIsPlaying(false);
            audioService.playSound('levelup');
            const updated = StorageService.addXP(25, `Selesai Video: ${reel.title}`);
            onUpdateProgress(updated);
          }
        }
      }, 3500 / (playbackSpeed / 0.9));
    }

    return () => {
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current);
      }
    };
  }, [isPlaying, currentItemIndex, isLoopingSingle, playbackSpeed, isMuted]);

  // Handle Play/Pause
  const togglePlay = () => {
    audioService.playSound('click');
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      audioService.stop();
    }
  };

  // Handle Next/Prev item
  const handleNextItem = () => {
    audioService.playSound('click');
    setSpeechScore(null);
    setSpeechFeedback(null);
    setRecognizedTranscript('');
    if (currentItemIndex < reel.items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    } else {
      setCurrentItemIndex(0);
    }
    speakCurrentItem();
  };

  const handlePrevItem = () => {
    audioService.playSound('click');
    setSpeechScore(null);
    setSpeechFeedback(null);
    setRecognizedTranscript('');
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
    } else {
      setCurrentItemIndex(reel.items.length - 1);
    }
    speakCurrentItem();
  };

  // Toggle Like
  const handleToggleLike = () => {
    audioService.playSound('click');
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  // Voice recording & Shadowing evaluation
  const handleToggleRecording = () => {
    if (isRecording) {
      speechRecognitionService.stopListening();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setSpeechScore(null);
    setSpeechFeedback(null);
    setRecognizedTranscript('');
    audioService.playSound('click');

    const expectedText = currentItem.audioText || currentItem.kanji;

    const started = speechRecognitionService.startListening(
      (result) => {
        setRecognizedTranscript(result.transcript);
        if (result.isFinal) {
          setIsRecording(false);
          const score = speechRecognitionService.calculateOfflineSimilarity(expectedText, result.transcript);
          setSpeechScore(score);

          if (score >= 75) {
            audioService.playSound('correct');
            setSpeechFeedback('Sangat Bagus! (大変よくできました！) Intonasi & lafal sangat akurat.');
            const updated = StorageService.addXP(20, `Shadowing ${currentItem.romaji}`);
            onUpdateProgress(updated);
          } else if (score >= 50) {
            audioService.playSound('click');
            setSpeechFeedback('Bagus! Sedikit lagi menyerupai native speaker. Coba perhatikan panjang vokal.');
          } else {
            audioService.playSound('wrong');
            setSpeechFeedback('Belum tepat. Dengarkan kembali audio sensei dan ulangi dengan mantap.');
          }
        }
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsRecording(false);
        setSpeechFeedback('Mikrofon tidak mendengar suara yang jelas. Coba bicara lebih dekat ke mikrofon.');
      },
      () => {
        setIsRecording(false);
      }
    );

    if (!started) {
      setIsRecording(false);
      setSpeechFeedback('Fitur pengenalan suara belum didukung di browser ini.');
    }
  };

  return (
    <div className="relative w-full max-w-[420px] h-[780px] max-h-[92vh] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-700/60 flex flex-col select-none">
      {/* Background Layer: Authentic Japanese Tutor Scene */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Visual based on Theme */}
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            reel.bgTheme === 'tatami'
              ? 'bg-gradient-to-b from-[#3a2e22] via-[#2a2218] to-[#14100c]'
              : reel.bgTheme === 'sakura'
              ? 'bg-gradient-to-b from-[#4a2633] via-[#2b1822] to-[#120a10]'
              : reel.bgTheme === 'izakaya'
              ? 'bg-gradient-to-b from-[#421d15] via-[#24120e] to-[#0e0705]'
              : reel.bgTheme === 'shibuya_night'
              ? 'bg-gradient-to-b from-[#1b253b] via-[#101726] to-[#080d17]'
              : 'bg-gradient-to-b from-[#1c322b] via-[#111f1b] to-[#070e0c]'
          }`}
        >
          {/* Subtle Japanese Traditional Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Realistic Animated Japanese Tutor Portrait */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 pointer-events-none">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            {/* Halo backlight aura */}
            <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-3xl" />

            {/* Tutor Illustrated Visual Avatar */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Head & Hair */}
              <div className="relative w-40 h-44 rounded-full bg-amber-100 dark:bg-[#ecd2bb] shadow-inner flex flex-col items-center border border-amber-300/40">
                {/* Hair */}
                <div className="absolute -top-3 w-44 h-24 bg-[#1f1b1a] rounded-t-full rounded-b-xl shadow-md" />
                <div className="absolute -left-2 top-6 w-8 h-28 bg-[#1f1b1a] rounded-full" />
                <div className="absolute -right-2 top-6 w-8 h-28 bg-[#1f1b1a] rounded-full" />
                <div className="absolute top-2 w-32 h-10 bg-[#1f1b1a] rounded-b-2xl" />

                {/* Sakura Hairpin ornament */}
                <div className="absolute top-3 right-2 text-pink-400 text-lg">🌸</div>

                {/* Eyebrows */}
                <div className="absolute top-14 flex justify-between w-24 px-1">
                  <div className="w-7 h-1 bg-[#42332e] rounded-full transform -rotate-3" />
                  <div className="w-7 h-1 bg-[#42332e] rounded-full transform rotate-3" />
                </div>

                {/* Eyes */}
                <div className="absolute top-18 flex justify-between w-24 px-3">
                  <div className="w-4 h-4 bg-[#211a18] rounded-full relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                  </div>
                  <div className="w-4 h-4 bg-[#211a18] rounded-full relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                  </div>
                </div>

                {/* Blushing Cheeks */}
                <div className="absolute top-22 flex justify-between w-28 px-1">
                  <div className="w-5 h-2.5 bg-pink-400/40 rounded-full blur-xs" />
                  <div className="w-5 h-2.5 bg-pink-400/40 rounded-full blur-xs" />
                </div>

                {/* Nose */}
                <div className="absolute top-22 w-1.5 h-2 bg-amber-300/60 rounded-full" />

                {/* Animated Mouth (Moves when speaking!) */}
                <div className="absolute top-28 flex items-center justify-center">
                  {isSpeakingAnimation ? (
                    <div className="w-5 h-4 bg-[#8b2635] rounded-full border border-pink-300/30 animate-pulse" />
                  ) : (
                    <div className="w-5 h-2 bg-[#9c3444] rounded-b-full border-t border-[#812332]" />
                  )}
                </div>
              </div>

              {/* Kimono / Modern Japanese Outfit */}
              <div className="w-52 h-28 -mt-6 bg-gradient-to-b from-[#b8384d] to-[#801b2c] rounded-t-3xl border-t-2 border-pink-200/50 flex justify-center relative shadow-lg">
                {/* Kimono collar cross */}
                <div className="w-20 h-16 border-r-2 border-white/60 transform rotate-12 -mt-1" />
                <div className="w-20 h-16 border-l-2 border-white/60 transform -rotate-12 -mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Dark Gradient on bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Header Overlay Bar (Like TikTok / Reels) */}
      <div className="relative z-10 p-4 pb-2 flex items-center justify-between text-white">
        {/* Tutor Badge */}
        <div className="flex items-center gap-2.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          <span className="text-base">{reel.channelAvatar || '🌸'}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-wide">{reel.channelName}</span>
              <span className="bg-[#BC002D] text-[10px] px-1.5 py-0.2 rounded-full font-semibold">Sensei</span>
            </div>
            <span className="text-[10px] text-gray-300 block">{reel.level} • {reel.categoryLabel}</span>
          </div>
        </div>

        {/* Top Controls: Sound indicator, Speed, Close */}
        <div className="flex items-center gap-2">
          {/* Sound Mute/Unmute */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              audioService.playSound('click');
            }}
            className="flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-mono text-gray-200 hover:text-white border border-white/15"
            title={isMuted ? 'Buka Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="text-[11px]">{isMuted ? 'MUTE' : '20'}</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const speeds = [0.75, 0.9, 1.1];
              const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
              setPlaybackSpeed(speeds[nextIdx]);
              audioService.playSound('click');
            }}
            className="bg-black/45 backdrop-blur-md px-2 py-1.5 rounded-full text-xs font-mono text-amber-300 hover:text-white border border-white/15"
            title="Kecepatan Bicara"
          >
            {playbackSpeed === 0.9 ? '1.0x' : `${playbackSpeed}x`}
          </button>

          {/* Close button if modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/45 backdrop-blur-md text-gray-300 hover:text-white hover:bg-black/70 border border-white/15"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Reel Category & Culture Tip Link */}
      <div className="relative z-10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/80 font-medium">{reel.title}</span>
        </div>
        <button
          onClick={() => setShowCultureModal(true)}
          className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full hover:bg-amber-900/60"
        >
          <Info className="w-3 h-3" />
          <span>Tips Budaya</span>
        </button>
      </div>

      {/* Main Interactive Floating Central Card (Exact style from user's video!) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2">
        <div
          onClick={() => speakCurrentItem()}
          className="cursor-pointer group relative w-full max-w-[310px] bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-white/10 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
        >
          {/* Card Step Badge */}
          <div className="absolute top-3 left-4 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
              {currentItemIndex + 1} / {reel.items.length}
            </span>
            {isLoopingSingle && (
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Repeat className="w-2.5 h-2.5" /> Drill Loop
              </span>
            )}
          </div>

          {/* Blind Challenge / Hide Text Toggles */}
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHideFurigana(!hideFurigana);
                audioService.playSound('click');
              }}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-[10px]"
              title={hideFurigana ? 'Tampilkan Romaji' : 'Sembunyikan Romaji (Uji Ingatan)'}
            >
              {hideFurigana ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Large Japanese Kanji / Phrase (As seen in video: 九, 十, 六, etc.) */}
          <div className="mt-4 mb-2">
            {!hideFurigana && currentItem.furigana && (
              <span className="text-sm font-japanese text-gray-500 dark:text-gray-400 block mb-0.5">
                {currentItem.furigana}
              </span>
            )}
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white font-japanese tracking-tight drop-shadow-sm">
              {currentItem.kanji}
            </h1>
          </div>

          {/* Romaji (e.g. Kyu, Ju, Roku, Nana) */}
          {!hideFurigana && (
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-sans tracking-tight mb-1">
              {currentItem.romaji}
            </div>
          )}

          {/* English & Indonesian Meaning (e.g. Nine / Sembilan) */}
          {!hideTranslation && (
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-black text-[#BC002D] dark:text-red-400 font-sans">
                {currentItem.meaningEn || currentItem.meaningId}
              </span>
              {currentItem.meaningEn && currentItem.meaningId !== currentItem.meaningEn && (
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                  ({currentItem.meaningId})
                </span>
              )}
            </div>
          )}

          {/* Gesture Note / Hint Box (Crucial as requested in user's video!) */}
          {currentItem.gestureNote && (
            <div className="mt-4 w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-700/40 rounded-xl p-2.5 text-left flex items-start gap-2">
              <span className="text-base leading-none">✋</span>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                  Gestur Tangan Jepang:
                </span>
                <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-tight">
                  {currentItem.gestureNote}
                </p>
              </div>
            </div>
          )}

          {/* Audio Tap to Replay Hint */}
          <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-400 group-hover:text-[#BC002D] transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Ketuk kartu untuk mendengar suara sensei</span>
          </div>
        </div>

        {/* Speech Recognition Shadowing Live Result Badge */}
        {speechScore !== null && (
          <div
            className={`mt-2.5 w-full max-w-[310px] rounded-2xl p-3 border backdrop-blur-md animate-fadeIn transition-all ${
              speechScore >= 75
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : speechScore >= 50
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                {speechScore >= 75 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-400" />
                )}
                <span>Akurasi Suara: {speechScore}%</span>
              </div>
              {speechScore >= 75 && (
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  +20 XP
                </span>
              )}
            </div>
            {recognizedTranscript && (
              <p className="text-xs text-white/90 italic mb-1">
                Terdengar: "{recognizedTranscript}"
              </p>
            )}
            <p className="text-[11px] leading-snug opacity-90">{speechFeedback}</p>
          </div>
        )}
      </div>

      {/* Right Side Social & Action Column (TikTok/Reels format) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3.5">
        {/* Like Button */}
        <button
          onClick={handleToggleLike}
          className="flex flex-col items-center group"
          title="Sukai Reel ini"
        >
          <div
            className={`p-2.5 rounded-full backdrop-blur-md transition-transform group-hover:scale-110 active:scale-90 ${
              isLiked ? 'bg-red-500/90 text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] text-white font-bold mt-1 drop-shadow">
            {likesCount}
          </span>
        </button>

        {/* Shadowing Microphone (Hero Action!) */}
        <button
          onClick={handleToggleRecording}
          className="flex flex-col items-center group"
          title="Tirukan & Cek Suara (Shadowing Mic)"
        >
          <div
            className={`p-3 rounded-full backdrop-blur-md transition-all group-hover:scale-110 active:scale-95 shadow-lg ${
              isRecording
                ? 'bg-rose-600 text-white ring-4 ring-rose-400/50 animate-pulse'
                : 'bg-[#BC002D] text-white hover:bg-red-700 ring-2 ring-white/30'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </div>
          <span className="text-[10px] text-white font-bold mt-1 drop-shadow">
            {isRecording ? 'Bicara...' : 'Shadow'}
          </span>
        </button>

        {/* Loop Drill Toggle */}
        <button
          onClick={() => {
            setIsLoopingSingle(!isLoopingSingle);
            audioService.playSound('click');
          }}
          className="flex flex-col items-center group"
          title={isLoopingSingle ? 'Ulang satu kata ini' : 'Putar berurutan'}
        >
          <div
            className={`p-2.5 rounded-full backdrop-blur-md transition-transform group-hover:scale-110 ${
              isLoopingSingle
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Repeat className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-white font-bold mt-1 drop-shadow">
            {isLoopingSingle ? '1 Loop' : 'Loop'}
          </span>
        </button>

        {/* Roleplay / Quick Challenge Dialog */}
        {reel.interactiveChallenge && (
          <button
            onClick={() => setShowChallengeModal(true)}
            className="flex flex-col items-center group"
            title="Tantangan Tanya Jawab dengan Sensei"
          >
            <div className="p-2.5 rounded-full bg-black/50 text-amber-300 hover:bg-black/70 backdrop-blur-md transition-transform group-hover:scale-110">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-white font-bold mt-1 drop-shadow">
              Roleplay
            </span>
          </button>
        )}

        {/* Item List Drawer Toggle */}
        <button
          onClick={() => setShowItemList(true)}
          className="flex flex-col items-center group"
          title="Lihat Semua Kata"
        >
          <div className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-transform group-hover:scale-110">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-white font-bold mt-1 drop-shadow">
            Daftar
          </span>
        </button>
      </div>

      {/* Up / Down Navigation Floater (Next/Prev Reel) */}
      <div className="absolute left-3 bottom-24 z-20 flex flex-col gap-2">
        <button
          onClick={onPrevReel}
          disabled={!hasPrev}
          className={`p-2 rounded-full backdrop-blur-md transition ${
            hasPrev
              ? 'bg-black/50 text-white hover:bg-black/80 active:scale-95'
              : 'bg-black/20 text-gray-500 cursor-not-allowed'
          }`}
          title="Reel Sebelumnya"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={onNextReel}
          disabled={!hasNext}
          className={`p-2 rounded-full backdrop-blur-md transition ${
            hasNext
              ? 'bg-black/50 text-white hover:bg-black/80 active:scale-95'
              : 'bg-black/20 text-gray-500 cursor-not-allowed'
          }`}
          title="Reel Berikutnya"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Subtitles & Playback Bar (Matches user's video subtitles: "九 Nine", "十 Ten") */}
      <div className="relative z-10 px-4 pb-4 pt-1 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
        {/* Subtitle Banner */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xl sm:text-2xl font-black text-white font-japanese tracking-wide drop-shadow-md">
              {currentItem.subtitles || `${currentItem.kanji} ${currentItem.meaningEn || currentItem.meaningId}`}
            </span>
          </div>

          {/* Audio Speaker Button */}
          <button
            onClick={() => speakCurrentItem()}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            <Volume2 className="w-5 h-5 text-emerald-400" />
          </button>
        </div>

        {/* Progress Bar with Step Markers */}
        <div className="flex items-center gap-1.5 w-full mb-3">
          {reel.items.map((it, idx) => (
            <div
              key={it.id}
              onClick={() => {
                setCurrentItemIndex(idx);
                audioService.playSound('click');
              }}
              className={`h-1.5 rounded-full flex-1 cursor-pointer transition-all duration-300 ${
                idx === currentItemIndex
                  ? 'bg-[#BC002D] shadow-sm shadow-[#BC002D]'
                  : idx < currentItemIndex
                  ? 'bg-white/70'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              title={`${it.kanji} (${it.romaji})`}
            />
          ))}
        </div>

        {/* Media Control Actions */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevItem}
              className="p-2 rounded-full hover:bg-white/10 active:scale-90 text-gray-300 hover:text-white transition"
              title="Kata Sebelumnya"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-[#BC002D] text-white hover:bg-red-700 active:scale-90 shadow-md transition"
              title={isPlaying ? 'Jeda Video' : 'Mulai Putar Otomatis'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={handleNextItem}
              className="p-2 rounded-full hover:bg-white/10 active:scale-90 text-gray-300 hover:text-white transition"
              title="Kata Berikutnya"
            >
              <RotateCcw className="w-4 h-4 transform scale-x-[-1]" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-gray-400 block font-mono">
              {currentItem.romaji}
            </span>
            <span className="text-xs font-bold text-gray-200">
              {currentItem.meaningId}
            </span>
          </div>
        </div>
      </div>

      {/* Modal / Drawer: Culture Note */}
      {showCultureModal && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#1C1C1E] border border-white/15 rounded-3xl p-5 text-white max-h-[80%] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⛩️</span>
                <h3 className="font-bold text-base">Catatan Budaya & Gestur</h3>
              </div>
              <button
                onClick={() => setShowCultureModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {reel.cultureNote}
            </p>
            <div className="bg-neutral-800/80 rounded-2xl p-3 border border-white/5 mb-3">
              <h4 className="text-xs font-bold text-amber-400 mb-1">
                Tips Pelafalan dari {reel.tutorName}:
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentItem.grammarTip || 'Perhatikan mora dan nada saat menirukan pelafalan native. Jangan terburu-buru, ucapkan dengan tenang dan artikulasi jelas.'}
              </p>
            </div>
            <button
              onClick={() => setShowCultureModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#BC002D] text-white font-bold text-xs"
            >
              Tutup & Lanjutkan Latihan
            </button>
          </div>
        </div>
      )}

      {/* Modal / Drawer: All Items in Reel */}
      {showItemList && (
        <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md p-4 flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/15 text-white">
            <div>
              <h3 className="font-bold text-sm">{reel.title}</h3>
              <p className="text-[11px] text-gray-400">Pilih kosakata untuk langsung dipraktikkan</p>
            </div>
            <button
              onClick={() => setShowItemList(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-3 space-y-2">
            {reel.items.map((it, idx) => (
              <div
                key={it.id}
                onClick={() => {
                  setCurrentItemIndex(idx);
                  setShowItemList(false);
                  speakCurrentItem();
                }}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  idx === currentItemIndex
                    ? 'bg-[#BC002D]/20 border-[#BC002D] text-white'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base font-japanese text-white">{it.kanji}</span>
                      <span className="text-xs text-gray-400">{it.romaji}</span>
                    </div>
                    <span className="text-[11px] text-gray-300">{it.meaningId}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioService.speak(it.audioText || it.kanji);
                  }}
                  className="p-2 rounded-full hover:bg-white/20 text-gray-300 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Interactive Roleplay Challenge (Call & Response with Sensei) */}
      {showChallengeModal && reel.interactiveChallenge && (
        <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-5 flex flex-col justify-center animate-fadeIn">
          <div className="bg-[#1E1E22] border border-amber-500/30 rounded-3xl p-5 text-white max-h-[90%] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎙️</span>
                <div>
                  <h3 className="font-bold text-sm text-amber-300">Tantangan Percakapan Langsung</h3>
                  <span className="text-[10px] text-gray-400">Call & Response bersama {reel.tutorName}</span>
                </div>
              </div>
              <button
                onClick={() => setShowChallengeModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sensei Prompt */}
            <div className="bg-neutral-800/80 rounded-2xl p-4 border border-white/10 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300 mb-1">
                <span>{reel.channelAvatar || '🌸'}</span>
                <span>{reel.tutorName} bertanya kepada Anda:</span>
              </div>
              <p className="text-lg font-bold text-white font-japanese mb-1">
                {reel.interactiveChallenge.promptJa}
              </p>
              <p className="text-xs text-amber-300 font-mono mb-1">
                {reel.interactiveChallenge.promptRomaji}
              </p>
              <p className="text-xs text-gray-300">
                "{reel.interactiveChallenge.promptMeaning}"
              </p>
              <button
                onClick={() => audioService.speak(reel.interactiveChallenge!.promptJa)}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#BC002D] hover:text-red-400 font-bold bg-white/5 px-3 py-1 rounded-lg"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan Pertanyaan Sensei</span>
              </button>
            </div>

            {/* Expected Answer & User Turn */}
            <div className="bg-neutral-800/50 rounded-2xl p-4 border border-white/5 mb-4">
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                Giliran Anda Menjawab (Contoh):
              </span>
              <p className="text-base font-bold text-white font-japanese mb-0.5">
                {reel.interactiveChallenge.expectedReplyJa}
              </p>
              <p className="text-xs text-gray-400 font-mono mb-1">
                {reel.interactiveChallenge.expectedReplyRomaji}
              </p>
              <p className="text-xs text-gray-300 italic">
                "{reel.interactiveChallenge.expectedReplyMeaning}"
              </p>
            </div>

            {/* Record Reply */}
            <button
              onClick={() => {
                setShowChallengeModal(false);
                handleToggleRecording();
              }}
              className="w-full py-3 rounded-2xl bg-[#BC002D] hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#BC002D]/30"
            >
              <Mic className="w-4 h-4" />
              <span>Rekam Suara Jawaban Saya Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
