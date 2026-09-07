import { KanjiItem } from '../types';

export const KANJI_DATA: KanjiItem[] = [
  // ==================== JLPT N5 ====================
  {
    id: 'kanji_n5_1',
    kanji: '日',
    onyomi: ['ニチ (nichi)', 'ジツ (jitsu)'],
    kunyomi: ['ひ (hi)', '-び (-bi)', '-か (-ka)'],
    meaningId: 'Matahari, Hari, Jepang',
    meaningEn: 'Day, Sun, Japan',
    strokes: 4,
    jlpt: 'N5',
    radical: '日 (Matahari)',
    examples: [
      { japanese: '日曜日', furigana: 'にちようび', romaji: 'Nichiyoubi', meaningId: 'Hari Minggu' },
      { japanese: '今日', furigana: 'きょう', romaji: 'Kyou', meaningId: 'Hari ini' },
      { japanese: '日本に行きたいです。', furigana: 'にほんに いきたいです。', romaji: 'Nihon ni ikitai desu.', meaningId: 'Saya ingin pergi ke Jepang.' }
    ]
  },
  {
    id: 'kanji_n5_2',
    kanji: '本',
    onyomi: ['ホン (hon)'],
    kunyomi: ['もと (moto)'],
    meaningId: 'Buku, Asal, Utama',
    meaningEn: 'Book, Origin, Main',
    strokes: 5,
    jlpt: 'N5',
    radical: '木 (Pohon)',
    examples: [
      { japanese: '本を読む', furigana: 'ほんを よむ', romaji: 'Hon o yomu', meaningId: 'Membaca buku' },
      { japanese: '日本語の本を買いました。', furigana: 'にほんごの ほんを かいました。', romaji: 'Nihongo no hon o kaimashita.', meaningId: 'Saya membeli buku bahasa Jepang.' }
    ]
  },
  {
    id: 'kanji_n5_3',
    kanji: '人',
    onyomi: ['ジン (jin)', 'ニン (nin)'],
    kunyomi: ['ひと (hito)'],
    meaningId: 'Orang, Manusia',
    meaningEn: 'Person, Human',
    strokes: 2,
    jlpt: 'N5',
    radical: '人 (Orang)',
    examples: [
      { japanese: '日本人', furigana: 'にほんじん', romaji: 'Nihonjin', meaningId: 'Orang Jepang' },
      { japanese: '三人', furigana: 'さんにん', romaji: 'Sannin', meaningId: 'Tiga orang' },
      { japanese: 'あの人は誰ですか？', furigana: 'あのひとは だれですか？', romaji: 'Ano hito wa dare desu ka?', meaningId: 'Siapa orang itu?' }
    ]
  },
  {
    id: 'kanji_n5_4',
    kanji: '月',
    onyomi: ['ゲツ (getsu)', 'ガツ (gatsu)'],
    kunyomi: ['つき (tsuki)'],
    meaningId: 'Bulan (Langit & Kalender)',
    meaningEn: 'Month, Moon',
    strokes: 4,
    jlpt: 'N5',
    radical: '月 (Bulan)',
    examples: [
      { japanese: '月曜日', furigana: 'げつようび', romaji: 'Getsuyoubi', meaningId: 'Hari Senin' },
      { japanese: '一月', furigana: 'いちがつ', romaji: 'Ichigatsu', meaningId: 'Bulan Januari' },
      { japanese: '今夜は月がとても綺麗です。', furigana: 'こんやは つきが とても きれいです。', romaji: 'Konya wa tsuki ga totemo kirei desu.', meaningId: 'Malam ini bulannya sangat indah.' }
    ]
  },
  {
    id: 'kanji_n5_5',
    kanji: '水',
    onyomi: ['スイ (sui)'],
    kunyomi: ['みず (mizu)'],
    meaningId: 'Air',
    meaningEn: 'Water',
    strokes: 4,
    jlpt: 'N5',
    radical: '水 (Air)',
    examples: [
      { japanese: '水曜日', furigana: 'すいようび', romaji: 'Suiyoubi', meaningId: 'Hari Rabu' },
      { japanese: 'お水を一杯ください。', furigana: 'おみずを いっぱいください。', romaji: 'Omizu o ippai kudasai.', meaningId: 'Tolong segelas air.' }
    ]
  },
  {
    id: 'kanji_n5_6',
    kanji: '学',
    onyomi: ['ガク (gaku)'],
    kunyomi: ['まな・ぶ (mana-bu)'],
    meaningId: 'Belajar, Ilmu',
    meaningEn: 'Study, Learning, Science',
    strokes: 8,
    jlpt: 'N5',
    radical: '子 (Anak)',
    examples: [
      { japanese: '学校', furigana: 'がっこう', romaji: 'Gakkou', meaningId: 'Sekolah' },
      { japanese: '学生', furigana: 'がくせい', romaji: 'Gakusei', meaningId: 'Siswa / Mahasiswa' },
      { japanese: '大学で勉強します。', furigana: 'だいがくで べんきょうします。', romaji: 'Daigaku de benkyou shimasu.', meaningId: 'Belajar di universitas.' }
    ]
  },
  {
    id: 'kanji_n5_7',
    kanji: '先',
    onyomi: ['セン (sen)'],
    kunyomi: ['さき (saki)', 'ま・ず (ma-zu)'],
    meaningId: 'Sebelum, Terdahulu, Ujung',
    meaningEn: 'Previous, Ahead, First',
    strokes: 6,
    jlpt: 'N5',
    radical: '儿 (Kaki manusia)',
    examples: [
      { japanese: '先生', furigana: 'せんせい', romaji: 'Sensei', meaningId: 'Guru / Dokter' },
      { japanese: '先週', furigana: 'せんしゅう', romaji: 'Senshuu', meaningId: 'Minggu lalu' },
      { japanese: 'お先に失礼します。', furigana: 'おさきに しつれいします。', romaji: 'Osaki ni shitsurei shimasu.', meaningId: 'Saya permisi pamit duluan.' }
    ]
  },
  {
    id: 'kanji_n5_8',
    kanji: '食',
    onyomi: ['ショク (shoku)'],
    kunyomi: ['た・べる (ta-beru)', 'く・う (ku-u)'],
    meaningId: 'Makan, Makanan',
    meaningEn: 'Eat, Food',
    strokes: 9,
    jlpt: 'N5',
    radical: '食 (Makanan)',
    examples: [
      { japanese: '食べる', furigana: 'たべる', romaji: 'Taberu', meaningId: 'Makan' },
      { japanese: '朝食', furigana: 'ちょうしょく', romaji: 'Choushoku', meaningId: 'Sarapan pagi' },
      { japanese: 'ラーメンを食べましょう！', furigana: 'らーめんを たべましょう！', romaji: 'Raamen o tabemashou!', meaningId: 'Ayo makan ramen!' }
    ]
  },
  {
    id: 'kanji_n5_9',
    kanji: '行',
    onyomi: ['コウ (kou)', 'ギョウ (gyou)'],
    kunyomi: ['い・く (i-ku)', 'おこな・う (okona-u)'],
    meaningId: 'Pergi, Melakukan, Baris',
    meaningEn: 'Go, Conduct, Line',
    strokes: 6,
    jlpt: 'N5',
    radical: '行 (Melangkah)',
    examples: [
      { japanese: '行く', furigana: 'いく', romaji: 'Iku', meaningId: 'Pergi' },
      { japanese: '銀行', furigana: 'ぎんこう', romaji: 'Ginkou', meaningId: 'Bank' },
      { japanese: '明日、東京へ行きます。', furigana: 'あした、とうきょうへ いきます。', romaji: 'Ashita, Toukyou e ikimasu.', meaningId: 'Besok saya akan pergi ke Tokyo.' }
    ]
  },

  // ==================== JLPT N4 ====================
  {
    id: 'kanji_n4_1',
    kanji: '会',
    onyomi: ['カイ (kai)', 'エ (e)'],
    kunyomi: ['あ・う (a-u)'],
    meaningId: 'Bertemu, Perkumpulan',
    meaningEn: 'Meet, Association, Society',
    strokes: 6,
    jlpt: 'N4',
    radical: '人 (Orang)',
    examples: [
      { japanese: '会社', furigana: 'かいしゃ', romaji: 'Kaisha', meaningId: 'Perusahaan' },
      { japanese: '会話', furigana: 'かいわ', romaji: 'Kaiwa', meaningId: 'Percakapan' },
      { japanese: '駅で友達に会いました。', furigana: 'えきで ともだちに あいました。', romaji: 'Eki de tomodachi ni aimashita.', meaningId: 'Saya bertemu teman di stasiun.' }
    ]
  },
  {
    id: 'kanji_n4_2',
    kanji: '駅',
    onyomi: ['エキ (eki)'],
    kunyomi: [],
    meaningId: 'Stasiun',
    meaningEn: 'Station',
    strokes: 14,
    jlpt: 'N4',
    radical: '馬 (Kuda)',
    examples: [
      { japanese: '駅員', furigana: 'えきいん', romaji: 'Ekiin', meaningId: 'Petugas stasiun' },
      { japanese: '新宿駅はどこですか？', furigana: 'しんじゅくえきは どこですか？', romaji: 'Shinjuku-eki wa doko desu ka?', meaningId: 'Di manakah Stasiun Shinjuku?' }
    ]
  },
  {
    id: 'kanji_n4_3',
    kanji: '電',
    onyomi: ['デン (den)'],
    kunyomi: [],
    meaningId: 'Listrik, Elektronik',
    meaningEn: 'Electricity',
    strokes: 13,
    jlpt: 'N4',
    radical: '雨 (Hujan)',
    examples: [
      { japanese: '電車', furigana: 'でんしゃ', romaji: 'Densha', meaningId: 'Kereta listrik' },
      { japanese: '電話', furigana: 'でんわ', romaji: 'Denwa', meaningId: 'Telepon' },
      { japanese: '電気を消してください。', furigana: 'でんきを けしてください。', romaji: 'Denki o keshite kudasai.', meaningId: 'Tolong matikan lampunya.' }
    ]
  },
  {
    id: 'kanji_n4_4',
    kanji: '買',
    onyomi: ['バイ (bai)'],
    kunyomi: ['か・う (ka-u)'],
    meaningId: 'Membeli',
    meaningEn: 'Buy, Purchase',
    strokes: 12,
    jlpt: 'N4',
    radical: '貝 (Kerang / Uang kuno)',
    examples: [
      { japanese: '買う', furigana: 'かう', romaji: 'Kau', meaningId: 'Membeli' },
      { japanese: '買い物', furigana: 'かいもの', romaji: 'Kaimono', meaningId: 'Belanja' },
      { japanese: 'お土産を買いました。', furigana: 'おみやげを かいました。', romaji: 'Omiyage o kaimashita.', meaningId: 'Saya membeli oleh-oleh.' }
    ]
  },
  {
    id: 'kanji_n4_5',
    kanji: '旅',
    onyomi: ['リョ (ryo)'],
    kunyomi: ['たび (tabi)'],
    meaningId: 'Perjalanan, Wisata',
    meaningEn: 'Trip, Travel',
    strokes: 10,
    jlpt: 'N4',
    radical: '方 (Arah)',
    examples: [
      { japanese: '旅行', furigana: 'りょこう', romaji: 'Ryokou', meaningId: 'Liburan / Wisata' },
      { japanese: '旅館', furigana: 'りょかん', romaji: 'Ryokan', meaningId: 'Penginapan tradisional Jepang' },
      { japanese: '京都へ旅行したいです。', furigana: 'きょうとへ りょこうしたいです。', romaji: 'Kyouto e ryokou shitai desu.', meaningId: 'Saya ingin berwisata ke Kyoto.' }
    ]
  },

  // ==================== JLPT N3 ====================
  {
    id: 'kanji_n3_1',
    kanji: '約',
    onyomi: ['ヤク (yaku)'],
    kunyomi: [],
    meaningId: 'Janji, Kira-kira, Singkat',
    meaningEn: 'Promise, Approximately',
    strokes: 9,
    jlpt: 'N3',
    radical: '糸 (Benang)',
    examples: [
      { japanese: '約束', furigana: 'やくそく', romaji: 'Yakusoku', meaningId: 'Janji' },
      { japanese: '予約', furigana: 'よやく', romaji: 'Yoyaku', meaningId: 'Reservasi / Pemesanan' },
      { japanese: 'レストランの予約を取りました。', furigana: 'れすとらんの よやくを とりました。', romaji: 'Resutoran no yoyaku o torimashita.', meaningId: 'Saya sudah memesan tempat di restoran.' }
    ]
  },
  {
    id: 'kanji_n3_2',
    kanji: '経',
    onyomi: ['ケイ (kei)', 'キョウ (kyou)'],
    kunyomi: ['へ・る (he-ru)', 'た・つ (ta-tsu)'],
    meaningId: 'Melewati, Mengalami, Garis bujur',
    meaningEn: 'Pass through, Experience, Manage',
    strokes: 11,
    jlpt: 'N3',
    radical: '糸 (Benang)',
    examples: [
      { japanese: '経験', furigana: 'けいけん', romaji: 'Keiken', meaningId: 'Pengalaman' },
      { japanese: '経済', furigana: 'けいざい', romaji: 'Keizai', meaningId: 'Ekonomi' },
      { japanese: '日本で働く良い経験になりました。', furigana: 'にほんで はたらく よい けいけんに なりました。', romaji: 'Nihon de hataraku yoi keiken ni narimashita.', meaningId: 'Menjadi pengalaman yang berharga bekerja di Jepang.' }
    ]
  },
  {
    id: 'kanji_n3_3',
    kanji: '準',
    onyomi: ['ジュン (jun)'],
    kunyomi: ['なぞら・える (nazora-eru)'],
    meaningId: 'Persiapan, Standar',
    meaningEn: 'Conform, Standard, Prepare',
    strokes: 13,
    jlpt: 'N3',
    radical: '水 (Air)',
    examples: [
      { japanese: '準備', furigana: 'じゅんび', romaji: 'Junbi', meaningId: 'Persiapan' },
      { japanese: '試験の準備ができましたか？', furigana: 'しけんの じゅんびが できましたか？', romaji: 'Shiken no junbi ga dekimashita ka?', meaningId: 'Apakah persiapan ujian sudah selesai?' }
    ]
  },
  {
    id: 'kanji_n3_4',
    kanji: '練',
    onyomi: ['レン (ren)'],
    kunyomi: ['ね・る (ne-ru)'],
    meaningId: 'Latihan, Mengasah',
    meaningEn: 'Practice, Train, Polish',
    strokes: 14,
    jlpt: 'N3',
    radical: '糸 (Benang)',
    examples: [
      { japanese: '練習', furigana: 'れんしゅう', romaji: 'Renshuu', meaningId: 'Latihan' },
      { japanese: '毎日漢字を練習します。', furigana: 'まいにち かんじを れんしゅうします。', romaji: 'Mainichi kanji o renshuu shimasu.', meaningId: 'Saya berlatih kanji setiap hari.' }
    ]
  },

  // ==================== JLPT N2 ====================
  {
    id: 'kanji_n2_1',
    kanji: '企',
    onyomi: ['キ (ki)'],
    kunyomi: ['くわだ・てる (kuwada-teru)'],
    meaningId: 'Rencana, Perusahaan, Berusaha',
    meaningEn: 'Plan, Undertake, Scheme',
    strokes: 6,
    jlpt: 'N2',
    radical: '人 (Orang)',
    examples: [
      { japanese: '企業', furigana: 'きぎょう', romaji: 'Kigyou', meaningId: 'Perusahaan / Korporasi' },
      { japanese: '企画', furigana: 'きかく', romaji: 'Kikaku', meaningId: 'Perencanaan proyek' },
      { japanese: '日本企業でキャリアを築きたいです。', furigana: 'にほんきぎょうで きゃりあを きずきたいです。', romaji: 'Nihon kigyou de kyaria o kizukitai desu.', meaningId: 'Saya ingin membangun karir di perusahaan Jepang.' }
    ]
  },
  {
    id: 'kanji_n2_2',
    kanji: '環',
    onyomi: ['カン (kan)'],
    kunyomi: ['わ (wa)'],
    meaningId: 'Lingkungan, Cincin, Melingkar',
    meaningEn: 'Environment, Ring, Circle',
    strokes: 17,
    jlpt: 'N2',
    radical: '玉 (Permata)',
    examples: [
      { japanese: '環境', furigana: 'かんきょう', romaji: 'Kankyou', meaningId: 'Lingkungan hidup' },
      { japanese: '循環', furigana: 'じゅんかん', romaji: 'Junkan', meaningId: 'Sirkulasi / Siklus' },
      { japanese: '自然環境を守ることが大切です。', furigana: 'しぜんかんきょうを まもることが たいせつです。', romaji: 'Shizen kankyou o mamoru koto ga taisetsu desu.', meaningId: 'Penting untuk menjaga lingkungan alam.' }
    ]
  },
  {
    id: 'kanji_n2_3',
    kanji: '政',
    onyomi: ['セイ (sei)', 'ショウ (shou)'],
    kunyomi: ['まつりごと (matsurigoto)'],
    meaningId: 'Politik, Pemerintahan',
    meaningEn: 'Politics, Government',
    strokes: 9,
    jlpt: 'N2',
    radical: '攴 (Memukul)',
    examples: [
      { japanese: '政治', furigana: 'せいじ', romaji: 'Seiji', meaningId: 'Politik' },
      { japanese: '政府', furigana: 'せいふ', romaji: 'Seifu', meaningId: 'Pemerintah' },
      { japanese: '政治について議論する。', furigana: 'せいじについて ぎろんする。', romaji: 'Seiji ni tsuite giron suru.', meaningId: 'Mendiskusikan tentang politik.' }
    ]
  },

  // ==================== JLPT N1 ====================
  {
    id: 'kanji_n1_1',
    kanji: '鑑',
    onyomi: ['カン (kan)'],
    kunyomi: ['かがみ (kagami)', 'かんが・みる (kanga-miru)'],
    meaningId: 'Apresiasi, Memeriksa, Cermin teladan',
    meaningEn: 'Appreciation, Specimen, Model',
    strokes: 23,
    jlpt: 'N1',
    radical: '金 (Logam)',
    examples: [
      { japanese: '鑑賞', furigana: 'かんしょう', romaji: 'Kanshou', meaningId: 'Mengapresiasi (seni/film)' },
      { japanese: '図鑑', furigana: 'ずかん', romaji: 'Zukan', meaningId: 'Buku ensiklopedia bergambar' },
      { japanese: '週末に美術館で絵画を鑑賞した。', furigana: 'しゅうまつに びじゅつかんで かいがを かんしょうした。', romaji: 'Shuumatsu ni bijutsukan de kaiga o kanshou shita.', meaningId: 'Akhir pekan saya mengapresiasi lukisan di museum seni.' }
    ]
  },
  {
    id: 'kanji_n1_2',
    kanji: '曖',
    onyomi: ['アイ (ai)'],
    kunyomi: ['くら・い (kura-i)'],
    meaningId: 'Samar, Ambigu, Tidak jelas',
    meaningEn: 'Obscure, Ambiguous, Dark',
    strokes: 17,
    jlpt: 'N1',
    radical: '日 (Matahari)',
    examples: [
      { japanese: '曖昧', furigana: 'あいまい', romaji: 'Aimai', meaningId: 'Ambigu / Tidak jelas' },
      { japanese: '曖昧な返事を避けてください。', furigana: 'あいまいな へんじを さけてください。', romaji: 'Aimai na henji o sakete kudasai.', meaningId: 'Tolong hindari jawaban yang tidak jelas/ambigu.' }
    ]
  },
  {
    id: 'kanji_n1_3',
    kanji: '妥',
    onyomi: ['ダ (da)'],
    kunyomi: [],
    meaningId: 'Kompromi, Tepat, Damai',
    meaningEn: 'Compromise, Appropriate',
    strokes: 7,
    jlpt: 'N1',
    radical: '女 (Wanita)',
    examples: [
      { japanese: '妥協', furigana: 'だきょう', romaji: 'Dakyou', meaningId: 'Kompromi' },
      { japanese: '妥当', furigana: 'だとう', romaji: 'Datou', meaningId: 'Layak / Tepat' },
      { japanese: '双方が納得できる妥協点を探る。', furigana: 'そうほうが なっとくできる だきょうてんを さぐる。', romaji: 'Souhou ga nattoku dekiru dakyouten o saguru.', meaningId: 'Mencari titik kompromi yang memuaskan kedua belah pihak.' }
    ]
  }
];
