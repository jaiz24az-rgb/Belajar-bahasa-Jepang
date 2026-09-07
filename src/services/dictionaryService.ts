import { DictFavoritesState } from '../types';

const DICT_FAVORITES_KEY = 'nihongomaster_dict_favorites_v1';
const DICT_HISTORY_KEY = 'nihongomaster_dict_history_v1';

export class DictionaryService {
  public static getFavorites(): DictFavoritesState {
    if (typeof window === 'undefined') {
      return { vocab: [], kanji: [], synAnt: [], idioms: [], slang: [] };
    }
    try {
      const data = localStorage.getItem(DICT_FAVORITES_KEY);
      if (!data) return { vocab: [], kanji: [], synAnt: [], idioms: [], slang: [] };
      const parsed = JSON.parse(data);
      return {
        vocab: parsed.vocab || [],
        kanji: parsed.kanji || [],
        synAnt: parsed.synAnt || [],
        idioms: parsed.idioms || [],
        slang: parsed.slang || []
      };
    } catch {
      return { vocab: [], kanji: [], synAnt: [], idioms: [], slang: [] };
    }
  }

  public static toggleFavorite(category: 'vocab' | 'kanji' | 'synAnt' | 'idioms' | 'slang', id: string): DictFavoritesState {
    const current = this.getFavorites();
    const list = current[category] || [];
    const index = list.indexOf(id);
    if (index >= 0) {
      current[category] = list.filter(item => item !== id);
    } else {
      current[category] = [...list, id];
    }
    try {
      localStorage.setItem(DICT_FAVORITES_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to save dict favorites', e);
    }
    return current;
  }

  public static isFavorite(category: 'vocab' | 'kanji' | 'synAnt' | 'idioms' | 'slang', id: string): boolean {
    const current = this.getFavorites();
    return (current[category] || []).includes(id);
  }

  public static getSearchHistory(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(DICT_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static addSearchHistory(query: string): void {
    if (!query || query.trim().length === 0) return;
    const trimmed = query.trim();
    let list = this.getSearchHistory().filter(q => q.toLowerCase() !== trimmed.toLowerCase());
    list.unshift(trimmed);
    if (list.length > 10) list = list.slice(0, 10);
    try {
      localStorage.setItem(DICT_HISTORY_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save search history', e);
    }
  }

  public static clearSearchHistory(): void {
    try {
      localStorage.removeItem(DICT_HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear search history', e);
    }
  }
}
