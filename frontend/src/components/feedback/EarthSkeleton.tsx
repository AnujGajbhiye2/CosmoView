import type { ReactElement } from 'react';

const panel = 'rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]';
const shimmer = 'rounded animate-pulse bg-[var(--color-border)]';

export const EarthSkeleton = (): ReactElement => (
  <section role="status" aria-label="Loading Earth imagery" className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
    <p className="sr-only">Loading EPIC Earth imagery…</p>
    {/* Left — frame selector */}
    <article className={`${panel} p-6`} aria-hidden="true">
      <div className={`${shimmer} h-6 w-1/2`} />
      <div className={`${shimmer} mt-3 h-4 w-3/4`} />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${shimmer} h-16 w-full rounded-[0.75rem]`} />
        ))}
      </div>
    </article>

    {/* Right — image display */}
    <article className={`${panel} overflow-hidden`} aria-hidden="true">
      <div className={`${shimmer} h-80 w-full rounded-none sm:h-[28rem]`} style={{ borderRadius: '1rem 1rem 0 0' }} />
      <div className="p-6">
        <div className={`${shimmer} h-6 w-2/3`} />
        <div className={`${shimmer} mt-3 h-4 w-full`} />
        <div className={`${shimmer} mt-2 h-4 w-4/5`} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
          <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
        </div>
      </div>
    </article>
  </section>
);
