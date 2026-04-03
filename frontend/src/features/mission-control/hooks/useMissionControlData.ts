import { useSuspenseQueries } from '@tanstack/react-query';
import { apodApi } from '@/features/apod/api/apodApi';
import { asteroidsApi } from '@/features/asteroids/api/asteroidsApi';
import { epicApi } from '@/features/earth/api/epicApi';
import { libraryApi } from '@/features/library/api/libraryApi';
import { addDays, toIsoDate } from '../helpers/date';

export const useMissionControlData = () => {
  const now = new Date();
  const asteroidStartDate = toIsoDate(now);
  const asteroidEndDate = toIsoDate(addDays(now, 2));
  const epicDate = toIsoDate(addDays(now, -3));

  const [apodQuery, asteroidQuery, epicQuery, libraryQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['apod', 'mission-control'],
        queryFn: () => apodApi.getApod()
      },
      {
        queryKey: ['asteroids', asteroidStartDate, asteroidEndDate, 'mission-control'],
        queryFn: () => asteroidsApi.getFeed(asteroidStartDate, asteroidEndDate)
      },
      {
        queryKey: ['epic', epicDate, 'mission-control'],
        queryFn: () => epicApi.getNaturalImages(epicDate)
      },
      {
        queryKey: ['library', 'nebula', 1, 'mission-control'],
        queryFn: () => libraryApi.searchImages('nebula', 1)
      }
    ]
  });

  return {
    apod: apodQuery.data,
    asteroidFeed: asteroidQuery.data,
    epicImages: epicQuery.data,
    libraryResults: libraryQuery.data,
    asteroidRange: {
      startDate: asteroidStartDate,
      endDate: asteroidEndDate
    },
    epicDate
  };
};
