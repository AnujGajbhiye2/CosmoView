import type { ReactElement } from 'react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { DateNavigation } from '@/components/controls/DateNavigation';
import { ApodExplorer } from '@/features/apod/components/ApodExplorer';
import { shiftIsoDate, toIsoDate } from '@/features/apod/helpers/date';

const today = toIsoDate(new Date());

export const ApodPage = (): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const handleShift = (days: number): void => {
    const nextDate = shiftIsoDate(selectedDate, days);
    setSelectedDate(nextDate > today ? today : nextDate);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">APOD Explorer</p>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Navigate NASA's daily astronomy storytelling frame by frame.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          Move through the archive, inspect the metadata, and treat each day as a self-contained mission brief for the
          cosmos.
        </p>
      </section>

      <DateNavigation
        label="Select APOD date"
        value={selectedDate}
        max={today}
        onChange={setSelectedDate}
        onShift={handleShift}
      />

      <ErrorBoundary
        renderFallback={(retry) => (
          <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-alert)]">APOD unavailable</p>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
              The selected APOD entry could not be loaded. Try a nearby date or confirm that the backend is running.
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
        <Suspense fallback={<PanelSkeleton className="min-h-[32rem]" />}>
          <ApodExplorer key={selectedDate} date={selectedDate} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
