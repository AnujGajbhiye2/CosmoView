import type { ReactElement } from 'react';

interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const RoutePlaceholder = ({
  eyebrow,
  title,
  description
}: RoutePlaceholderProps): ReactElement => {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(3,8,21,0.45)] backdrop-blur">
        <p className="mb-4 text-xs uppercase tracking-[0.38em] text-[var(--color-glow)]">{eyebrow}</p>
        <h2 className="max-w-2xl font-[var(--font-display)] text-4xl tracking-[-0.06em] text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">{description}</p>
      </div>
      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(14,26,55,0.9),rgba(7,11,21,0.92))] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-white/48">Phase 1 foundation</p>
          <p className="mt-4 text-2xl font-semibold text-white">Route shell is in place.</p>
          <p className="mt-3 text-sm leading-6 text-white/64">
            Real data panels, charts, and exploration controls land in later phases after your review.
          </p>
        </div>
        <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/4 p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-white/48">What is ready</p>
          <ul className="mt-4 space-y-3 text-sm text-white/72">
            <li>Typed provider tree</li>
            <li>Mission-control shell and navigation</li>
            <li>Route map for all planned pages</li>
            <li>Shared API client and env handling</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
