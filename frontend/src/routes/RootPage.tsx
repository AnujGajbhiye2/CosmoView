import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { MissionControlFallback } from '@/features/mission-control/components/MissionControlFallback';
import { MissionControlError } from '@/features/mission-control/components/MissionControlError';
import { MissionControlOverview } from '@/features/mission-control/components/MissionControlOverview';

export const RootPage = (): ReactElement => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} renderFallback={(retry) => <MissionControlError onRetry={retry} />}>
          <Suspense fallback={<MissionControlFallback />}>
            <MissionControlOverview />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
