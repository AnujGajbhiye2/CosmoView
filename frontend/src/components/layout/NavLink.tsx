import { Link, useRouterState } from '@tanstack/react-router';
import type { ComponentType, ReactElement, SVGProps } from 'react';
import { cn } from '@/lib/cn';

interface NavLinkProps {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

export const NavLink = ({ href, icon: Icon, label }: NavLinkProps): ReactElement => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });

  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      to={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
        isActive
          ? 'border-[var(--color-glow)] bg-[var(--color-glow)]/12 text-[var(--color-text-strong)]'
          : 'border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-panel)] hover:text-[var(--color-text-strong)]'
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
};
