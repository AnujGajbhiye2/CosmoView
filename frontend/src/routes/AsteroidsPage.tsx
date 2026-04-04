import type { ChangeEvent, ReactElement } from 'react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { AsteroidAnalytics } from '@/features/asteroids/components/AsteroidAnalytics';
import { clampAsteroidRange, getAsteroidDefaultRange } from '@/features/asteroids/helpers/dateRange';
import { shiftIsoDate } from '@/features/apod/helpers/date';

const defaults = getAsteroidDefaultRange();

export const AsteroidsPage = (): ReactElement => {
  const [startDate, setStartDate] = useState<string>(defaults.startDate);
  const [endDate, setEndDate] = useState<string>(defaults.endDate);

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextRange = clampAsteroidRange(event.target.value, endDate);
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextRange = clampAsteroidRange(startDate, event.target.value);
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
  };

  const handleShift = (days: number): void => {
    const nextRange = clampAsteroidRange(shiftIsoDate(startDate, days), shiftIsoDate(endDate, days));
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-glow-strong)]">Asteroid Analytics</p>
        <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Inspect velocity, scale, and risk across the current near-Earth object watch window.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">
          The backend constrains the date range to NASA's seven-day feed limit. This view turns that feed into a readable
          analytics surface with summary metrics, comparative bars, and an inspection table.
        </p>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleShift(-1)}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
          >
            Shift back
          </button>
          <button
            type="button"
            onClick={() => handleShift(1)}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
          >
            Shift forward
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="mt-3 block w-full rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-text-strong)] outline-none"
            />
          </label>
          <label className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">End date</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="mt-3 block w-full rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-text-strong)] outline-none"
            />
          </label>
        </div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          If you select a range longer than seven days, the end date is automatically clamped to stay within the backend limit.
        </p>
      </section>

      <ErrorBoundary
        renderFallback={(retry) => (
          <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
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
    </div>
  );
};
