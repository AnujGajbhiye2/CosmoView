import type { PropsWithChildren, ReactElement } from 'react';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

const navigationItems = [
  { href: '/', label: 'Mission Control' },
  { href: '/apod', label: 'APOD' },
  { href: '/asteroids', label: 'Asteroids' },
  { href: '/earth', label: 'Earth' },
  { href: '/library', label: 'Library' },
  { href: '/lab', label: 'Lab' }
] as const;

export const AppShell = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <div className="min-h-screen bg-[var(--color-space)] text-[var(--color-ice)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(110,185,255,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(248,167,92,0.14),_transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-5 py-4 shadow-[0_20px_80px_var(--color-shadow)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-start justify-between gap-4 md:block">
            <div>
            <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-glow)]">CosmoView</p>
              <h1 className="font-[var(--font-display)] text-2xl tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-3xl">
              Mission Control
            </h1>
            </div>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <nav className="flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
