import { Badge } from '../types';

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge_first_step',
    name: 'Langkah Pertama',
    titleJa: 'はじめの一歩',
    description: 'Selesaikan sesi belajar pertama Anda di NihongoMaster.',
    icon: 'Footprints',
    category: 'general',
    unlocked: true,
    requirement: 'Mulai belajar materi apapun 1 kali.'
  },
  {
    id: 'badge_kana_novice',
    name: 'Penakluk Hiragana',
    titleJa: 'ひらがなマスター',
    description: 'Kuasai minimal 20 karakter Hiragana dasar & goresan.',
    icon: 'Sparkles',
    category: 'kana',
    unlocked: false,
    requirement: 'Tandai atau kuasai minimal 20 karakter Hiragana.'
  },
  {
    id: 'badge_katakana_expert',
    name: 'Ksatria Katakana',
    titleJa: 'カタカナエキスパート',
    description: 'Kuasai seluruh huruf Katakana dan kata serapan asing.',
    icon: 'Zap',
    category: 'kana',
    unlocked: false,
    requirement: 'Kuasai minimal 20 karakter Katakana.'
  },
  {
    id: 'badge_kanji_n5',
    name: 'Ahli Kanji N5',
    titleJa: '漢字初段',
    description: 'Pelajari kanji dasar JLPT N5 dengan contoh kalimatnya.',
    icon: 'BookOpen',
    category: 'kanji',
    unlocked: false,
    requirement: 'Pelajari minimal 5 Kanji N5.'
  },
  {
    id: 'badge_kanji_samurai',
    name: 'Samurai Kanji',
    titleJa: '漢字の達人',
    description: 'Kuasai minimal 20 kanji N5-N4 beserta Onyomi dan Kunyomi.',
    icon: 'ShieldCheck',
    category: 'kanji',
    unlocked: false,
    requirement: 'Kuasai 20 kanji di modul Kanji.'
  },
  {
    id: 'badge_streak_3',
    name: 'Semangat 3 Hari',
    titleJa: '三日坊主克服',
    description: 'Belajar 3 hari berturut-turut tanpa putus.',
    icon: 'Flame',
    category: 'streak',
    unlocked: true,
    requirement: 'Pertahankan streak belajar selama 3 hari.'
  },
  {
    id: 'badge_streak_7',
    name: 'Samurai Disiplin (7 Hari)',
    titleJa: '継続の侍',
    description: 'Pertahankan streak belajar selama 7 hari berturut-turut.',
    icon: 'Award',
    category: 'streak',
    unlocked: false,
    requirement: 'Streak belajar 7 hari berturut-turut.'
  },
  {
    id: 'badge_streak_30',
    name: 'Master Disiplin (30 Hari)',
    titleJa: '不屈の精神',
    description: 'Pertahankan streak belajar 30 hari penuh!',
    icon: 'Trophy',
    category: 'streak',
    unlocked: false,
    requirement: 'Streak belajar 30 hari berturut-turut.'
  },
  {
    id: 'badge_voice_pro',
    name: 'Pelafalan Native AI',
    titleJa: '美声スピーカー',
    description: 'Dapatkan skor pengenalan suara 90% ke atas pada latihan bicara.',
    icon: 'Mic',
    category: 'speaking',
    unlocked: false,
    requirement: 'Skor speaking di atas 90 poin.'
  },
  {
    id: 'badge_conversation_flow',
    name: 'Diplomat Percakapan',
    titleJa: '会話の名手',
    description: 'Selesaikan setidaknya 3 skenario situasi percakapan nyata.',
    icon: 'MessageSquare',
    category: 'speaking',
    unlocked: false,
    requirement: 'Selesaikan 3 skenario roleplay percakapan.'
  },
  {
    id: 'badge_listening_ace',
    name: 'Telinga Emas (Choukai)',
    titleJa: '黄金の耳',
    description: 'Selesaikan sesi mendengarkan audio listening lab dengan skor tinggi.',
    icon: 'Volume2',
    category: 'general',
    unlocked: false,
    requirement: 'Latihan di Listening Lab minimal 3 sesi.'
  },
  {
    id: 'badge_jlpt_fighter',
    name: 'Pejuang JLPT',
    titleJa: 'JLPT挑戦者',
    description: 'Selesaikan 1 simulasi ujian JLPT hingga tuntas.',
    icon: 'ShieldCheck',
    category: 'jlpt',
    unlocked: false,
    requirement: 'Selesaikan simulasi JLPT tingkat apa saja.'
  },
  {
    id: 'badge_jlpt_passer',
    name: 'Lulus JLPT Bersertifikat',
    titleJa: '合格証書獲得',
    description: 'Dinyatakan Lulus dalam simulasi ujian JLPT resmi.',
    icon: 'Award',
    category: 'jlpt',
    unlocked: false,
    requirement: 'Dapatkan skor di atas passing score simulasi JLPT.'
  },
  {
    id: 'badge_weekly_crusher',
    name: 'Penakluk Target Mingguan',
    titleJa: '週間目標達成',
    description: 'Capai 100% dari target waktu belajar mingguan yang ditetapkan.',
    icon: 'Target',
    category: 'general',
    unlocked: false,
    requirement: 'Selesaikan target menit mingguan.'
  },
  {
    id: 'badge_monthly_scholar',
    name: 'Cendekiawan Bulanan',
    titleJa: '月間優秀者',
    description: 'Selesaikan akumulasi target belajar selama 1 bulan penuh.',
    icon: 'Star',
    category: 'general',
    unlocked: false,
    requirement: 'Capai target belajar bulanan.'
  },
  {
    id: 'badge_offline_warrior',
    name: 'Pelajar Mandiri Offline',
    titleJa: 'オフラインの達人',
    description: 'Belajar dan simpan kemajuan tanpa membutuhkan koneksi internet.',
    icon: 'WifiOff',
    category: 'general',
    unlocked: true,
    requirement: 'Fitur offline aktif secara otomatis.'
  }
];
