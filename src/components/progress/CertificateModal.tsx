import React from 'react';
import { UserProgress } from '../../types';
import { X, Award, Printer, Download, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface Props {
  isOpen: boolean;
  progress: UserProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<Props> = ({ isOpen, progress, onClose }) => {
  if (!isOpen) return null;

  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    audioService.playSound('click');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-[#FAF8F5] text-[#1A1A1A] border-4 border-[#8C1D2A] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative print:border-4 print:shadow-none animate-in fade-in zoom-in duration-200">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Inner Border */}
        <div className="border-2 border-dashed border-[#8C1D2A]/40 rounded-2xl p-6 sm:p-8 relative bg-white/90 shadow-inner">
          {/* Header Japanese Ornament */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 mb-1">
              <span className="text-[#8C1D2A] font-bold text-xs tracking-widest uppercase">
                Official Certification of Achievement
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-japanese font-extrabold text-[#8C1D2A] tracking-wider">
              修了認定証書
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-serif italic">
              Certificate of Japanese Language Proficiency & Module Mastery
            </p>
          </div>

          {/* Certificate Body */}
          <div className="my-8 text-center space-y-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
              Dengan bangga diberikan kepada:
            </p>

            <div className="inline-block border-b-2 border-[#8C1D2A] pb-1 px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-serif">
                {progress.userName}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 max-w-lg mx-auto leading-relaxed">
              Telah menunjukkan ketekunan, dedikasi, dan pencapaian kompetensi dalam pembelajaran bahasa Jepang terstruktur tingkat <span className="font-bold text-[#8C1D2A]">JLPT {progress.currentJLPTTarget}</span> melalui kurikulum komprehensif NihongoMaster.
            </p>

            {/* Achievement Highlights Matrix */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Total Pengalaman</span>
                <span className="font-bold text-[#8C1D2A]">{progress.xp} XP</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Streak Belajar</span>
                <span className="font-bold text-orange-600">{progress.streak} Hari</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Huruf & Kanji</span>
                <span className="font-bold text-gray-800">{progress.masteredKana.length + progress.masteredKanji.length} Karakter</span>
              </div>
            </div>
          </div>

          {/* Footer & Hanko Stamp Seal */}
          <div className="flex items-end justify-between pt-6 border-t border-gray-200 text-xs">
            <div className="space-y-1 text-left">
              <span className="text-[10px] text-gray-400 uppercase block font-semibold">Tanggal Penerbitan</span>
              <p className="font-bold text-gray-800">{todayFormatted}</p>
              <p className="text-[10px] text-gray-400 font-mono">ID: NHM-{progress.avatarSeed.toUpperCase()}-2026</p>
            </div>

            {/* Traditional Red Hanko Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl border-2 border-red-600 flex flex-col items-center justify-center text-red-600 rotate-[-4deg] shadow-xs bg-red-50/50 select-none">
                <span className="text-[10px] font-bold font-japanese leading-none">日本語</span>
                <span className="text-xs font-black font-japanese leading-none my-0.5">認定</span>
                <span className="text-[9px] font-bold font-japanese leading-none">皆伝</span>
              </div>
              <span className="text-[9px] text-gray-400 mt-1 font-serif">NihongoMaster Seal</span>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] text-gray-400 uppercase block font-semibold">Kepala Instruktur</span>
              <p className="font-japanese font-bold text-gray-800 text-sm">健二 先生 (Kenji Sensei)</p>
              <p className="text-[10px] text-gray-500">Nihongo Pedagogy Director</p>
            </div>
          </div>
        </div>

        {/* Action Controls (Hidden on Print) */}
        <div className="flex items-center justify-between pt-2 print:hidden">
          <span className="text-xs text-gray-500">
            Sertifikat digital dapat dicetak atau disimpan sebagai dokumen prestasi.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1A1A1A] rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sertifikat</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#8C1D2A] hover:bg-[#701621] text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
