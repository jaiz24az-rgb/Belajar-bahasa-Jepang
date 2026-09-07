import { JLPTExam } from '../types';

export const JLPT_EXAMS: JLPTExam[] = [
  // ==================== JLPT N5 ====================
  {
    id: 'jlpt_n5_mock_1',
    level: 'N5',
    title: 'Simulasi Resmi JLPT N5 (Pemula Lengkap)',
    durationMinutes: 30,
    passingScore: 80,
    totalScore: 180,
    sections: {
      mojigoi: [
        {
          id: 'n5_mg_1',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '___ のことばは どう よみますか？\n\nあそこに 「学校」 が あります。',
          options: ['がくこう', 'がっこう', 'がっこ', 'がくきょう'],
          correctIndex: 1,
          explanation: '「学校」 dibaca がっこう (Gakkou) yang berarti Sekolah. Terjadi peluluhan suku kata kecil (sokuon っ).'
        },
        {
          id: 'n5_mg_2',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '___ のことばは どう よみますか？\n\n毎朝、冷たい 「水」 を 飲みます。',
          options: ['みず', 'おちゃ', 'さけ', 'ゆ'],
          correctIndex: 0,
          explanation: '「水」 dibaca みず (Mizu) yang berarti air dingin/air mineral.'
        },
        {
          id: 'n5_mg_3',
          section: 'mojigoi',
          subType: 'orthography',
          prompt: '___ のことばは どう かきますか？\n\nあした ともだちと 「ほん」 を かいます。',
          options: ['木', '休', '本', '体'],
          correctIndex: 2,
          explanation: '「ほん」 (Hon / buku) ditulis dengan kanji 「本」.'
        },
        {
          id: 'n5_mg_4',
          section: 'mojigoi',
          subType: 'context',
          prompt: '（　　）に なにを いれますか？\n\nきょうは てんきが いいですから、そらが （　　） です。',
          options: ['あおい', 'くろい', 'あかい', 'くらい'],
          correctIndex: 0,
          explanation: 'Karena cuaca cerah (tenki ga ii), maka langitnya berwarna biru (あおい / Aoi).'
        }
      ],
      dokkai: [
        {
          id: 'n5_dk_1',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '（　　）に なにを いれますか？\n\nわたしは バス（　　） かいしゃへ いきます。',
          options: ['に', 'で', 'を', 'へ'],
          correctIndex: 1,
          explanation: 'Partikel 「で」 (de) digunakan untuk menandai alat transportasi (sarana/kendaraan) yang digunakan untuk bepergian: バスで (dengan bus).'
        },
        {
          id: 'n5_dk_2',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '（　　）に なにを いれますか？\n\nきのう えいがを （　　）。',
          options: ['みます', 'みました', 'みません', 'みない'],
          correctIndex: 1,
          explanation: 'Karena ada keterangan waktu lampau 「きのう」 (kemarin), maka kata kerja harus dalam bentuk lampau sopan 「みました」 (mimashita).'
        },
        {
          id: 'n5_dk_3',
          section: 'dokkai',
          subType: 'reading_comp',
          passage: '【よみもの】\nわたしは 田中（たなか）です。毎朝 7時に 起きて、パンと たまごを 食べます。それから 8時に 電車で 大学へ 行きます。大学の 図書館で 日本語を 勉強するのが 大好きです。',
          prompt: '田中さんは 朝 なにを たべますか？',
          options: ['ごはん と さかな', 'パン と たまご', 'ラーメン と ぎょうざ', 'くだもの だけ'],
          correctIndex: 1,
          explanation: 'Pada bacaan tertulis jelas: 「パンと たまごを 食べます」 (Makan roti dan telur).'
        }
      ],
      choukai: [
        {
          id: 'n5_ck_1',
          section: 'choukai',
          subType: 'listening',
          audioText: '男の人と女の人が話しています。男の人は何時に起きますか？\n女：明日は何時に起きる？\n男：いつもは７時だけど、明日はテストがあるから６時に起きるよ。\n女：頑張ってね！',
          prompt: '【Soal Mendengar】\n男の人は 明日 何時に 起きますか？ (Putar audio dan pilih jawaban yang benar)',
          options: ['5時', '6時', '7時', '8時'],
          correctIndex: 1,
          explanation: 'Pria tersebut berkata biasanya jam 7, tapi besok karena ada ujian dia akan bangun jam 6 (６時).'
        },
        {
          id: 'n5_ck_2',
          section: 'choukai',
          subType: 'listening',
          audioText: '店員と客が話しています。客はいくら払いますか？\n客：すみません、このリンゴはおいくらですか？\n店員：一つ百円です。三つで二百五十円ですよ。\n客：じゃあ、三つください。',
          prompt: '【Soal Mendengar】\n客は いくら はらいますか？',
          options: ['100円', '200円', '250円', '300円'],
          correctIndex: 2,
          explanation: 'Pembeli membeli 3 buah apel dengan harga paket 250 yen (二百五十円).'
        }
      ]
    }
  },

  // ==================== JLPT N4 ====================
  {
    id: 'jlpt_n4_mock_1',
    level: 'N4',
    title: 'Simulasi Resmi JLPT N4 (Pra-Menengah)',
    durationMinutes: 35,
    passingScore: 90,
    totalScore: 180,
    sections: {
      mojigoi: [
        {
          id: 'n4_mg_1',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '___ のことばは どう よみますか？\n\n駅前で 友達と 「約束」 を しました。',
          options: ['やくそく', 'けいぞく', 'あんそく', 'たいそく'],
          correctIndex: 0,
          explanation: '「約束」 dibaca やくそく (Yakusoku) yang artinya Janji.'
        },
        {
          id: 'n4_mg_2',
          section: 'mojigoi',
          subType: 'context',
          prompt: '（　　）に なにを いれますか？\n\n部屋が 暑いので、窓を （　　） ください。',
          options: ['しめて', 'あけて', 'つけて', 'きって'],
          correctIndex: 1,
          explanation: 'Karena kamar panas (atsui node), maka diminta tolong membuka jendela: 窓をあけて (mado o akete).'
        }
      ],
      dokkai: [
        {
          id: 'n4_dk_1',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '（　　）に なにを いれますか？\n\n日本語を 話すこと（　　） 上手になりました。',
          options: ['が', 'を', 'に', 'で'],
          correctIndex: 0,
          explanation: 'Pola kemampuan: ~こと/の + が上手になる (menjadi mahir dalam hal ~).'
        },
        {
          id: 'n4_dk_2',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '（　　）に なにを いれますか？\n\n雨が （　　） そうですから、傘を 持って行きましょう。',
          options: ['降る', '降り', '降って', '降った'],
          correctIndex: 1,
          explanation: 'Pola perkiraan visual/dugaan saat ini: Kata kerja bentuk Masu (tanpa masu) + そうです. 降ります -> 降りそうです (kelihatannya akan turun hujan).'
        }
      ],
      choukai: [
        {
          id: 'n4_ck_1',
          section: 'choukai',
          subType: 'listening',
          audioText: '留学生と先生が話しています。留学生は何を持って行かなければなりませんか？\n先生：明日の工場見学ですが、パスポートとノートとペンを忘れないでくださいね。カメラは工場の中では使えません。\n留学生：わかりました！',
          prompt: '【Soal Mendengar】\n留学生が 工場に 持って行くものは どれですか？',
          options: ['パスポート、ノート、ペン', 'カメラ、ノート、ペン', 'パスポートとカメラ', 'ノートだけ'],
          correctIndex: 0,
          explanation: 'Guru mengingatkan membawa paspor, buku catatan, dan pulpen, sedangkan kamera dilarang di dalam pabrik.'
        }
      ]
    }
  },

  // ==================== JLPT N3 ====================
  {
    id: 'jlpt_n3_mock_1',
    level: 'N3',
    title: 'Simulasi Resmi JLPT N3 (Menengah)',
    durationMinutes: 40,
    passingScore: 95,
    totalScore: 180,
    sections: {
      mojigoi: [
        {
          id: 'n3_mg_1',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '___ のことばの 読み方として 最もよいものを えらびなさい。\n\n将来、海外で 働くための 「準備」 を している。',
          options: ['じゅんび', 'じゅうび', 'しゅんび', 'すんび'],
          correctIndex: 0,
          explanation: '「準備」 dibaca じゅんび (Junbi) yang artinya Persiapan.'
        },
        {
          id: 'n3_mg_2',
          section: 'mojigoi',
          subType: 'context',
          prompt: '（　　）に 入れるのに 最もよいものを えらびなさい。\n\n彼の 意見には （　　） 賛成できません。',
          options: ['決して', '必ずしも', 'どうしても', 'とうとう'],
          correctIndex: 1,
          explanation: 'Pola 「必ずしも〜ない」 (kanarazushimo ~ nai) berarti "tidak selalu / belum tentu".'
        }
      ],
      dokkai: [
        {
          id: 'n3_dk_1',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '次の文の （　　） に入れるのに最もよいものを一つ選びなさい。\n\n先生に 相談した （　　）、留学することを 決めた。',
          options: ['うえで', 'うちに', 'ついでに', 'とおりに'],
          correctIndex: 0,
          explanation: 'Pola 「V-た + 上で (ue de)」 bermakna "setelah melakukan tindakan X, kemudian mengambil tindakan Y".'
        }
      ],
      choukai: [
        {
          id: 'n3_ck_1',
          section: 'choukai',
          subType: 'listening',
          audioText: '会社で上司と部下が話しています。部下はこれからまず何をしますか？\n上司：佐藤さん、明日の会議の資料は印刷できた？\n部下：はい、印刷は終わりました。\n上司：じゃあ、会議室のプロジェクターの動作確認を先にお願いできる？その後で参加者にお茶を用意して。\n部下：承知いたしました。すぐやります。',
          prompt: '【Soal Mendengar】\n部下は これから まず 何をしますか？',
          options: ['会議の資料を印刷する', 'プロジェクターの動作確認をする', 'お茶を用意する', '参加者に連絡する'],
          correctIndex: 1,
          explanation: 'Atasan meminta: 「会議室のプロジェクターの動作確認を先にお願いできる？」 (Tolong cek proyektor terlebih dahulu).'
        }
      ]
    }
  },

  // ==================== JLPT N2 ====================
  {
    id: 'jlpt_n2_mock_1',
    level: 'N2',
    title: 'Simulasi Resmi JLPT N2 (Menengah Atas / Bisnis)',
    durationMinutes: 45,
    passingScore: 90,
    totalScore: 180,
    sections: {
      mojigoi: [
        {
          id: 'n2_mg_1',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '下線部の言葉の読み方として最もよいものを一つ選びなさい。\n\n自然 「環境」 の保全に取り組む。',
          options: ['かんきょう', 'がんきょう', 'かんきゅう', 'けんきょう'],
          correctIndex: 0,
          explanation: '「環境」 dibaca かんきょう (Kankyou) yang artinya Lingkungan hidup.'
        }
      ],
      dokkai: [
        {
          id: 'n2_dk_1',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '次の文の （　　） に入れるのに最もよいものを一つ選びなさい。\n\nどんなに 困難で （　　）、最後まで あきらめない。',
          options: ['あっても', 'あれば', 'あるから', 'あろうと'],
          correctIndex: 3,
          explanation: 'Pola 「どんなに〜（よ）うと / であろうと」 berarti "Betapapun / bagaimanapun sulitnya, tetap tidak akan menyerah".'
        }
      ],
      choukai: [
        {
          id: 'n2_ck_1',
          section: 'choukai',
          subType: 'listening',
          audioText: 'ラジオで専門家が話しています。専門家によると、新しいサービスの最大の特徴は何ですか？\n専門家：今回のAI学習アプリの画期的な点は、ユーザーの音声発音をリアルタイムで波形解析し、イントネーションのズレを瞬時に可視化して修正できる点にあります。',
          prompt: '【Soal Mendengar N2】\n新しいサービスの 最大の特徴は 何ですか？',
          options: ['料金が完全に無料であること', '発音のズレをリアルタイムで可視化・修正できること', '教材のダウンロード速度が速いこと', 'オフラインで動画が見放題なこと'],
          correctIndex: 1,
          explanation: 'Pakar menekankan fitur revolusioner adalah analisis pengenalan suara dan visualisasi intonasi real-time.'
        }
      ]
    }
  },

  // ==================== JLPT N1 ====================
  {
    id: 'jlpt_n1_mock_1',
    level: 'N1',
    title: 'Simulasi Resmi JLPT N1 (Tingkat Mahir / Advance)',
    durationMinutes: 50,
    passingScore: 100,
    totalScore: 180,
    sections: {
      mojigoi: [
        {
          id: 'n1_mg_1',
          section: 'mojigoi',
          subType: 'reading',
          prompt: '下線部の言葉の読み方として最もよいものを一つ選びなさい。\n\n事態の推移を 「冷徹」 に見極める。',
          options: ['れいてつ', 'れいてき', 'れいてん', 'らいてつ'],
          correctIndex: 0,
          explanation: '「冷徹」 dibaca れいてつ (Reitetsu) yang artinya Tenang, dingin, objektif tanpa terbawa emosi.'
        }
      ],
      dokkai: [
        {
          id: 'n1_dk_1',
          section: 'dokkai',
          subType: 'grammar',
          prompt: '次の文の （　　） に入れるのに最もよいものを一つ選びなさい。\n\n彼は プロの ピアニスト （　　）、その 演奏は 聴衆を 魅了して やまない。',
          options: ['ならではの', 'とあって', 'たるもの', 'にあって'],
          correctIndex: 2,
          explanation: 'Pola 「N + たるもの (tarumono)」 berarti "Sebagai orang yang berstatus/berprofesi N (sebagai seorang profesional)".'
        }
      ],
      choukai: [
        {
          id: 'n1_ck_1',
          section: 'choukai',
          subType: 'listening',
          audioText: '大学の講義で教授が話しています。教授は現代社会におけるメディアリテラシーについてどのような見解を示していますか？\n教授：情報過多の現代においては、受動的に情報を受け取るのみならず、情報の真偽を多角的な視点から批判的に吟味する能力こそが不可欠です。',
          prompt: '【Soal Mendengar N1】\n教授が 強調している 能力は どれですか？',
          options: ['情報を素早く拡散する能力', '情報の真偽を批判的に吟味・精査する能力', '大量のデータを暗記する能力', '外国語を母国語並みに話す能力'],
          correctIndex: 1,
          explanation: 'Profesor menegaskan kemampuan memilah dan menguji kebenaran informasi secara kritis (批判的に吟味する).'
        }
      ]
    }
  }
];
