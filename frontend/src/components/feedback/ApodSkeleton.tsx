import type { ReactElement } from 'react';

const panel = 'rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]';
const shimmer = 'rounded animate-pulse bg-[var(--color-border)]';

export const ApodSkeleton = (): ReactElement => (
  <section role="status" aria-label="Loading astronomy picture" className={`grid gap-4 lg:grid-cols-[1.15fr_0.85fr]`}>
    <p className="sr-only">Loading astronomy picture of the day…</p>
    {/* Left — image placeholder */}
    <div className={`${panel} min-h-[32rem]`} aria-hidden="true" />

    {/* Right — metadata panel */}
    <article className={`${panel} p-6`} aria-hidden="true">
      {/* Title */}
      <div className={`${shimmer} h-8 w-3/4`} />
      {/* Date */}
      <div className={`${shimmer} mt-4 h-4 w-1/3`} />
      {/* Explanation lines */}
      <div className="mt-6 space-y-3">
        <div className={`${shimmer} h-4 w-full`} />
        <div className={`${shimmer} h-4 w-full`} />
        <div className={`${shimmer} h-4 w-5/6`} />
        <div className={`${shimmer} h-4 w-4/5`} />
        <div className={`${shimmer} h-4 w-2/3`} />
      </div>
      {/* Metadata grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
        <div className={`${shimmer} h-20 rounded-[0.75rem]`} />
      </div>
    </article>
  </section>
);
