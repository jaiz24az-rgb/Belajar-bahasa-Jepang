import { DictionaryIdiomEntry } from '../types';

export const DICTIONARY_IDIOMS_DATA: DictionaryIdiomEntry[] = [
  // ===================== KANYOUKU: BAGIAN TUBUH - MATA (目) =====================
  {
    id: 'idm_me_ga_nai',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '目にない / 目がない',
    furigana: 'めがない',
    romaji: 'Me ga nai',
    literalMeaningId: 'Tidak punya mata',
    idiomaticMeaningId: 'Sangat tergila-gila, Teramat menyukai sesuatu sampai tak sanggup menolaknya / Lemah terhadap suatu hal',
    meaningEn: 'Having no eyes for anything else; being extremely fond of / having a weakness for something',
    bodyPartOrCategory: 'eye',
    bodyPartLabel: '目 (Mata)',
    indonesianEquivalent: 'Tergila-gila / Mabuk kepayang / Sangat doyan',
    originStory: 'Kiasan bahwa saat melihat hal yang sangat disukai, seseorang kehilangan kemampuan untuk menilai secara objektif atau melihat hal lain, seolah-olah matanya dibutakan oleh kecintaan tersebut.',
    examples: [
      {
        japanese: '彼女は甘いスイーツに目がありません。',
        furigana: 'かのじょは あまい スイーツに めが ありません。',
        romaji: 'Kanojo wa amai suiitsu ni me ga arimasen.',
        meaningId: 'Dia sangat tergila-gila dengan makanan penutup manis.'
      },
      {
        japanese: '父は古いカメラに目がなくて、見つけるとすぐ買ってしまいます。',
        furigana: 'ちちは ふるい カメラに めがなくて、みつけると すぐ かってしまいます。',
        romaji: 'Chichi wa furui kamera ni me ga nakute, mitsukeru to sugu katte shimaimasu.',
        meaningId: 'Ayah saya sangat menyukai kamera antik, begitu melihatnya langsung dibeli.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_me_o_maruku_suru',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '目を丸くする',
    furigana: 'めをまるくする',
    romaji: 'Me o maruku suru',
    literalMeaningId: 'Membulatkan mata',
    idiomaticMeaningId: 'Membelalakkan mata karena terkejut atau takjub',
    meaningEn: 'To stare wide-eyed in astonishment or surprise',
    bodyPartOrCategory: 'eye',
    bodyPartLabel: '目 (Mata)',
    indonesianEquivalent: 'Mata terbelalak / Melongo keheranan',
    examples: [
      {
        japanese: '手品を見た子供たちは目を丸くして驚いていました。',
        furigana: 'てじなを みた こどもたちは めをまるくして おどろいていました。',
        romaji: 'Tejina o mita kodomotachi wa me o maruku shite odoroite imashita.',
        meaningId: 'Anak-anak yang melihat atraksi sulap itu membelalakkan mata karena terkejut takjub.'
      }
    ],
    jlptLevel: 'N2'
  },

  // ===================== KANYOUKU: BAGIAN TUBUH - MULUT (口) & TELINGA (耳) =====================
  {
    id: 'idm_kuchi_ga_katai',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '口が堅い',
    furigana: 'くちがかたい',
    romaji: 'Kuchi ga katai',
    literalMeaningId: 'Mulut yang keras/kokoh',
    idiomaticMeaningId: 'Pandai menjaga rahasia, Tidak mudah membocorkan perkataan kepada orang lain',
    meaningEn: 'Tight-lipped, able to keep secrets reliably',
    bodyPartOrCategory: 'mouth',
    bodyPartLabel: '口 (Mulut)',
    indonesianEquivalent: 'Tutup mulut rapat-rapat / Amanah menjaga rahasia',
    originStory: 'Kebalikan dari 口が軽い (Kuchi ga karui = ember / suka bocor rahasia).',
    examples: [
      {
        japanese: '山田さんは口が堅いから、安心して秘密を相談できます。',
        furigana: 'やまださんは くちがかたいから、あんしんして ひみつを そうだんできます。',
        romaji: 'Yamada-san wa kuchi ga katai kara, anshin shite himitsu o soudan dekimasu.',
        meaningId: 'Karena Yamada-san pandai menjaga rahasia, kita bisa tenang membicarakan rahasia dengannya.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_mimi_ga_itai',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '耳が痛い',
    furigana: 'みみがいたい',
    romaji: 'Mimi ga itai',
    literalMeaningId: 'Telinga terasa sakit',
    idiomaticMeaningId: 'Terasa menusuk di hati saat mendengar kritik atau nasihat yang tepat mengenai kelemahan diri sendiri',
    meaningEn: 'Being painfully true; hard to hear someone point out one’s weaknesses',
    bodyPartOrCategory: 'ear',
    bodyPartLabel: '耳 (Telinga)',
    indonesianEquivalent: 'Telinga panas / Merasa tertampar oleh fakta benar',
    examples: [
      {
        japanese: '「無駄遣いをやめなさい」という母の言葉は、耳が痛いです。',
        furigana: '「むだづかいを やめなさい」という ははの ことばは、みみが いたいです。',
        romaji: '"Mudazukai o yamenasai" to iu haha no kotoba wa, mimi ga itai desu.',
        meaningId: 'Kata-kata ibu "Hentikan buang-buang uang" terasa sangat menusuk telinga saya.'
      }
    ],
    jlptLevel: 'N2'
  },

  // ===================== KANYOUKU: TANGAN (手) & KAKI (足) & LEHER (首) =====================
  {
    id: 'idm_te_o_nuku',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '手を抜く',
    furigana: 'てをぬく',
    romaji: 'Te o nuku',
    literalMeaningId: 'Menarik tangan keluar',
    idiomaticMeaningId: 'Bekerja setengah hati, Mengurangi proses semestinya, Menyepelekan pekerjaan / Asal jadi',
    meaningEn: 'To cut corners, to slack off, to do a half-hearted job',
    bodyPartOrCategory: 'hand',
    bodyPartLabel: '手 (Tangan)',
    indonesianEquivalent: 'Asal-asalan / Menggampangkan pekerjaan / Potong kompas kualitas',
    examples: [
      {
        japanese: 'どんな小さな仕事でも、決して手を抜いてはいけません。',
        furigana: 'どんな ちいさな しごとでも、けっして てをぬいては いけません。',
        romaji: 'Donna chiisana shigoto demo, kesshite te o nuite wa ikemasen.',
        meaningId: 'Sekecil apa pun pekerjaannya, kita tidak boleh sekali-kali bekerja asal-asalan.'
      }
    ],
    jlptLevel: 'N2'
  },
  {
    id: 'idm_kubi_o_nagaku_suru',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '首を長くする',
    furigana: 'くびをながくする',
    romaji: 'Kubi o nagaku suru',
    literalMeaningId: 'Memanjangkan leher',
    idiomaticMeaningId: 'Menanti-nanti dengan penuh harap dan tak sabar',
    meaningEn: 'To wait eagerly / look forward with long anticipation',
    bodyPartOrCategory: 'face',
    bodyPartLabel: '首 (Leher)',
    indonesianEquivalent: 'Menunggu dengan tidak sabar / Menanti-nanti dengan gelisah',
    examples: [
      {
        japanese: '海外にいる親友の帰国を首を長くして待っています。',
        furigana: 'かいがいに いる しんゆうの きこくを くびをながくして まっています。',
        romaji: 'Kaigai ni iru shinyuu no kikoku o kubi o nagaku shite matte imasu.',
        meaningId: 'Saya menanti-nanti dengan tak sabar kepulangan sahabat karib saya dari luar negeri.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_ashi_ga_deru',
    type: 'kanyouku',
    typeLabel: '慣用句 (Kanyouku / Idiom)',
    phrase: '足が出る',
    furigana: 'あしがでる',
    romaji: 'Ashi ga deru',
    literalMeaningId: 'Kaki menjulur keluar (dari selimut)',
    idiomaticMeaningId: 'Pengeluaran melebihi anggaran (Over-budget) / Defisit keuangan',
    meaningEn: 'To exceed the budget; to run into a financial deficit',
    bodyPartOrCategory: 'foot',
    bodyPartLabel: '足 (Kaki)',
    indonesianEquivalent: 'Besar pasak daripada tiang / Boncos / Over budget',
    examples: [
      {
        japanese: '旅行中に買い物をしすぎて、予算から足が出てしまいました。',
        furigana: 'りょこうちゅうに かいものを しすぎて、よさんから あしが でてしまいました。',
        romaji: 'Ryokouchuu ni kaimono o shisugite, yosan kara ashi ga dete shimaimashita.',
        meaningId: 'Karena terlalu banyak belanja saat jalan-jalan, pengeluaran saya jadi membengkak melebihi anggaran.'
      }
    ],
    jlptLevel: 'N2'
  },

  // ===================== YOJIJUKUGO (四字熟語 - IDIOM 4 KANJI) =====================
  {
    id: 'idm_ichigo_ichie',
    type: 'yojijukugo',
    typeLabel: '四字熟語 (Yojijukugo)',
    phrase: '一期一会',
    furigana: 'いちごいちえ',
    romaji: 'Ichigo Ichie',
    literalMeaningId: 'Satu masa hidup, satu pertemuan',
    idiomaticMeaningId: 'Menghargai setiap pertemuan seumur hidup karena momen tersebut tidak akan pernah terulang kembali dengan keadaan yang persis sama',
    meaningEn: 'Once-in-a-lifetime encounter; cherish every meeting for it will never recur',
    bodyPartOrCategory: 'philosophy',
    bodyPartLabel: 'Filosofi Hidup',
    indonesianEquivalent: 'Pertemuan sekali seumur hidup yang tak ternilai harganya',
    originStory: 'Berasal dari ajaran upacara minum teh (Chado / Sadou) oleh Sen no Rikyu. Tuan rumah dan tamu harus melayani dengan sepenuh hati seakan itu adalah satu-satunya pertemuan mereka di dunia.',
    examples: [
      {
        japanese: '旅先での出会いはまさに一期一会です。',
        furigana: 'たびさきでの であいは まさに いちごいちえ です。',
        romaji: 'Tabisaki de no deai wa masa ni ichigo ichie desu.',
        meaningId: 'Pertemuan saat dalam perjalanan sungguh merupakan perjumpaan sekali seumur hidup yang berharga.'
      }
    ],
    jlptLevel: 'N2'
  },
  {
    id: 'idm_isseki_nichou',
    type: 'yojijukugo',
    typeLabel: '四字熟語 (Yojijukugo)',
    phrase: '一石二鳥',
    furigana: 'いっせきにちょう',
    romaji: 'Isseki Nichou',
    literalMeaningId: 'Satu batu, dua burung',
    idiomaticMeaningId: 'Mendapatkan dua keuntungan sekaligus hanya dengan satu kali tindakan atau usaha',
    meaningEn: 'Killing two birds with one stone; achieving two benefits with one single action',
    bodyPartOrCategory: 'mind',
    bodyPartLabel: 'Strategi & Akal',
    indonesianEquivalent: 'Sekali merengkuh dayung, dua tiga pulau terlampaui',
    originStory: 'Terjemahan idiom klasik bahasa Inggris "Killing two birds with one stone" yang kemudian diserap secara luas menjadi yojijukugo resmi di Jepang.',
    examples: [
      {
        japanese: '自転車で通勤すれば、運動にもなって交通費も浮くので一石二鳥だ。',
        furigana: 'じてんしゃで つうきんすれば、うんどうにもなって こうつうひも うくので いっせきにちょうだ。',
        romaji: 'Jitensha de tsuukin sureba, undou ni mo natte koutsuuhi mo uku node isseki nichou da.',
        meaningId: 'Berangkat kerja naik sepeda bisa jadi sarana olahraga sekaligus menghemat ongkos, benar-benar sekali kayuh dua pulau terlampaui.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_shichiten_hakki',
    type: 'yojijukugo',
    typeLabel: '四字熟語 (Yojijukugo)',
    phrase: '七転八起',
    furigana: 'ななころびやおき / しちてんはっき',
    romaji: 'Nana korobi ya oki / Shichiten Hakki',
    literalMeaningId: 'Tujuh kali jatuh, delapan kali bangkit',
    idiomaticMeaningId: 'Semangat pantang menyerah meski berkali-kali mengalami kegagalan',
    meaningEn: 'Fall down seven times, stand up eight; resilience and relentless perseverance',
    bodyPartOrCategory: 'philosophy',
    bodyPartLabel: 'Semangat & Ketabahan',
    indonesianEquivalent: 'Pantang menyerah walau badai menerpa / Gugur satu tumbuh seribu tekad',
    originStory: 'Terkait dengan filosofi boneka Daruma Jepang yang memiliki pemberat di bawahnya sehingga selalu berdiri tegak kembali bagaimanapun digulingkan.',
    examples: [
      {
        japanese: '七転八起の精神で、夢を諦めずに挑戦し続けます。',
        furigana: 'しちてんはっきの せいしんで、ゆめを あきらめずに ちょうせんしつづけます。',
        romaji: 'Shichiten hakki no seishin de, yume o akiramezu ni chousen shitsuzukemasu.',
        meaningId: 'Dengan semangat pantang menyerah tujuh kali jatuh delapan kali bangkit, saya akan terus berjuang meraih impian.'
      }
    ],
    jlptLevel: 'N2'
  },
  {
    id: 'idm_juunin_toiro',
    type: 'yojijukugo',
    typeLabel: '四字熟語 (Yojijukugo)',
    phrase: '十人十色',
    furigana: 'じゅうにんといろ',
    romaji: 'Juunin Toiro',
    literalMeaningId: 'Sepuluh orang, sepuluh warna',
    idiomaticMeaningId: 'Setiap orang memiliki kepribadian, selera, pandangan, dan kebiasaan yang berbeda-beda',
    meaningEn: 'Ten people, ten colors; to each their own; different strokes for different folks',
    bodyPartOrCategory: 'nature',
    bodyPartLabel: 'Keberagaman Manusia',
    indonesianEquivalent: 'Lain ladang lain belalang, lain lubuk lain ikannya',
    examples: [
      {
        japanese: '人の好みは十人十色だから、全員を満足させるのは難しい。',
        furigana: 'ひとの このみは じゅうにんといろだから、ぜんいんを まんぞくさせるのは むずかしい。',
        romaji: 'Hito no konomi wa juunin toiro dakara, zen\'in o manzoku saseru no wa muzukashii.',
        meaningId: 'Karena selera setiap orang berbeda-beda, sulit untuk memuaskan semua orang.'
      }
    ],
    jlptLevel: 'N3'
  },

  // ===================== KOTOWAZA (ことわざ - PERIBAHASA JEPANG) =====================
  {
    id: 'idm_saru_mo_ki_kara_ochiru',
    type: 'kotowaza',
    typeLabel: 'ことわざ (Kotowaza / Peribahasa)',
    phrase: '猿も木から落ちる',
    furigana: 'さるもきからおちる',
    romaji: 'Saru mo ki kara ochiru',
    literalMeaningId: 'Kera pun bisa jatuh dari atas pohon',
    idiomaticMeaningId: 'Bahkan seorang ahli yang sangat mahir sekalipun kadang bisa berbuat kekeliruan',
    meaningEn: 'Even monkeys fall from trees; even experts make mistakes',
    bodyPartOrCategory: 'life',
    bodyPartLabel: 'Hikmah Kehidupan',
    indonesianEquivalent: 'Sepandai-pandai tupai melompat, sekali waktu jatuh juga',
    examples: [
      {
        japanese: 'ベテランの料理長でも味付けを間違えることがある。まさに「猿も木から落ちる」だ。',
        furigana: 'ベテランの りょうりちょうでも あじつけを まちがえることが ある。まさに「さるもきからおちる」だ。',
        romaji: 'Beteran no ryourichou demo ajitsuke o machigaeru koto ga aru. Masa ni "saru mo ki kara ochiru" da.',
        meaningId: 'Bahkan koki kepala berpengalaman pun bisa salah memberi bumbu. Benar-benar sepandai-pandai tupai melompat, ada kalanya jatuh juga.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_hana_yori_dango',
    type: 'kotowaza',
    typeLabel: 'ことわざ (Kotowaza / Peribahasa)',
    phrase: '花より団子',
    furigana: 'はなよりだんご',
    romaji: 'Hana yori dango',
    literalMeaningId: 'Lebih memilih kue dango daripada bunga sakura',
    idiomaticMeaningId: 'Lebih mementingkan manfaat praktis/kebutuhan nyata (isi perut) dibanding keindahan luar semata',
    meaningEn: 'Dumplings over flowers; prioritizing substance/utility over superficial aesthetics',
    bodyPartOrCategory: 'life',
    bodyPartLabel: 'Hikmah Kehidupan',
    indonesianEquivalent: 'Mementingkan kenyang daripada gaya / Isi perut lebih penting daripada gengsi',
    originStory: 'Berasal dari tradisi Hanami (melihat sakura), di mana sebagian orang lebih sibuk menikmati kue dango manis daripada memperhatikan bunga sakura di atasnya.',
    examples: [
      {
        japanese: '美術館に行くより美味しい焼肉を食べに行きたいなんて、君は本当に「花より団子」だね。',
        furigana: 'びじゅつかんに いくより おいしい やきにくを たべに いきたいなんて、きみは ほんとうに「はなよりだんご」だね。',
        romaji: 'Bijutsukan ni iku yori oishii yakiniku o tabe ni ikitai nante, kimi wa hontou ni "hana yori dango" da ne.',
        meaningId: 'Lebih memilih makan yakiniku enak daripada pergi ke museum seni, kamu benar-benar tipe orang "isi perut lebih utama dibanding estetika" ya.'
      }
    ],
    jlptLevel: 'N3'
  },
  {
    id: 'idm_chiri_mo_tsumoreba',
    type: 'kotowaza',
    typeLabel: 'ことわざ (Kotowaza / Peribahasa)',
    phrase: '塵も積もれば山となる',
    furigana: 'ちりもつもればやまとなる',
    romaji: 'Chiri mo tsumoreba yama to naru',
    literalMeaningId: 'Debu yang terkumpul pun akan menjadi sebuah gunung',
    idiomaticMeaningId: 'Usaha atau tabungan kecil yang dilakukan secara konsisten lambat laun akan menghasilkan sesuatu yang sangat besar',
    meaningEn: 'Even dust, when piled up, becomes a mountain; small efforts accumulate into great results',
    bodyPartOrCategory: 'life',
    bodyPartLabel: 'Hikmah Kehidupan',
    indonesianEquivalent: 'Sedikit demi sedikit, lama-lama menjadi bukit',
    examples: [
      {
        japanese: '毎日10分だけでも日本語を勉強しよう。「塵も積もれば山となる」だよ。',
        furigana: 'まいにち じっぷんだけでも にほんごを べんきょうしよう。「ちりもつもればやまとなる」だよ。',
        romaji: 'Mainichi jippun dake demo nihongo o benkyou shiyou. "Chiri mo tsumoreba yama to naru" da yo.',
        meaningId: 'Ayo belajar bahasa Jepang walau hanya 10 menit setiap hari. Sedikit demi sedikit, lama-lama jadi bukit lho.'
      }
    ],
    jlptLevel: 'N3'
  }
];
