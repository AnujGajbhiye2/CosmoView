import type { ChangeEvent, ReactElement } from 'react';
import { Suspense, startTransition, useDeferredValue, useState } from 'react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';
import { LibrarySearchExperience } from '@/features/library/components/LibrarySearchExperience';

export const LibraryPage = (): ReactElement => {
  const [query, setQuery] = useState('nebula');
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query.trim());
  const activeQuery = deferredQuery.length >= 2 ? deferredQuery : 'nebula';

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextQuery = event.target.value;
    startTransition(() => {
      setQuery(nextQuery);
      setPage(1);
    });
  };

  const handlePageChange = (nextPage: number): void => {
    startTransition(() => {
      setPage(nextPage);
    });
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-glow-strong)]">Image Library</p>
        <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          Search NASA's archive and turn image discovery into a guided exploration workflow.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">
          This route combines free-form search, archive browsing, result inspection, and a lightweight copilot panel that
          synthesizes the current search into practical next steps.
        </p>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Search NASA imagery</span>
            <input
              type="search"
              value={query}
              onChange={handleSearchChange}
              placeholder="nebula, moon, saturn, hubble..."
              className="mt-3 block w-full rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-3 text-base text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-faint)]"
            />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-3 text-sm text-[var(--color-text-strong)] transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--color-border-strong)]"
            >
              Previous page
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
            >
              Next page
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Searches are applied on a deferred value so typing stays responsive. If the query is too short, the explorer falls back to "nebula".
        </p>
      </section>

      <ErrorBoundary
        fallback={
          <section className="rounded-[2rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-alert)]">Archive unavailable</p>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
              The NASA image library request failed. Adjust the query or confirm the backend is responding.
            </p>
          </section>
        }
      >
        <Suspense fallback={<PanelSkeleton className="min-h-[46rem]" />}>
          <LibrarySearchExperience key={`${activeQuery}:${page}`} query={activeQuery} page={page} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
