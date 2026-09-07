import { LeaderboardUser } from '../types';

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user_1',
    name: 'Kenji Takahashi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    level: 18,
    xp: 4820,
    streak: 42,
    rank: 1,
    badge: '👑 Master N1'
  },
  {
    id: 'user_2',
    name: 'Siti Nurhaliza',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    level: 15,
    xp: 3950,
    streak: 28,
    rank: 2,
    badge: '🔥 28 Days Streak'
  },
  {
    id: 'user_3',
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    level: 13,
    xp: 3410,
    streak: 19,
    rank: 3,
    badge: '⭐ JLPT N3'
  },
  {
    id: 'current_user',
    name: 'Anda (Learner)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    level: 4,
    xp: 1250,
    streak: 5,
    rank: 4,
    badge: '🌸 Semangat Belajar',
    isCurrentUser: true
  },
  {
    id: 'user_4',
    name: 'Aoi Sakura',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    level: 9,
    xp: 1180,
    streak: 12,
    rank: 5,
    badge: '🎯 Kanji Explorer'
  },
  {
    id: 'user_5',
    name: 'David Wijaya',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    level: 6,
    xp: 940,
    streak: 7,
    rank: 6,
    badge: '🚀 Voice Master'
  }
];
