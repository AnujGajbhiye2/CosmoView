import type { ReactElement } from 'react';
import { RoutePlaceholder } from '@/components/feedback/RoutePlaceholder';

export const LibraryPage = (): ReactElement => {
  return (
    <RoutePlaceholder
      eyebrow="Image Library"
      title="NASA image search will round out the explorer with a discovery-driven route."
      description="This page is intentionally kept minimal in the foundation phase. Search state, paginated results, and detail interactions are planned for a later checkpoint."
    />
  );
};
