import React, { useState } from 'react';
import { Cloud, Download, Upload, Wifi, WifiOff, CheckCircle, RefreshCw, X, AlertTriangle } from 'lucide-react';
import { UserProgress } from '../types';
import { StorageService } from '../services/storageService';
import { audioService } from '../services/audioService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdate: (updated: UserProgress) => void;
}

export const DataSyncModal: React.FC<Props> = ({
  isOpen,
  onClose,
  progress,
  onUpdate,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOpen) return null;

  const handleExport = () => {
    const jsonStr = StorageService.exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nihongomaster_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    audioService.playSound('levelup');
  };

  const handleCopyJSON = () => {
    const jsonStr = StorageService.exportDataJSON();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    audioService.playSound('click');
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importDataJSON(content);
      if (success) {
        const fresh = StorageService.getProgress();
        onUpdate(fresh);
        setImportStatus('Kemajuan belajar berhasil dipulihkan!');
        audioService.playSound('levelup');
      } else {
        setImportStatus('Format berkas tidak valid. Mohon gunakan file cadangan yang sesuai.');
        audioService.playSound('wrong');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh kemajuan belajar? Tindakan ini tidak dapat dibatalkan.')) {
      StorageService.resetProgress();
      const fresh = StorageService.getProgress();
      onUpdate(fresh);
      audioService.playSound('wrong');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center shadow-xs">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A] dark:text-white text-base">Sinkronisasi & Mode Offline</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Penyimpanan aman lokal dan ekspor lintas perangkat</p>
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
          {/* Status Box */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isOnline ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'}`}>
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status Jaringan</p>
                <p className="text-sm font-bold text-[#1A1A1A] dark:text-white">
                  {isOnline ? '🟢 Terhubung Online (AI Aktif)' : '🟡 Mode Mandiri Offline Aktif'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              100% Offline Ready
            </span>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Seluruh data latihan Hiragana, Katakana, Kanji N5-N1, percakapan, suara sintetis native, dan skor kuis tersimpan secara lokal di perangkat Anda. Anda dapat belajar kapan saja tanpa kuota internet!
          </p>

          {/* Backup & Restore section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExport}
              className="p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:border-[#BC002D] transition text-left group shadow-2xs"
            >
              <div className="flex items-center gap-2 text-[#BC002D] font-bold text-xs mb-1">
                <Download className="w-4 h-4" />
                <span>Unduh Cadangan (.json)</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Simpan salinan kemajuan belajar ke file</p>
            </button>

            <label className="p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:border-emerald-500 transition text-left cursor-pointer group shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                <Upload className="w-4 h-4" />
                <span>Pulihkan Data (.json)</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Impor kemajuan dari perangkat lain</p>
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          {/* Status Message */}
          {importStatus && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}

          {/* Copy to Clipboard option */}
          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-gray-400">Atau salin kode data langsung:</span>
            <button
              onClick={handleCopyJSON}
              className="text-[#BC002D] hover:underline font-bold"
            >
              {copied ? 'Tersalin ke Clipboard!' : 'Salin Teks JSON'}
            </button>
          </div>

          {/* Danger zone */}
          <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-rose-500 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset Data Aplikasi</span>
            </div>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            >
              Reset Kemajuan
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-neutral-900/50">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1A1A1A] hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-2xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
