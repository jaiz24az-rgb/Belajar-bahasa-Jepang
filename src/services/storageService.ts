import { UserProgress, JLPTLevel, JLPTExamResult, WeeklyMonthlyGoals } from '../types';
import { audioService } from './audioService';

const STORAGE_KEY = 'nihongomaster_user_progress_v1';

export const DEFAULT_GOALS: WeeklyMonthlyGoals = {
  weeklyGoalMinutes: 120,
  weeklyGoalKanji: 15,
  weeklyGoalSpeechSessions: 5,
  weeklyGoalJLPTSections: 3,
  monthlyGoalMinutes: 500,
  monthlyGoalJLPTLevel: 'N5',
  monthlyGoalScenarios: 6,
  weekStartDate: new Date().toISOString().split('T')[0],
  monthStartDate: new Date().toISOString().slice(0, 7),
  weeklySpentMinutes: 45,
  monthlySpentMinutes: 180,
};

export const DEFAULT_PROGRESS: UserProgress = {
  userName: 'Pembelajar Jepang',
  avatarSeed: 'learner_1',
  xp: 680,
  level: 3,
  streak: 5,
  lastStudyDate: new Date().toISOString().split('T')[0],
  studiedDates: [
    new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
  ],
  dailyGoalMinutes: 20,
  todayMinutesSpent: 12,
  reminderEnabled: true,
  reminderTime: '20:00',
  offlineModeNoticeDismissed: false,
  currentJLPTTarget: 'N5',
  masteredKana: ['h_a', 'h_i', 'h_u', 'h_e', 'h_o', 'k_a', 'k_i', 'k_u', 'k_e', 'k_o', 's_a', 's_i', 's_u', 's_e', 's_o'],
  masteredKanji: ['kanji_n5_1', 'kanji_n5_2', 'kanji_n5_3', 'kanji_n5_4', 'kanji_n5_5'],
  completedScenarios: ['conv_jikoshoukai', 'conv_ramen'],
  masteredGrammar: ['gram_desu_masu', 'gram_particles_wa_ga', 'gram_te_form', 'gram_kudasai'],
  masteredVocab: ['voc_ohayou', 'voc_arigatou', 'voc_tabemasu', 'voc_nomimasu', 'voc_ikimasu', 'voc_mizu'],
  listeningMinutesSpent: 28,
  speechPractices: {
    'phrase_konnichiwa': { bestScore: 95, attempts: 4, lastDate: new Date().toISOString() },
    'phrase_arigatou': { bestScore: 88, attempts: 2, lastDate: new Date().toISOString() },
    'phrase_sumimasen': { bestScore: 92, attempts: 3, lastDate: new Date().toISOString() }
  },
  jlptHistory: [
    {
      id: 'jlpt_init_1',
      examId: 'jlpt_n5_official',
      level: 'N5',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      totalScore: 138,
      maxScore: 180,
      passed: true,
      sectionScores: { mojigoi: 48, dokkai: 44, choukai: 46 },
      answers: {}
    }
  ],
  unlockedBadgeIds: ['badge_first_step', 'badge_streak_3', 'badge_kanji_n5', 'badge_voice_pro', 'badge_jlpt_fighter', 'badge_jlpt_passer', 'badge_offline_warrior'],
  goals: DEFAULT_GOALS,
  celebratedMilestones: [],
};

