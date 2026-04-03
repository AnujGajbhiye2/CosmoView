import { Link, useRouterState } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { cn } from '@/lib/cn';

interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink = ({ href, label }: NavLinkProps): ReactElement => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });

  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      to={href}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-colors',
        isActive
          ? 'border-[var(--color-glow)] bg-[var(--color-glow)]/12 text-white'
          : 'border-white/10 bg-white/4 text-white/72 hover:border-white/20 hover:bg-white/8 hover:text-white'
      )}
    >
      {label}
    </Link>
  );
};
