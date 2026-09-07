export interface StrokeRule {
  id: string;
  ruleNumber: number;
  titleId: string;
  titleJa: string;
  romaji: string;
  summary: string;
  explanation: string;
  tip: string;
  examples: {
    kanji: string;
    meaning: string;
    strokes: number;
    steps: string[];
  }[];
}

export interface KanjiStrokeStep {
  step: number;
  instruction: string;
  direction: 'left-to-right' | 'top-to-bottom' | 'top-left-to-bottom-right' | 'top-right-to-bottom-left' | 'hook' | 'enclosure' | 'dot';
  directionLabel: string;
  strokeType: 'Yokosen (Horizontal)' | 'Tatesen (Vertikal)' | 'Hidari-harai (Sapuan Kiri)' | 'Migi-harai (Sapuan Kanan)' | 'Hane (Kait / Hook)' | 'Orecang (Lekukan Sudut)' | 'Ten (Titik)';
}

export const STROKE_RULES: StrokeRule[] = [
  {
    id: 'rule_1',
    ruleNumber: 1,
    titleId: 'Dari Atas ke Bawah',
    titleJa: '上から下へ',
    romaji: 'Ue kara shita e',
    summary: 'Tulis goresan horizontal atau bagian atas terlebih dahulu sebelum bagian bawah.',
    explanation: 'Dalam kanji dengan susunan vertikal atau garis mendatar bertingkat, selalu mulai dari garis paling atas dan bertahap menuju ke bawah.',
    tip: 'Jaga jarak spasial antar garis mendatar agar proporsional dan seimbang di dalam grid Tianzige.',
    examples: [
      {
        kanji: '三',
        meaning: 'Tiga (San)',
        strokes: 3,
        steps: [
          'Garis horizontal atas (sedang)',
          'Garis horizontal tengah (lebih pendek)',
          'Garis horizontal bawah (paling panjang sebagai fondasi)'
        ]
      },
      {
        kanji: '言',
        meaning: 'Berkata / Bahasa (Koto / Gen)',
        strokes: 7,
        steps: [
          'Titik/garis pendek paling atas',
          'Tiga garis horizontal berurutan ke bawah',
          'Kotak mulut (口) di bagian paling bawah'
        ]
      },
      {
        kanji: '二',
        meaning: 'Dua (Ni)',
        strokes: 2,
        steps: [
          'Garis horizontal atas',
          'Garis horizontal bawah yang lebih panjang'
        ]
      }
    ]
  },
  {
    id: 'rule_2',
    ruleNumber: 2,
    titleId: 'Dari Kiri ke Kanan',
    titleJa: '左から右へ',
    romaji: 'Hidari kara migi e',
    summary: 'Bagian atau radikal di sisi kiri ditulis sebelum bagian di sisi kanan.',
    explanation: 'Untuk kanji yang terbagi menjadi komponen kiri (Hen / 偏) dan kanan (Tsukuri / 旁), selesaikan radikal kiri terlebih dahulu baru beralih ke kanan.',
    tip: 'Radikal sebelah kiri biasanya lebih ramping agar memberi ruang leluasa bagi bagian kanan.',
    examples: [
      {
        kanji: '川',
        meaning: 'Sungai (Kawa)',
        strokes: 3,
        steps: [
          'Garis vertikal kiri melengkung sedikit',
          'Garis vertikal tengah pendek',
          'Garis vertikal kanan panjang lurus'
        ]
      },
      {
        kanji: '行',
        meaning: 'Pergi / Melangkah (Iku / Kou)',
        strokes: 6,
        steps: [
          'Dua sapuan miring di sisi kiri (Gyouninben)',
          'Tarik garis vertikal kiri',
          'Selesaikan komponen sisi kanan'
        ]
      },
      {
        kanji: '休',
        meaning: 'Istirahat (Yasumu)',
        strokes: 6,
        steps: [
          'Radikal orang (Ninben) di sisi kiri',
          'Pohon (Ki) di sisi kanan'
        ]
      }
    ]
  },
  {
    id: 'rule_3',
    ruleNumber: 3,
    titleId: 'Garis Horizontal Sebelum Vertikal yang Memotong',
    titleJa: '横が先、縦が後',
    romaji: 'Yoko ga saki, tate ga ato',
    summary: 'Jika garis horizontal dan vertikal berpotongan sederhana, tarik garis horizontal dulu.',
    explanation: 'Bentuk palang dasar atau persilangan dimulai dari garis mendatar dari kiri ke kanan, kemudian ditusuk vertikal dari atas ke bawah.',
    tip: 'Tarik garis vertikal tepat di tengah garis horizontal untuk simetri yang sempurna.',
    examples: [
      {
        kanji: '十',
        meaning: 'Sepuluh (Juu)',
        strokes: 2,
        steps: [
          'Garis horizontal dari kiri ke kanan ➡️',
          'Garis vertikal memotong tepat di tengah dari atas ke bawah ⬇️'
        ]
      },
      {
        kanji: '木',
        meaning: 'Pohon (Ki / Moku)',
        strokes: 4,
        steps: [
          'Garis horizontal',
          'Garis vertikal memotong di tengah',
          'Sapuan miring ke kiri bawah (Hidari-harai)',
          'Sapuan miring ke kanan bawah (Migi-harai)'
        ]
      },
      {
        kanji: '土',
        meaning: 'Tanah / Bumi (Tsuchi / Do)',
        strokes: 3,
        steps: [
          'Garis horizontal pendek atas',
          'Garis vertikal tegak',
          'Garis horizontal panjang penutup bawah'
        ]
      }
    ]
  },
  {
    id: 'rule_4',
    ruleNumber: 4,
    titleId: 'Garis Tengah Sebelum Sisi Luar Simetris',
    titleJa: '中央が先、左右が後',
    romaji: 'Chuuou ga saki, sayuu ga ato',
    summary: 'Untuk kanji dengan pusat vertikal dominan dan dua sayap simetris, tulis garis tengah terlebih dahulu.',
    explanation: 'Ketika kanji memiliki poros vertikal kuat dengan titik atau sapuan di kedua sisinya, tentukan poros tengah terlebih dahulu, lalu sayap kiri, kemudian sayap kanan.',
    tip: 'Menulis garis tengah lebih dulu menjaga agar kanji tidak miring ke satu sisi.',
    examples: [
      {
        kanji: '小',
        meaning: 'Kecil (Chii / Shou)',
        strokes: 3,
        steps: [
          'Garis vertikal berkait tengah (Tate-hane)',
          'Titik/sapuan miring di sisi kiri',
          'Titik/sapuan miring di sisi kanan'
        ]
      },
      {
        kanji: '水',
        meaning: 'Air (Mizu / Sui)',
        strokes: 4,
        steps: [
          'Garis tengah berkait vertikal ⬇️🪝',
          'Lekukan sudut kiri atas ↖️',
          'Sapuan kiri bawah ↙️',
          'Sapuan kanan bawah ↘️'
        ]
      },
      {
        kanji: '山',
        meaning: 'Gunung (Yama / San)',
        strokes: 3,
        steps: [
          'Puncak tengah: garis vertikal tengah paling tinggi',
          'Sudut kiri dan alas bawah',
          'Garis vertikal kanan'
        ]
      }
    ]
  },
  {
    id: 'rule_5',
    ruleNumber: 5,
    titleId: 'Bingkai Luar Sebelum Isi Dalam',
    titleJa: '外側が先、内側が後',
    romaji: 'Sotogawa ga saki, uchigawa ga ato',
    summary: 'Buat kerangka atau bingkai pembungkus terlebih dahulu sebelum memasukkan isi.',
    explanation: 'Untuk kanji berbingkai (Kamae), buat garis tepi kiri dan sudut atas-kanan terlebih dahulu untuk membentuk wadah ruang dalam.',
    tip: 'Jangan tutup bagian bawah bingkai sebelum seluruh elemen di dalam selesai ditulis!',
    examples: [
      {
        kanji: '月',
        meaning: 'Bulan (Tsuki / Getsu)',
        strokes: 4,
        steps: [
          'Garis vertikal kiri melengkung sedikit',
          'Garis sudut horizontal-vertikal berujung kait (Yokosen-oricang-hane)',
          'Garis horizontal dalam atas',
          'Garis horizontal dalam bawah'
        ]
      },
      {
        kanji: '風',
        meaning: 'Angin (Kaze / Fuu)',
        strokes: 9,
        steps: [
          'Garis luar kiri',
          'Bingkai luar kanan berkait melengkung',
          'Isi bagian serangga dalam (Mushi)'
        ]
      },
      {
        kanji: '同',
        meaning: 'Sama (Onaji / Dou)',
        strokes: 6,
        steps: [
          'Garis vertikal kiri',
          'Bingkai sudut atas-kanan',
          'Isi komponen dalam (garis horizontal & mulut 口)'
        ]
      }
    ]
  },
  {
    id: 'rule_6',
    ruleNumber: 6,
    titleId: 'Isi Dalam Selesai Sebelum Menutup Bingkai Bawah',
    titleJa: '中身を書いてから閉じる',
    romaji: 'Nakami o kaite kara tojiru',
    summary: 'Selesaikan seluruh bagian di dalam kotak sebelum menarik garis horizontal penutup bawah.',
    explanation: 'Untuk kanji kotak penuh (seperti 国, 日, 回, 四), buat garis kiri, lalu garis atas-kanan, isi dalamnya sampai tuntas, lalu kunci dengan garis bawah dari kiri ke kanan.',
    tip: 'Ingat filosofi: "Buka pintu, masukkan perabotan ke dalam ruangan, lalu tutup pintu rapat-rapat".',
    examples: [
      {
        kanji: '日',
        meaning: 'Matahari / Hari (Hi / Nichi)',
        strokes: 4,
        steps: [
          '1. Garis vertikal kiri ⬇️',
          '2. Garis sudut horizontal-vertikal kanan ➡️⬇️',
          '3. Garis horizontal tengah di dalam ➡️',
          '4. Garis horizontal penutup bawah ➡️'
        ]
      },
      {
        kanji: '国',
        meaning: 'Negara (Kuni / Koku)',
        strokes: 8,
        steps: [
          '1. Garis vertikal kiri bingkai',
          '2. Garis sudut atas-kanan bingkai',
          '3-7. Tulis seluruh kanji Giok (玉) di dalam',
          '8. Tarik garis horizontal penutup bawah'
        ]
      },
      {
        kanji: '四',
        meaning: 'Empat (Yon / Shi)',
        strokes: 5,
        steps: [
          '1. Garis vertikal kiri',
          '2. Garis sudut atas-kanan',
          '3. Garis lengkung dalam kiri',
          '4. Garis lengkung dalam kanan',
          '5. Garis horizontal penutup bawah'
        ]
      }
    ]
  },
  {
    id: 'rule_7',
    ruleNumber: 7,
    titleId: 'Garis Penembus / Pemotong Vertikal Terakhir',
    titleJa: '貫く線は最後',
    romaji: 'Tsuranuku sen wa saigo',
    summary: 'Garis vertikal atau horizontal yang menembus seluruh kanji ditarik paling terakhir.',
    explanation: 'Ketika ada satu garis lurus yang membelah atau menembus struktur kanji dari atas sampai bawah, gambarlah seluruh bentuk kanji terlebih dahulu baru tembus dengan garis pemotong.',
    tip: 'Tarik garis penembus dengan gerakan tegas tanpa ragu agar kanji tampak kokoh dan seimbang.',
    examples: [
      {
        kanji: '中',
        meaning: 'Tengah / Di dalam (Naka / Chuu)',
        strokes: 4,
        steps: [
          '1. Garis vertikal kiri kotak',
          '2. Garis sudut kanan atas kotak',
          '3. Garis penutup bawah kotak',
          '4. Garis vertikal penembus tengah lurus dari atas ke bawah membelah kotak ⬇️'
        ]
      },
      {
        kanji: '女',
        meaning: 'Wanita / Perempuan (Onna / Jo)',
        strokes: 3,
        steps: [
          '1. Garis lekukan miring ke kiri lalu menyiku ke kanan bawah',
          '2. Sapuan miring ke kiri bawah (Hidari-harai)',
          '3. Garis horizontal panjang memotong di tengah dari kiri ke kanan ➡️'
        ]
      },
      {
        kanji: '半',
        meaning: 'Setengah (Han)',
        strokes: 5,
        steps: [
          'Dua titik miring atas',
          'Dua garis horizontal bertingkat',
          'Garis vertikal penembus tengah dari atas tembus ke bawah'
        ]
      }
    ]
  },
  {
    id: 'rule_8',
    ruleNumber: 8,
    titleId: 'Titik Aksentuasi & Kait Paling Terakhir',
    titleJa: '点・ハネは最後',
    romaji: 'Ten / Hane wa saigo',
    summary: 'Titik aksen (Ten) kecil di sudut atau ekor tambahan biasanya ditarik sebagai penutup kanji.',
    explanation: 'Titik pembeda kecil yang diletakkan di sudut kanan atas atau di dalam karakter ditambahkan setelah seluruh struktur utama selesai dibentuk.',
    tip: 'Berikan penekanan halus pada titik penutup agar kanji memiliki karakter shodo (kaligrafi) yang indah.',
    examples: [
      {
        kanji: '犬',
        meaning: 'Anjing (Inu / Ken)',
        strokes: 4,
        steps: [
          '1-3. Tulis karakter Besar (大)',
          '4. Tambahkan titik aksen (Ten) di sudut kanan atas ↗️'
        ]
      },
      {
        kanji: '玉',
        meaning: 'Permata / Giok (Tama / Gyoku)',
        strokes: 5,
        steps: [
          '1-4. Tulis karakter Raja (王)',
          '5. Berikan titik aksen di sudut kanan bawah'
        ]
      },
      {
        kanji: '太',
        meaning: 'Gemuk / Tebal (Futo-i / Tai)',
        strokes: 4,
        steps: [
          '1-3. Tulis karakter Besar (大)',
          '4. Berikan titik aksen di bawah tengah'
        ]
      }
    ]
  }
];

