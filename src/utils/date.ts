export const getDayIndex = (date: Date): number => {
  return date.getDay();
};

export const calculateClaimedDays = (currentDayIndex, currentStreakCount, activationStatus) => {
  const { isLostStreak, hasCheckedToday } = activationStatus;

  let claimedDays = Array(7).fill(false);

  if (isLostStreak) {
    return claimedDays; // Return all false if the streak is lost
  }

  for (let i = 0; i < currentStreakCount; i++) {
    let dayIndex = (currentDayIndex - i + 7) % 7; // Adjust for negative indices
    claimedDays[dayIndex] = true;
  }

  if (hasCheckedToday) {
    claimedDays[currentDayIndex] = true;
  }

  return claimedDays;
};