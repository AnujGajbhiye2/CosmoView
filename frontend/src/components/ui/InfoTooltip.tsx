import type { ReactElement } from 'react';
import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface InfoTooltipProps {
  text: string;
}

/**
 * Portal-based (i) tooltip.
 * Renders the tooltip at document.body so it is never clipped by
 * overflow:hidden ancestors. Position is computed from the icon's
 * bounding rect on show.
 */
export const InfoTooltip = ({ text }: InfoTooltipProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const computeCoords = useCallback((): void => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY - 8,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  }, []);

  const show = useCallback((): void => {
    computeCoords();
    setVisible(true);
  }, [computeCoords]);

  const hide = useCallback((): void => setVisible(false), []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={text}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="ml-1.5 inline-flex h-3.5 w-3.5 shrink-0 cursor-default items-center justify-center normal-case text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-glow-strong)] focus:outline-none focus-visible:text-[var(--color-glow-strong)]"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="8.01" />
          <polyline points="11 12 12 12 12 16" />
        </svg>
      </button>

      {visible &&
        createPortal(
          <span
            role="tooltip"
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              transform: 'translate(-50%, -100%)',
              zIndex: 9999,
            }}
            className="pointer-events-none w-60 rounded-[0.875rem] border border-[var(--color-border-strong)] bg-[var(--color-space-elevated)] px-3.5 py-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-[var(--color-text-muted)] shadow-[0_8px_32px_var(--color-shadow)]"
          >
            {text}
          </span>,
          document.body
        )}
    </>
  );
};
