import type { ReactElement } from 'react';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { cn } from '@/lib/cn';

export const ThemeToggle = (): ReactElement => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2 text-sm transition-colors',
        'border-white/12 bg-white/6 text-white/80 hover:border-white/25 hover:bg-white/10',
        'data-[theme=light]:border-black/12 data-[theme=light]:bg-black/4 data-[theme=light]:text-slate-700'
      )}
      data-theme={theme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.28em]">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="flex h-6 w-11 items-center rounded-full bg-black/25 p-1 data-[theme=light]:bg-slate-300/80" data-theme={theme}>
        <span
          className={cn(
            'h-4 w-4 rounded-full bg-[var(--color-solar)] transition-transform',
            theme === 'light' ? 'translate-x-5 bg-[var(--color-glow-strong)]' : 'translate-x-0'
          )}
        />
      </span>
    </button>
  );
};
