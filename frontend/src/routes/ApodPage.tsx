import type { ReactElement } from 'react';
import { RoutePlaceholder } from '@/components/feedback/RoutePlaceholder';

export const ApodPage = (): ReactElement => {
  return (
    <RoutePlaceholder
      eyebrow="APOD Explorer"
      title="Astronomy Picture of the Day will become the narrative anchor for the experience."
      description="The route and shell are ready. In the next feature phases this page gets date controls, media rendering, metadata panels, and history navigation."
    />
  );
};
