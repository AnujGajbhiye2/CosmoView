import type { ReactElement } from 'react';
import { RoutePlaceholder } from '@/components/feedback/RoutePlaceholder';

export const RootPage = (): ReactElement => {
  return (
    <RoutePlaceholder
      eyebrow="Overview"
      title="A mission-control interface for NASA imagery, asteroid analytics, and Earth observation."
      description="This foundation phase establishes the architecture, theming, routing, and provider tree. The dashboard content and live data modules will be layered in next."
    />
  );
};
