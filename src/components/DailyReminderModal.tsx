import React, { useState, useEffect } from 'react';
import { Bell, Clock, CheckCircle2, ShieldAlert, Sparkles, X, Volume2 } from 'lucide-react';
import { UserProgress } from '../types';
import { StorageService } from '../services/storageService';
import { audioService } from '../services/audioService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdate: (updated: UserProgress) => void;
}

export const DailyReminderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  progress,
  onUpdate,
}) => {
  const [enabled, setEnabled] = useState(progress.reminderEnabled);
  const [time, setTime] = useState(progress.reminderTime || '20:00');
  const [goal, setGoal] = useState(progress.dailyGoalMinutes || 15);
  const [permissionState, setPermissionState] = useState<string>('default');
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermissionState(perm);
      if (perm === 'granted') {
        audioService.playSound('levelup');
      }
    }
  };

  const handleTestNotification = () => {
    audioService.playSound('streak');
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('🎌 NihongoMaster: Waktunya Belajar!', {
        body: `Hai ${progress.userName}! Jangan biarkan streak ${progress.streak} harimu padam. Selesaikan target ${goal} menit hari ini!`,
        icon: '/favicon.ico',
      });
    }
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleSave = () => {
    const updated: UserProgress = {
      ...progress,
      reminderEnabled: enabled,
      reminderTime: time,
      dailyGoalMinutes: goal,
    };
    StorageService.saveProgress(updated);
    onUpdate(updated);
    audioService.playSound('click');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A] dark:text-white text-base">Pengingat Belajar Harian</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Jaga konsistensi & streak belajar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Notification Permission Banner */}
          {permissionState !== 'granted' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-300">
                <p className="font-bold">Izin Notifikasi Belum Aktif</p>
                <p className="mt-0.5">Izinkan notifikasi peramban agar sistem dapat memunculkan alarm pengingat tepat waktu.</p>
                <button
                  onClick={handleRequestPermission}
                  className="mt-2 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition shadow-2xs"
                >
                  Aktifkan Notifikasi Browser
                </button>
              </div>
            </div>
          )}

          {/* Toggle reminder */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
            <div>
              <p className="font-bold text-sm text-[#1A1A1A] dark:text-white">Aktifkan Alarm Pengingat</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Kirim notifikasi setiap hari pada jam pilihan</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#BC002D]"></div>
            </label>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Waktu Belajar Favorit
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!enabled}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl text-sm font-bold text-[#1A1A1A] dark:text-white focus:ring-2 focus:ring-[#BC002D] disabled:opacity-50"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Rekomendasi: 20:00 (malam hari sebelum istirahat)</p>
          </div>

          {/* Daily Goal */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Target Waktu Belajar Harian (Menit)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 25, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setGoal(mins)}
                  className={`py-2 text-xs font-bold rounded-2xl border transition ${
                    goal === mins
                      ? 'bg-[#BC002D] border-[#BC002D] text-white shadow-xs'
                      : 'bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:border-[#BC002D]'
                  }`}
                >
                  {mins} Menit
                </button>
              ))}
            </div>
          </div>

          {/* Test reminder button */}
          <button
            type="button"
            onClick={handleTestNotification}
            className="w-full py-2.5 px-4 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 flex items-center justify-center gap-2 transition"
          >
            <Volume2 className="w-4 h-4 text-[#BC002D]" />
            <span>{testSent ? 'Notifikasi Terkirim!' : 'Uji Coba Bunyi Notifikasi'}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-neutral-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-2xl transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-[#BC002D] hover:bg-[#a30027] rounded-2xl shadow-md shadow-[#BC002D]/20 transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
