import type { ReactElement } from 'react';
import { Suspense, useState } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { DateNavigation } from '@/components/controls/DateNavigation';
import { AsteroidAnalytics } from '@/features/asteroids/components/AsteroidAnalytics';
import { clampAsteroidRange, getAsteroidDefaultRange } from '@/features/asteroids/helpers/dateRange';

const defaults = getAsteroidDefaultRange();

export const AsteroidsPage = (): ReactElement => {
  const [startDate, setStartDate] = useState<string>(defaults.startDate);
  const [endDate, setEndDate] = useState<string>(defaults.endDate);

  const handleStartDateChange = (date: string): void => {
    const nextRange = clampAsteroidRange(date, endDate);
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
  };

  const handleEndDateChange = (date: string): void => {
    const nextRange = clampAsteroidRange(startDate, date);
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Asteroid Analytics</p>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Inspect velocity, scale, and risk across the current near-Earth object watch window.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          The backend constrains the date range to NASA's seven-day feed limit. This view turns that feed into a readable
          analytics surface with summary metrics, comparative bars, and an inspection table.
        </p>
      </section>

      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Date range</p>
        <div className="flex flex-wrap items-stretch gap-4">
          <div className="flex-1 min-w-[12rem]">
            <DateNavigation
              label="Start date"
              value={startDate}
              max={endDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="flex items-center self-center shrink-0">
            <span className="text-sm text-[var(--color-text-faint)]">to</span>
          </div>
          <div className="flex-1 min-w-[12rem]">
            <DateNavigation
              label="End date"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-[var(--color-text-faint)]">
          Range is clamped to NASA's 7-day feed limit.
        </p>
      </section>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            renderFallback={(retry) => (
              <section className="rounded-[1rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-alert)]">Asteroid feed unavailable</p>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                  The selected asteroid window could not be loaded. Try a tighter date range or verify that the backend is responding.
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
            <Suspense fallback={<PanelSkeleton className="min-h-[42rem]" />}>
              <AsteroidAnalytics key={`${startDate}:${endDate}`} startDate={startDate} endDate={endDate} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
};