export class StorageService {
  public static getProgress(): UserProgress {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveProgress(DEFAULT_PROGRESS);
        return DEFAULT_PROGRESS;
      }
      const parsed: UserProgress = JSON.parse(data);
      // Validate daily streak on load
      return this.checkAndUpdateStreak(parsed);
    } catch {
      return DEFAULT_PROGRESS;
    }
  }

  public static saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to LocalStorage', e);
    }
  }

  public static addXP(amount: number, reason?: string): UserProgress {
    const progress = this.getProgress();
    const prevLevel = progress.level;
    progress.xp += amount;

    // Calculate level: Level = Math.floor(XP / 250) + 1
    const newLevel = Math.floor(progress.xp / 250) + 1;
    if (newLevel > prevLevel) {
      progress.level = newLevel;
      audioService.playSound('levelup');
    }

    this.recordStudyActivity(progress);
    this.saveProgress(progress);
    return progress;
  }

  public static markKanaMastered(kanaId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.masteredKana.includes(kanaId)) {
      progress.masteredKana.push(kanaId);
      progress.xp += 20;
      if (progress.masteredKana.length >= 20 && !progress.unlockedBadgeIds.includes('badge_kana_novice')) {
        progress.unlockedBadgeIds.push('badge_kana_novice');
      }
      this.saveProgress(progress);
    }
    return progress;
  }

  public static markKanjiMastered(kanjiId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.masteredKanji.includes(kanjiId)) {
      progress.masteredKanji.push(kanjiId);
      progress.xp += 30;
      if (progress.masteredKanji.length >= 5 && !progress.unlockedBadgeIds.includes('badge_kanji_n5')) {
        progress.unlockedBadgeIds.push('badge_kanji_n5');
      }
      this.saveProgress(progress);
    }
    return progress;
  }

  public static recordSpeechPractice(phraseId: string, score: number): UserProgress {
    const progress = this.getProgress();
    const existing = progress.speechPractices[phraseId] || {
      bestScore: 0,
      attempts: 0,
      lastDate: new Date().toISOString(),
    };

    existing.attempts += 1;
    existing.bestScore = Math.max(existing.bestScore, score);
    existing.lastDate = new Date().toISOString();
    progress.speechPractices[phraseId] = existing;

    progress.xp += Math.round(score / 5);
    if (score >= 90 && !progress.unlockedBadgeIds.includes('badge_voice_pro')) {
      progress.unlockedBadgeIds.push('badge_voice_pro');
    }

    this.recordStudyActivity(progress);
    this.saveProgress(progress);
    return progress;
  }

  public static recordJLPTResult(result: JLPTExamResult): UserProgress {
    const progress = this.getProgress();
    progress.jlptHistory.unshift(result);
    progress.xp += result.passed ? 200 : 80;

    if (!progress.unlockedBadgeIds.includes('badge_jlpt_fighter')) {
      progress.unlockedBadgeIds.push('badge_jlpt_fighter');
    }

    this.recordStudyActivity(progress);
    this.saveProgress(progress);
    return progress;
  }

  private static recordStudyActivity(progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0];
    if (!progress.studiedDates.includes(today)) {
      progress.studiedDates.push(today);
    }
    progress.todayMinutesSpent += 1;
    this.checkAndUpdateStreak(progress);
  }

  private static checkAndUpdateStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date(Date.now() - 86400000);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    if (progress.lastStudyDate === today) {
      // Already studied today
      return progress;
    }

    if (progress.lastStudyDate === yesterday) {
      // Studied yesterday, continue streak
      progress.lastStudyDate = today;
      progress.streak += 1;
      audioService.playSound('streak');
    } else {
      // Missed more than a day, reset streak to 1 if studied today
      const daysDiff = Math.round(
        (new Date(today).getTime() - new Date(progress.lastStudyDate || today).getTime()) / 86400000
      );
      if (daysDiff > 1) {
        progress.streak = 1;
      }
      progress.lastStudyDate = today;
    }

    if (progress.streak >= 7 && !progress.unlockedBadgeIds.includes('badge_streak_7')) {
      progress.unlockedBadgeIds.push('badge_streak_7');
    }

    this.saveProgress(progress);
    return progress;
  }

  public static updateGoals(goals: WeeklyMonthlyGoals): UserProgress {
    const progress = this.getProgress();
    progress.goals = goals;
    this.saveProgress(progress);
    return progress;
  }

  public static saveAIDiagnostics(diagnostics: any): UserProgress {
    const progress = this.getProgress();
    progress.aiDiagnostics = diagnostics;
    this.saveProgress(progress);
    return progress;
  }

  public static recordListeningSession(minutes: number): UserProgress {
    const progress = this.getProgress();
    progress.listeningMinutesSpent = (progress.listeningMinutesSpent || 0) + minutes;
    progress.xp += minutes * 5;
    if (progress.listeningMinutesSpent >= 30 && !progress.unlockedBadgeIds.includes('badge_listening_ace')) {
      progress.unlockedBadgeIds.push('badge_listening_ace');
    }
    this.recordStudyActivity(progress);
    this.saveProgress(progress);
    return progress;
  }

  public static celebrateMilestone(milestoneId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.celebratedMilestones) progress.celebratedMilestones = [];
    if (!progress.celebratedMilestones.includes(milestoneId)) {
      progress.celebratedMilestones.push(milestoneId);
      this.saveProgress(progress);
    }
    return progress;
  }

  public static markBadgeUnlocked(badgeId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.unlockedBadgeIds.includes(badgeId)) {
      progress.unlockedBadgeIds.push(badgeId);
      progress.xp += 100;
      this.saveProgress(progress);
    }
    return progress;
  }

  public static exportDataJSON(): string {
    const progress = this.getProgress();
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      progress,
    }, null, 2);
  }

  public static importDataJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.progress) {
        this.saveProgress(parsed.progress);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public static resetProgress(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
