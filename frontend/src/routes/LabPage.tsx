import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { ErrorIcon, RetryIcon } from '@/components/ui/icons';
import { LabPageContent } from '@/features/lab/components/LabPageContent';

export const LabPage = (): ReactElement => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          renderFallback={(retry) => (
            <section className="rounded-[1rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-alert)]">
                <ErrorIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                <p>Lab unavailable</p>
              </div>
              <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                The backend endpoint catalog could not be loaded. Confirm the backend is running, then refresh the Lab route.
              </p>
              <button
                type="button"
                onClick={retry}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-5 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
              >
                <RetryIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                Retry
              </button>
            </section>
          )}
        >
          <Suspense fallback={<PanelSkeleton className="min-h-[46rem]" />}>
            <LabPageContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
