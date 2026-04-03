import type { ReactElement } from 'react';
import { RoutePlaceholder } from '@/components/feedback/RoutePlaceholder';

export const AsteroidsPage = (): ReactElement => {
  return (
    <RoutePlaceholder
      eyebrow="Asteroid Analytics"
      title="This section is reserved for the high-signal visualization work in the challenge."
      description="The route exists now so the information architecture is fixed. Charts, date-range controls, summary cards, and inspection tables land in the asteroid phase."
    />
  );
};
