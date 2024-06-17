export type StreakData = {
  currentStreakCount: string;
  lastActivated: string;
  longestStreakCount: string;
  lostStreakCount: string;
};

export type ActivationStatus = {
  hasCheckedToday: boolean;
  isLostStreak: boolean;
};