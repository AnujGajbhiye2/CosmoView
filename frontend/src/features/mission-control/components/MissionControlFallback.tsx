import type { ReactElement } from 'react';
import { SpaceLoader } from '@/components/feedback/SpaceLoader';

export const MissionControlFallback = (): ReactElement => {
  return (
    <SpaceLoader
      className="min-h-[34rem]"
      title="Synchronizing mission control"
      message="Collecting APOD imagery, asteroid telemetry, Earth observation, and archive search results for the main dashboard."
    />
  );
};
