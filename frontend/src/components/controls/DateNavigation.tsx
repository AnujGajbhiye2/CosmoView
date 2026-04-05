import 'react-day-picker/style.css';

import type { ReactElement } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

const parseIsoDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const formatDisplayDate = (value: string): string => {
  const [year, month, day] = value.split('-');
  return `${day}-${month}-${year}`;
};

const toIsoDate = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const toMonthBoundary = (value: Date): Date => new Date(value.getFullYear(), value.getMonth(), 1);
const startOfDay = (value: Date): Date => new Date(value.getFullYear(), value.getMonth(), value.getDate());

interface DateNavigationProps {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (nextDate: string) => void;
  onShift?: (days: number) => void;
}

export const DateNavigation = ({
  label,
  value,
  min,
  max,
  onChange,
  onShift
}: DateNavigationProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calendarId = useId();
  const selectedDate = parseIsoDate(value);
  const minDate = min ? parseIsoDate(min) : undefined;
  const maxDate = max ? parseIsoDate(max) : undefined;
  const startMonth = minDate ? toMonthBoundary(minDate) : new Date(selectedDate.getFullYear() - 100, 0, 1);
  const endMonth = maxDate ? toMonthBoundary(maxDate) : new Date(selectedDate.getFullYear(), 11, 1);
  const isPreviousDisabled = onShift ? (minDate ? startOfDay(selectedDate) <= startOfDay(minDate) : false) : false;
  const isNextDisabled = onShift ? (maxDate ? startOfDay(selectedDate) >= startOfDay(maxDate) : false) : false;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="flex h-full flex-col gap-3 rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        {onShift ? (
          <button
            type="button"
            disabled={isPreviousDisabled}
            onClick={() => onShift(-1)}
            className="rounded-full cursor-pointer border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--color-border)]"
          >
            Previous
          </button>
        ) : null}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            aria-label={`${label}: ${value}`}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={calendarId}
            onClick={() => setIsOpen((current) => !current)}
            className="flex w-[10.75rem] cursor-pointer items-center justify-between gap-2 rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 text-left text-sm text-[var(--color-text-strong)] outline-none transition hover:border-[var(--color-border-strong)] focus-visible:border-[var(--color-border-strong)]"
          >
            <span>{formatDisplayDate(value)}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[var(--color-text-faint)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <path d="M3 10h18" />
              <rect x="3" y="4" width="18" height="17" rx="4" />
            </svg>
          </button>
          {isOpen ? (
            <div
              id={calendarId}
              role="dialog"
              aria-label={`${label} calendar`}
              className="absolute left-0 top-full z-20 mt-3 rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-space-elevated)] p-3 shadow-[0_20px_60px_var(--color-shadow)]"
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                captionLayout="dropdown"
                hideNavigation
                startMonth={startMonth}
                endMonth={endMonth}
                reverseYears
                disabled={[
                  ...(minDate ? [{ before: minDate }] : []),
                  ...(maxDate ? [{ after: maxDate }] : [])
                ]}
                onSelect={(nextDate: Date | undefined) => {
                  if (!nextDate) {
                    return;
                  }

                  onChange(toIsoDate(nextDate));
                  setIsOpen(false);
                }}
                className="cv-date-picker"
                classNames={{
                  months: 'flex',
                  month: 'space-y-3',
                  month_caption: 'flex w-full items-center justify-between gap-3 px-1',
                  dropdowns: 'flex items-center gap-2',
                  button_previous:
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]',
                  button_next:
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]',
                  weekday:
                    'h-10 w-10 p-0 text-center align-middle text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-faint)]',
                  day: 'h-10 w-10 p-0 text-center align-middle text-sm',
                  day_button:
                    'h-10 w-10 cursor-pointer rounded-full border border-transparent text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-panel-soft)]',
                  selected:
                    'rounded-full border border-[var(--color-border-strong)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)]',
                  today: 'text-[var(--color-glow-strong)]',
                  disabled: 'opacity-35'
                }}
              />
            </div>
          ) : null}
        </div>
        {onShift ? (
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={() => onShift(1)}
            className="rounded-full cursor-pointer border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--color-border)]"
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};
