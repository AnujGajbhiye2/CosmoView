import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { LabPageContent } from '@/features/lab/components/LabPageContent';

export const LabPage = (): ReactElement => {
  return (
    <ErrorBoundary
      renderFallback={(retry) => (
        <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-alert)]">Lab unavailable</p>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
            The backend endpoint catalog could not be loaded. Confirm the backend is running, then refresh the Lab route.
          </p>
          <button
            type="button"
            onClick={retry}
            className="mt-5 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-5 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
          >
            Retry
          </button>
        </section>
      )}
    >
      <Suspense fallback={<PanelSkeleton className="min-h-[46rem]" />}>
        <LabPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};
