import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { MissionControlFallback } from '@/features/mission-control/components/MissionControlFallback';
import { MissionControlError } from '@/features/mission-control/components/MissionControlError';
import { MissionControlOverview } from '@/features/mission-control/components/MissionControlOverview';

export const RootPage = (): ReactElement => {
  return (
    <ErrorBoundary renderFallback={(retry) => <MissionControlError onRetry={retry} />}>
      <Suspense fallback={<MissionControlFallback />}>
        <MissionControlOverview />
      </Suspense>
    </ErrorBoundary>
  );
};
