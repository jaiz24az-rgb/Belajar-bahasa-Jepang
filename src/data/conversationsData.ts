import { ConversationScenario } from '../types';

export const CONVERSATIONS_DATA: ConversationScenario[] = [
  {
    id: 'conv_jikoshoukai',
    title: 'Perkenalan Diri (Jikoshoukai)',
    titleJa: '自己紹介（じこしょうかい）',
    description: 'Pelajari cara memperkenalkan diri secara sopan saat pertama kali bertemu orang Jepang atau rekan kerja baru.',
    level: 'N5',
    category: 'daily',
    cultureTip: 'Saat mengatakan "Yoroshiku onegaishimasu", lakukan sedikit membungkuk (ojigi) sekitar 15-30 derajat untuk menunjukkan rasa hormat.',
    dialogue: [
      {
        id: 'd1_1',
        speaker: 'Kenji (Rekan)',
        speakerRole: 'native',
        japanese: '初めまして！私はケンジです。よろしくお願いします。',
        furigana: 'はじめまして！わたしは けんじです。よろしく おねがいします。',
        romaji: 'Hajimemashite! Watashi wa Kenji desu. Yoroshiku onegaishimasu.',
        meaningId: 'Salam kenal! Saya Kenji. Mohon bantuannya.',
        tip: '"Hajimemashite" hanya digunakan saat pertama kali bertemu seumur hidup dengan orang tersebut.'
      },
      {
        id: 'd1_2',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '初めまして！インドネシアから来たリキです。こちらこそよろしくお願いします！',
        furigana: 'はじめまして！いんどねしあから きた りきです。こちらこそ よろしく おねがいします！',
        romaji: 'Hajimemashite! Indoneshia kara kita Riki desu. Kochirakoso yoroshiku onegaishimasu!',
        meaningId: 'Salam kenal! Saya Riki yang datang dari Indonesia. Sama-sama, saya juga mohon bantuannya!',
        tip: '"Kochirakoso" berarti "justru pihak saya / sama-sama".'
      },
      {
        id: 'd1_3',
        speaker: 'Kenji (Rekan)',
        speakerRole: 'native',
        japanese: '日本へようこそ！日本のアニメや料理は好きですか？',
        furigana: 'にほんへ ようこそ！にほんの あにめや りょうりは すきですか？',
        romaji: 'Nihon e youkoso! Nihon no anime ya ryouri wa suki desu ka?',
        meaningId: 'Selamat datang di Jepang! Apakah kamu suka anime atau kuliner Jepang?',
        tip: '"~wa suki desu ka?" adalah pola dasar untuk menanyakan kesukaan.'
      },
      {
        id: 'd1_4',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: 'はい、大好きです！特にラーメンと鬼滅の刃が大好きです。',
        furigana: 'はい、だいすきです！とくに らーめんと きめつのやいばが だいすきです。',
        romaji: 'Hai, daisuki desu! Tokuni raamen to kimetsu no yaiba ga daisuki desu.',
        meaningId: 'Ya, sangat suka! Terutama ramen dan Demon Slayer sangat saya sukai.',
        tip: '"Tokuni" berarti "terutama/khususnya".'
      }
    ]
  },
  {
    id: 'conv_ramen_ordering',
    title: 'Memesan Ramen di Restoran',
    titleJa: 'ラーメン屋での注文',
    description: 'Latihan percakapan memesan tingkat kematangan mie, kuah, dan topping di kedai ramen autentik.',
    level: 'N5',
    category: 'food',
    cultureTip: 'Di Jepang, menyeruput mie (zuzu-tto) dengan suara saat makan ramen dianggap wajar dan menunjukkan bahwa Anda menikmati masakannya selagi panas.',
    dialogue: [
      {
        id: 'd2_1',
        speaker: 'Pelayan (Ten-in)',
        speakerRole: 'native',
        japanese: 'いらっしゃいませ！何名様でしょうか？',
        furigana: 'いらっしゃいませ！なんめいさまでしょうか？',
        romaji: 'Irasshaimase! Nanmei-sama deshō ka?',
        meaningId: 'Selamat datang! Untuk berapa orang ya?',
        tip: '"Nanmei-sama" adalah bentuk sangat sopan dari "berapa orang".'
      },
      {
        id: 'd2_2',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '一人です。カウンター席でお願いします。',
        furigana: 'ひとりです。かうんたーせきで おねがいします。',
        romaji: 'Hitori desu. Kauntaa-seki de onegaishimasu.',
        meaningId: 'Satu orang. Tolong di kursi konter.',
        tip: 'Hitori = 1 orang, Futari = 2 orang, Sannin = 3 orang.'
      },
      {
        id: 'd2_3',
        speaker: 'Pelayan (Ten-in)',
        speakerRole: 'native',
        japanese: 'ご注文はお決まりですか？',
        furigana: 'ごちゅうもんは おきまりですか？',
        romaji: 'Gochuumon wa okimari desu ka?',
        meaningId: 'Apakah pesanannya sudah siap ditentukan?',
        tip: 'Frasa standar pelayan restoran Jepang saat mendatangi meja.'
      },
      {
        id: 'd2_4',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '豚骨ラーメンを一つと、餃子をお願いします。麺は固めで！',
        furigana: 'とんこつらーめんを ひとつと、ぎょうざを おねがいします。めんは かためで！',
        romaji: 'Tonkotsu raamen o hitotsu to, gyouza o onegaishimasu. Men wa katame de!',
        meaningId: 'Tolong satu tonkotsu ramen dan gyoza. Mienya agak keras (al dente) ya!',
        tip: 'Katame = keras/al dente, Futsuu = sedang, Yawarakame = lembut.'
      }
    ]
  },
  {
    id: 'conv_shinjuku_directions',
    title: 'Menanyakan Arah di Stasiun Kereta',
    titleJa: '駅で道を尋ねる',
    description: 'Panduan navigasi praktis saat tersesat di stasiun besar seperti Shinjuku atau Tokyo.',
    level: 'N5',
    category: 'travel',
    cultureTip: 'Gunakan kata "Sumimasen" (permisi/maaf) sebelum bertanya ke pejalan kaki atau petugas untuk menarik perhatian secara sopan.',
    dialogue: [
      {
        id: 'd3_1',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: 'すみません、山手線の乗り場はどこですか？',
        furigana: 'すみません、やまのてせんの のりばは どこですか？',
        romaji: 'Sumimasen, Yamanote-sen no noriba wa doko desu ka?',
        meaningId: 'Permisi, peron jalur Yamanote Line ada di mana ya?',
        tip: '"~no noriba wa doko desu ka?" = Tempat naik ~ di mana?'
      },
      {
        id: 'd3_2',
        speaker: 'Petugas Stasiun (Eki-in)',
        speakerRole: 'native',
        japanese: 'この階段を上がって、2番ホームへ行ってください。',
        furigana: 'この かいだんを あがって、にばんほーむへ いってください。',
        romaji: 'Kono kaidan o agatte, niban hoomu e itte kudasai.',
        meaningId: 'Naiklah tangga ini, lalu silakan pergi ke peron nomor 2.',
        tip: '"Kaidan o agatte" = naik tangga.'
      },
      {
        id: 'd3_3',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: 'Suicaカードにチャージしたいのですが、精算機はどこですか？',
        furigana: 'すいかかーどに ちゃーじしたいのですが、せいさんきは どこですか？',
        romaji: 'Suika kaado ni chaaji shitai no desu ga, seisanki wa doko desu ka?',
        meaningId: 'Saya ingin isi saldo kartu Suica, mesin pembayarannya ada di mana ya?',
        tip: '"~shitai no desu ga" = Saya ingin melakukan ~, tapi (ungkapan sopan meminta petunjuk).'
      },
      {
        id: 'd3_4',
        speaker: 'Petugas Stasiun (Eki-in)',
        speakerRole: 'native',
        japanese: '改札口のすぐ左側にありますよ。',
        furigana: 'かいさつぐちの すぐ ひだりがわに ありますよ。',
        romaji: 'Kaisatsuguchi no sugu hidarigawa ni arimasu yo.',
        meaningId: 'Ada tepat di sebelah kiri gerbang tiket (kaisatsuguchi).',
        tip: 'Kaisatsuguchi = Gerbang tiket otomatis.'
      }
    ]
  },
  {
    id: 'conv_konbini_shopping',
    title: 'Belanja Praktis di Konbini (7-Eleven / Lawson)',
    titleJa: 'コンビニでの買い物',
    description: 'Memahami pertanyaan kasir tentang kantong plastik, pemanasan bento, dan sumpit.',
    level: 'N5',
    category: 'shopping',
    cultureTip: 'Di Jepang, kantong plastik berbayar (sekitar 3-5 yen). Pelayan akan selalu menanyakan apakah Anda membutuhkan kantong (fukuro).',
    dialogue: [
      {
        id: 'd4_1',
        speaker: 'Kasir Konbini',
        speakerRole: 'native',
        japanese: 'お弁当温めますか？袋はご利用ですか？',
        furigana: 'おべんとう あたためますか？ふくろは ごりようですか？',
        romaji: 'Obentou atatame masu ka? Fukuro wa goriyou desu ka?',
        meaningId: 'Apakah bentonya mau dihangatkan? Apakah membutuhkan kantong plastik?',
        tip: 'Atatameru = memanaskan di microwave.'
      },
      {
        id: 'd4_2',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: 'はい、温めてください。袋は大丈夫です。',
        furigana: 'はい、あたためてください。ふくろは だいじょうぶです。',
        romaji: 'Hai, atatamete kudasai. Fukuro wa daijoubu desu.',
        meaningId: 'Ya, tolong dihangatkan. Untuk kantong tidak perlu (tidak apa-apa).',
        tip: '"Daijoubu desu" dengan intonasi halus sering digunakan untuk menolak secara halus (No, thank you).'
      },
      {
        id: 'd4_3',
        speaker: 'Kasir Konbini',
        speakerRole: 'native',
        japanese: 'お箸とお手拭きはおいくつお付けしますか？',
        furigana: 'おはしと おてふきは おいくつ おつけしますか？',
        romaji: 'Ohashi to otefuki wa oikutsu otsuke shimasu ka?',
        meaningId: 'Berapa sumpit dan tisu basah yang ingin disertakan?',
        tip: 'Ohashi = sumpit, Otefuki = tisu basah.'
      },
      {
        id: 'd4_4',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '一つでお願いします。会計はPayPayで払います。',
        furigana: 'ひとつで おねがいします。かいけいは ぺいぺいで はらいます。',
        romaji: 'Hitotsu de onegaishimasu. Kaikei wa PeiPei de haraimasu.',
        meaningId: 'Satu saja tolong. Pembayarannya saya bayar menggunakan PayPay.',
        tip: 'Kaikei = pembayaran/bill.'
      }
    ]
  },
  {
    id: 'conv_casual_weekend',
    title: 'Obrolan Santai Akhir Pekan dengan Teman',
    titleJa: '友達との週末の会話',
    description: 'Latihan percakapan kasual (Tameguchi) sehari-hari seperti dalam anime dan tongkrongan.',
    level: 'N4',
    category: 'daily',
    cultureTip: 'Bentuk kasual (Tameguchi / Plain form) hanya digunakan dengan teman dekat, rekan sebaya, atau orang yang lebih muda.',
    dialogue: [
      {
        id: 'd5_1',
        speaker: 'Yuki (Teman)',
        speakerRole: 'native',
        japanese: 'ねえ、今週末何する予定？どっか遊びに行かない？',
        furigana: 'ねえ、こんしゅうまつ なにする よてい？どっか あそびに いかない？',
        romaji: 'Nee, konshuumatsu nani suru yotei? Dokka asobi ni ikanai?',
        meaningId: 'Hei, akhir pekan ini ada rencana apa? Mau pergi main ke suatu tempat nggak?',
        tip: '"Dokka" adalah singkatan kasual dari "doko ka" (suatu tempat).'
      },
      {
        id: 'd5_2',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: 'いいね！渋谷で新しくオープンしたカフェに行ってみたい！',
        furigana: 'いいね！しぶやで あたらしく おーぷんした かふぇに いってみたい！',
        romaji: 'Ii ne! Shibuya de atarashiku oopun shita kafe ni itte mitai!',
        meaningId: 'Boleh banget! Aku ingin coba pergi ke kafe yang baru buka di Shibuya!',
        tip: '"~te mitai" = ingin mencoba melakukan sesuatu.'
      },
      {
        id: 'd5_3',
        speaker: 'Yuki (Teman)',
        speakerRole: 'native',
        japanese: 'あそこ抹茶パフェが有名なんだよね！じゃあ土曜日の1時にハチ公前集合でどう？',
        furigana: 'あそこ まっちゃぱふぇが ゆうめいなんだよね！じゃあ どようびの いちじに はちこうまえ しゅうごうで どう？',
        romaji: 'Asoko maccha pafe ga yuumei nan da yo ne! Jaa doyoubi no ichiji ni Hachikou-mae shuugou de dou?',
        meaningId: 'Tempat itu terkenal dengan matcha parfait-nya lho! Kalau gitu gimana kalau kumpul jam 1 hari Sabtu di depan patung Hachiko?',
        tip: 'Hachiko-mae adalah titik temu paling legendaris di Shibuya Tokyo.'
      },
      {
        id: 'd5_4',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '了解！遅刻しないように行くね。楽しみ！',
        furigana: 'りょうかい！ちこく しないように いくね。たのしみ！',
        romaji: 'Ryoukai! Chikoku shinai you ni iku ne. Tanoshimi!',
        meaningId: 'Siap/Oke! Aku akan berangkat supaya nggak telat. Nggak sabar nih!',
        tip: '"Ryoukai" = Siap / Roger / Mengerti.'
      }
    ]
  },
  {
    id: 'conv_clinic_emergency',
    title: 'Pergi Berobat ke Klinik / Rumah Sakit',
    titleJa: '病院での問診',
    description: 'Cara menjelaskan gejala penyakit (demam, sakit kepala, batuk) kepada dokter Jepang.',
    level: 'N4',
    category: 'emergency',
    cultureTip: 'Bawalah kartu asuransi kesehatan Jepang (Hokenshou) dan kartu identitas saat berkunjung ke klinik di Jepang.',
    dialogue: [
      {
        id: 'd6_1',
        speaker: 'Dokter (Isha)',
        speakerRole: 'native',
        japanese: '今日はどうされましたか？どのような症状がありますか？',
        furigana: 'きょうは どうされましたか？どのような しょうじょうが ありますか？',
        romaji: 'Kyou wa dou saremashita ka? Dono you na shoujou ga arimasu ka?',
        meaningId: 'Ada keluhan apa hari ini? Gejala apa yang Anda rasakan?',
        tip: 'Shoujou = gejala penyakit.'
      },
      {
        id: 'd6_2',
        speaker: 'Anda (Learner)',
        speakerRole: 'learner',
        japanese: '昨日の夜から熱があって、頭痛と喉の痛みもあります。',
        furigana: 'きのうの よるから ねつがあって、ずつうと のどの いたみも あります。',
        romaji: 'Kinou no yoru kara netsu ga atte, zutsuu to nodo no itami mo arimasu.',
        meaningId: 'Sejak kemarin malam saya demam, dan ada sakit kepala serta radang tenggorokan juga.',
        tip: 'Netsu = demam, Zutsuu = sakit kepala, Nodo no itami = sakit tenggorokan.'
      },
      {
        id: 'd6_3',
        speaker: 'Dokter (Isha)',
        speakerRole: 'native',
        japanese: '分かりました。風邪薬と解熱剤を3日分出しておきますね。食後に飲んでください。',
        furigana: 'わかりました。かぜぐすりと げねつざいを みっかぶん だしておきますね。しょくごに のんでください。',
        romaji: 'Wakarimashita. Kazegusuri to genetsuzai o mikkabun dashite okimasu ne. Shokugo ni nonde kudasai.',
        meaningId: 'Baik, saya mengerti. Saya resepkan obat flu dan penurun panas untuk 3 hari ya. Tolong diminum sesudah makan.',
        tip: 'Shokugo = setelah makan, Shokuzen = sebelum makan.'
      }
    ]
  }
];
