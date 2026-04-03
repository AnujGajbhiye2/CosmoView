import type { ReactElement } from 'react';
import { RoutePlaceholder } from '@/components/feedback/RoutePlaceholder';

export const EarthPage = (): ReactElement => {
  return (
    <RoutePlaceholder
      eyebrow="Earth Observation"
      title="EPIC imagery will become a date-driven Earth timeline and gallery."
      description="The foundation is in place for the route. The next implementation phase will add backend data wiring, date navigation, and an immersive Earth observation layout."
    />
  );
};
