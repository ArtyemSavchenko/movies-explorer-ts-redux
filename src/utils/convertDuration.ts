export const convertDuration = (durationNumber: number): string => {
  const lastTwoDigits = durationNumber % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${durationNumber} минут`;
  } else {
    const lastDigit = durationNumber % 10;

    if (lastDigit === 1) {
      return `${durationNumber} минута`;
    }
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return `${durationNumber} минуты`;
    }
    return `${durationNumber} минут`;
  }
};
