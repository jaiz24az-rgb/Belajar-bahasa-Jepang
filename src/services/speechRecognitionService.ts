/**
 * Speech Recognition Service for Japanese Pronunciation Practice
 * Cross-browser compatibility with Web Speech API
 */

export interface SpeechRecognitionResultState {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition;

      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.lang = 'ja-JP';
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    onResult: (result: SpeechRecognitionResultState) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported in this browser.'));
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let confidence = 0.8;
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          isFinal = true;
          confidence = event.results[i][0].confidence || 0.85;
        }
      }

      onResult({
        transcript,
        confidence,
        isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event.error || 'Speech recognition error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      this.isListening = false;
      onError(e);
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
      this.isListening = false;
    }
  }

  /**
   * Offline scoring algorithm using Levenshtein distance and character normalization
   */
  public calculateOfflineSimilarity(target: string, spoken: string): number {
    const cleanTarget = this.cleanJapaneseText(target);
    const cleanSpoken = this.cleanJapaneseText(spoken);

    if (!cleanSpoken || !cleanTarget) return 0;
    if (cleanTarget === cleanSpoken) return 100;

    const distance = this.levenshteinDistance(cleanTarget, cleanSpoken);
    const maxLength = Math.max(cleanTarget.length, cleanSpoken.length);
    const similarity = Math.max(0, 1 - distance / maxLength);

    return Math.round(similarity * 100);
  }

  private cleanJapaneseText(text: string): string {
    return text
      .replace(/[、。！？\s\.,!?]/g, '')
      .toLowerCase();
  }

  private levenshteinDistance(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () =>
      Array(n + 1).fill(0)
    );

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
    return dp[m][n];
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
