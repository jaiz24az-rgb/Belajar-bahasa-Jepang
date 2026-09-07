import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, RefreshCw, Award, CheckCircle2, AlertCircle, Play, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpeechFeedbackResult, UserProgress } from '../types';
import { audioService } from '../services/audioService';
import { speechRecognitionService } from '../services/speechRecognitionService';
import { getAIPronunciationFeedback } from '../services/geminiService';
import { StorageService } from '../services/storageService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

interface PracticePhrase {
  id: string;
  category: string;
  level: string;
  japanese: string;
  furigana: string;
  romaji: string;
  meaningId: string;
  tip: string;
}

const PHRASES_LIBRARY: PracticePhrase[] = [
  {
    id: 'sp_1',
    category: 'Salam & Dasar',
    level: 'N5',
    japanese: 'おはようございます。',
    furigana: 'おはよう ございます。',
    romaji: 'Ohayou gozaimasu.',
    meaningId: 'Selamat pagi (sopan).',
    tip: 'Pastikan mora "go-za-i-ma-su" diucapkan dengan ketukan yang rata dan nada datar.',
  },
  {
    id: 'sp_2',
    category: 'Salam & Dasar',
    level: 'N5',
    japanese: 'ありがとうございます。',
    furigana: 'ありがとう ございます。',
    romaji: 'Arigatou gozaimasu.',
    meaningId: 'Terima kasih banyak.',
    tip: 'Vokal panjang "tou" diucapkan 2 ketukan mora.',
  },
  {
    id: 'sp_3',
    category: 'Restoran & Toko',
    level: 'N5',
    japanese: 'これをください。',
    furigana: 'これを ください。',
    romaji: 'Kore o kudasai.',
    meaningId: 'Tolong berikan yang ini.',
    tip: 'Gunakan saat menunjuk menu makanan atau barang belanjaan di toko.',
  },
  {
    id: 'sp_4',
    category: 'Navigasi',
    level: 'N4',
    japanese: 'すみません、駅はどこですか？',
    furigana: 'すみません、えきは どこですか？',
    romaji: 'Sumimasen, eki wa doko desu ka?',
    meaningId: 'Permisi, stasiun ada di mana ya?',
    tip: 'Naikkan intonasi pada suku kata akhir "ka" untuk kalimat tanya.',
  },
  {
    id: 'sp_5',
    category: 'Penyemangat',
    level: 'N4',
    japanese: '一生懸命頑張ります！',
    furigana: 'いっしょうけんめい がんばります！',
    romaji: 'Isshoukenmei ganbarimasu!',
    meaningId: 'Saya akan berusaha sekuat tenaga!',
    tip: 'Perhatikan sokuon (konsonan ganda kecil) pada "Isshou" dan pelafalan "n".',
  },
  {
    id: 'sp_6',
    category: 'Latihan Lidah (早口言葉)',
    level: 'N3',
    japanese: '生麦、生米、生卵。',
    furigana: 'なまむぎ、なまごめ、なまたまご。',
    romaji: 'Nama mugi, nama gome, nama tamago.',
    meaningId: 'Gandum mentah, beras mentah, telur mentah (Tongue twister legendaris).',
    tip: 'Latih kelincahan transisi bunyi "mugi", "gome", dan "tamago" dengan tempo stabil.',
  },
  {
    id: 'sp_7',
    category: 'Latihan Lidah (早口言葉)',
    level: 'N2',
    japanese: '東京特許許可局局長。',
    furigana: 'とうきょう とっきょ きょかきょく きょくちょう。',
    romaji: 'Toukyou tokkyo kyokakyoku kyokuchou.',
    meaningId: 'Kepala Biro Izin Paten Tokyo (Tantangan artikulasi "kyo/kya").',
    tip: 'Fokus pada kejelasan bunyi konsonan terpalatalisasi (Yōon きょ).',
  },
];

