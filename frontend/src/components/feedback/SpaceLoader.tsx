import type { ReactElement } from 'react';

interface SpaceLoaderProps {
  className?: string;
  title?: string;
  message?: string;
}

export const SpaceLoader = ({
  className = '',
  title = 'Contacting mission control',
  message = 'Fetching the latest NASA telemetry and preparing your next view.'
}: SpaceLoaderProps): ReactElement => {
  return (
    <section
      className={`rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-panel)_94%,transparent),color-mix(in_srgb,var(--color-space-elevated)_82%,transparent))] p-6 shadow-[0_24px_80px_var(--color-shadow)] ${className}`}
    >
      <div className="flex h-full min-h-[inherit] items-center justify-center">
        <div className="flex max-w-xl flex-col items-center text-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[var(--color-border-strong)]/70" />
            <div className="absolute inset-[0.6rem] rounded-full border border-dashed border-[var(--color-glow)]/40 animate-[spin_8s_linear_infinite]" />
            <div className="absolute h-8 w-8 rounded-full bg-[radial-gradient(circle,rgba(246,160,77,0.42)_0%,rgba(216,109,31,0.2)_48%,rgba(216,109,31,0.04)_76%,transparent_100%)] blur-[1px]" />
            <div className="absolute h-14 w-14 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(129,199,255,0.3),rgba(129,199,255,0.14)_54%,transparent_76%)] blur-[1px]" />
            <div className="absolute z-20 animate-[spin_3.6s_linear_infinite]">
              <div className="translate-y-[-2.1rem]">
                <img
                  src="/rocket.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 -rotate-45 opacity-95 drop-shadow-[0_0_10px_rgba(129,199,255,0.28)]"
                />
              </div>
            </div>
            <div className="absolute h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,245,222,0.98),rgba(246,160,77,0.92)_38%,rgba(216,109,31,0.34)_76%,transparent_100%)] shadow-[0_0_18px_rgba(246,160,77,0.34)]" />
            <div className="absolute animate-[spin_10s_linear_infinite]">
              <div className="translate-y-[-1.7rem]">
                <div className="h-2 w-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(236,246,255,0.96),rgba(129,199,255,0.8)_60%,rgba(129,199,255,0.3)_100%)] shadow-[0_0_10px_rgba(129,199,255,0.32)]" />
              </div>
            </div>
            <div className="absolute animate-[spin_12s_linear_infinite_reverse]">
              <div className="translate-x-[1.8rem]">
                <div className="h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,243,210,0.96),rgba(246,160,77,0.82)_58%,rgba(216,109,31,0.28)_100%)] shadow-[0_0_10px_rgba(246,160,77,0.24)]" />
              </div>
            </div>
            <div className="absolute animate-[spin_7.4s_linear_infinite]">
              <div className="translate-y-[1.7rem]">
                <div className="h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.95),rgba(177,196,215,0.74)_65%,rgba(177,196,215,0.18)_100%)]" />
              </div>
            </div>
          </div>
          <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">
            Loading transmission
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">{message}</p>
          <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,transparent,var(--color-glow),transparent)]" />
          <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
            Stabilizing feed
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-glow)]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-glow-strong)] [animation-delay:250ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-white/80 [animation-delay:500ms]" />
          </div>
        </div>
      </div>
    </section>
  );
};
