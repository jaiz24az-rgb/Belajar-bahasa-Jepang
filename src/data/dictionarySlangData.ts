import { DictionarySlangEntry } from '../types';

export const DICTIONARY_SLANG_DATA: DictionarySlangEntry[] = [
  {
    id: 'slang_kusa',
    term: '草 / 草生える',
    furigana: 'くさ / くさはえる',
    romaji: 'Kusa / Kusa haeru',
    meaningId: 'Wkwk / Ngakak / Lucu banget (Slang Internet & Chat)',
    meaningDetail: 'Digunakan saat merasa sesuatu sangat lucu dalam obrolan teks atau media sosial, padanan kata "LOL" atau "wkwkwk".',
    category: 'internet_sns',
    categoryLabel: 'Internet & Chat Slang',
    eraOrYear: 'Trend Internet Abadi',
    formalityLevel: 'Khusus Internet / Chat',
    originExplanation: 'Berasal dari huruf "w" (singkatan dari 笑い / Warai = tawa). Jika diketik berderet "wwwwww", bentuknya menyerupai helai rumput (草 / kusa) yang tumbuh di tanah. Dari situlah orang Jepang mulai mengetik "草" atau "草生える" (rumputnya tumbuh). Jika luar biasa lucu disebut "大草原" (Daisougen / padang rumput raksasa) atau "草不可避" (Kusa fukahi / tawa tak terhindarkan).',
    sampleDialogue: {
      context: 'Membicarakan video lucu di grup chat LINE',
      lineA: {
        speaker: 'Kenji',
        text: 'さっきの猫が滑る動画見た？',
        furigana: 'さっきの ねこが すべる どうが みた？',
        romaji: 'Sakki no neko ga suberu douga mita?',
        translationId: 'Udah liat video kucing yang kepleset tadi belum?'
      },
      lineB: {
        speaker: 'Rina',
        text: '見たよ！何回見ても草生えるｗｗ',
        furigana: 'みたよ！ なんかいみても くさはえる ww',
        romaji: 'Mita yo! Nankai mite mo kusa haeru ww',
        translationId: 'Udah liat! Mau ditonton berapa kali pun tetep bikin ngakak wkwk'
      }
    },
    tags: ['#NetSlang', '#Warai', '#Wkwk', '#SNS', '#Chat']
  },
  {
    id: 'slang_oshi',
    term: '推し / 推し活',
    furigana: 'おし / おしかつ',
    romaji: 'Oshi / Oshikatsu',
    meaningId: 'Idola Favorit / "Bias" / Karakter Pujaan yang Didukung Penuh',
    meaningDetail: 'Anggota grup idola, karakter anime, aktor, atau kreator favorit nomor satu yang Anda dukung dengan membeli merch, menonton konser, atau mengoleksi barangnya (kegiatan ini disebut "Oshikatsu").',
    category: 'otaku_anime',
    categoryLabel: 'Otaku & Pop Culture',
    eraOrYear: 'Kata Populer Era Reiwa (2020-an)',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Berasal dari kata kerja 推す (osu = merekomendasikan/mendorong). Awalnya dipopulerkan oleh fans idol AKB48 untuk menyebut member yang mereka dukung ("Oshi-men"), kini meluas ke segala bidang budaya pop dan hobi.',
    sampleDialogue: {
      context: 'Mengobrol tentang konser anime di kafe',
      lineA: {
        speaker: 'Yuki',
        text: '今週末、推しのライブがあるから東京に行くんだ！',
        furigana: 'こんしゅうまつ、おしの ライブがあるから とうきょうに いくんだ！',
        romaji: 'Konshuumatsu, oshi no raibu ga aru kara Toukyou ni ikun da!',
        translationId: 'Akhir pekan ini ada konser idola favoritku, jadi aku mau pergi ke Tokyo!'
      },
      lineB: {
        speaker: 'Aoi',
        text: 'いいな〜！推し活楽しんできてね！',
        furigana: 'いいな〜！ おしかつ たのしんできてね！',
        romaji: 'Ii na~! Oshikatsu tanoshinde kite ne!',
        translationId: 'Wah asyik banget~! Selamat menikmati momen fangirling/fanboying-nya ya!'
      }
    },
    tags: ['#Oshi', '#Idol', '#Anime', '#Fanboying', '#ReiwaTrend']
  },
  {
    id: 'slang_numa',
    term: '沼 / 沼る',
    furigana: 'ぬま / ぬまる',
    romaji: 'Numa / Numaru',
    meaningId: 'Kecanduan Hobi / Terperosok ke Dalam "Lubang Hitam" Obsesi Positif',
    meaningDetail: 'Kondisi ketika seseorang begitu terpikat dan tenggelam ke dalam suatu hobi, serial anime, atau idola sehingga tidak bisa keluar lagi dan terus menghabiskan waktu/uang.',
    category: 'otaku_anime',
    categoryLabel: 'Otaku & Pop Culture',
    eraOrYear: 'Terkini',
    formalityLevel: 'Sangat Santai (Casual)',
    originExplanation: 'Kata "Numa" arti harfiahnya adalah rawa/lumpur hisap. Ketika menginjak rawa, semakin Anda bergerak maka akan semakin terisap ke dalam. Kiasan ini digunakan untuk menunjukkan daya tarik hobi yang bikin candu.',
    sampleDialogue: {
      context: 'Membahas serial anime yang baru ditonton',
      lineA: {
        speaker: 'Daiki',
        text: '友達に勧められて観たアニメ、完全に沼ったわ。',
        furigana: 'ともだちに すすめられて みた アニメ、かんぜんに ぬまったわ。',
        romaji: 'Tomodachi ni susumerarete mita anime, kanzen ni numatta wa.',
        translationId: 'Anime yang direkomendasikan temanku kemarin, aku benar-benar terjerumus kecanduan banget.'
      },
      lineB: {
        speaker: 'Souta',
        text: 'ようこそ沼へ！グッズも全部集めようぜ。',
        furigana: 'ようこそ ぬまへ！ グッズも ぜんぶ あつめようぜ。',
        romaji: 'Youkoso numa e! Guzzu mo zenbu atsumeyou ze.',
        translationId: 'Selamat datang di kubangan candu! Ayo kita borong semua merchandise-nya.'
      }
    },
    tags: ['#Numa', '#Candu', '#Hobi', '#Anime', '#Otaku']
  },
  {
    id: 'slang_toutoi',
    term: '尊い / てぇてぇ',
    furigana: 'とうとい / てぇてぇ',
    romaji: 'Toutoi / Teetee',
    meaningId: 'Terlalu Indah / Suci Banget / Bikin Meleleh Saking Lucunya',
    meaningDetail: 'Ungkapan emosional mendalam saat melihat momen yang sangat manis, suci, mengharukan, atau persahabatan idola/karakter yang begitu tulus sampai membuat dada berdesir bahagia.',
    category: 'otaku_anime',
    categoryLabel: 'Otaku & Pop Culture',
    eraOrYear: 'Terkini',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Secara harfiah 尊い (toutoi) berarti "mulia" atau "sakral". Komunitas penggemar mengadopsinya untuk melukiskan perasaan kagum tanpa batas terhadap karakter atau interaksi yang amat murni. Bentuk variasinya dalam slang VTuber adalah "てぇてぇ" (teetee).',
    sampleDialogue: {
      context: 'Melihat interaksi dua anggota grup idola di panggung',
      lineA: {
        speaker: 'Mio',
        text: 'あの二人のハグ見た？！尊すぎて無理…！',
        furigana: 'あの ふたりの ハグ みた？！ とうとすぎて むり…！',
        romaji: 'Ano futari no hagu mita?! Toutosugite muri...!',
        translationId: 'Kamu liat pelukan mereka berdua gak barusan?! Sumpah terlalu suci dan menggemaskan, gak kuat aku...!'
      },
      lineB: {
        speaker: 'Kanon',
        text: 'わかる！まさに尊さの極みだよね。',
        furigana: 'わかる！ まさに とうとさの きわみだよね。',
        romaji: 'Wakaru! Masa ni toutosa no kiwami da yo ne.',
        translationId: 'Paham banget! Itu bener-bener puncak kemurnian yang bikin meleleh.'
      }
    },
    tags: ['#Toutoi', '#VTuber', '#Cute', '#Fangirl', '#Melt']
  },
  {
    id: 'slang_emoi',
    term: 'エモい',
    furigana: 'えもい',
    romaji: 'Emoi',
    meaningId: 'Bikin Baper / Penuh Emosi Melankolis / Estetik & Menyentuh',
    meaningDetail: 'Menggambarkan suasana, musik, pemandangan senja, atau foto yang memunculkan perasaan nostalgia, haru, puitis, dan sentimental yang sulit diungkapkan dengan kata-kata biasa.',
    category: 'wakamono_youth',
    categoryLabel: 'Bahasa Remaja & Gaul',
    eraOrYear: 'Sangat Populer',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Berasal dari kata serapan bahasa Inggris "Emotional" (genre musik Emo) + akhiran kata sifat Jepang "-i". Menjadi salah satu kata gaul terpopuler di kalangan generasi Z Jepang.',
    sampleDialogue: {
      context: 'Melihat pemandangan matahari terbenam di pantai Kamakura',
      lineA: {
        speaker: 'Ren',
        text: '夕暮れの海の景色、なんかエモいね。',
        furigana: 'ゆうぐれの うみの けしき、なんか エモいね。',
        romaji: 'Yuugure no umi no keshiki, nanka emoi ne.',
        translationId: 'Pemandangan laut saat senja gini rasanya baper dan estetik banget ya.'
      },
      lineB: {
        speaker: 'Hana',
        text: 'うん、昔の懐かしい記憶を思い出すよ。',
        furigana: 'うん、むかしの なつかしい きおくを おもいだすよ。',
        romaji: 'Un, mukashi no natsukashii kioku o omoidasu yo.',
        translationId: 'Iya, jadi mengingatkanku pada kenangan manis masa lalu.'
      }
    },
    tags: ['#Emoi', '#Baper', '#Aesthetic', '#Nostalgia', '#GenZ']
  },
  {
    id: 'slang_gachi',
    term: 'ガチ / ガチ勢',
    furigana: 'がち / がちぜい',
    romaji: 'Gachi / Gachizei',
    meaningId: 'Serius Banget / Beneran / Kelas Pro / Tanpa Main-main',
    meaningDetail: 'Digunakan untuk menekankan kesungguhan atau tingkat dedikasi tinggi. "Gachi de?" = "Beneran serius?". "Gachizei" = Orang yang terjun totalitas/pro dalam suatu game atau bidang.',
    category: 'wakamono_youth',
    categoryLabel: 'Bahasa Remaja & Gaul',
    eraOrYear: 'Trend Standar',
    formalityLevel: 'Sangat Santai (Casual)',
    originExplanation: 'Berasal dari istilah olahraga sumo "ガチンコ" (gachinko), yaitu pertarungan sekuat tenaga secara jujur tanpa rekayasa sandiwara. Kini dipakai luas oleh anak muda sebagai adverbia intensitas.',
    sampleDialogue: {
      context: 'Membicarakan skor ujian teman',
      lineA: {
        speaker: 'Takuya',
        text: '彼、ノー勉って言ってたのに満点取ったよ。',
        furigana: 'かれ、ノーべんって いってたのに まんてん とったよ。',
        romaji: 'Kare, noo-ben tte itteta noni manten totta yo.',
        translationId: 'Dia padahal bilang gak belajar sama sekali, tapi dapet nilai sempurna lho.'
      },
      lineB: {
        speaker: 'Kouji',
        text: 'マジで？アイツはガチの天才だな。',
        furigana: 'マジで？ アイツは ガチの てんさいだな。',
        romaji: 'Maji de? Aitsu wa gachi no tensai da na.',
        translationId: 'Seriusan? Dia emang beneran jenius kelas kakap sih.'
      }
    },
    tags: ['#Gachi', '#Serius', '#Pro', '#GenZ', '#Casual']
  },
  {
    id: 'slang_wanchan',
    term: 'ワンチャン',
    furigana: 'わんちゃん',
    romaji: 'Wanchan',
    meaningId: 'Ada Kemungkinan / Masih Ada Peluang Sedikit (One Chance)',
    meaningDetail: 'Digunakan saat situasinya sulit atau mepet, namun masih ada kemungkinan kecil untuk berhasil jika dicoba.',
    category: 'wakamono_youth',
    categoryLabel: 'Bahasa Remaja & Gaul',
    eraOrYear: 'Sangat Populer',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Singkatan dari frasa bahasa Inggris "One Chance" (Satu kesempatan). Awalnya dari pemain game kartu/mahjong, lalu viral di kalangan mahasiswa Jepang untuk arti "Masih ada potensi/peluang".',
    sampleDialogue: {
      context: 'Mendekati waktu masuk stasiun',
      lineA: {
        speaker: 'Shun',
        text: 'あと3分で発車だけど、間に合うかな？',
        furigana: 'あと さんぷんで はっしゃだけど、まにあうかな？',
        romaji: 'Ato sampun de hassha dakedo, maniaukana?',
        translationId: 'Tinggal 3 menit lagi keretanya berangkat, kekejar gak ya?'
      },
      lineB: {
        speaker: 'Kei',
        text: '走ればワンチャン間に合う！ダッシュしよう！',
        furigana: 'はしれば ワンチャン まにあう！ ダッシュしよう！',
        romaji: 'Hashireba wanchan maniau! Dasshu shiyou!',
        translationId: 'Kalo kita lari masih ada kemungkinan keburu! Ayo ngebut!'
      }
    },
    tags: ['#Wanchan', '#Chance', '#Peluang', '#YouthSlang']
  },
  {
    id: 'slang_meshiterro',
    term: '飯テロ',
    furigana: 'めしてろ',
    romaji: 'Meshitero',
    meaningId: '"Teror Makanan" (Mengunggah Foto Makanan Lezat di Malam Hari)',
    meaningDetail: 'Tindakan memposting foto makanan yang sangat menggugah selera (seperti ramen, steak, sushi) di media sosial pada jam larut malam saat orang-orang sedang lapar dan tidak bisa makan.',
    category: 'internet_sns',
    categoryLabel: 'Internet & Chat Slang',
    eraOrYear: 'Populer di Twitter/Instagram',
    formalityLevel: 'Sangat Santai (Casual)',
    originExplanation: 'Gabungan dari kata 飯 (meshi = nasi/makanan) + テロ (terorisme). Secara jenaka dianggap sebagai "aksi teror kejam" terhadap perut follower di lini masa tengah malam.',
    sampleDialogue: {
      context: 'Melihat postingan teman jam 12 malam',
      lineA: {
        speaker: 'Haruto',
        text: '深夜12時のこのラーメン画像は完全に飯テロだろ…。',
        furigana: 'しんや じゅうにじの この ラーメンがぞうは かんぜんに めしてろだろ…。',
        romaji: 'Shinya juuniji no kono raamen gazou wa kanzen ni meshitero daro...',
        translationId: 'Foto ramen jam 12 malam gini bener-bener teror makanan tak berperikemanusiaan...'
      },
      lineB: {
        speaker: 'Maya',
        text: 'お腹空いてきちゃった！夜食食べようかな…',
        furigana: 'おなかすいてきちゃった！ やしょく たべようかな…',
        romaji: 'Onaka suite kichatta! Yashoku tabeyou kana...',
        translationId: 'Perutku jadi keroncongan kan! Jadi pengen makan camilan tengah malam nih...'
      }
    },
    tags: ['#Meshitero', '#FoodPorn', '#MidnightHungry', '#SNS', '#Twitter']
  },
  {
    id: 'slang_bazuru',
    term: 'バズる',
    furigana: 'ばずる',
    romaji: 'Bazuru',
    meaningId: 'Viral / Menjadi Buah Bibir / Ramai Diperbincangkan di Medsos',
    meaningDetail: 'Kondisi ketika sebuah postingan, video, tweet, atau tren mendapatkan jutaan views, likes, dan retweet dalam waktu singkat.',
    category: 'buzzword_ryuukou',
    categoryLabel: 'Kata Tren & Viral',
    eraOrYear: 'Kata Populer Standar Digital',
    formalityLevel: 'Sangat Santai (Casual)',
    originExplanation: 'Dari kata bahasa Inggris "Buzz" (dengung lebah / kehebohan) + akhiran kata kerja bahasa Jepang "る" (ru).',
    sampleDialogue: {
      context: 'Membicarakan video TikTok yang meledak',
      lineA: {
        speaker: 'Saki',
        text: '昨日投稿したダンス動画がバズって10万いいね超えた！',
        furigana: 'きのう とうこうした ダンスどうがが バズって じゅうまんいいね こえた！',
        romaji: 'Kinou toukou shita dansu douga ga bazutte juuman iine koeta!',
        translationId: 'Video dance yang kuposting kemarin mendadak viral tembus 100 ribu likes!'
      },
      lineB: {
        speaker: 'Yuna',
        text: 'すごい！インフルエンサーの仲間入りだね！',
        furigana: 'すごい！ インフルエンサーの なかまいりだね！',
        romaji: 'Sugoi! Infuruensaa no nakamairi da ne!',
        translationId: 'Keren banget! Sekarang kamu resmi jadi seleb medsos ya!'
      }
    },
    tags: ['#Bazuru', '#Viral', '#Trending', '#TikTok', '#SocialMedia']
  },
  {
    id: 'slang_torima',
    term: 'とりま',
    furigana: 'とりま',
    romaji: 'Torima',
    meaningId: 'Untuk Sementara Ini / Pokoknya... / Langkah Pertama',
    meaningDetail: 'Singkatan cepat dari frasa "とりあえず、まあ" (Toriaezu, maa). Digunakan saat memulai rencana atau menentukan pilihan pertama.',
    category: 'abbreviation',
    categoryLabel: 'Singkatan Gaul (Ryakugo)',
    eraOrYear: 'Bahasa Chat Harian',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Singkatan 3 suku kata dari とりあえず (toriaezu) + まあ (maa) yang sangat sering dijumpai dalam pesan singkat anak muda.',
    sampleDialogue: {
      context: 'Baru sampai di restoran bersama kawan',
      lineA: {
        speaker: 'Kenta',
        text: '何頼む？',
        furigana: 'なに たのむ？',
        romaji: 'Nani tanomu?',
        translationId: 'Mau pesan apa nih?'
      },
      lineB: {
        speaker: 'Ryousuke',
        text: 'とりま生ビールで乾杯しよう！',
        furigana: 'とりま なまビールで かんぱいしよう！',
        romaji: 'Torima nama biiru de kampai shiyou!',
        translationId: 'Pokoknya untuk awalan kita pesan bir dulu buat bersulang!'
      }
    },
    tags: ['#Torima', '#Singkatan', '#Casual', '#Chat']
  },
  {
    id: 'slang_chiru',
    term: 'チル / チルい / チル友',
    furigana: 'ちる / ちるい',
    romaji: 'Chiru / Chirui',
    meaningId: 'Santai / Rileks / Suasana Tenang & Menenangkan (Chill)',
    meaningDetail: 'Menggambarkan aktivitas atau suasana yang tenang, tidak terburu-buru, santai menikmati waktu bersama teman atau sendirian sambil mendengarkan musik lo-fi.',
    category: 'wakamono_youth',
    categoryLabel: 'Bahasa Remaja & Gaul',
    eraOrYear: 'Tren Gen Z Terkini',
    formalityLevel: 'Bahasa Gaul Remaja',
    originExplanation: 'Diadaptasi dari kata bahasa Inggris "Chill out". Sering dipakai sebagai "Chiru suru" (bersantai) atau "Chirui" (suasananya adem dan rileks).',
    sampleDialogue: {
      context: 'Bersantai di kafe rooftop',
      lineA: {
        speaker: 'Asuka',
        text: 'このカフェ、BGMも良くてめっちゃチルいね。',
        furigana: 'この カフェ、BGMも よくて めっちゃ チルいね。',
        romaji: 'Kono kafe, BGM mo yokute meccha chirui ne.',
        translationId: 'Kafe ini musik latarnya enak dan suasananya bener-bener rileks & adem ya.'
      },
      lineB: {
        speaker: 'Mari',
        text: 'うん、休日にチルするのに最高の場所だね。',
        furigana: 'うん、きゅうじつに チルするのに さいこうの ばしょだね。',
        romaji: 'Un, kyuujitsu ni chiru suru no ni saikou no basho da ne.',
        translationId: 'Iya, tempat yang paling sempurna buat leha-leha santai saat liburan.'
      }
    },
    tags: ['#Chiru', '#Chill', '#Rileks', '#GenZ', '#Cafe']
  }
];