export const SpeakingCoach: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [selectedPhrase, setSelectedPhrase] = useState<PracticePhrase>(PHRASES_LIBRARY[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<SpeechFeedbackResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(PHRASES_LIBRARY.map((p) => p.category)))];

  const filteredPhrases = PHRASES_LIBRARY.filter((p) =>
    selectedCategory === 'all' ? true : p.category === selectedCategory
  );

  const startVoiceRecording = () => {
    if (isListening) {
      speechRecognitionService.stopListening();
      setIsListening(false);
      return;
    }

    setTranscript('');
    setFeedback(null);
    setIsListening(true);
    audioService.playSound('click');

    speechRecognitionService.startListening(
      (result) => {
        setTranscript(result.transcript);
        if (result.isFinal) {
          setIsListening(false);
          evaluateSpeech(result.transcript);
        }
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const evaluateSpeech = async (spokenText: string) => {
    if (!spokenText.trim()) return;
    setIsEvaluating(true);

    try {
      const result = await getAIPronunciationFeedback(
        selectedPhrase.japanese,
        selectedPhrase.romaji,
        spokenText,
        progress.currentJLPTTarget
      );

      setFeedback(result);

      if (result.score >= 85) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        audioService.playSound('levelup');
      } else if (result.score >= 60) {
        audioService.playSound('correct');
      } else {
        audioService.playSound('wrong');
      }

      const updated = StorageService.recordSpeechPractice(selectedPhrase.id, result.score);
      onUpdateProgress(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const bestScore = progress.speechPractices[selectedPhrase.id]?.bestScore || 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Speech Recognition AI
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">発音コーチ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold">発音</span>
            <span>Studio Koreksi Pelafalan & Latihan Bicara AI</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Teknologi speech recognition untuk mengoreksi artikulasi, intonasi, & panjang mora secara real-time
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs self-start sm:self-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                selectedCategory === cat
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              {cat === 'all' ? 'Semua Topik' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Phrase Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Daftar Kalimat Latihan:</h3>
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredPhrases.map((phrase) => {
              const isSelected = selectedPhrase.id === phrase.id;
              const pScore = progress.speechPractices[phrase.id]?.bestScore;

              return (
                <div
                  key={phrase.id}
                  onClick={() => {
                    setSelectedPhrase(phrase);
                    setFeedback(null);
                    setTranscript('');
                    audioService.speak(phrase.japanese);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20'
                      : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 hover:border-[#BC002D] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                    }`}>
                      {phrase.level} • {phrase.category}
                    </span>
                    {pScore !== undefined && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${
                        isSelected ? 'text-white' : 'text-emerald-500'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> {pScore} Pts
                      </span>
                    )}
                  </div>
                  <h4 className="font-japanese font-bold text-base mt-2">{phrase.japanese}</h4>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {phrase.meaningId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Speech Practice & AI Evaluation Stage */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
          {/* Target Box */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 text-center space-y-3 relative overflow-hidden">
            {bestScore > 0 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                ⭐ Rekor: {bestScore}%
              </span>
            )}

            <span className="text-xs font-bold text-[#BC002D] dark:text-rose-400 uppercase tracking-widest">
              Kalimat Target ({selectedPhrase.level})
            </span>

            <h3 className="text-3xl sm:text-4xl font-japanese font-bold text-[#1A1A1A] dark:text-white leading-tight">
              {selectedPhrase.japanese}
            </h3>

            <p className="text-sm font-semibold text-[#BC002D] dark:text-rose-300 font-japanese">
              {selectedPhrase.furigana}
            </p>

            <p className="text-xs text-gray-500 italic">
              /{selectedPhrase.romaji}/
            </p>

            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-neutral-800">
              🇮🇩 Arti: "{selectedPhrase.meaningId}"
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => audioService.speak(selectedPhrase.japanese, 0.85)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#BC002D] shadow-2xs transition"
              >
                <Volume2 className="w-4 h-4 text-[#BC002D]" />
                <span>Dengar Kecepatan Normal</span>
              </button>

              <button
                onClick={() => audioService.speak(selectedPhrase.japanese, 0.6)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#BC002D] shadow-2xs transition"
              >
                <Play className="w-3.5 h-3.5 text-amber-500" />
                <span>0.6x Lambat (Per Mora)</span>
              </button>
            </div>
          </div>

          {/* Interactive Mic Station */}
          <div className="flex flex-col items-center justify-center space-y-4 py-2">
            <button
              onClick={startVoiceRecording}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-105 select-none ${
                isListening
                  ? 'bg-rose-500 ring-8 ring-rose-500/30 animate-pulse'
                  : 'bg-[#BC002D] hover:bg-[#a30027] shadow-[#BC002D]/30'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>

            <div className="text-center">
              <p className="font-bold text-sm text-[#1A1A1A] dark:text-white">
                {isListening
                  ? '🎙️ Mendengarkan suara Anda... (Bicaralah sekarang)'
                  : 'Tekan tombol mikrofon lalu lafalkan kalimat di atas'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isListening ? 'Sistem sedang menganalisis gelombang vokal & konsonan' : 'Didukung Web Speech Recognition & Analisis AI Gemini'}
              </p>
            </div>

            {transcript && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-[#BC002D]/10 border border-[#BC002D]/20 text-center w-full max-w-md">
                <span className="text-[11px] font-bold text-[#BC002D] uppercase">Suara Tertangkap:</span>
                <p className="text-base font-japanese font-bold text-[#1A1A1A] dark:text-white mt-0.5">
                  "{transcript}"
                </p>
              </div>
            )}

            {isEvaluating && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#BC002D]">
                <RefreshCw className="w-4 h-4 animate-spin" /> Sedang menganalisis fonetik pelafalan...
              </div>
            )}
          </div>

          {/* AI Feedback Analysis Result Card */}
          {feedback && (
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-200 dark:border-white/10 space-y-4">
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-3 border-b border-gray-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xs ${
                    feedback.score >= 80 ? 'bg-emerald-500' : feedback.score >= 60 ? 'bg-amber-500' : 'bg-[#BC002D]'
                  }`}>
                    {feedback.score}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                      Tingkat Akurasi
                    </span>
                    <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-white">
                      {feedback.accuracyLevel}
                    </h4>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#BC002D]/10 text-[#BC002D] border border-[#BC002D]/20">
                  +{Math.round(feedback.score / 5)} XP Diperoleh
                </span>
              </div>

              {/* Phonetic Feedback */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-relaxed">
                  📢 {feedback.phoneticFeedback}
                </p>

                {/* Syllable Breakdown */}
                {feedback.syllableBreakdown && feedback.syllableBreakdown.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {feedback.syllableBreakdown.map((syl, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                          syl.status === 'correct'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        <span className="font-japanese text-sm">{syl.syllable}</span>
                        <span className="text-[10px] opacity-80">({syl.note})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Improvement Tips */}
              {feedback.improvementTips && feedback.improvementTips.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 space-y-1.5">
                  <span className="text-[11px] font-bold text-[#BC002D] uppercase">Saran Perbaikan Pelafalan:</span>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                    {feedback.improvementTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sensei Encouragement */}
              <div className="p-3 rounded-2xl bg-[#1A1A1A] text-white text-xs font-medium text-center">
                {feedback.encouragement}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
