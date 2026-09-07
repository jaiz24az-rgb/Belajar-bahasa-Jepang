import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles, Award, ArrowRight, X } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface Props {
  isOpen: boolean;
  title: string;
  subtitle: string;
  rewardXP: number;
  badgeName?: string;
  onClose: () => void;
}

export const CelebrationModal: React.FC<Props> = ({
  isOpen,
  title,
  subtitle,
  rewardXP,
  badgeName,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      audioService.playSound('levelup');
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#BC002D', '#FFD700', '#FF6B8B', '#4CAF50', '#2196F3']
        });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A1A1A] border border-amber-200 dark:border-amber-900/40 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Trophy Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20 mx-auto animate-bounce">
            🏆
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 bg-[#BC002D] text-white rounded-full">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            Omedetou Gozaimasu! • おめでとうございます
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Reward Pill */}
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-amber-700 dark:text-amber-300 text-sm">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>+{rewardXP} XP Tambahan</span>
          </div>
          {badgeName && (
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 border-l border-amber-200 dark:border-amber-800 pl-3">
              Lencana: {badgeName}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#BC002D] hover:bg-[#a30027] text-white rounded-2xl font-bold text-sm shadow-md shadow-[#BC002D]/20 transition flex items-center justify-center gap-2"
        >
          <span>Lanjutkan Belajar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
