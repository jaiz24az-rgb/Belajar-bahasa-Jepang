import { DictionaryVocabEntry } from '../types';

export const DICTIONARY_VOCAB_DATA: DictionaryVocabEntry[] = [
  // ===================== PERCAKAPAN HARIAN & DASAR (N5-N4) =====================
  {
    id: 'voc_arigatou',
    kanji: '有難う / ありがとう',
    furigana: 'ありがとう',
    romaji: 'Arigatou / Arigatou gozaimasu',
    meaningId: 'Terima kasih',
    meaningEn: 'Thank you',
    partOfSpeech: 'Ungkapan (Expression)',
    posCategory: 'expression',
    jlpt: 'N5',
    category: 'daily',
    categoryLabel: 'Percakapan Harian',
    synonyms: ['感謝します (Kansha shimasu)', 'どうも (Doumo)'],
    antonyms: ['どういたしまして (Dou itashimashite)'],
    pitchAccent: '② [Atamadaka/Nakadaka]',
    examples: [
      {
        japanese: '手伝ってくれてありがとうございます。',
        furigana: 'てつだってくれて ありがとうございます。',
        romaji: 'Tetsudatte kurete arigatou gozaimasu.',
        meaningId: 'Terima kasih banyak sudah membantu saya.'
      },
      {
        japanese: 'プレゼント、本当にありがとう！',
        furigana: 'プレゼント、ほんとうに ありがとう！',
        romaji: 'Purezento, hontou ni arigatou!',
        meaningId: 'Terima kasih banyak atas hadiahnya!'
      }
    ],
    relatedKanji: ['有', '難'],
    notes: 'Berasal dari 有る (ada) + 難い (sulit/langka) -> "Sesuatu yang sangat berharga dan langka keberadaannya".'
  },
  {
    id: 'voc_sumimasen',
    kanji: '済みません / すみません',
    furigana: 'すみません',
    romaji: 'Sumimasen',
    meaningId: 'Permisi, Maaf, Terima kasih (ringan saat merepotkan)',
    meaningEn: 'Excuse me, I am sorry, Thank you',
    partOfSpeech: 'Ungkapan (Expression)',
    posCategory: 'expression',
    jlpt: 'N5',
    category: 'daily',
    categoryLabel: 'Percakapan Harian',
    synonyms: ['ごめんなさい (Gomen nasai)', '恐れ入ります (Osoreirimasu)'],
    pitchAccent: '④ [Nakadaka]',
    examples: [
      {
        japanese: 'すみません、駅はどこですか？',
        furigana: 'すみません、えきは どこですか？',
        romaji: 'Sumimasen, eki wa doko desu ka?',
        meaningId: 'Permisi, di manakah stasiun kereta?'
      },
      {
        japanese: '遅れてすみませんでした。',
        furigana: 'おくれて すみませんでした。',
        romaji: 'Okurete sumimasen deshita.',
        meaningId: 'Mohon maaf saya datang terlambat.'
      }
    ],
    relatedKanji: ['済'],
    notes: 'Bisa berarti "maaf", "permisi", atau ungkapan terima kasih ketika orang lain telah bersusah payah untuk Anda.'
  },
  {
    id: 'voc_taberu',
    kanji: '食べる',
    furigana: 'たべる',
    romaji: 'Taberu (Tabemasu)',
    meaningId: 'Makan (Kata Kerja Golongan II / Ichidan)',
    meaningEn: 'To eat',
    partOfSpeech: 'Kata Kerja (Verb II - Ichidan)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'food',
    categoryLabel: 'Makanan & Kuliner',
    synonyms: ['召し上がる (Meshiaagaru - Keigo)', 'いただく (Itadaku - Kenjougo)'],
    antonyms: ['飲む (Nomu - Minum)'],
    pitchAccent: '② [Nakadaka]',
    examples: [
      {
        japanese: '朝ご飯にパンと卵を食べました。',
        furigana: 'あさごはんに パンと たまごを たべました。',
        romaji: 'Asagohan ni pan to tamago o tabemashita.',
        meaningId: 'Saya makan roti dan telur untuk sarapan.'
      },
      {
        japanese: '日本料理を食べたことがありますか？',
        furigana: 'にほんりょうりを たべたことが ありますか？',
        romaji: 'Nihon ryouri o tabeta koto ga arimasu ka?',
        meaningId: 'Apakah Anda pernah makan masakan Jepang?'
      }
    ],
    relatedKanji: ['食'],
    notes: 'Bentuk sopan: 食べます (tabemasu), bentuk te: 食べて (tabete), bentuk nai: 食べない (tabenai).'
  },
  {
    id: 'voc_nomu',
    kanji: '飲む',
    furigana: 'のむ',
    romaji: 'Nomu (Nomimasu)',
    meaningId: 'Minum, Menelan obat (Kata Kerja Golongan I / Godan)',
    meaningEn: 'To drink, to take medicine',
    partOfSpeech: 'Kata Kerja (Verb I - Godan)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'food',
    categoryLabel: 'Makanan & Kuliner',
    synonyms: ['召し上がる (Meshiaagaru)', 'いただく (Itadaku)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '冷たい水を一杯飲みたいです。',
        furigana: 'つめたい みずを いっぱいのみたいです。',
        romaji: 'Tsumetai mizu o ippai nomitai desu.',
        meaningId: 'Saya ingin minum segelas air dingin.'
      },
      {
        japanese: '食後にこの薬を飲んでください。',
        furigana: 'しょくごに この くすりを のんでください。',
        romaji: 'Shokugo ni kono kusuri o nonde kudasai.',
        meaningId: 'Silakan minum obat ini sesudah makan.'
      }
    ],
    relatedKanji: ['飲'],
    notes: 'Dalam bahasa Jepang, minum obat menggunakan kata 薬を飲む (kusuri o nomu), bukan 食べる.'
  },
  {
    id: 'voc_iku',
    kanji: '行く',
    furigana: 'いく / ゆく',
    romaji: 'Iku (Ikimasu)',
    meaningId: 'Pergi (Kata Kerja Golongan I / Godan)',
    meaningEn: 'To go',
    partOfSpeech: 'Kata Kerja (Verb I - Godan)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'travel',
    categoryLabel: 'Perjalanan & Transportasi',
    synonyms: ['向かう (Mukau - Menuju)'],
    antonyms: ['来る (Kuru - Datang)', '帰る (Kaeru - Pulang)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '来月、友達と一緒に京都へ行きます。',
        furigana: 'らいげつ、ともだちと いっしょに きょうとへ いきます。',
        romaji: 'Raigetsu, tomodachi to issho ni Kyouto e ikimasu.',
        meaningId: 'Bulan depan, saya akan pergi ke Kyoto bersama teman.'
      }
    ],
    relatedKanji: ['行'],
    notes: 'Bentuk te khusus yang tidak beraturan: 行って (itte), bukan iite.'
  },
  {
    id: 'voc_kuru',
    kanji: '来る',
    furigana: 'くる',
    romaji: 'Kuru (Kimasu)',
    meaningId: 'Datang (Kata Kerja Golongan III / Tidak Beraturan)',
    meaningEn: 'To come',
    partOfSpeech: 'Kata Kerja (Verb III - Irregular)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'travel',
    categoryLabel: 'Perjalanan & Transportasi',
    antonyms: ['行く (Iku - Pergi)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '先生が教室に来ました。',
        furigana: 'せんせいが きょうしつに きました。',
        romaji: 'Sensei ga kyoushitsu ni kimashita.',
        meaningId: 'Guru telah datang ke dalam ruang kelas.'
      }
    ],
    relatedKanji: ['来'],
    notes: 'Konjugasi: 来ます (kimasu), 来て (kite), 来ない (konai), 来られる (korareru).'
  },
  {
    id: 'voc_miru',
    kanji: '見る',
    furigana: 'みる',
    romaji: 'Miru (Mimasu)',
    meaningId: 'Melihat, Menonton, Memeriksa (Kata Kerja Golongan II)',
    meaningEn: 'To see, to look, to watch',
    partOfSpeech: 'Kata Kerja (Verb II - Ichidan)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'daily',
    categoryLabel: 'Percakapan Harian',
    synonyms: ['眺める (Nagameru - Memandang)', '拝見する (Haiken suru - Kenjougo)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '週末は家で映画を見ました。',
        furigana: 'しゅうまつは いえで えいがを みました。',
        romaji: 'Shuumatsu wa ie de eiga o mimashita.',
        meaningId: 'Akhir pekan saya menonton film di rumah.'
      }
    ],
    relatedKanji: ['見']
  },
  {
    id: 'voc_kiku',
    kanji: '聞く / 聴く',
    furigana: 'きく',
    romaji: 'Kiku (Kikimasu)',
    meaningId: 'Mendengar, Mendengarkan, Bertanya (Kata Kerja Golongan I)',
    meaningEn: 'To hear, to listen, to ask',
    partOfSpeech: 'Kata Kerja (Verb I - Godan)',
    posCategory: 'verb',
    jlpt: 'N5',
    category: 'daily',
    categoryLabel: 'Percakapan Harian',
    synonyms: ['尋ねる (Tazuneru - Bertanya)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '日本の音楽を聴くのが好きです。',
        furigana: 'にほんのおんがくを きくのが すきです。',
        romaji: 'Nihon no ongaku o kiku no ga suki desu.',
        meaningId: 'Saya suka mendengarkan musik Jepang.'
      },
      {
        japanese: '道が分からないので、交番で聞きましょう。',
        furigana: 'みちが わからないので、こうばんで ききましょう。',
        romaji: 'Michi ga wakaranai node, kouban de kikimashou.',
        meaningId: 'Karena tidak tahu jalan, ayo kita bertanya di pos polisi.'
      }
    ],
    relatedKanji: ['聞', '聴'],
    notes: '聞く untuk mendengar secara umum/bertanya, 聴く untuk mendengarkan dengan penuh perhatian (musik, ceramah).'
  },
  {
    id: 'voc_oishii',
    kanji: '美味しい / おいしい',
    furigana: 'おいしい',
    romaji: 'Oishii',
    meaningId: 'Enak, Lezat (Kata Sifat-i)',
    meaningEn: 'Delicious, tasty',
    partOfSpeech: 'Kata Sifat-i (i-Adj)',
    posCategory: 'i-adj',
    jlpt: 'N5',
    category: 'food',
    categoryLabel: 'Makanan & Kuliner',
    synonyms: ['うまい (Umai - Kasual)', '美味 (Bimi - Formal)'],
    antonyms: ['まずい (Mazui - Tidak enak)'],
    pitchAccent: '③ [Nakadaka]',
    examples: [
      {
        japanese: 'このラーメンはスープがとても美味しいです。',
        furigana: 'この ラーメンは スープが とても おいしいです。',
        romaji: 'Kono raamen wa suupu ga totemo oishii desu.',
        meaningId: 'Ramen ini kuahnya sangat lezat.'
      }
    ],
    relatedKanji: ['美', '味']
  },
  {
    id: 'voc_omoshiroi',
    kanji: '面白い / おもしろい',
    furigana: 'おもしろい',
    romaji: 'Omoshiroi',
    meaningId: 'Menarik, Lucu, Mengasyikkan (Kata Sifat-i)',
    meaningEn: 'Interesting, funny, enjoyable',
    partOfSpeech: 'Kata Sifat-i (i-Adj)',
    posCategory: 'i-adj',
    jlpt: 'N5',
    category: 'emotion',
    categoryLabel: 'Emosi & Perasaan',
    synonyms: ['興味深い (Kyoumibukai - Menarik secara intelektual)'],
    antonyms: ['つまらない (Tsumaranai - Membosankan)'],
    pitchAccent: '④ [Nakadaka]',
    examples: [
      {
        japanese: '昨日読んだ漫画はとても面白かったです。',
        furigana: 'きのう よんだ まんがは とても おもしろかったです。',
        romaji: 'Kinou yonda manga wa totemo omoshirokatta desu.',
        meaningId: 'Manga yang saya baca kemarin sangat menarik.'
      }
    ],
    relatedKanji: ['面', '白'],
    notes: 'Secara harfiah berarti "wajah yang menjadi putih/berseri", yaitu ungkapan senang atau takjub.'
  },
  {
    id: 'voc_kirei',
    kanji: '綺麗 / きれい',
    furigana: 'きれい',
    romaji: 'Kirei (Kirei na)',
    meaningId: 'Cantik, Indah, Bersih, Rapi (Kata Sifat-na)',
    meaningEn: 'Beautiful, clean, pretty, tidy',
    partOfSpeech: 'Kata Sifat-na (na-Adj)',
    posCategory: 'na-adj',
    jlpt: 'N5',
    category: 'nature',
    categoryLabel: 'Alam & Lingkungan',
    synonyms: ['美しい (Utsukushii - Indah)', '清潔な (Seiketsu na - Bersih higienis)'],
    antonyms: ['汚い (Kitanai - Kotor)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '春の桜は本当に綺麗ですね。',
        furigana: 'はるの さくらは ほんとうに きれいですね。',
        romaji: 'Haru no sakura wa hontou ni kirei desu ne.',
        meaningId: 'Bunga sakura di musim semi benar-benar indah ya.'
      },
      {
        japanese: '部屋を綺麗に掃除しました。',
        furigana: 'へやを きれいに そうじしました。',
        romaji: 'Heya o kirei ni souji shimashita.',
        meaningId: 'Saya telah membersihkan kamar sampai rapi.'
      }
    ],
    relatedKanji: ['綺', '麗'],
    notes: 'Berakhiran bunyi -i tapi tergolong Kata Sifat-na (Kirei na hito = Orang cantik).'
  },
  {
    id: 'voc_genki',
    kanji: '元気',
    furigana: 'げんき',
    romaji: 'Genki (Genki na)',
    meaningId: 'Sehat, Bersemangat, Bugar, Ceria (Kata Sifat-na / Kata Benda)',
    meaningEn: 'Healthy, energetic, in good spirits',
    partOfSpeech: 'Kata Sifat-na (na-Adj)',
    posCategory: 'na-adj',
    jlpt: 'N5',
    category: 'medical',
    categoryLabel: 'Kesehatan & Medis',
    synonyms: ['健康な (Kenkou na - Sehat)', '活発な (Kappatsu na - Aktif)'],
    antonyms: ['病気の (Byouki no - Sakit)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: 'お元気ですか？ —— はい、おかげさまで元気です。',
        furigana: 'おげんきですか？ —— はい、おかげさまで げんきです。',
        romaji: 'O-genki desu ka? —— Hai, okagesama de genki desu.',
        meaningId: 'Apa kabar? Apakah sehat? —— Ya, berkat doa Anda saya sehat walafiat.'
      }
    ],
    relatedKanji: ['元', '気'],
    notes: 'Berasal dari 元 (asal/dasar) + 気 (energi/hawa hidup).'
  },

  // ===================== KOSAKATA BISNIS, KANTOR & IT (N4-N2) =====================
  {
    id: 'voc_kaigi',
    kanji: '会議',
    furigana: 'かいぎ',
    romaji: 'Kaigi',
    meaningId: 'Rapat, Pertemuan kerja, Konferensi',
    meaningEn: 'Meeting, conference',
    partOfSpeech: 'Kata Benda (Noun)',
    posCategory: 'noun',
    jlpt: 'N4',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['ミーティング (Miitingu)', '打合せ (Uchiawase - Diskusi persiapan)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '午後二時から企画会議が始まります。',
        furigana: 'ごご にじから きかくかいぎが はじまります。',
        romaji: 'Gogo niji kara kikaku kaigi ga hajimarimasu.',
        meaningId: 'Rapat perencanaan akan dimulai pukul dua siang.'
      },
      {
        japanese: '会議室の予約を取っておいてください。',
        furigana: 'かいぎしつの よやくを とっておいてください。',
        romaji: 'Kaigishitsu no yoyaku o totte oite kudasai.',
        meaningId: 'Tolong buatkan reservasi untuk ruang rapat.'
      }
    ],
    relatedKanji: ['会', '議']
  },
  {
    id: 'voc_renraku',
    kanji: '連絡',
    furigana: 'れんらく',
    romaji: 'Renraku (Renraku suru)',
    meaningId: 'Hubungi, Kontak, Komunikasi informasi',
    meaningEn: 'Contact, communication',
    partOfSpeech: 'Kata Benda / Kata Kerja Golongan III',
    posCategory: 'verb',
    jlpt: 'N4',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['通知 (Tsuuchi - Pemberitahuan)', '報告 (Houkoku - Laporan)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '詳細が決まり次第、メールでご連絡いたします。',
        furigana: 'しょうさいが きまりしだい、メールで ごれんらくいたします。',
        romaji: 'Shousai ga kimari shidai, meeru de go-renraku itashimasu.',
        meaningId: 'Segera setelah rinciannya diputuskan, kami akan menghubungi Anda via email.'
      }
    ],
    relatedKanji: ['連', '絡'],
    notes: 'Merupakan bagian dari budaya bisnis Jepang HOU-REN-SO (Houkoku, Renraku, Soudan).'
  },
  {
    id: 'voc_kaihatsu',
    kanji: '開発',
    furigana: 'かいはつ',
    romaji: 'Kaihatsu (Kaihatsu suru)',
    meaningId: 'Pengembangan, Riset & Development, Pembuatan software/produk',
    meaningEn: 'Development (software, product, resources)',
    partOfSpeech: 'Kata Benda / Kata Kerja Golongan III',
    posCategory: 'verb',
    jlpt: 'N3',
    category: 'it_tech',
    categoryLabel: 'Teknologi & IT',
    synonyms: ['作成 (Sakusei)', '構築 (Kouchiku - Pembangunan arsitektur)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '当社は最新のAI技術を活用したアプリを開発しています。',
        furigana: 'とうしゃは さいしんの AIぎじゅつを かつようした アプリを かいはつしています。',
        romaji: 'Tousha wa saishin no AI gijutsu o katsuyou shita apuri o kaihatsu shite imasu.',
        meaningId: 'Perusahaan kami sedang mengembangkan aplikasi yang memanfaatkan teknologi AI terbaru.'
      }
    ],
    relatedKanji: ['開', '発']
  },
  {
    id: 'voc_shimekiri',
    kanji: '締め切り / 締切',
    furigana: 'しめきり',
    romaji: 'Shimekiri',
    meaningId: 'Batas waktu, Tenggat waktu, Deadline',
    meaningEn: 'Deadline, cutoff date',
    partOfSpeech: 'Kata Benda (Noun)',
    posCategory: 'noun',
    jlpt: 'N3',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['期限 (Kigen - Batas waktu/durasi)', '期日 (Kijitsu - Hari H)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: 'レポートの締め切りは今週の金曜日です。',
        furigana: 'レポートの しめきりは こんしゅうの きんようびです。',
        romaji: 'Repooto no shimekiri wa konshuu no kinyoubi desu.',
        meaningId: 'Batas akhir pengumpulan laporan adalah hari Jumat pekan ini.'
      }
    ],
    relatedKanji: ['締', '切']
  },
  {
    id: 'voc_keiken',
    kanji: '経験',
    furigana: 'けいけん',
    romaji: 'Keiken (Keiken suru)',
    meaningId: 'Pengalaman, Mengalami langsung',
    meaningEn: 'Experience',
    partOfSpeech: 'Kata Benda / Kata Kerja Golongan III',
    posCategory: 'noun',
    jlpt: 'N4',
    category: 'education',
    categoryLabel: 'Pendidikan & Karir',
    synonyms: ['体験 (Taiken - Pengalaman pribadi)', '実績 (Jisseki - Rekam jejak)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '海外での留学はとても貴重な経験になりました。',
        furigana: 'かいがいでの りゅうがくは とても きちょうな けいけんに なりました。',
        romaji: 'Kaigai de no ryuugaku wa totemo kichou na keiken ni narimashita.',
        meaningId: 'Studi di luar negeri menjadi pengalaman yang sangat berharga bagi saya.'
      }
    ],
    relatedKanji: ['経', '験']
  },
  {
    id: 'voc_shitsumon',
    kanji: '質問',
    furigana: 'しつもん',
    romaji: 'Shitsumon (Shitsumon suru)',
    meaningId: 'Pertanyaan, Bertanya',
    meaningEn: 'Question, inquiry',
    partOfSpeech: 'Kata Benda / Kata Kerja Golongan III',
    posCategory: 'noun',
    jlpt: 'N5',
    category: 'education',
    categoryLabel: 'Pendidikan & Karir',
    synonyms: ['問い (Toi)', '疑義 (Gigi - Keraguan formal)'],
    antonyms: ['回答 (Kaitou - Jawaban)', '返答 (Hentou)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '何か質問はありますか？',
        furigana: 'なにか しつもんは ありますか？',
        romaji: 'Nanika shitsumon wa arimasu ka?',
        meaningId: 'Apakah ada pertanyaan?'
      }
    ],
    relatedKanji: ['質', '問']
  },

  // ===================== ONOMATOPOEIA JEPANG (GITAIGO & GISEIGO) =====================
  {
    id: 'voc_dokidoki',
    kanji: 'ドキドキ',
    furigana: 'どきどき',
    romaji: 'Dokidoki (Dokidoki suru)',
    meaningId: 'Deg-degan, Jantung berdebar kencang (karena cemas, gugup, atau jatuh cinta)',
    meaningEn: 'Heart throbbing, nervous excitement',
    partOfSpeech: 'Onomatopoeia (Gitaigo) / Kata Keterangan',
    posCategory: 'onomatopoeia',
    jlpt: 'N3',
    category: 'emotion',
    categoryLabel: 'Emosi & Perasaan',
    synonyms: ['ハラハラ (Harahara - Was-was)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '面接の前で胸がドキドキしています。',
        furigana: 'めんせつの まえで むねが ドキドキしています。',
        romaji: 'Mensetsu no mae de mune ga dokidoki shite imasu.',
        meaningId: 'Dada saya berdebar-debar sebelum sesi wawancara.'
      }
    ],
    notes: 'Onomatopoeia untuk suara denyut jantung yang cepat akibat emosi.'
  },
  {
    id: 'voc_perapera',
    kanji: 'ペラペラ',
    furigana: 'ぺらぺら',
    romaji: 'Perapera (Perapera na / Perapera hanasu)',
    meaningId: 'Fasih, Lancar berbicara bahasa asing / Tipis (kertas)',
    meaningEn: 'Fluent (in a language), talkative, thin paper',
    partOfSpeech: 'Onomatopoeia (Gitaigo) / Kata Sifat-na',
    posCategory: 'onomatopoeia',
    jlpt: 'N3',
    category: 'education',
    categoryLabel: 'Pendidikan & Karir',
    synonyms: ['流暢な (Ryuuchou na - Fasih formal)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '彼は日本語がペラペラです。',
        furigana: 'かれは にほんごが ペラペラです。',
        romaji: 'Kare wa nihongo ga perapera desu.',
        meaningId: 'Dia sangat fasih berbahasa Jepang.'
      }
    ]
  },
  {
    id: 'voc_wakuwaku',
    kanji: 'ワクワク',
    furigana: 'わくわく',
    romaji: 'Wakuwaku (Wakuwaku suru)',
    meaningId: 'Antusias, Sangat bersemangat menantikan sesuatu yang menyenangkan',
    meaningEn: 'Thrilled, excited with anticipation',
    partOfSpeech: 'Onomatopoeia (Gitaigo) / Kata Keterangan',
    posCategory: 'onomatopoeia',
    jlpt: 'N3',
    category: 'emotion',
    categoryLabel: 'Emosi & Perasaan',
    synonyms: ['ウキウキ (Ukiuki - Ceria melayang)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '明日から日本旅行なのでワクワクしています！',
        furigana: 'あしたから にほんりょこうなので ワクワクしています！',
        romaji: 'Ashita kara Nihon ryokou na node wakuwaku shite imasu!',
        meaningId: 'Karena besok mulai liburan ke Jepang, saya merasa sangat antusias!'
      }
    ]
  },
  {
    id: 'voc_girigiri',
    kanji: 'ギリギリ',
    furigana: 'ぎりぎり',
    romaji: 'Girigiri',
    meaningId: 'Pas-pasan, Nyaris terlambat/gagal, Di batas toleransi terakhir',
    meaningEn: 'Just barely in time, at the very limit',
    partOfSpeech: 'Onomatopoeia (Gitaigo) / Kata Keterangan',
    posCategory: 'onomatopoeia',
    jlpt: 'N3',
    category: 'daily',
    categoryLabel: 'Percakapan Harian',
    synonyms: ['すれすれ (Suresure - Nyaris mepet)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '電車の発車時刻にギリギリ間に合いました。',
        furigana: 'でんしゃの はっしゃじこくに ギリギリ まにあいました。',
        romaji: 'Densha no hassha jikoku ni girigiri maniaimashita.',
        meaningId: 'Saya pas-pasan tepat waktu sebelum kereta berangkat.'
      }
    ]
  },

  // ===================== KOSAKATA TINGKAT MENENGAH & ATAS (N2-N1) =====================
  {
    id: 'voc_kankyou',
    kanji: '環境',
    furigana: 'かんきょう',
    romaji: 'Kankyou',
    meaningId: 'Lingkungan hidup, Suasana sekitar, Kondisi sistem',
    meaningEn: 'Environment, surroundings',
    partOfSpeech: 'Kata Benda (Noun)',
    posCategory: 'noun',
    jlpt: 'N3',
    category: 'nature',
    categoryLabel: 'Alam & Lingkungan',
    synonyms: ['周囲 (Shuui - Sekeliling)', '自然 (Shizen - Alam)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '地球の環境を守るために、プラスチックゴミを減らすべきです。',
        furigana: 'ちきゅうの かんきょうを まもるために、プラスチックゴミを へらすべきです。',
        romaji: 'Chikyuu no kankyou o mamoru tame ni, purasuchikku gomi o herasu beki desu.',
        meaningId: 'Untuk menjaga lingkungan bumi, kita harus mengurangi sampah plastik.'
      }
    ],
    relatedKanji: ['環', '境']
  },
  {
    id: 'voc_yuukou',
    kanji: '有効',
    furigana: 'ゆうこう',
    romaji: 'Yuukou (Yuukou na)',
    meaningId: 'Berlaku, Sah, Efektif, Manjur',
    meaningEn: 'Valid, effective',
    partOfSpeech: 'Kata Sifat-na / Kata Benda',
    posCategory: 'na-adj',
    jlpt: 'N2',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['効果的 (Koukateki - Efektif)'],
    antonyms: ['無効 (Mukou - Tidak berlaku / Hangus)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: 'このパスポートは来年まで有効です。',
        furigana: 'この パスポートは らいねんまで ゆうこうです。',
        romaji: 'Kono pasupooto wa rainen made yuukou desu.',
        meaningId: 'Paspor ini masih berlaku hingga tahun depan.'
      }
    ],
    relatedKanji: ['有', '効']
  },
  {
    id: 'voc_shinbou',
    kanji: '辛抱',
    furigana: 'しんぼう',
    romaji: 'Shinbou (Shinbou suru)',
    meaningId: 'Kesabaran, Ketabahan menahan penderitaan/kesulitan',
    meaningEn: 'Patience, endurance, perseverance',
    partOfSpeech: 'Kata Benda / Kata Kerja Golongan III',
    posCategory: 'verb',
    jlpt: 'N2',
    category: 'emotion',
    categoryLabel: 'Emosi & Perasaan',
    synonyms: ['我慢 (Gaman - Menahan diri)', '忍耐 (Nintai - Daya tahan mental)'],
    pitchAccent: '① [Atamadaka]',
    examples: [
      {
        japanese: '今は辛抱の時ですが、努力は必ず報われます。',
        furigana: 'いまは しんぼうの ときですが、どりょくは かならず むくわれます。',
        romaji: 'Ima wa shinbou no toki desu ga, doryoku wa kanarazu mukuwaremasu.',
        meaningId: 'Sekarang adalah masa untuk bersabar, namun kerja keras pasti akan membuahkan hasil.'
      }
    ],
    relatedKanji: ['辛', '抱']
  },
  {
    id: 'voc_juunan',
    kanji: '柔軟',
    furigana: 'じゅうなん',
    romaji: 'Juunan (Juunan na)',
    meaningId: 'Fleksibel, Luwes, Lentur (dalam berpikir maupun fisik)',
    meaningEn: 'Flexible, pliable, adaptable',
    partOfSpeech: 'Kata Sifat-na (na-Adj)',
    posCategory: 'na-adj',
    jlpt: 'N1',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['しなやか (Shinayaka)', '融通が利く (Yuuzuu ga kiku)'],
    antonyms: ['頑固な (Ganko na - Keras kepala / Kaku)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '変化の激しい時代には、柔軟な思考が求められます。',
        furigana: 'へんかの はげしい じだいには、じゅうなんな しこうが もとめられます。',
        romaji: 'Henka no hageshii jidai ni wa, juunan na shikou ga motomeraremasu.',
        meaningId: 'Di era yang perubahannya begitu cepat, dituntut pola pikir yang fleksibel.'
      }
    ],
    relatedKanji: ['柔', '軟']
  },
  {
    id: 'voc_shousai',
    kanji: '詳細',
    furigana: 'しょうさい',
    romaji: 'Shousai (Shousai na)',
    meaningId: 'Rinci, Detail, Seluk-beluk lengkap',
    meaningEn: 'Details, particular, detailed',
    partOfSpeech: 'Kata Benda / Kata Sifat-na',
    posCategory: 'noun',
    jlpt: 'N2',
    category: 'business',
    categoryLabel: 'Bisnis & Kantor',
    synonyms: ['詳しい (Kuwashii - Mendalam/Paham rincian)', '細部 (Saibu - Bagian detail)'],
    antonyms: ['大まか (Oomaka - Garis besar/Kasar)'],
    pitchAccent: '⓪ [Heiban]',
    examples: [
      {
        japanese: '契約の詳細については添付資料をご覧ください。',
        furigana: 'けいやくの しょうさいについては てんぷしりょうを ごらんください。',
        romaji: 'Keiyaku no shousai ni tsuite wa tempu shiryou o goran kudasai.',
        meaningId: 'Mengenai rincian kontrak, silakan periksa dokumen lampiran.'
      }
    ],
    relatedKanji: ['詳', '細']
  }
];