export interface KanjiStrokeGuideData {
  [kanjiChar: string]: {
    meaning: string;
    totalStrokes: number;
    steps: KanjiStrokeStep[];
    primaryRule: string;
    mnemonicAdvice: string;
  };
}

export const KANJI_STROKE_DETAILS: KanjiStrokeGuideData = {
  '日': {
    meaning: 'Matahari, Hari',
    totalStrokes: 4,
    primaryRule: 'Bingkai luar -> Isi dalam -> Tutup bawah',
    mnemonicAdvice: 'Bentuk matahari atau jendela: buat bingkai kiri, siku kanan, isi garis tengah, lalu kunci bawah.',
    steps: [
      { step: 1, instruction: 'Tarik garis vertikal kiri dari atas ke bawah', direction: 'top-to-bottom', directionLabel: '⬇️ Vertikal Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 2, instruction: 'Tarik garis horizontal ke kanan lalu tekuk siku ke bawah', direction: 'enclosure', directionLabel: '➡️⬇️ Sudut Kanan', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 3, instruction: 'Tarik garis horizontal di tengah kotak', direction: 'left-to-right', directionLabel: '➡️ Horizontal Tengah', strokeType: 'Yokosen (Horizontal)' },
      { step: 4, instruction: 'Tarik garis horizontal penutup bawah dari kiri ke kanan', direction: 'left-to-right', directionLabel: '➡️ Penutup Bawah', strokeType: 'Yokosen (Horizontal)' }
    ]
  },
  '本': {
    meaning: 'Buku, Asal, Utama',
    totalStrokes: 5,
    primaryRule: 'Bentuk Pohon (木) + Garis penanda akar di bawah',
    mnemonicAdvice: 'Pohon dengan tanda garis horizontal di akarnya menandakan "asal-usul" atau lembaran buku.',
    steps: [
      { step: 1, instruction: 'Garis horizontal utama di atas tengah', direction: 'left-to-right', directionLabel: '➡️ Horizontal', strokeType: 'Yokosen (Horizontal)' },
      { step: 2, instruction: 'Garis vertikal lurus membelah tengah dari atas ke bawah', direction: 'top-to-bottom', directionLabel: '⬇️ Vertikal Tengah', strokeType: 'Tatesen (Vertikal)' },
      { step: 3, instruction: 'Sapuan miring melengkung ke kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 4, instruction: 'Sapuan miring melebar ke kanan bawah', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Sapuan Kanan', strokeType: 'Migi-harai (Sapuan Kanan)' },
      { step: 5, instruction: 'Garis horizontal pendek penanda akar di bagian bawah batang', direction: 'left-to-right', directionLabel: '➡️ Garis Asal', strokeType: 'Yokosen (Horizontal)' }
    ]
  },
  '人': {
    meaning: 'Orang, Manusia',
    totalStrokes: 2,
    primaryRule: 'Sapuan kiri -> Sapuan kanan menyandar',
    mnemonicAdvice: 'Dua orang saling bersandar dan menopang satu sama lain.',
    steps: [
      { step: 1, instruction: 'Tarik sapuan miring panjang melengkung ke kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Kiri Utama', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 2, instruction: 'Mulai dari tengah goresan pertama, tarik sapuan menyandar ke kanan bawah', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Penopang Kanan', strokeType: 'Migi-harai (Sapuan Kanan)' }
    ]
  },
  '月': {
    meaning: 'Bulan (Langit & Kalender)',
    totalStrokes: 4,
    primaryRule: 'Garis kiri -> Bingkai berkait -> Isi dua garis horizontal',
    mnemonicAdvice: 'Bentuk bulan sabit dengan dua awan tipis melintang di dalamnya.',
    steps: [
      { step: 1, instruction: 'Garis vertikal kiri melengkung sedikit ke kiri', direction: 'top-to-bottom', directionLabel: '⬇️ Lengkung Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 2, instruction: 'Garis horizontal ke kanan lalu siku ke bawah dengan kait di ujung (Hane)', direction: 'hook', directionLabel: '➡️⬇️🪝 Siku Berkait', strokeType: 'Hane (Kait / Hook)' },
      { step: 3, instruction: 'Garis horizontal dalam bagian atas', direction: 'left-to-right', directionLabel: '➡️ Horizontal Atas', strokeType: 'Yokosen (Horizontal)' },
      { step: 4, instruction: 'Garis horizontal dalam bagian bawah', direction: 'left-to-right', directionLabel: '➡️ Horizontal Bawah', strokeType: 'Yokosen (Horizontal)' }
    ]
  },
  '水': {
    meaning: 'Air',
    totalStrokes: 4,
    primaryRule: 'Garis tengah berkait -> Sisi kiri -> Sisi kanan',
    mnemonicAdvice: 'Aliran air sungai di tengah dengan percikan air di kiri dan kanan.',
    steps: [
      { step: 1, instruction: 'Garis vertikal tegak di tengah dengan kait tajam ke kiri atas (Tate-hane)', direction: 'hook', directionLabel: '⬇️🪝 Tengah Berkait', strokeType: 'Hane (Kait / Hook)' },
      { step: 2, instruction: 'Lekukan siku kiri atas (mendatar lalu miring ke kiri)', direction: 'enclosure', directionLabel: '↖️ Siku Kiri Atas', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 3, instruction: 'Sapuan miring pendek ke kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 4, instruction: 'Sapuan miring panjang ke kanan bawah melebar', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Sapuan Kanan', strokeType: 'Migi-harai (Sapuan Kanan)' }
    ]
  },
  '学': {
    meaning: 'Belajar, Ilmu',
    totalStrokes: 8,
    primaryRule: 'Atas (Mahkota ilmu) -> Kanopi (Ukanmuri) -> Anak (Ko) di bawah',
    mnemonicAdvice: 'Seorang anak (子) yang memakai topi belajar di bawah atap sekolah.',
    steps: [
      { step: 1, instruction: 'Titik miring kiri di atas', direction: 'dot', directionLabel: '↖️ Titik Kiri', strokeType: 'Ten (Titik)' },
      { step: 2, instruction: 'Titik tengah miring', direction: 'dot', directionLabel: '⬇️ Titik Tengah', strokeType: 'Ten (Titik)' },
      { step: 3, instruction: 'Sapuan miring kanan atas ke kiri', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Kanan', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 4, instruction: 'Titik kiri kanopi atap', direction: 'dot', directionLabel: '⬇️ Titik Atap Kiri', strokeType: 'Ten (Titik)' },
      { step: 5, instruction: 'Garis horizontal atap lalu tekuk sudut berkait ke kiri', direction: 'hook', directionLabel: '➡️⬇️🪝 Sudut Atap', strokeType: 'Hane (Kait / Hook)' },
      { step: 6, instruction: 'Garis horizontal menyiku anak di bawah', direction: 'enclosure', directionLabel: '➡️↙️ Lekuk Anak', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 7, instruction: 'Lengkung vertikal anak berkait ke atas', direction: 'hook', directionLabel: '⬇️🪝 Lengkung Kait', strokeType: 'Hane (Kait / Hook)' },
      { step: 8, instruction: 'Garis horizontal panjang memotong di tengah anak', direction: 'left-to-right', directionLabel: '➡️ Horizontal Penutup', strokeType: 'Yokosen (Horizontal)' }
    ]
  },
  '先': {
    meaning: 'Sebelum, Terdahulu, Guru',
    totalStrokes: 6,
    primaryRule: 'Sapuan atas -> Dua garis mendatar + vertikal -> Kaki (Jin)',
    mnemonicAdvice: 'Langkah kaki seseorang yang berjalan mendahului di depan.',
    steps: [
      { step: 1, instruction: 'Sapuan miring pendek di bagian paling atas', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Puncak', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 2, instruction: 'Garis horizontal atas pendek', direction: 'left-to-right', directionLabel: '➡️ Horizontal 1', strokeType: 'Yokosen (Horizontal)' },
      { step: 3, instruction: 'Garis vertikal tengah pendek menghubungkan garis', direction: 'top-to-bottom', directionLabel: '⬇️ Vertikal Tengah', strokeType: 'Tatesen (Vertikal)' },
      { step: 4, instruction: 'Garis horizontal tengah yang lebih panjang', direction: 'left-to-right', directionLabel: '➡️ Horizontal 2', strokeType: 'Yokosen (Horizontal)' },
      { step: 5, instruction: 'Sapuan miring kaki kiri melengkung ke kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Kaki Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 6, instruction: 'Kaki kanan: turun ke bawah lalu melengkung ke kanan berkait ke atas', direction: 'hook', directionLabel: '⬇️➡️🪝 Kaki Kanan Berkait', strokeType: 'Hane (Kait / Hook)' }
    ]
  },
  '食': {
    meaning: 'Makan, Makanan',
    totalStrokes: 9,
    primaryRule: 'Atap payung (Yane) -> Komponen tengah -> Kaki bawah',
    mnemonicAdvice: 'Sebuah wadah makanan dengan penutup atap yang disajikan.',
    steps: [
      { step: 1, instruction: 'Sapuan miring kiri atap payung', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Atap Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 2, instruction: 'Sapuan miring kanan atap payung', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Atap Kanan', strokeType: 'Migi-harai (Sapuan Kanan)' },
      { step: 3, instruction: 'Titik/garis horizontal pendek di bawah atap', direction: 'dot', directionLabel: '➡️ Titik Tengah', strokeType: 'Ten (Titik)' },
      { step: 4, instruction: 'Garis horizontal pendek kedua', direction: 'left-to-right', directionLabel: '➡️ Horizontal 2', strokeType: 'Yokosen (Horizontal)' },
      { step: 5, instruction: 'Garis vertikal kiri kotak', direction: 'top-to-bottom', directionLabel: '⬇️ Kotak Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 6, instruction: 'Garis sudut atas-kanan kotak', direction: 'enclosure', directionLabel: '➡️⬇️ Kotak Siku', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 7, instruction: 'Garis penutup kotak mendatar', direction: 'left-to-right', directionLabel: '➡️ Tutup Kotak', strokeType: 'Yokosen (Horizontal)' },
      { step: 8, instruction: 'Sapuan miring kaki kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Kiri Bawah', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 9, instruction: 'Sapuan melengkung kanan bawah berkait atau melebar', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Sapuan Kanan Bawah', strokeType: 'Migi-harai (Sapuan Kanan)' }
    ]
  },
  '行': {
    meaning: 'Pergi, Melangkah, Baris',
    totalStrokes: 6,
    primaryRule: 'Radikal kiri (Gyouninben) -> Sisi kanan',
    mnemonicAdvice: 'Persimpangan jalan tempat orang melangkah dan berjalan.',
    steps: [
      { step: 1, instruction: 'Sapuan miring pendek kiri atas', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan 1 Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 2, instruction: 'Sapuan miring kiri kedua di bawahnya', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan 2 Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 3, instruction: 'Garis vertikal lurus menopang sisi kiri', direction: 'top-to-bottom', directionLabel: '⬇️ Batang Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 4, instruction: 'Garis horizontal sisi kanan atas', direction: 'left-to-right', directionLabel: '➡️ Horizontal Kanan 1', strokeType: 'Yokosen (Horizontal)' },
      { step: 5, instruction: 'Garis horizontal sisi kanan kedua', direction: 'left-to-right', directionLabel: '➡️ Horizontal Kanan 2', strokeType: 'Yokosen (Horizontal)' },
      { step: 6, instruction: 'Garis vertikal berkait panjang di sisi kanan', direction: 'hook', directionLabel: '⬇️🪝 Tiang Kanan Berkait', strokeType: 'Hane (Kait / Hook)' }
    ]
  },
  '会': {
    meaning: 'Bertemu, Perkumpulan',
    totalStrokes: 6,
    primaryRule: 'Atap payung orang (Hito) -> Garis horizontal -> Awan bawah (Un)',
    mnemonicAdvice: 'Banyak orang berkumpul bersama di bawah satu atap.',
    steps: [
      { step: 1, instruction: 'Sapuan miring atap kiri melebar', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Atap Kiri', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 2, instruction: 'Sapuan miring atap kanan melebar', direction: 'top-left-to-bottom-right', directionLabel: '↘️ Atap Kanan', strokeType: 'Migi-harai (Sapuan Kanan)' },
      { step: 3, instruction: 'Garis horizontal pendek di bawah atap', direction: 'left-to-right', directionLabel: '➡️ Horizontal 1', strokeType: 'Yokosen (Horizontal)' },
      { step: 4, instruction: 'Garis horizontal kedua yang lebih panjang', direction: 'left-to-right', directionLabel: '➡️ Horizontal 2', strokeType: 'Yokosen (Horizontal)' },
      { step: 5, instruction: 'Sapuan miring ke kiri bawah', direction: 'top-right-to-bottom-left', directionLabel: '↙️ Sapuan Bawah', strokeType: 'Hidari-harai (Sapuan Kiri)' },
      { step: 6, instruction: 'Titik atau sapuan miring ke kanan penutup', direction: 'dot', directionLabel: '↘️ Titik Penutup', strokeType: 'Ten (Titik)' }
    ]
  },
  '電': {
    meaning: 'Listrik, Elektronik',
    totalStrokes: 13,
    primaryRule: 'Atap Hujan (Ame) di atas -> Ekor petir meliuk di bawah',
    mnemonicAdvice: 'Hujan badai (雨) dengan kilatan petir berekor meliuk di langit.',
    steps: [
      { step: 1, instruction: 'Garis horizontal atas hujan', direction: 'left-to-right', directionLabel: '➡️ Atas Hujan', strokeType: 'Yokosen (Horizontal)' },
      { step: 2, instruction: 'Garis vertikal kiri kanopi hujan', direction: 'top-to-bottom', directionLabel: '⬇️ Kanopi Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 3, instruction: 'Garis siku kanan kanopi hujan', direction: 'enclosure', directionLabel: '➡️⬇️ Kanopi Kanan', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 4, instruction: 'Garis vertikal tengah hujan', direction: 'top-to-bottom', directionLabel: '⬇️ Vertikal Tengah', strokeType: 'Tatesen (Vertikal)' },
      { step: 5, instruction: 'Empat titik air hujan (2 di kiri, 2 di kanan)', direction: 'dot', directionLabel: '💧 Titik Hujan 1', strokeType: 'Ten (Titik)' },
      { step: 6, instruction: 'Titik hujan kiri kedua', direction: 'dot', directionLabel: '💧 Titik Hujan 2', strokeType: 'Ten (Titik)' },
      { step: 7, instruction: 'Titik hujan kanan pertama', direction: 'dot', directionLabel: '💧 Titik Hujan 3', strokeType: 'Ten (Titik)' },
      { step: 8, instruction: 'Titik hujan kanan kedua', direction: 'dot', directionLabel: '💧 Titik Hujan 4', strokeType: 'Ten (Titik)' },
      { step: 9, instruction: 'Kotak tengah bawah: garis vertikal kiri', direction: 'top-to-bottom', directionLabel: '⬇️ Kotak Kiri', strokeType: 'Tatesen (Vertikal)' },
      { step: 10, instruction: 'Kotak siku horizontal-vertikal', direction: 'enclosure', directionLabel: '➡️⬇️ Kotak Siku', strokeType: 'Orecang (Lekukan Sudut)' },
      { step: 11, instruction: 'Garis horizontal tengah dalam kotak', direction: 'left-to-right', directionLabel: '➡️ Horizontal Tengah', strokeType: 'Yokosen (Horizontal)' },
      { step: 12, instruction: 'Garis horizontal penutup kotak', direction: 'left-to-right', directionLabel: '➡️ Tutup Kotak', strokeType: 'Yokosen (Horizontal)' },
      { step: 13, instruction: 'Ekor petir: tarik vertikal menembus lalu belok melengkung ke kanan berkait ke atas', direction: 'hook', directionLabel: '⬇️➡️🪝 Ekor Petir Berkait', strokeType: 'Hane (Kait / Hook)' }
    ]
  }
};
