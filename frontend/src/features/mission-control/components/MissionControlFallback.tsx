import type { ReactElement } from 'react';
import { PanelSkeleton } from '@/components/feedback/PanelSkeleton';

export const MissionControlFallback = (): ReactElement => {
  return (
    <section className="grid gap-4 lg:grid-cols-12">
      <PanelSkeleton className="lg:col-span-8" />
      <PanelSkeleton className="lg:col-span-4" />
      <PanelSkeleton className="lg:col-span-4" />
      <PanelSkeleton className="lg:col-span-4" />
      <PanelSkeleton className="lg:col-span-4" />
    </section>
  );
};
