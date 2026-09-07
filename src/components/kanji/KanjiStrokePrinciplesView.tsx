import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Lightbulb, PenTool, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';
import { STROKE_RULES, StrokeRule } from '../../data/kanjiStrokePrinciples';
import { audioService } from '../../services/audioService';
import { KanjiItem } from '../../types';
import { KANJI_DATA } from '../../data/kanjiData';

interface Props {
  onSelectKanjiForPractice: (kanjiItem: KanjiItem) => void;
}

export const KanjiStrokePrinciplesView: React.FC<Props> = ({ onSelectKanjiForPractice }) => {
  const [selectedRule, setSelectedRule] = useState<StrokeRule>(STROKE_RULES[0]);

  const handleKanjiClick = (kanjiChar: string) => {
    audioService.speak(kanjiChar);
    const found = KANJI_DATA.find((k) => k.kanji === kanjiChar);
    if (found) {
      onSelectKanjiForPractice(found);
    } else {
      // Find fallback or construct temporary kanji item
      const fallback: KanjiItem = {
        id: `temp_${kanjiChar}`,
        kanji: kanjiChar,
        onyomi: [],
        kunyomi: [],
        meaningId: selectedRule.examples.find(e => e.kanji === kanjiChar)?.meaning || 'Karakter Kanji',
        meaningEn: 'Kanji Character',
        strokes: selectedRule.examples.find(e => e.kanji === kanjiChar)?.strokes || 4,
        jlpt: 'N5',
        radical: 'Dasar',
        examples: []
      };
      onSelectKanjiForPractice(fallback);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 dark:from-amber-950/20 dark:via-rose-950/20 dark:to-purple-950/20 border border-amber-200/50 dark:border-amber-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#BC002D] text-white text-[11px] font-bold uppercase tracking-wider">
                Panduan Resmi 筆順
              </span>
              <span className="text-xs font-japanese text-gray-500">Hitsujun no Gensoku</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] dark:text-white">
              8 Aturan Pokok Urutan Goresan Kanji
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              Memahami urutan goresan (Hitsujun / 筆順) bukan hanya membuat kanji terlihat seimbang dan indah, tetapi juga membantu mengingat bentuk karakter lebih cepat dan menulis kaligrafi secara alami.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs text-center">
              <span className="text-2xl font-japanese font-black text-[#BC002D] block">8</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Prinsip Emas</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs text-center">
              <span className="text-2xl font-japanese font-black text-amber-600 block">永</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">8 Goresan Dasar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 8 Rules List & Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Rule Selector Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Daftar 8 Prinsip Goresan
            </h4>
            <span className="text-[11px] text-gray-400">Pilih untuk detail</span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {STROKE_RULES.map((rule) => {
              const isSelected = selectedRule.id === rule.id;
              return (
                <div
                  key={rule.id}
                  onClick={() => {
                    setSelectedRule(rule);
                    audioService.playSound('click');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20 scale-[1.01]'
                      : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 hover:border-[#BC002D]/50 shadow-2xs'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isSelected ? 'bg-white text-[#BC002D]' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300'
                  }`}>
                    {rule.ruleNumber}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#1A1A1A] dark:text-white'}`}>
                        {rule.titleId}
                      </span>
                      <span className={`text-[10px] font-japanese font-semibold shrink-0 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {rule.titleJa}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                      {rule.summary}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {rule.examples.map((ex, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-japanese text-xs font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {ex.kanji}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Rule View & Practice Launcher */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
          {/* Header of selected rule */}
          <div className="space-y-3 pb-5 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] text-xs font-bold border border-[#BC002D]/20">
                Aturan #{selectedRule.ruleNumber}
              </span>
              <span className="text-xs font-japanese font-bold text-gray-400">
                {selectedRule.titleJa} • {selectedRule.romaji}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] dark:text-white">
              {selectedRule.titleId}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {selectedRule.explanation}
            </p>

            {/* Tip Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold">Tips Shodo: </span>{selectedRule.tip}
              </p>
            </div>
          </div>

          {/* Example Kanji Breakdown for this Rule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#BC002D]" />
                <span>Contoh Kanji & Urutan Langkah</span>
              </h4>
              <span className="text-[11px] text-[#BC002D] font-semibold">
                Klik kanji untuk langsung latihan menulis ✍️
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedRule.examples.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-200/80 dark:border-neutral-800 space-y-3 hover:border-[#BC002D]/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => handleKanjiClick(item.kanji)}
                          className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1A1A1A] border-2 border-gray-200 dark:border-neutral-700 hover:border-[#BC002D] flex items-center justify-center font-japanese font-black text-3xl text-[#1A1A1A] dark:text-white cursor-pointer shadow-xs transition group-hover:scale-105"
                          title="Latihan Tulis Kanji Ini"
                        >
                          {item.kanji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1A1A1A] dark:text-white">
                              {item.kanji}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              {item.strokes} Goresan
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                            {item.meaning}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => audioService.speak(item.kanji)}
                        className="p-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:text-[#BC002D] transition shadow-2xs"
                        title="Dengarkan Suara"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Steps list */}
                    <div className="mt-3 pt-3 border-t border-gray-200/60 dark:border-neutral-800 space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Urutan Goresan:
                      </span>
                      {item.steps.map((st, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                          <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-800 text-[10px] font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug">{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleKanjiClick(item.kanji)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[#BC002D]/10 hover:bg-[#BC002D] text-[#BC002D] hover:text-white border border-[#BC002D]/20 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Latihan Tulis '{item.kanji}' di Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Calligraphy Elements Footer */}
          <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                3 Sentuhan Kunci Kaligrafi Jepang (Tome, Hane, Harai)
              </h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-japanese font-bold text-rose-400 block">1. 止め (Tome)</span>
                <span className="text-gray-300 text-[11px] mt-0.5 block">Hentikan kuas secara mantap dan tegas tanpa disapu.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-japanese font-bold text-amber-400 block">2. 跳ね (Hane)</span>
                <span className="text-gray-300 text-[11px] mt-0.5 block">Kaitkan ujung goresan ke atas atau samping dengan cepat.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-japanese font-bold text-emerald-400 block">3. 払い (Harai)</span>
                <span className="text-gray-300 text-[11px] mt-0.5 block">Sapukan kuas secara halus bertahap hingga runcing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
