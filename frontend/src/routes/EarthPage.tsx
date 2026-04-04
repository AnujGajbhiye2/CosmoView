import type { ReactElement } from 'react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { DateNavigation } from '@/components/controls/DateNavigation';
import { EarthExplorer } from '@/features/earth/components/EarthExplorer';
import { shiftIsoDate, toIsoDate } from '@/features/apod/helpers/date';

const defaultDate = toIsoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3));
const latestDate = toIsoDate(new Date());

export const EarthPage = (): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);

  const handleShift = (days: number): void => {
    const nextDate = shiftIsoDate(selectedDate, days);
    setSelectedDate(nextDate > latestDate ? latestDate : nextDate);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-glow-strong)]">Earth Observation</p>
        <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Browse EPIC's daily record of Earth as seen from deep space.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">
          Step through the available dates, inspect image sets, and use the selected frame metadata to understand when
          and where the snapshot was captured.
        </p>
      </section>

      <DateNavigation
        label="Select EPIC date"
        value={selectedDate}
        max={latestDate}
        onChange={setSelectedDate}
        onShift={handleShift}
      />

      <ErrorBoundary
        renderFallback={(retry) => (
          <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-alert)]">EPIC unavailable</p>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
              The EPIC feed could not be loaded for this date. Try a nearby day or verify the backend is responding.
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
          <EarthExplorer key={selectedDate} date={selectedDate} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
