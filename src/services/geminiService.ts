import { SpeechFeedbackResult } from '../types';

export async function getAIPronunciationFeedback(
  targetText: string,
  romaji: string,
  spokenTranscript: string,
  userLevel: string = 'N5'
): Promise<SpeechFeedbackResult> {
  try {
    const res = await fetch('/api/gemini/pronunciation-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetText, romaji, spokenTranscript, userLevel }),
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Using offline pronunciation feedback calculation:', error);
    // Dynamic offline fallback generator
    const isGoodMatch = spokenTranscript.trim().length > 0;
    return {
      score: isGoodMatch ? 88 : 40,
      accuracyLevel: isGoodMatch ? 'Sangat Baik' : 'Perlu Latihan',
      phoneticFeedback: isGoodMatch
        ? `Pengenalan suara menangkap: "${spokenTranscript}". Ritme dan artikulasi Anda cukup jelas. Latih konsistensi tempo dan kejelasan vokal.`
        : 'Suara belum tertangkap jelas. Pastikan mikrofon aktif dan coba lafalkan dengan suara lebih mantap.',
      improvementTips: [
        'Ucapkan tiap mora (suku kata) dengan panjang ketukan yang sama.',
        'Hindari menekan intonasi terlalu tinggi di akhir kalimat kecuali kalimat tanya (ka?).',
        'Dengarkan tombol audio native sebagai referensi perbandingan.'
      ],
      syllableBreakdown: [
        { syllable: targetText, status: isGoodMatch ? 'correct' : 'minor_flaw', note: 'Pelafalan vokal & konsonan' }
      ],
      encouragement: '素晴らしい！毎日練習すればネイティブのように話せます！ (Subarashii! Luar biasa, teruslah berlatih!)',
      isFallback: true,
    };
  }
}

export async function getAIConversationResponse(
  scenario: string,
  history: Array<{ role: 'user' | 'assistant'; text: string }>,
  userMessage: string,
  userLevel: string = 'N5'
) {
  try {
    const res = await fetch('/api/gemini/conversation-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, history, userMessage, userLevel }),
    });

    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.warn('AI conversation fallback:', err);
    return {
      japaneseResponse: 'はい、よく分かりました！もっと練習しましょう。',
      romaji: 'Hai, yoku wakarimashita! Motto renshuu shimashou.',
      indonesianTranslation: 'Ya, saya sangat mengerti! Mari berlatih lebih banyak lagi.',
      grammarNote: 'Menggunakan partikel もっと (motto) yang berarti "lebih/lagi".',
      suggestedReplies: [
        { japanese: 'はい、頑張ります！', romaji: 'Hai, ganbarimasu!', meaning: 'Ya, saya akan berusaha!' },
        { japanese: '日本語はとても楽しいです。', romaji: 'Nihongo wa totemo tanoshii desu.', meaning: 'Bahasa Jepang sangat menyenangkan.' }
      ],
      isFallback: true,
    };
  }
}

export async function getAIJlptExplanation(
  question: string,
  options: string[],
  selectedAnswer: string,
  correctAnswer: string,
  level: string,
  section: string
) {
  try {
    const res = await fetch('/api/gemini/jlpt-explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options, selectedAnswer, correctAnswer, level, section }),
    });

    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.warn('JLPT Explain fallback:', err);
    return {
      summary: 'Penjelasan Soal JLPT',
      correctExplanation: `Pilihan yang benar adalah "${correctAnswer}". Ini sesuai dengan kaidah tata bahasa dan konteks makna kalimat pada level ${level}.`,
      distractorAnalysis: 'Pilihan lain tidak tepat karena perbedaan partikel atau bentuk konjugasi kata kerja.',
      grammarRuleOrVocabularyRule: 'Selalu periksa kata penunjuk konteks dan pasangan partikel yang sesuai.',
      examTip: 'Eliminasi opsi yang memiliki ketidakcocokan gramatikal sebelum memilih jawaban akhir.',
      isFallback: true,
    };
  }
}

