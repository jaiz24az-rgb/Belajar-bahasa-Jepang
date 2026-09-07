import { KanaItem } from '../types';

export const HIRAGANA_DATA: KanaItem[] = [
  // A row
  { id: 'h_a', char: 'あ', romaji: 'a', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Bentuk seperti huruf "A" dengan lingkaran di bawah', exampleWord: 'あめ (Ame)', exampleWordRomaji: 'Ame', exampleWordMeaning: 'Hujan / Permen', rowGroup: 'a' },
  { id: 'h_i', char: 'い', romaji: 'i', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua garis seperti dua jarI berdampingan', exampleWord: 'いぬ (Inu)', exampleWordRomaji: 'Inu', exampleWordMeaning: 'Anjing', rowGroup: 'a' },
  { id: 'h_u', char: 'う', romaji: 'u', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Orang membungkuk terkena pukUlan', exampleWord: 'うみ (Umi)', exampleWordRomaji: 'Umi', exampleWordMeaning: 'Laut', rowGroup: 'a' },
  { id: 'h_e', char: 'え', romaji: 'e', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Bentuk seperti burung Elang sedang meluncur', exampleWord: 'えき (Eki)', exampleWordRomaji: 'Eki', exampleWordMeaning: 'Stasiun', rowGroup: 'a' },
  { id: 'h_o', char: 'お', romaji: 'o', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Orang bermain golf memasukkan bola ke lubang O', exampleWord: 'おにぎり (Onigiri)', exampleWordRomaji: 'Onigiri', exampleWordMeaning: 'Nasi kepal', rowGroup: 'a' },

  // KA row
  { id: 'h_ka', char: 'か', romaji: 'ka', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Orang memotong kayu dengan KAkap/kapak', exampleWord: 'かさ (Kasa)', exampleWordRomaji: 'Kasa', exampleWordMeaning: 'Payung', rowGroup: 'ka' },
  { id: 'h_ki', char: 'き', romaji: 'ki', script: 'hiragana', type: 'gojuon', strokeCount: 4, mnemonic: 'KuncI (Key) dengan dua bilah horizontal', exampleWord: 'き (Ki)', exampleWordRomaji: 'Ki', exampleWordMeaning: 'Pohon', rowGroup: 'ka' },
  { id: 'h_ku', char: 'く', romaji: 'ku', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Paruh burung KUku yang sedang terbuka', exampleWord: 'くるま (Kuruma)', exampleWordRomaji: 'Kuruma', exampleWordMeaning: 'Mobil', rowGroup: 'ka' },
  { id: 'h_ke', char: 'け', romaji: 'ke', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Bentuk tong KErang atau pedang bambu Kendo', exampleWord: 'けいさつ (Keisatsu)', exampleWordRomaji: 'Keisatsu', exampleWordMeaning: 'Polisi', rowGroup: 'ka' },
  { id: 'h_ko', char: 'こ', romaji: 'ko', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua balok KOtak bertumpuk', exampleWord: 'こども (Kodomo)', exampleWordRomaji: 'Kodomo', exampleWordMeaning: 'Anak-anak', rowGroup: 'ka' },

  // SA row
  { id: 'h_sa', char: 'さ', romaji: 'sa', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Gelas SAmurai bersulang', exampleWord: 'さくら (Sakura)', exampleWordRomaji: 'Sakura', exampleWordMeaning: 'Bunga Sakura', rowGroup: 'sa' },
  { id: 'h_shi', char: 'し', romaji: 'shi', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Kait pancing untuk menangkap ikan SHIny', exampleWord: 'しろ (Shiro)', exampleWordRomaji: 'Shiro', exampleWordMeaning: 'Putih / Kastil', rowGroup: 'sa' },
  { id: 'h_su', char: 'す', romaji: 'su', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Orang melingkarkan tali SUmbbu', exampleWord: 'すし (Sushi)', exampleWordRomaji: 'Sushi', exampleWordMeaning: 'Sushi', rowGroup: 'sa' },
  { id: 'h_se', char: 'せ', romaji: 'se', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Dua orang duduk di bangku SEtara', exampleWord: 'せんせい (Sensei)', exampleWordRomaji: 'Sensei', exampleWordMeaning: 'Guru', rowGroup: 'sa' },
  { id: 'h_so', char: 'そ', romaji: 'so', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Jarum benang zig-zag SOwing', exampleWord: 'そら (Sora)', exampleWordRomaji: 'Sora', exampleWordMeaning: 'Langit', rowGroup: 'sa' },

  // TA row
  { id: 'h_ta', char: 'た', romaji: 'ta', script: 'hiragana', type: 'gojuon', strokeCount: 4, mnemonic: 'Huruf "ta" mirip tulisan "ta" latin', exampleWord: 'たまご (Tamago)', exampleWordRomaji: 'Tamago', exampleWordMeaning: 'Telur', rowGroup: 'ta' },
  { id: 'h_chi', char: 'ち', romaji: 'chi', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Angka 5 dengan CHIn (dagu) menonjol', exampleWord: 'ちず (Chizu)', exampleWordRomaji: 'Chizu', exampleWordMeaning: 'Peta', rowGroup: 'ta' },
  { id: 'h_tsu', char: 'つ', romaji: 'tsu', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Gelombang ombak TSU-nami melengkung', exampleWord: 'つき (Tsuki)', exampleWordRomaji: 'Tsuki', exampleWordMeaning: 'Bulan', rowGroup: 'ta' },
  { id: 'h_te', char: 'て', romaji: 'te', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Bentuk lengan dan TElapak tangan', exampleWord: 'て (Te)', exampleWordRomaji: 'Te', exampleWordMeaning: 'Tangan', rowGroup: 'ta' },
  { id: 'h_to', char: 'と', romaji: 'to', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Jari kaki (TOe) tertusuk duri', exampleWord: 'ともだち (Tomodachi)', exampleWordRomaji: 'Tomodachi', exampleWordMeaning: 'Teman', rowGroup: 'ta' },

  // NA row
  { id: 'h_na', char: 'な', romaji: 'na', script: 'hiragana', type: 'gojuon', strokeCount: 4, mnemonic: 'Biarawati (NUn) berlutut berdoa', exampleWord: 'なつ (Natsu)', exampleWordRomaji: 'Natsu', exampleWordMeaning: 'Musim panas', rowGroup: 'na' },
  { id: 'h_ni', char: 'に', romaji: 'ni', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Jarum NIddle dan dua benang', exampleWord: 'にほん (Nihon)', exampleWordRomaji: 'Nihon', exampleWordMeaning: 'Jepang', rowGroup: 'na' },
  { id: 'h_nu', char: 'ぬ', romaji: 'nu', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Mie NUtrisi dengan sumpit melingkar', exampleWord: 'いぬ (Inu)', exampleWordRomaji: 'Inu', exampleWordMeaning: 'Anjing', rowGroup: 'na' },
  { id: 'h_ne', char: 'ね', romaji: 'ne', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Kucing Neko dengan ekor melengkung', exampleWord: 'ねこ (Neko)', exampleWordRomaji: 'Neko', exampleWordMeaning: 'Kucing', rowGroup: 'na' },
  { id: 'h_no', char: 'の', romaji: 'no', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Tanda larangan NO parking bulat melingkar', exampleWord: 'のみもの (Nomimono)', exampleWordRomaji: 'Nomimono', exampleWordMeaning: 'Minuman', rowGroup: 'na' },

  // HA row
  { id: 'h_ha', char: 'は', romaji: 'ha', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Bentuk huruf H dan huruf a menyatu', exampleWord: 'はな (Hana)', exampleWordRomaji: 'Hana', exampleWordMeaning: 'Bunga / Hidung', rowGroup: 'ha' },
  { id: 'h_hi', char: 'ひ', romaji: 'hi', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Orang tersenyum tertawa HI-HI-HI', exampleWord: 'ひかり (Hikari)', exampleWordRomaji: 'Hikari', exampleWordMeaning: 'Cahaya', rowGroup: 'ha' },
  { id: 'h_fu', char: 'ふ', romaji: 'fu/hu', script: 'hiragana', type: 'gojuon', strokeCount: 4, mnemonic: 'Gunung FUji dengan salju di sampingnya', exampleWord: 'ふね (Fune)', exampleWordRomaji: 'Fune', exampleWordMeaning: 'Kapal', rowGroup: 'ha' },
  { id: 'h_he', char: 'へ', romaji: 'he', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Bukit atau gundukan HE-mat', exampleWord: 'へや (Heya)', exampleWordRomaji: 'Heya', exampleWordMeaning: 'Kamar', rowGroup: 'ha' },
  { id: 'h_ho', char: 'ほ', romaji: 'ho', script: 'hiragana', type: 'gojuon', strokeCount: 4, mnemonic: 'Orang memakai topi HO-t Santa', exampleWord: 'ほし (Hoshi)', exampleWordRomaji: 'Hoshi', exampleWordMeaning: 'Bintang', rowGroup: 'ha' },

  // MA row
  { id: 'h_ma', char: 'ま', romaji: 'ma', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Topeng MAsker bertali melingkar', exampleWord: 'まち (Machi)', exampleWordRomaji: 'Machi', exampleWordMeaning: 'Kota', rowGroup: 'ma' },
  { id: 'h_mi', char: 'み', romaji: 'mi', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Mata melihat angka 21 berputar', exampleWord: 'みず (Mizu)', exampleWordRomaji: 'Mizu', exampleWordMeaning: 'Air', rowGroup: 'ma' },
  { id: 'h_mu', char: 'む', romaji: 'mu', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Sapi bersuara MOO-MU dengan hidung bulat', exampleWord: 'むし (Mushi)', exampleWordRomaji: 'Mushi', exampleWordMeaning: 'Serangga', rowGroup: 'ma' },
  { id: 'h_me', char: 'め', romaji: 'me', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Bentuk MEnatap dengan mata (Me)', exampleWord: 'め (Me)', exampleWordRomaji: 'Me', exampleWordMeaning: 'Mata', rowGroup: 'ma' },
  { id: 'h_mo', char: 'も', romaji: 'mo', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Kail cacing untuk MO-nster laut', exampleWord: 'もり (Mori)', exampleWordRomaji: 'Mori', exampleWordMeaning: 'Hutan', rowGroup: 'ma' },

  // YA row
  { id: 'h_ya', char: 'や', romaji: 'ya', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Tanduk YA-k sedang merumput', exampleWord: 'やま (Yama)', exampleWordRomaji: 'Yama', exampleWordMeaning: 'Gunung', rowGroup: 'ya' },
  { id: 'h_yu', char: 'ゆ', romaji: 'yu', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Ikan berenang seperti huruf U', exampleWord: 'ゆき (Yuki)', exampleWordRomaji: 'Yuki', exampleWordMeaning: 'Salju', rowGroup: 'ya' },
  { id: 'h_yo', char: 'よ', romaji: 'yo', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'YO-yo diikat pada tali', exampleWord: 'よる (Yoru)', exampleWordRomaji: 'Yoru', exampleWordMeaning: 'Malam', rowGroup: 'ya' },

  // RA row
  { id: 'h_ra', char: 'ら', romaji: 'ra', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Kelinci (RAbbit) melompat dengan telinga', exampleWord: 'らいおん (Raion)', exampleWordRomaji: 'Raion', exampleWordMeaning: 'Singa', rowGroup: 'ra' },
  { id: 'h_ri', char: 'り', romaji: 'ri', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Aliran sungaI (RI-ver) mengalir', exampleWord: 'りんご (Ringo)', exampleWordRomaji: 'Ringo', exampleWordMeaning: 'Apel', rowGroup: 'ra' },
  { id: 'h_ru', char: 'る', romaji: 'ru', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Jalan berliku dengan putaran RO-ute', exampleWord: 'くるま (Kuruma)', exampleWordRomaji: 'Kuruma', exampleWordMeaning: 'Mobil', rowGroup: 'ra' },
  { id: 'h_re', char: 'れ', romaji: 're', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Orang berlari RE-lay estafet', exampleWord: 'れいぞうこ (Reizouko)', exampleWordRomaji: 'Reizouko', exampleWordMeaning: 'Kulkas', rowGroup: 'ra' },
  { id: 'h_ro', char: 'ろ', romaji: 'ro', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Jalan RO-ad terbuka tanpa ekor loop', exampleWord: 'ろうそく (Rousoku)', exampleWordRomaji: 'Rousoku', exampleWordMeaning: 'Lilin', rowGroup: 'ra' },

  // WA / N row
  { id: 'h_wa', char: 'わ', romaji: 'wa', script: 'hiragana', type: 'gojuon', strokeCount: 2, mnemonic: 'Angsa putih WA-ter bird anggun', exampleWord: 'わたし (Watashi)', exampleWordRomaji: 'Watashi', exampleWordMeaning: 'Saya', rowGroup: 'wa' },
  { id: 'h_wo', char: 'を', romaji: 'wo/o', script: 'hiragana', type: 'gojuon', strokeCount: 3, mnemonic: 'Orang melompati rintangan WO-w (partikel)', exampleWord: 'ほんをよむ (Hon o yomu)', exampleWordRomaji: 'Hon o yomu', exampleWordMeaning: 'Membaca buku', rowGroup: 'wa' },
  { id: 'h_n', char: 'ん', romaji: 'n', script: 'hiragana', type: 'gojuon', strokeCount: 1, mnemonic: 'Bentuk huruf n latin kecil bergaya', exampleWord: 'にほん (Nihon)', exampleWordRomaji: 'Nihon', exampleWordMeaning: 'Jepang', rowGroup: 'wa' },

  // Dakuon (Ga, Za, Da, Ba) & Handakuon (Pa)
  { id: 'h_ga', char: 'が', romaji: 'ga', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'か + tenten (゛)', exampleWord: 'がっこう (Gakkou)', exampleWordRomaji: 'Gakkou', exampleWordMeaning: 'Sekolah', rowGroup: 'ka' },
  { id: 'h_gi', char: 'ぎ', romaji: 'gi', script: 'hiragana', type: 'dakuon', strokeCount: 6, mnemonic: 'き + tenten (゛)', exampleWord: 'ぎんこう (Ginkou)', exampleWordRomaji: 'Ginkou', exampleWordMeaning: 'Bank', rowGroup: 'ka' },
  { id: 'h_gu', char: 'ぐ', romaji: 'gu', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'く + tenten (゛)', exampleWord: 'ぐんたい (Guntai)', exampleWordRomaji: 'Guntai', exampleWordMeaning: 'Militer', rowGroup: 'ka' },
  { id: 'h_ge', char: 'げ', romaji: 'ge', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'け + tenten (゛)', exampleWord: 'げんき (Genki)', exampleWordRomaji: 'Genki', exampleWordMeaning: 'Sehat/Semangat', rowGroup: 'ka' },
  { id: 'h_go', char: 'ご', romaji: 'go', script: 'hiragana', type: 'dakuon', strokeCount: 4, mnemonic: 'こ + tenten (゛)', exampleWord: 'ごはん (Gohan)', exampleWordRomaji: 'Gohan', exampleWordMeaning: 'Nasi/Makanan', rowGroup: 'ka' },

  { id: 'h_za', char: 'ざ', romaji: 'za', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'さ + tenten (゛)', exampleWord: 'ざっし (Zasshi)', exampleWordRomaji: 'Zasshi', exampleWordMeaning: 'Majalah', rowGroup: 'sa' },
  { id: 'h_ji', char: 'じ', romaji: 'ji', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'し + tenten (゛)', exampleWord: 'じかん (Jikan)', exampleWordRomaji: 'Jikan', exampleWordMeaning: 'Waktu', rowGroup: 'sa' },
  { id: 'h_zu', char: 'ず', romaji: 'zu', script: 'hiragana', type: 'dakuon', strokeCount: 4, mnemonic: 'す + tenten (゛)', exampleWord: 'ちず (Chizu)', exampleWordRomaji: 'Chizu', exampleWordMeaning: 'Peta', rowGroup: 'sa' },
  { id: 'h_ze', char: 'ぜ', romaji: 'ze', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'せ + tenten (゛)', exampleWord: 'ぜんぶ (Zenbu)', exampleWordRomaji: 'Zenbu', exampleWordMeaning: 'Semuanya', rowGroup: 'sa' },
  { id: 'h_zo', char: 'ぞ', romaji: 'zo', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'そ + tenten (゛)', exampleWord: 'ぞう (Zou)', exampleWordRomaji: 'Zou', exampleWordMeaning: 'Gajah', rowGroup: 'sa' },

  { id: 'h_da', char: 'だ', romaji: 'da', script: 'hiragana', type: 'dakuon', strokeCount: 6, mnemonic: 'た + tenten (゛)', exampleWord: 'だいがく (Daigaku)', exampleWordRomaji: 'Daigaku', exampleWordMeaning: 'Universitas', rowGroup: 'ta' },
  { id: 'h_de', char: 'で', romaji: 'de', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'て + tenten (゛)', exampleWord: 'でんしゃ (Densha)', exampleWordRomaji: 'Densha', exampleWordMeaning: 'Kereta', rowGroup: 'ta' },
  { id: 'h_do', char: 'ど', romaji: 'do', script: 'hiragana', type: 'dakuon', strokeCount: 4, mnemonic: 'と + tenten (゛)', exampleWord: 'どこ (Doko)', exampleWordRomaji: 'Doko', exampleWordMeaning: 'Di mana', rowGroup: 'ta' },

  { id: 'h_ba', char: 'ば', romaji: 'ba', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'は + tenten (゛)', exampleWord: 'ばんごう (Bangou)', exampleWordRomaji: 'Bangou', exampleWordMeaning: 'Nomor', rowGroup: 'ha' },
  { id: 'h_bi', char: 'び', romaji: 'bi', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'ひ + tenten (゛)', exampleWord: 'びょういん (Byouin)', exampleWordRomaji: 'Byouin', exampleWordMeaning: 'Rumah Sakit', rowGroup: 'ha' },
  { id: 'h_bu', char: 'ぶ', romaji: 'bu', script: 'hiragana', type: 'dakuon', strokeCount: 6, mnemonic: 'ふ + tenten (゛)', exampleWord: 'ぶんぽう (Bunpou)', exampleWordRomaji: 'Bunpou', exampleWordMeaning: 'Tata Bahasa', rowGroup: 'ha' },
  { id: 'h_be', char: 'べ', romaji: 'be', script: 'hiragana', type: 'dakuon', strokeCount: 3, mnemonic: 'へ + tenten (゛)', exampleWord: 'べんきょう (Benkyou)', exampleWordRomaji: 'Benkyou', exampleWordMeaning: 'Belajar', rowGroup: 'ha' },
  { id: 'h_bo', char: 'ぼ', romaji: 'bo', script: 'hiragana', type: 'dakuon', strokeCount: 6, mnemonic: 'ほ + tenten (゛)', exampleWord: 'ぼうし (Boushi)', exampleWordRomaji: 'Boushi', exampleWordMeaning: 'Topi', rowGroup: 'ha' },

  { id: 'h_pa', char: 'ぱ', romaji: 'pa', script: 'hiragana', type: 'dakuon', strokeCount: 4, mnemonic: 'は + maru (゜)', exampleWord: 'ぱん (Pan)', exampleWordRomaji: 'Pan', exampleWordMeaning: 'Roti', rowGroup: 'ha' },
  { id: 'h_pi', char: 'ぴ', romaji: 'pi', script: 'hiragana', type: 'dakuon', strokeCount: 2, mnemonic: 'ひ + maru (゜)', exampleWord: 'ぴかぴか (Pikapika)', exampleWordRomaji: 'Pikapika', exampleWordMeaning: 'Berkilau', rowGroup: 'ha' },
  { id: 'h_pu', char: 'ぷ', romaji: 'pu', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'ふ + maru (゜)', exampleWord: 'ぷりん (Purin)', exampleWordRomaji: 'Purin', exampleWordMeaning: 'Puding', rowGroup: 'ha' },
  { id: 'h_pe', char: 'ぺ', romaji: 'pe', script: 'hiragana', type: 'dakuon', strokeCount: 2, mnemonic: 'へ + maru (゜)', exampleWord: 'ぺらぺら (Perapera)', exampleWordRomaji: 'Perapera', exampleWordMeaning: 'Fasih/Lancar', rowGroup: 'ha' },
  { id: 'h_po', char: 'ぽ', romaji: 'po', script: 'hiragana', type: 'dakuon', strokeCount: 5, mnemonic: 'ほ + maru (゜)', exampleWord: 'ぽすと (Posuto)', exampleWordRomaji: 'Posuto', exampleWordMeaning: 'Kotak Pos', rowGroup: 'ha' },

  // Yoon (Gabungan dengan ya, yu, yo kecil)
  { id: 'h_kya', char: 'きゃ', romaji: 'kya', script: 'hiragana', type: 'yoon', strokeCount: 7, mnemonic: 'き + ゃ', exampleWord: 'きゃく (Kyaku)', exampleWordRomaji: 'Kyaku', exampleWordMeaning: 'Tamu/Pelanggan', rowGroup: 'ka' },
  { id: 'h_kyu', char: 'きゅ', romaji: 'kyu', script: 'hiragana', type: 'yoon', strokeCount: 6, mnemonic: 'き + ゅ', exampleWord: 'きゅう (Kyuu)', exampleWordRomaji: 'Kyuu', exampleWordMeaning: 'Sembilan', rowGroup: 'ka' },
  { id: 'h_kyo', char: 'きょ', romaji: 'kyo', script: 'hiragana', type: 'yoon', strokeCount: 6, mnemonic: 'き + ょ', exampleWord: 'きょう (Kyou)', exampleWordRomaji: 'Kyou', exampleWordMeaning: 'Hari ini', rowGroup: 'ka' },
  { id: 'h_sha', char: 'しゃ', romaji: 'sha', script: 'hiragana', type: 'yoon', strokeCount: 4, mnemonic: 'し + ゃ', exampleWord: 'しゃしん (Shashin)', exampleWordRomaji: 'Shashin', exampleWordMeaning: 'Foto', rowGroup: 'sa' },
  { id: 'h_shu', char: 'しゅ', romaji: 'shu', script: 'hiragana', type: 'yoon', strokeCount: 3, mnemonic: 'し + ゅ', exampleWord: 'しゅくだい (Shukudai)', exampleWordRomaji: 'Shukudai', exampleWordMeaning: 'PR/Tugas', rowGroup: 'sa' },
  { id: 'h_sho', char: 'しょ', romaji: 'sho', script: 'hiragana', type: 'yoon', strokeCount: 3, mnemonic: 'し + ょ', exampleWord: 'しょくどう (Shokudou)', exampleWordRomaji: 'Shokudou', exampleWordMeaning: 'Kantin', rowGroup: 'sa' },
  { id: 'h_cha', char: 'ちゃ', romaji: 'cha', script: 'hiragana', type: 'yoon', strokeCount: 5, mnemonic: 'ち + ゃ', exampleWord: 'おちゃ (Ocha)', exampleWordRomaji: 'Ocha', exampleWordMeaning: 'Teh Hijau', rowGroup: 'ta' },
  { id: 'h_chu', char: 'ちゅ', romaji: 'chu', script: 'hiragana', type: 'yoon', strokeCount: 4, mnemonic: 'ち + ゅ', exampleWord: 'ちゅうごく (Chuugoku)', exampleWordRomaji: 'Chuugoku', exampleWordMeaning: 'China', rowGroup: 'ta' },
  { id: 'h_cho', char: 'ちょ', romaji: 'cho', script: 'hiragana', type: 'yoon', strokeCount: 4, mnemonic: 'ち + ょ', exampleWord: 'ちょっと (Chotto)', exampleWordRomaji: 'Chotto', exampleWordMeaning: 'Sebentar / Sedikit', rowGroup: 'ta' },
  { id: 'h_nya', char: 'にゃ', romaji: 'nya', script: 'hiragana', type: 'yoon', strokeCount: 6, mnemonic: 'に + ゃ', exampleWord: 'にゃんこ (Nyanko)', exampleWordRomaji: 'Nyanko', exampleWordMeaning: 'Kucing manis', rowGroup: 'na' },
  { id: 'h_ryo', char: 'りょ', romaji: 'ryo', script: 'hiragana', type: 'yoon', strokeCount: 4, mnemonic: 'り + ょ', exampleWord: 'りょこう (Ryokou)', exampleWordRomaji: 'Ryokou', exampleWordMeaning: 'Perjalanan/Wisata', rowGroup: 'ra' },
];

export const KATAKANA_DATA: KanaItem[] = [
  // A row
  { id: 'k_a', char: 'ア', romaji: 'a', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Sudut segitiga Atap', exampleWord: 'アイス (Aisu)', exampleWordRomaji: 'Aisu', exampleWordMeaning: 'Es krim', rowGroup: 'a' },
  { id: 'k_i', char: 'イ', romaji: 'i', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Kuda-kuda I-zel lukisan berdiri', exampleWord: 'インク (Inku)', exampleWordRomaji: 'Inku', exampleWordMeaning: 'Tinta', rowGroup: 'a' },
  { id: 'k_u', char: 'ウ', romaji: 'u', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Payung Udara (Umbrella) di atas', exampleWord: 'ウェブ (Webu)', exampleWordRomaji: 'Webu', exampleWordMeaning: 'Web', rowGroup: 'a' },
  { id: 'k_e', char: 'エ', romaji: 'e', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Balok konstruksi Elevator baja', exampleWord: 'エアコン (Eakon)', exampleWordRomaji: 'Eakon', exampleWordMeaning: 'AC', rowGroup: 'a' },
  { id: 'k_o', char: 'オ', romaji: 'o', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Lengan binaragawan Otot kekar', exampleWord: 'オレンジ (Orenji)', exampleWordRomaji: 'Orenji', exampleWordMeaning: 'Jeruk', rowGroup: 'a' },

  // KA row
  { id: 'k_ka', char: 'カ', romaji: 'ka', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Mirip huruf か hiragana tanpa titik', exampleWord: 'カメラ (Kamera)', exampleWordRomaji: 'Kamera', exampleWordMeaning: 'Kamera', rowGroup: 'ka' },
  { id: 'k_ki', char: 'キ', romaji: 'ki', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Kunci KItar bersenar', exampleWord: 'キッチン (Kicchin)', exampleWordRomaji: 'Kicchin', exampleWordMeaning: 'Dapur', rowGroup: 'ka' },
  { id: 'k_ku', char: 'ク', romaji: 'ku', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Sepatu KUkuh runcing', exampleWord: 'クラス (Kurasu)', exampleWordRomaji: 'Kurasu', exampleWordMeaning: 'Kelas', rowGroup: 'ka' },
  { id: 'k_ke', char: 'ケ', romaji: 'ke', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'K-E sudut segitiga panah', exampleWord: 'ケーキ (Keeki)', exampleWordRomaji: 'Keeki', exampleWordMeaning: 'Kue / Cake', rowGroup: 'ka' },
  { id: 'k_ko', char: 'コ', romaji: 'ko', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'KOtak terbuka satu sisi', exampleWord: 'コーヒー (Koohii)', exampleWordRomaji: 'Koohii', exampleWordMeaning: 'Kopi', rowGroup: 'ka' },

  // SA row
  { id: 'k_sa', char: 'サ', romaji: 'sa', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Tiga garis SAndal jepit', exampleWord: 'サラダ (Sarada)', exampleWordRomaji: 'Sarada', exampleWordMeaning: 'Salad', rowGroup: 'sa' },
  { id: 'k_shi', char: 'シ', romaji: 'shi', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Cipratan air SHInar dari bawah ke atas', exampleWord: 'シャツ (Shatsu)', exampleWordRomaji: 'Shatsu', exampleWordMeaning: 'Kemeja', rowGroup: 'sa' },
  { id: 'k_su', char: 'ス', romaji: 'su', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Gantungan SUit jas pakaian', exampleWord: 'スーパー (Suupaa)', exampleWordRomaji: 'Suupaa', exampleWordMeaning: 'Supermarket', rowGroup: 'sa' },
  { id: 'k_se', char: 'セ', romaji: 'se', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Bentuk SEgi empat terbuka', exampleWord: 'セーター (Seetaa)', exampleWordRomaji: 'Seetaa', exampleWordMeaning: 'Sweter', rowGroup: 'sa' },
  { id: 'k_so', char: 'ソ', romaji: 'so', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Jarum SOl menusuk ke bawah', exampleWord: 'ソファ (Sofa)', exampleWordRomaji: 'Sofa', exampleWordMeaning: 'Sofa', rowGroup: 'sa' },

  // TA row
  { id: 'k_ta', char: 'タ', romaji: 'ta', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Mirip ク dengan garis TAmbahan', exampleWord: 'タクシー (Takushii)', exampleWordRomaji: 'Takushii', exampleWordMeaning: 'Taksi', rowGroup: 'ta' },
  { id: 'k_chi', char: 'チ', romaji: 'chi', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Pemandu sorak CHIrleader dengan bendera', exampleWord: 'チーズ (Chiizu)', exampleWordRomaji: 'Chiizu', exampleWordMeaning: 'Keju', rowGroup: 'ta' },
  { id: 'k_tsu', char: 'ツ', romaji: 'tsu', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Dua mata dan jarum TSUkki dari atas', exampleWord: 'ツアー (Tsuaa)', exampleWordRomaji: 'Tsuaa', exampleWordMeaning: 'Tur wisata', rowGroup: 'ta' },
  { id: 'k_te', char: 'テ', romaji: 'te', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Antena TElevisi kuno', exampleWord: 'テスト (Tesuto)', exampleWordRomaji: 'Tesuto', exampleWordMeaning: 'Tes/Ujian', rowGroup: 'ta' },
  { id: 'k_to', char: 'ト', romaji: 'to', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Tiang TOtong/totem bercabang', exampleWord: 'トマト (Tomato)', exampleWordRomaji: 'Tomato', exampleWordMeaning: 'Tomat', rowGroup: 'ta' },

  // NA row
  { id: 'k_na', char: 'ナ', romaji: 'na', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Pedang NAruto bersilang', exampleWord: 'ナイフ (Naifu)', exampleWordRomaji: 'Naifu', exampleWordMeaning: 'Pisau', rowGroup: 'na' },
  { id: 'k_ni', char: 'ニ', romaji: 'ni', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua garis (NI = 2)', exampleWord: 'ニュース (Nyuusu)', exampleWordRomaji: 'Nyuusu', exampleWordMeaning: 'Berita', rowGroup: 'na' },
  { id: 'k_nu', char: 'ヌ', romaji: 'nu', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Sumpit mie NU-del menyilang', exampleWord: 'カヌー (Kanuu)', exampleWordRomaji: 'Kanuu', exampleWordMeaning: 'Kano', rowGroup: 'na' },
  { id: 'k_ne', char: 'ネ', romaji: 'ne', script: 'katakana', type: 'gojuon', strokeCount: 4, mnemonic: 'Dasi leher NE-cktie rapi', exampleWord: 'ネット (Netto)', exampleWordRomaji: 'Netto', exampleWordMeaning: 'Internet', rowGroup: 'na' },
  { id: 'k_no', char: 'ノ', romaji: 'no', script: 'katakana', type: 'gojuon', strokeCount: 1, mnemonic: 'Satu garis miring NO-nstop', exampleWord: 'ノート (Nooto)', exampleWordRomaji: 'Nooto', exampleWordMeaning: 'Buku catatan', rowGroup: 'na' },

  // HA row
  { id: 'k_ha', char: 'ハ', romaji: 'ha', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua tiang rumah HA-laman', exampleWord: 'ハンバーガー (Hanbaagaa)', exampleWordRomaji: 'Hanbaagaa', exampleWordMeaning: 'Hamburger', rowGroup: 'ha' },
  { id: 'k_hi', char: 'ヒ', romaji: 'hi', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Tumit HIl sepatu hak', exampleWord: 'ホテル (Hoteru)', exampleWordRomaji: 'Hoteru', exampleWordMeaning: 'Hotel', rowGroup: 'ha' },
  { id: 'k_fu', char: 'フ', romaji: 'fu/hu', script: 'katakana', type: 'gojuon', strokeCount: 1, mnemonic: 'Bendera berkibar tertiup FU-san angin', exampleWord: 'フォーク (Fooku)', exampleWordRomaji: 'Fooku', exampleWordMeaning: 'Garpu', rowGroup: 'ha' },
  { id: 'k_he', char: 'ヘ', romaji: 'he', script: 'katakana', type: 'gojuon', strokeCount: 1, mnemonic: 'Sama persis dengan へ hiragana', exampleWord: 'ヘリコプター (Herikoputaa)', exampleWordRomaji: 'Herikoputaa', exampleWordMeaning: 'Helikopter', rowGroup: 'ha' },
  { id: 'k_ho', char: 'ホ', romaji: 'ho', script: 'katakana', type: 'gojuon', strokeCount: 4, mnemonic: 'Salib HO-ly bercabang', exampleWord: 'ホテル (Hoteru)', exampleWordRomaji: 'Hoteru', exampleWordMeaning: 'Hotel', rowGroup: 'ha' },

  // MA row
  { id: 'k_ma', char: 'マ', romaji: 'ma', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Sudut MAnik-manik', exampleWord: 'マスク (Masuku)', exampleWordRomaji: 'Masuku', exampleWordMeaning: 'Masker', rowGroup: 'ma' },
  { id: 'k_mi', char: 'ミ', romaji: 'mi', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Tiga garis tangga nada MI (Do-Re-Mi)', exampleWord: 'ミルク (Miruku)', exampleWordRomaji: 'Miruku', exampleWordMeaning: 'Susu', rowGroup: 'ma' },
  { id: 'k_mu', char: 'ム', romaji: 'mu', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Segitiga MU-suh di radar', exampleWord: 'ムービー (Muubii)', exampleWordRomaji: 'Muubii', exampleWordMeaning: 'Film', rowGroup: 'ma' },
  { id: 'k_me', char: 'メ', romaji: 'me', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua pedang bersilangan MEdan tempur', exampleWord: 'メニュー (Menyuu)', exampleWordRomaji: 'Menyuu', exampleWordMeaning: 'Menu', rowGroup: 'ma' },
  { id: 'k_mo', char: 'モ', romaji: 'mo', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Bentuk seperti も tanpa lengkungan bawah', exampleWord: 'モデル (Moderu)', exampleWordRomaji: 'Moderu', exampleWordMeaning: 'Model', rowGroup: 'ma' },

  // YA row
  { id: 'k_ya', char: 'ヤ', romaji: 'ya', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Kapal layar YA-cht tajam', exampleWord: 'ヤシ (Yashi)', exampleWordRomaji: 'Yashi', exampleWordMeaning: 'Kelapa', rowGroup: 'ya' },
  { id: 'k_yu', char: 'ユ', romaji: 'yu', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Kait pancing U-turn', exampleWord: 'ユニフォーム (Yunifoomu)', exampleWordRomaji: 'Yunifoomu', exampleWordMeaning: 'Seragam', rowGroup: 'ya' },
  { id: 'k_yo', char: 'ヨ', romaji: 'yo', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Huruf E terbalik seperti rak YO-ga', exampleWord: 'ヨーグルト (Yooguruto)', exampleWordRomaji: 'Yooguruto', exampleWordMeaning: 'Yogurt', rowGroup: 'ya' },

  // RA row
  { id: 'k_ra', char: 'ラ', romaji: 'ra', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Lampu RAdar navigasi', exampleWord: 'ラーメン (Raamen)', exampleWordRomaji: 'Raamen', exampleWordMeaning: 'Ramen', rowGroup: 'ra' },
  { id: 'k_ri', char: 'リ', romaji: 'ri', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Dua pita lurus RI-bbon', exampleWord: 'リモコン (Rimokon)', exampleWordRomaji: 'Rimokon', exampleWordMeaning: 'Remote control', rowGroup: 'ra' },
  { id: 'k_ru', char: 'ル', romaji: 'ru', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Akar pohon RO-ot menjuntai', exampleWord: 'ルール (Ruuru)', exampleWordRomaji: 'Ruuru', exampleWordMeaning: 'Aturan', rowGroup: 'ra' },
  { id: 'k_re', char: 'レ', romaji: 're', script: 'katakana', type: 'gojuon', strokeCount: 1, mnemonic: 'Tanda centang RE-spons benar', exampleWord: 'レストラン (Resutoran)', exampleWordRomaji: 'Resutoran', exampleWordMeaning: 'Restoran', rowGroup: 'ra' },
  { id: 'k_ro', char: 'ロ', romaji: 'ro', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Kotak bujur sangkar RO-bot', exampleWord: 'ロボット (Robotto)', exampleWordRomaji: 'Robotto', exampleWordMeaning: 'Robot', rowGroup: 'ra' },

  // WA / N row
  { id: 'k_wa', char: 'ワ', romaji: 'wa', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Gelas anggur WA-in terbalik', exampleWord: 'ワイン (Wain)', exampleWordRomaji: 'Wain', exampleWordMeaning: 'Anggur / Wine', rowGroup: 'wa' },
  { id: 'k_wo', char: 'ヲ', romaji: 'wo/o', script: 'katakana', type: 'gojuon', strokeCount: 3, mnemonic: 'Mirip フ dengan garis mendatar atas', exampleWord: 'ヲタク (Wotaku)', exampleWordRomaji: 'Otaku', exampleWordMeaning: 'Penggemar antusias', rowGroup: 'wa' },
  { id: 'k_n', char: 'ン', romaji: 'n', script: 'katakana', type: 'gojuon', strokeCount: 2, mnemonic: 'Garis miring naik dari kiri bawah', exampleWord: 'パン (Pan)', exampleWordRomaji: 'Pan', exampleWordMeaning: 'Roti', rowGroup: 'wa' },

  // Dakuon Katakana
  { id: 'k_ga', char: 'ガ', romaji: 'ga', script: 'katakana', type: 'dakuon', strokeCount: 4, mnemonic: 'カ + ゛', exampleWord: 'ガス (Gasu)', exampleWordRomaji: 'Gasu', exampleWordMeaning: 'Gas', rowGroup: 'ka' },
  { id: 'k_gi', char: 'ギ', romaji: 'gi', script: 'katakana', type: 'dakuon', strokeCount: 5, mnemonic: 'キ + ゛', exampleWord: 'ギター (Gitaa)', exampleWordRomaji: 'Gitaa', exampleWordMeaning: 'Gitar', rowGroup: 'ka' },
  { id: 'k_gu', char: 'グ', romaji: 'gu', script: 'katakana', type: 'dakuon', strokeCount: 4, mnemonic: 'ク + ゛', exampleWord: 'グラス (Gurasu)', exampleWordRomaji: 'Gurasu', exampleWordMeaning: 'Gelas kaca', rowGroup: 'ka' },
  { id: 'k_ge', char: 'ゲ', romaji: 'ge', script: 'katakana', type: 'dakuon', strokeCount: 5, mnemonic: 'ケ + ゛', exampleWord: 'ゲーム (Geemu)', exampleWordRomaji: 'Geemu', exampleWordMeaning: 'Game', rowGroup: 'ka' },
  { id: 'k_go', char: 'ゴ', romaji: 'go', script: 'katakana', type: 'dakuon', strokeCount: 4, mnemonic: 'コ + ゛', exampleWord: 'ゴルフ (Gorufu)', exampleWordRomaji: 'Gorufu', exampleWordMeaning: 'Golf', rowGroup: 'ka' },

  { id: 'k_za', char: 'ザ', romaji: 'za', script: 'katakana', type: 'dakuon', strokeCount: 5, mnemonic: 'サ + ゛', exampleWord: 'デザイン (Dezain)', exampleWordRomaji: 'Dezain', exampleWordMeaning: 'Desain', rowGroup: 'sa' },
  { id: 'k_ji', char: 'ジ', romaji: 'ji', script: 'katakana', type: 'dakuon', strokeCount: 5, mnemonic: 'シ + ゛', exampleWord: 'ジュース (Juusu)', exampleWordRomaji: 'Juusu', exampleWordMeaning: 'Jus', rowGroup: 'sa' },
  { id: 'k_ba', char: 'バ', romaji: 'ba', script: 'katakana', type: 'dakuon', strokeCount: 4, mnemonic: 'ハ + ゛', exampleWord: 'バス (Basu)', exampleWordRomaji: 'Basu', exampleWordMeaning: 'Bus', rowGroup: 'ha' },
  { id: 'k_pa', char: 'パ', romaji: 'pa', script: 'katakana', type: 'dakuon', strokeCount: 3, mnemonic: 'ハ + ゜', exampleWord: 'パスポート (Pasupooto)', exampleWordRomaji: 'Pasupooto', exampleWordMeaning: 'Paspor', rowGroup: 'ha' },
  { id: 'k_pi', char: 'ピ', romaji: 'pi', script: 'katakana', type: 'dakuon', strokeCount: 3, mnemonic: 'ヒ + ゜', exampleWord: 'ピアノ (Piano)', exampleWordRomaji: 'Piano', exampleWordMeaning: 'Piano', rowGroup: 'ha' },
];
