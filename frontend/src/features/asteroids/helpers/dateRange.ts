import { shiftIsoDate, toIsoDate } from '@/features/apod/helpers/date';

export const getAsteroidDefaultRange = (): { endDate: string; startDate: string } => {
  const today = toIsoDate(new Date());

  return {
    endDate: today,
    startDate: shiftIsoDate(today, -2)
  };
};

export const clampAsteroidRange = (startDate: string, endDate: string): { endDate: string; startDate: string } => {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return getAsteroidDefaultRange();
  }

  const diffDays = Math.floor((end.getTime() - start.getTime()) / 86_400_000);

  if (diffDays > 6) {
    return {
      startDate,
      endDate: shiftIsoDate(startDate, 6)
    };
  }

  return {
    startDate,
    endDate
  };
};
