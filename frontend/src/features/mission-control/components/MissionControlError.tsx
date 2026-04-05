import type { ReactElement } from 'react';
import { ErrorIcon, RetryIcon } from '@/components/ui/icons';

interface MissionControlErrorProps {
  onRetry?: () => void;
}

export const MissionControlError = ({ onRetry }: MissionControlErrorProps): ReactElement => {
  return (
    <section className="rounded-[1rem] border border-[var(--color-alert)]/20 bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-alert)]">
        <ErrorIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
        <p>Data Feed Disrupted</p>
      </div>
      <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.05em] text-[var(--color-text-strong)]">
        Mission Control could not load the NASA preview modules.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
        The shell is healthy, but one or more backend-backed requests failed. Check the backend server, then retry the
        overview.
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-5 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
        >
          <RetryIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          Retry
        </button>
      ) : null}
    </section>
  );
};
