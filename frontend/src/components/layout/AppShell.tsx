import type { PropsWithChildren, ReactElement } from 'react';
import { useLocation } from '@tanstack/react-router';
import {
  NavApodIcon,
  NavAsteroidsIcon,
  NavEarthIcon,
  NavHomeIcon,
  NavLabIcon,
  NavLibraryIcon
} from '@/components/ui/icons';
import { CometBackground } from './CometBackground';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

const navigationItems = [
  { href: '/', icon: NavHomeIcon, label: 'Mission Control' },
  { href: '/apod', icon: NavApodIcon, label: 'APOD' },
  { href: '/asteroids', icon: NavAsteroidsIcon, label: 'Asteroids' },
  { href: '/earth', icon: NavEarthIcon, label: 'Earth' },
  { href: '/library', icon: NavLibraryIcon, label: 'Library' },
  { href: '/lab', icon: NavLabIcon, label: 'Lab' }
] as const;

const pageTitle = (pathname: string): string =>
  navigationItems.find((item) => item.href === pathname)?.label ?? 'Mission Control';

export const AppShell = ({ children }: PropsWithChildren): ReactElement => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-space)] text-[var(--color-ice)]">
      <CometBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(110,185,255,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(248,167,92,0.14),_transparent_30%)]" />
      <div className="relative z-[2] mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10 bg-[var(--color-space)]">
        <header className="mb-8 flex flex-col gap-5 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-5 py-4 shadow-[0_20px_80px_var(--color-shadow)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-start justify-between gap-4 md:block">
            <div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[var(--color-glow)]">CosmoView</p>
              <h1 className="font-[var(--font-display)] text-2xl tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-3xl">
                {pageTitle(pathname)}
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
                <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>

        <footer className="mt-8 flex flex-col items-center gap-3 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-5 py-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[var(--color-glow)]">CosmoView</p>
            <p className="mt-1 text-xs text-[var(--color-text-faint)]">
              Powered by the{' '}
              <a
                href="https://api.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-glow)] underline-offset-2 hover:underline"
              >
                NASA Open APIs
              </a>
            </p>
          </div>
          <p className="text-xs text-[var(--color-text-faint)]">
            &copy; {new Date().getFullYear()} CosmoView — built for exploration
          </p>
        </footer>
      </div>
    </div>
  );
};
