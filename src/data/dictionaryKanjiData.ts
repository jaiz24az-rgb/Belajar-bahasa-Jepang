import { KanjiItem, JLPTLevel } from '../types';
import { KANJI_DATA } from './kanjiData';

export interface KanjiRadicalInfo {
  radical: string;
  nameJa: string;
  nameId: string;
  strokeCount: number;
  meaning: string;
}

export const COMMON_RADICALS: KanjiRadicalInfo[] = [
  { radical: '亻 (人)', nameJa: 'にんべん', nameId: 'Radikal Orang', strokeCount: 2, meaning: 'Manusia, sikap, tindakan orang (休, 体, 信, 侍)' },
  { radical: '氵 (水)', nameJa: 'さんずい', nameId: 'Radikal Tiga Titik Air', strokeCount: 3, meaning: 'Air, cairan, sungai, lautan (海, 泳, 湖, 洗)' },
  { radical: '木', nameJa: 'きへん', nameId: 'Radikal Kayu/Pohon', strokeCount: 4, meaning: 'Pohon, tumbuhan berkayu, bahan kayu (林, 森, 村, 板)' },
  { radical: '口', nameJa: 'くちへん', nameId: 'Radikal Mulut', strokeCount: 3, meaning: 'Mulut, berbicara, makan, minum (味, 呼, 叫, 吸)' },
  { radical: '心 / 忄', nameJa: 'こころ / りっしんべん', nameId: 'Radikal Hati/Perasaan', strokeCount: 4, meaning: 'Hati, emosi, pikiran, psikologi (思, 忙, 怖, 慎)' },
  { radical: '手 / 扌', nameJa: 'てへん', nameId: 'Radikal Tangan', strokeCount: 3, meaning: 'Gerakan tangan, memegang, mendorong (持, 打, 指, 技)' },
  { radical: '言 / 讠', nameJa: 'ごんべん', nameId: 'Radikal Kata/Bicara', strokeCount: 7, meaning: 'Perkataan, bahasa, ucapan (語, 話, 読, 謝)' },
  { radical: '日', nameJa: 'ひへん / にち', nameId: 'Radikal Matahari/Waktu', strokeCount: 4, meaning: 'Matahari, hari, cahaya, waktu (明, 映, 暗, 晴)' },
  { radical: '火 / 灬', nameJa: 'ひ / れっか', nameId: 'Radikal Api/Panas', strokeCount: 4, meaning: 'Api, pembakaran, suhu panas (炎, 照, 熱, 炊)' },
  { radical: '金 / 钅', nameJa: 'かねへん', nameId: 'Radikal Logam/Emas', strokeCount: 8, meaning: 'Besi, uang, logam, alat tajam (銀, 鉄, 銅, 針)' },
  { radical: '土', nameJa: 'つちへん', nameId: 'Radikal Tanah/Bumi', strokeCount: 3, meaning: 'Tanah, wilayah, tempat, tanah liat (地, 城, 坂, 場)' },
  { radical: '門', nameJa: 'もんがまえ', nameId: 'Radikal Gerbang', strokeCount: 8, meaning: 'Gerbang, batas masuk, bukaan (開, 閉, 問, 間)' }
];

export interface ExtendedKanjiEntry extends KanjiItem {
  joyoGrade?: string; // "Kelas 1 SD", "SMP", dll.
  frequencyRank?: number;
  mnemonicsDescription?: string;
  compounds: Array<{
    word: string;
    furigana: string;
    romaji: string;
    meaningId: string;
  }>;
}

