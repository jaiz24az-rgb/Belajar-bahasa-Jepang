import React, { useState } from 'react';
import { Volume2, Play, Pause, RotateCcw, Eye, EyeOff, CheckCircle2, HelpCircle, FastForward, Award, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { JLPTLevel, UserProgress } from '../types';
import { audioService } from '../services/audioService';
import { StorageService } from '../services/storageService';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

interface ListeningLesson {
  id: string;
  level: JLPTLevel;
  title: string;
  titleJa: string;
  situation: string;
  speaker: string;
  audioText: string;
  furigana: string;
  romaji: string;
  translation: string;
  question: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LISTENING_LESSONS: ListeningLesson[] = [
  {
    id: 'lis_1',
    level: 'N5',
    title: 'Pengumuman Keberangkatan Kereta Shinkansen',
    titleJa: '新幹線の発車案内',
    situation: 'Mendengarkan pengumuman di peron Stasiun Tokyo tentang jadwal dan nomor peron kereta.',
    speaker: 'Petugas Stasiun (Eki-anaunsu)',
    audioText: 'まもなく、14番線に、のぞみ25号博多行きが到着いたします。黄色い点字ブロックの内側までお下がりください。',
    furigana: 'まもなく、じゅうよんばんせんに、のぞみ にじゅうごごう はかたゆきが とうちゃく いたします。きいろい てんじぶろっくの うちがわまで おさがりください。',
    romaji: 'Mamonaku, juuyon-bansen ni, Nozomi nijuugogou Hakata-yuki ga touchaku itashimasu. Kiiroi tenji burokku no uchigawa made osagari kudasai.',
    translation: 'Sebentar lagi di peron jalur 14, kereta Nozomi No. 25 tujuan Hakata akan tiba. Harap mundur ke belakang garis blok kuning pemandu.',
    question: {
      prompt: 'Kereta Nozomi No. 25 akan tiba di peron jalur nomor berapa?',
      options: ['12番線 (Jalur 12)', '14番線 (Jalur 14)', '15番線 (Jalur 15)', '25番線 (Jalur 25)'],
      correctIndex: 1,
      explanation: 'Pengumuman dengan jelas menyebutkan 「14番線に」 (Juuyon-bansen ni / di peron jalur 14).'
    }
  },
  {
    id: 'lis_2',
    level: 'N5',
    title: 'Percakapan Jam Operasional Kafe di Shibuya',
    titleJa: 'カフェの営業時間',
    situation: 'Pelanggan menanyakan waktu tutup kafe.',
    speaker: 'Pelayan Kafe & Pengunjung',
    audioText: 'お客様、本日のラストオーダーは夜の九時半で、閉店は十時となっております。',
    furigana: 'おきゃくさま、ほんじつの らすとおーだーは よるの くじはんで、へいてんは じゅうじと なっております。',
    romaji: 'Okyakusama, honjitsu no rasuto oodaa wa yoru no kuji-han de, heiten wa juuji to natte orimasu.',
    translation: 'Pelanggan yang terhormat, pesanan terakhir (last order) hari ini pukul 21:30, dan toko tutup pada pukul 22:00.',
    question: {
      prompt: 'Jam berapakah batas pesanan terakhir (last order) di kafe tersebut?',
      options: ['Jam 20:00 (Hachiji)', 'Jam 21:00 (Kuji)', 'Jam 21:30 (Kuji-han)', 'Jam 22:00 (Juuji)'],
      correctIndex: 2,
      explanation: 'Pelayan menyatakan bahwa 「ラストオーダーは夜の九時半」 (Kuji-han / 21:30).'
    }
  },
  {
    id: 'lis_3',
    level: 'N4',
    title: 'Prakiraan Cuaca Musim Semi di Kanto',
    titleJa: '関東地方の天気予報',
    situation: 'Penyiar radio melaporkan prakiraan cuaca dan suhu udara.',
    speaker: 'Penyiar Cuaca (Kishou-yohou)',
    audioText: '明日の東京地方は、朝から晴れて暖かい一日となるでしょう。最高気温は22度まで上がる見込みです。',
    furigana: 'あしたの とうきょうちほうは、あさから はれて あたたかい いちにちと なるでしょう。さいこうきおんは にじゅうにどまで あがる みこみです。',
    romaji: 'Ashita no Toukyou chihou wa, asa kara harete atatakai ichinichi to naru deshou. Saikou kion wa nijuuni-do made agaru mikomi desu.',
    translation: 'Wilayah Tokyo besok akan cerah sejak pagi dan menjadi hari yang hangat. Suhu maksimum diperkirakan naik hingga 22 derajat Celsius.',
    question: {
      prompt: 'Bagaimana kondisi cuaca Tokyo besok pagi?',
      options: ['Hujan deras (Oozame)', 'Mendung dingin (Kumori)', 'Cerah dan hangat (Hare)', 'Bersalju (Yuki)'],
      correctIndex: 2,
      explanation: 'Penyiar mengatakan: 「朝から晴れて暖かい一日」 (Cerah dan hangat sepanjang hari mulai pagi).'
    }
  },
  {
    id: 'lis_4',
    level: 'N3',
    title: 'Instruksi Kerja dari Manajer Perusahaan Jepang',
    titleJa: '職場での業務指示',
    situation: 'Manajer divisi meminta laporan diselesaikan sebelum rapat dimulai.',
    speaker: 'Manajer (Buchou)',
    audioText: '山田さん、企画書の作成は順調ですか？明後日の役員会議までに、データをまとめたグラフを添付して提出してください。',
    furigana: 'やまださん、きかくしょの さくせいは じゅんちょうですか？あさっての やくいんかいぎまでに、でーたを まとめた ぐらふを てんぷして ていしゅつしてください。',
    romaji: 'Yamada-san, kikakusho no sakusei wa junchou desu ka? Asatte no yakuinkaigi made ni, deeta o matometa gurafu o tempu shite teishutsu shite kudasai.',
    translation: 'Yamada-san, apakah pembuatan proposal perencanaannya lancar? Sebelum rapat direksi lusa, tolong lampirkan grafik rangkuman data lalu kumpulkan ya.',
    question: {
      prompt: 'Kapan batas pengumpulan berkas proposal tersebut?',
      options: ['Hari ini (Kyou)', 'Besok (Ashita)', 'Lusa sebelum rapat direksi (Asatte)', 'Minggu depan (Raishuu)'],
      correctIndex: 2,
      explanation: 'Manajer menegaskan: 「明後日の役員会議までに」 (Asatte / sebelum lusa rapat direksi).'
    }
  }
];

export const ListeningLab: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [selectedLesson, setSelectedLesson] = useState<ListeningLesson>(LISTENING_LESSONS[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const filteredLessons = LISTENING_LESSONS.filter((l) => l.level === selectedLevel);

  const playAudio = async (speed: number = playbackSpeed) => {
    setIsPlaying(true);
    await audioService.speak(selectedLesson.audioText, speed);
    setIsPlaying(false);
  };

  const handleSelectAnswer = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);

    if (idx === selectedLesson.question.correctIndex) {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      audioService.playSound('correct');
      const updated = StorageService.addXP(25, 'Listening Comprehension');
      onUpdateProgress(updated);
    } else {
      audioService.playSound('wrong');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Audio Immersion
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">聴解ラボ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold">聴解</span>
            <span>Laboratorium Mendengar Audio Native (Choukai)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Asah kepekaan telinga dengan audio penutur asli Jepang, variasi kecepatan, & pemahaman kontekstual
          </p>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs self-start sm:self-center">
          {(['N5', 'N4', 'N3'] as JLPTLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                const found = LISTENING_LESSONS.find((l) => l.level === lvl);
                if (found) {
                  setSelectedLesson(found);
                  setSelectedOption(null);
                  setAnswered(false);
                  setShowTranscript(false);
                }
                audioService.playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedLevel === lvl
                  ? 'bg-[#BC002D] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lesson list sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Materi Audio ({selectedLevel}):</h3>
          <div className="space-y-2.5">
            {filteredLessons.map((les) => {
              const isSelected = selectedLesson.id === les.id;
              return (
                <div
                  key={les.id}
                  onClick={() => {
                    setSelectedLesson(les);
                    setSelectedOption(null);
                    setAnswered(false);
                    setShowTranscript(false);
                    audioService.playSound('click');
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
                      {les.level}
                    </span>
                    <Radio className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <h4 className="font-bold text-sm mt-1.5 leading-snug">{les.title}</h4>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {les.situation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Player and Listening Exercise Board */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
          {/* Situation Box */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
            <span className="text-[11px] font-bold text-[#BC002D] uppercase tracking-wider block mb-1">
              Konteks Situasi
            </span>
            <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white">
              {selectedLesson.situation}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pembicara: {selectedLesson.speaker}
            </p>
          </div>

          {/* Master Native Audio Deck */}
          <div className="p-6 rounded-2xl bg-[#1A1A1A] text-white border border-neutral-800 flex flex-col items-center justify-center space-y-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => playAudio(playbackSpeed)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition transform hover:scale-105 ${
                  isPlaying ? 'bg-amber-500 animate-pulse' : 'bg-[#BC002D] hover:bg-[#a30027] shadow-[#BC002D]/30'
                }`}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>

            {/* Speed controller pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-800">
              <span className="text-[11px] font-semibold text-gray-400 px-2">Kecepatan:</span>
              {[
                { label: '0.7x (Pelan)', val: 0.7 },
                { label: '0.85x (Sedang)', val: 0.85 },
                { label: '1.0x (Native)', val: 1.0 },
                { label: '1.25x (Cepat)', val: 1.25 },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => {
                    setPlaybackSpeed(s.val);
                    playAudio(s.val);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    playbackSpeed === s.val
                      ? 'bg-[#BC002D] text-white shadow-xs'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transcript reveal toggle */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-2 text-xs font-bold text-[#BC002D] hover:underline"
            >
              {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showTranscript ? 'Sembunyikan Naskah Teks' : 'Tampilkan Naskah Percakapan (Transcript)'}</span>
            </button>

            <button
              onClick={() => {
                setSelectedOption(null);
                setAnswered(false);
              }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Ulangi Soal
            </button>
          </div>

          {/* Hidden/Revealed Transcript */}
          {showTranscript && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-200 dark:border-white/10 space-y-2">
              <p className="text-base sm:text-lg font-japanese font-bold text-[#1A1A1A] dark:text-white leading-relaxed">
                {selectedLesson.audioText}
              </p>
              <p className="text-xs text-[#BC002D] font-japanese">
                {selectedLesson.furigana}
              </p>
              <p className="text-xs text-gray-500 italic">
                {selectedLesson.romaji}
              </p>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-neutral-800">
                🇮🇩 Terjemahan: "{selectedLesson.translation}"
              </p>
            </div>
          )}

          {/* Comprehension Question Card */}
          <div className="p-6 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 space-y-4">
            <h4 className="font-bold text-base text-[#1A1A1A] dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#BC002D]" />
              <span>Pertanyaan Pemahaman: {selectedLesson.question.prompt}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedLesson.question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === selectedLesson.question.correctIndex;

                let style = 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-[#BC002D]';
                if (answered) {
                  if (isCorrect) {
                    style = 'bg-emerald-500 border-emerald-500 text-white font-bold shadow-xs';
                  } else if (isSelected) {
                    style = 'bg-[#BC002D] border-[#BC002D] text-white font-bold shadow-xs';
                  } else {
                    style = 'opacity-40 border-gray-200 dark:border-neutral-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={answered}
                    className={`p-3.5 rounded-2xl border text-left font-semibold text-xs transition ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                💡 <span className="font-bold">Penjelasan:</span> {selectedLesson.question.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
