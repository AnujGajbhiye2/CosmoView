import type { ReactElement } from 'react';

const panel = 'rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]';
const shimmer = 'rounded animate-pulse bg-[var(--color-border)]';

const ResultCardSkeleton = (): ReactElement => (
  <div className="overflow-hidden rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)]">
    <div className={`${shimmer} h-52 w-full rounded-none`} />
    <div className="p-5 space-y-3">
      <div className={`${shimmer} h-3 w-1/4`} />
      <div className={`${shimmer} h-5 w-3/4`} />
      <div className={`${shimmer} h-4 w-full`} />
      <div className={`${shimmer} h-4 w-5/6`} />
    </div>
  </div>
);

export const LibrarySkeleton = (): ReactElement => (
  <section role="status" aria-label="Loading image library" className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
    <p className="sr-only">Loading NASA image library results…</p>
    {/* Left — search results */}
    <div className="space-y-4">
      {/* Header panel */}
      <article className={`${panel} p-6`}>
        <div className={`${shimmer} h-5 w-1/3`} />
        <div className={`${shimmer} mt-2 h-4 w-1/2`} />
      </article>

      {/* Results grid */}
      <article className={`${panel} p-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ResultCardSkeleton key={i} />
          ))}
        </div>
      </article>
    </div>

    {/* Right — detail panel */}
    <div className="space-y-4">
      <article className={`${panel} overflow-hidden`}>
        <div className={`${shimmer} h-72 w-full rounded-none`} style={{ borderRadius: '1rem 1rem 0 0' }} />
        <div className="p-6">
          <div className={`${shimmer} h-6 w-3/4`} />
          <div className={`${shimmer} mt-3 h-4 w-full`} />
          <div className={`${shimmer} mt-2 h-4 w-5/6`} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
            <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
          </div>
        </div>
      </article>

      {/* Copilot panel */}
      <article className={`${panel} h-32`} />
    </div>
  </section>
);
