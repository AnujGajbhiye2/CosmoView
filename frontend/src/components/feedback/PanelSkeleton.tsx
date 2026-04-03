import type { ReactElement } from 'react';

interface PanelSkeletonProps {
  className?: string;
}

export const PanelSkeleton = ({ className = '' }: PanelSkeletonProps): ReactElement => {
  return (
    <div className={`animate-pulse rounded-[2rem] border border-white/10 bg-white/6 p-6 ${className}`}>
      <div className="h-3 w-24 rounded-full bg-white/10" />
      <div className="mt-5 h-10 w-3/4 rounded-full bg-white/10" />
      <div className="mt-4 h-4 w-full rounded-full bg-white/8" />
      <div className="mt-2 h-4 w-5/6 rounded-full bg-white/8" />
      <div className="mt-6 h-44 rounded-[1.5rem] bg-white/8" />
    </div>
  );
};