// Convert base KANJI_DATA and enrich with compounds for full dictionary lookups
export const EXTENDED_KANJI_DATA: ExtendedKanjiEntry[] = [
  ...KANJI_DATA.map((k) => ({
    ...k,
    joyoGrade: k.jlpt === 'N5' ? 'Kelas 1-2 SD' : k.jlpt === 'N4' ? 'Kelas 3-4 SD' : k.jlpt === 'N3' ? 'Kelas 5-6 SD' : 'SMP & Umum',
    mnemonicsDescription: `Karakter kanji ${k.kanji} memiliki radikal ${k.radical} dengan total ${k.strokes} goresan dan merupakan kosakata penting level JLPT ${k.jlpt}.`,
    compounds: k.examples.map(ex => ({
      word: ex.japanese,
      furigana: ex.furigana,
      romaji: ex.romaji,
      meaningId: ex.meaningId
    }))
  })),

  // Additional N3-N1 Kanji for full dictionary coverage
  {
    id: 'kanji_n3_1',
    kanji: '夢',
    onyomi: ['ム (mu)'],
    kunyomi: ['ゆめ (yume)'],
    meaningId: 'Mimpi, Cita-cita, Khayalan',
    meaningEn: 'Dream, vision',
    strokes: 13,
    jlpt: 'N3',
    radical: '夕 (Malam)',
    joyoGrade: 'Kelas 5 SD',
    mnemonicsDescription: 'Bunga di rumput (艹) yang dilihat di malam hari (夕) saat mata terpejam di dalam mimpi.',
    examples: [
      { japanese: '夢を叶える', furigana: 'ゆめを かなえる', romaji: 'Yume o kanaeru', meaningId: 'Mewujudkan mimpi/cita-cita' },
      { japanese: '夢中になる', furigana: 'むちゅうに なる', romaji: 'Muchuu ni naru', meaningId: 'Tenggelam dalam keasyikan / Terobsesi' }
    ],
    compounds: [
      { word: '夢中', furigana: 'むちゅう', romaji: 'Muchuu', meaningId: 'Asyik sekali / Mabuk kepayang' },
      { word: '悪夢', furigana: 'あくむ', romaji: 'Akumu', meaningId: 'Mimpi buruk' },
      { word: '夢見', furigana: 'ゆめみ', romaji: 'Yumemi', meaningId: 'Pengalaman bermimpi tidur' }
    ]
  },
  {
    id: 'kanji_n2_1',
    kanji: '響',
    onyomi: ['キョウ (kyou)'],
    kunyomi: ['ひび・く (hibi-ku)'],
    meaningId: 'Bergema, Berdampak, Pengaruh suara/emosi',
    meaningEn: 'Echo, sound, resound, affect',
    strokes: 20,
    jlpt: 'N2',
    radical: '音 (Suara)',
    joyoGrade: 'SMP',
    mnemonicsDescription: 'Suara (音) dari desa (郷) yang merambat dan bergema jauh melintasi pegunungan.',
    examples: [
      { japanese: '鐘の音が響く', furigana: 'かねのおとが ひびく', romaji: 'Kane no oto ga hibiku', meaningId: 'Suara lonceng bergema' },
      { japanese: '心に深く響く言葉', furigana: 'こころに ふかく ひびく ことば', romaji: 'Kokoro ni fukaku hibiku kotoba', meaningId: 'Kata-kata yang menyentuh sanubari' }
    ],
    compounds: [
      { word: '影響', furigana: 'えいきょう', romaji: 'Eikyou', meaningId: 'Pengaruh / Dampak' },
      { word: '交響曲', furigana: 'こうきょうきょく', romaji: 'Koukyoukyoku', meaningId: 'Simfoni musik' },
      { word: '反響', furigana: 'はんきょう', romaji: 'Hankyou', meaningId: 'Gema / Respons publik' }
    ]
  },
  {
    id: 'kanji_n1_1',
    kanji: '絆',
    onyomi: ['ハン (han)', 'バン (ban)'],
    kunyomi: ['きずな (kizuna)', 'ほだ・す (hoda-su)'],
    meaningId: 'Ikatan batin, Pertalian kasih, Tali persahabatan erat',
    meaningEn: 'Bonds, emotional ties, connection between people',
    strokes: 11,
    jlpt: 'N1',
    radical: '糸 (Benang)',
    joyoGrade: 'SMP & Umum',
    mnemonicsDescription: 'Benang (糸) yang mengikat setengah (半) dari hati kita bersama dengan orang-orang terkasih.',
    examples: [
      { japanese: '家族の絆', furigana: 'かぞくの きずな', romaji: 'Kazoku no kizuna', meaningId: 'Ikatan batin keluarga' },
      { japanese: '固い絆で結ばれている', furigana: 'かたい きずなで むすばれている', romaji: 'Katai kizuna de musubarete iru', meaningId: 'Terikat oleh pertalian kasih yang kokoh' }
    ],
    compounds: [
      { word: '絆創膏', furigana: 'ばんそうこう', romaji: 'Bansoukou', meaningId: 'Plester luka (Band-aid)' },
      { word: '人情の絆', furigana: 'にんじょうの きずな', romaji: 'Ninjou no kizuna', meaningId: 'Tali persaudaraan kemanusiaan' }
    ]
  }
];
