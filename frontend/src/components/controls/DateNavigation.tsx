import type { ChangeEvent, ReactElement } from 'react';

interface DateNavigationProps {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (nextDate: string) => void;
  onShift: (days: number) => void;
}

export const DateNavigation = ({
  label,
  value,
  min,
  max,
  onChange,
  onShift
}: DateNavigationProps): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onShift(-1)}
          className="rounded-full cursor-pointer border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
        >
          Previous
        </button>
        <input
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          className="rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-text-strong)] outline-none"
        />
        <button
          type="button"
          onClick={() => onShift(1)}
          className="rounded-full cursor-pointer border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
        >
          Next
        </button>
      </div>
    </div>
  );
};
