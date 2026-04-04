import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { LabPageContent } from '@/features/lab/components/LabPageContent';

export const LabPage = (): ReactElement => {
  return (
    <ErrorBoundary
      fallback={
        <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-alert)]">Lab unavailable</p>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
            The backend endpoint catalog could not be loaded. Confirm the backend is running, then refresh the Lab route.
          </p>
        </section>
      }
    >
      <Suspense fallback={<PanelSkeleton className="min-h-[46rem]" />}>
        <LabPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};
