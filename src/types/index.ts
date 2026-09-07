export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type KanaType = 'gojuon' | 'dakuon' | 'yoon';
export type ScriptType = 'hiragana' | 'katakana';

export interface KanaItem {
  id: string;
  char: string;
  romaji: string;
  script: ScriptType;
  type: KanaType;
  strokeCount: number;
  mnemonic: string;
  exampleWord: string;
  exampleWordRomaji: string;
  exampleWordMeaning: string;
  rowGroup: string; // 'a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'
}

export interface KanjiExample {
  japanese: string;
  furigana: string;
  romaji: string;
  meaningId: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaningId: string;
  meaningEn: string;
  strokes: number;
  jlpt: JLPTLevel;
  radical: string;
  examples: KanjiExample[];
}

export interface DialogueLine {
  id: string;
  speaker: string;
  speakerRole: 'native' | 'learner';
  japanese: string;
  furigana: string;
  romaji: string;
  meaningId: string;
  tip?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  level: JLPTLevel;
  category: 'daily' | 'travel' | 'food' | 'business' | 'shopping' | 'emergency';
  dialogue: DialogueLine[];
  cultureTip?: string;
}

export interface JLPTQuestion {
  id: string;
  section: 'mojigoi' | 'dokkai' | 'choukai';
  subType?: 'reading' | 'orthography' | 'context' | 'paraphrase' | 'grammar' | 'reading_comp' | 'listening';
  prompt: string;
  passage?: string;
  audioText?: string;
  furiganaPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface JLPTExam {
  id: string;
  level: JLPTLevel;
  title: string;
  durationMinutes: number;
  passingScore: number;
  totalScore: number;
  sections: {
    mojigoi: JLPTQuestion[];
    dokkai: JLPTQuestion[];
    choukai: JLPTQuestion[];
  };
}

export interface JLPTExamResult {
  id: string;
  examId: string;
  level: JLPTLevel;
  date: string;
  totalScore: number;
  maxScore: number;
  passed: boolean;
  sectionScores: {
    mojigoi: number;
    dokkai: number;
    choukai: number;
  };
  answers: { [questionId: string]: number };
}

export interface Badge {
  id: string;
  name: string;
  titleJa: string;
  description: string;
  icon: string;
  category: 'streak' | 'kana' | 'kanji' | 'speaking' | 'jlpt' | 'general';
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export interface WeeklyMonthlyGoals {
  weeklyGoalMinutes: number;
  weeklyGoalKanji: number;
  weeklyGoalSpeechSessions: number;
  weeklyGoalJLPTSections: number;
  monthlyGoalMinutes: number;
  monthlyGoalJLPTLevel: JLPTLevel;
  monthlyGoalScenarios: number;
  weekStartDate: string; // YYYY-MM-DD
  monthStartDate: string; // YYYY-MM
  weeklySpentMinutes: number;
  monthlySpentMinutes: number;
}

export interface ModuleMetric {
  id: 'hiragana' | 'katakana' | 'kanji' | 'grammar' | 'vocab' | 'listening' | 'speaking' | 'jlpt';
  name: string;
  nameJa: string;
  category: string;
  progressPercent: number;
  currentCount: number;
  targetCount: number;
  unit: string;
  accuracy: number; // 0-100%
  status: 'Mastered' | 'On Track' | 'Needs Practice' | 'Not Started';
  color: string;
  routeTab: string;
  highlights: string[];
}

export interface DiagnosticItem {
  id: string;
  type: 'strength' | 'weakness' | 'opportunity';
  title: string;
  titleJa?: string;
  description: string;
  module: string;
  impact: 'high' | 'medium' | 'low';
  actionableStep?: string;
  actionTab?: string;
  scoreOrAccuracy?: string;
}

export interface PersonalizedFeedbackReport {
  generatedAt: string;
  overallScore: number; // 0-100
  overallProficiencyTitle: string; // e.g. "Pemula Mahir (初級上)"
  senseiComment: string;
  strengths: DiagnosticItem[];
  weaknesses: DiagnosticItem[];
  recommendedSchedule: Array<{
    day: string;
    focus: string;
    duration: string;
    actionTab: string;
  }>;
  japaneseMotto: {
    japanese: string;
    romaji: string;
    indonesian: string;
  };
  isAIGenerated?: boolean;
}

export interface CertificateData {
  id: string;
  title: string;
  titleJa: string;
  recipientName: string;
  level: string;
  issueDate: string;
  achievementDescription: string;
  scoreText: string;
  badgeIcon: string;
}

export interface UserProgress {
  userName: string;
  avatarSeed: string;
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string; // YYYY-MM-DD
  studiedDates: string[]; // List of YYYY-MM-DD
  dailyGoalMinutes: number;
  todayMinutesSpent: number;
  reminderEnabled: boolean;
  reminderTime: string; // "08:00", "20:00"
  offlineModeNoticeDismissed: boolean;
  currentJLPTTarget: JLPTLevel;
  masteredKana: string[]; // Kana IDs
  masteredKanji: string[]; // Kanji IDs
  completedScenarios: string[]; // Scenario IDs
  masteredGrammar?: string[]; // Grammar rule IDs
  masteredVocab?: string[]; // Vocab word IDs
  listeningMinutesSpent?: number;
  speechPractices: {
    [phraseId: string]: {
      bestScore: number;
      attempts: number;
      lastDate: string;
    };
  };
  jlptHistory: JLPTExamResult[];
  unlockedBadgeIds: string[];
  goals?: WeeklyMonthlyGoals;
  aiDiagnostics?: PersonalizedFeedbackReport;
  celebratedMilestones?: string[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  rank: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface SpeechFeedbackResult {
  score: number;
  accuracyLevel: string;
  phoneticFeedback: string;
  improvementTips: string[];
  syllableBreakdown: Array<{
    syllable: string;
    status: 'correct' | 'minor_flaw' | 'incorrect';
    note?: string;
  }>;
  encouragement: string;
  isFallback?: boolean;
}

// ======================== DICTIONARY TYPES ========================

export type DictTab = 'vocab' | 'kanji' | 'synonyms' | 'idioms' | 'slang' | 'favorites';

export interface SynAntWordItem {
  kanji: string;
  furigana: string;
  romaji: string;
  meaningId: string;
  jlpt?: JLPTLevel;
  nuanceExplanationId?: string;
  exampleSentence?: {
    japanese: string;
    furigana: string;
    romaji: string;
    meaningId: string;
  };
}

export interface DictionarySynAntEntry {
  id: string;
  baseWord: {
    kanji: string;
    furigana: string;
    romaji: string;
    meaningId: string;
    partOfSpeech: string;
    posCategory: 'i-adj' | 'na-adj' | 'verb' | 'noun' | 'adverb';
    jlpt: JLPTLevel;
  };
  type: 'synonym_only' | 'antonym_only' | 'both';
  category: 'personality_emotion' | 'size_quantity' | 'time_speed' | 'nature_state' | 'action_movement' | 'abstract_logic' | 'work_business';
  categoryLabel: string;
  synonyms: SynAntWordItem[];
  antonyms: SynAntWordItem[];
  nuanceComparisonId?: string;
  jlptExamTip?: string;
}

export interface DictionaryVocabEntry {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  meaningId: string;
  meaningEn: string;
  partOfSpeech: string;
  posCategory: 'verb' | 'noun' | 'i-adj' | 'na-adj' | 'adverb' | 'particle' | 'onomatopoeia' | 'expression';
  jlpt: JLPTLevel;
  category: 'daily' | 'business' | 'travel' | 'food' | 'it_tech' | 'medical' | 'emotion' | 'nature' | 'education' | 'shopping';
  categoryLabel: string;
  synonyms?: string[];
  antonyms?: string[];
  pitchAccent?: string;
  examples: Array<{
    japanese: string;
    furigana: string;
    romaji: string;
    meaningId: string;
  }>;
  relatedKanji?: string[];
  notes?: string;
}

export interface DictionaryIdiomEntry {
  id: string;
  type: 'kanyouku' | 'yojijukugo' | 'kotowaza';
  typeLabel: string;
  phrase: string;
  furigana: string;
  romaji: string;
  literalMeaningId: string;
  idiomaticMeaningId: string;
  meaningEn: string;
  bodyPartOrCategory?: 'eye' | 'mouth' | 'nose' | 'ear' | 'hand' | 'foot' | 'heart' | 'face' | 'mind' | 'philosophy' | 'nature' | 'life';
  bodyPartLabel?: string;
  indonesianEquivalent?: string;
  originStory?: string;
  examples: Array<{
    japanese: string;
    furigana: string;
    romaji: string;
    meaningId: string;
  }>;
  jlptLevel?: JLPTLevel;
}

export interface DictionarySlangEntry {
  id: string;
  term: string;
  furigana: string;
  romaji: string;
  meaningId: string;
  meaningDetail: string;
  category: 'internet_sns' | 'wakamono_youth' | 'otaku_anime' | 'buzzword_ryuukou' | 'abbreviation';
  categoryLabel: string;
  eraOrYear: string;
  formalityLevel: 'Sangat Santai (Casual)' | 'Khusus Internet / Chat' | 'Bahasa Gaul Remaja' | 'Hati-hati (Jangan ke Atasan)';
  originExplanation: string;
  sampleDialogue: {
    context: string;
    lineA: { speaker: string; text: string; furigana: string; romaji: string; translationId: string };
    lineB: { speaker: string; text: string; furigana: string; romaji: string; translationId: string };
  };
  tags: string[];
}

export interface DictFavoritesState {
  vocab: string[];
  kanji: string[];
  synAnt: string[];
  idioms: string[];
  slang: string[];
  reels?: string[];
}

export interface VideoCardItem {
  id: string;
  kanji: string;
  furigana?: string;
  romaji: string;
  meaningId: string;
  meaningEn?: string;
  gestureNote?: string;
  grammarTip?: string;
  audioText?: string;
  durationMs?: number;
  subtitles?: string;
  handGestureSvg?: string;
}

export interface VideoShortReel {
  id: string;
  title: string;
  titleJa: string;
  channelName: string;
  channelAvatar?: string;
  level: JLPTLevel;
  category: 'numbers_gestures' | 'daily_greetings' | 'ordering_food' | 'shopping' | 'travel_directions' | 'natural_reactions' | 'dating_friends' | 'business_manners';
  categoryLabel: string;
  tags: string[];
  tutorName: string;
  tutorRole: string;
  tutorBio?: string;
  bgTheme: 'sakura' | 'tatami' | 'tokyo_cafe' | 'shibuya_night' | 'kyoto_garden' | 'izakaya';
  videoLoopUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  cultureNote: string;
  interactiveChallenge?: {
    promptJa: string;
    promptRomaji: string;
    promptMeaning: string;
    expectedReplyJa: string;
    expectedReplyRomaji: string;
    expectedReplyMeaning: string;
  };
  items: VideoCardItem[];
}