export async function getAIProgressDiagnostics(params: {
  userName: string;
  metrics: any;
  streak: number;
  xp: number;
  targetJLPT: string;
  lastExams: any[];
  speechStats: any;
}) {
  try {
    const res = await fetch('/api/gemini/progress-diagnostics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.warn('Progress Diagnostics fallback:', err);
    return {
      generatedAt: new Date().toISOString(),
      overallScore: 82,
      overallProficiencyTitle: "Pejuang Aktif JLPT N5 (初級実践者)",
      senseiComment: "Subarashii! Konsistensi belajar dan streak harian Anda menunjukkan dedikasi yang tinggi. Pemahaman dasar Hiragana dan pelafalan intonasi Anda sudah sangat mantap. Tingkatkan pembendaharaan Kanji dan variasi tata bahasa.",
      strengths: [
        {
          id: "str_1",
          type: "strength",
          title: "Artikulasi & Intonasi Suara Mantap",
          titleJa: "優れた発音",
          description: "Skor pelafalan rata-rata di atas 90% pada latihan berbicara AI, dengan akurasi pitch accent vokal yang konsisten.",
          module: "Percakapan & Bicara AI",
          impact: "high",
          scoreOrAccuracy: "92% Rata-rata"
        },
        {
          id: "str_2",
          type: "strength",
          title: "Pondasi Huruf Kana Sangat Kokoh",
          titleJa: "かな文字の習得",
          description: "Pengenalan aksara Hiragana dasar dan kombinasi vokal sudah sangat cepat tanpa kendala membaca.",
          module: "Hiragana & Katakana",
          impact: "high",
          scoreOrAccuracy: "100% Menguasai"
        },
        {
          id: "str_3",
          type: "strength",
          title: "Ketahanan Simulasi JLPT",
          titleJa: "JLPT合格圏内",
          description: "Hasil tes simulasi menunjukkan skor melampaui passing grade pada bagian kosakata dan kanji dasar.",
          module: "Simulasi Ujian JLPT",
          impact: "medium",
          scoreOrAccuracy: "Lulus N5 (138/180)"
        }
      ],
      weaknesses: [
        {
          id: "weak_1",
          type: "weakness",
          title: "Penguasaan On'yomi & Kun'yomi Kanji Lanjutan",
          titleJa: "音読み・訓読みの定着",
          description: "Perbedaan cara baca Tionghoa (On'yomi) dan Jepang asli (Kun'yomi) pada kanji kombinasi majemuk masih perlu diperkuat.",
          module: "Kanji N5-N1",
          impact: "high",
          actionableStep: "Latih 5 Kanji baru di modul Kanji dan perhatikan contoh kalimatnya setiap hari.",
          actionTab: "kanji",
          scoreOrAccuracy: "5/100 Kanji"
        },
        {
          id: "weak_2",
          type: "weakness",
          title: "Kecepatan Menangkap Audio Cepat (Choukai)",
          titleJa: "リスニング速度の向上",
          description: "Pada percakapan situasi darurat dan stasiun kereta, diperlukan pembiasaan terhadap tempo bicara penutur asli.",
          module: "Mendengar (Choukai)",
          impact: "medium",
          actionableStep: "Putar audio latihan di Listening Lab minimal 10 menit tanpa melihat teks subtitle terlebih dahulu.",
          actionTab: "listening",
          scoreOrAccuracy: "28 Menit Terakumulasi"
        }
      ],
      recommendedSchedule: [
        { day: "Senin", focus: "Kuasai 5 Kanji Dasar & Contoh Kosakata", duration: "15 Menit", actionTab: "kanji" },
        { day: "Selasa", focus: "Latihan Mendengarkan Choukai Stasiun & Restoran", duration: "20 Menit", actionTab: "listening" },
        { day: "Rabu", focus: "Roleplay Percakapan Kasual & Studio Suara AI", duration: "15 Menit", actionTab: "speaking" },
        { day: "Kamis", focus: "Kombinasi Katakana Kata Serapan Asing", duration: "10 Menit", actionTab: "kana" },
        { day: "Jumat", focus: "Simulasi Cepat Bagian Kosakata & Kanji JLPT", duration: "20 Menit", actionTab: "jlpt" },
        { day: "Sabtu", focus: "Skenario Percakapan Situasi Nyata", duration: "25 Menit", actionTab: "conversation" },
        { day: "Minggu", focus: "Review Ringkasan Mingguan & Pencapaian Target", duration: "15 Menit", actionTab: "dashboard" }
      ],
      japaneseMotto: {
        japanese: "継続は力なり",
        romaji: "Keizoku wa chikara nari",
        indonesian: "Konsistensi dan ketekunan adalah kunci kekuatan sejati."
      },
      isFallback: true,
      isAIGenerated: false
    };
  }
}

