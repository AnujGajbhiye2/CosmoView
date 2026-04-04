import type { ChangeEvent, ReactElement } from 'react';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { LibrarySearchExperience } from '@/features/library/components/LibrarySearchExperience';

export const LibraryPage = (): ReactElement => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const activeQuery = debouncedQuery.trim();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSearchCommit = (): void => {
    setDebouncedQuery(query);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Image Library</p>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Search NASA's archive and turn image discovery into a guided exploration workflow.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          This route combines free-form search, archive browsing, result inspection, and a lightweight copilot panel that
          synthesizes the current search into practical next steps.
        </p>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Search NASA imagery</span>
            <input
              type="search"
              value={query}
              onChange={handleSearchChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearchCommit();
                }
              }}
              placeholder="nebula, moon, saturn, hubble..."
              className="mt-3 block w-full rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-3 text-base text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-faint)]"
            />
          </label>
          <button
            type="button"
            onClick={handleSearchCommit}
            className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-5 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
          >
            Search archive
          </button>
        </div>
      </section>

      {activeQuery.length >= 2 ? (
        <ErrorBoundary
          renderFallback={(retry) => (
            <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-alert)]">Archive unavailable</p>
              <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                The NASA image library request failed. Adjust the query or confirm the backend is responding.
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
            <LibrarySearchExperience key={activeQuery} query={activeQuery} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Archive standby</p>
          <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
            Start with a search term to explore NASA imagery.
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
            Search for topics like nebula, moon, saturn, hubble, mars, or apollo to load the archive explorer and
            inspect matching imagery in detail.
          </p>
        </section>
      )}
    </div>
  );
};
