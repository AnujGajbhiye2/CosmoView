import type { ReactElement } from 'react';
import { SpaceLoader } from './SpaceLoader';

interface PanelSkeletonProps {
  className?: string;
}

export const PanelSkeleton = ({ className = '' }: PanelSkeletonProps): ReactElement => {
  return <SpaceLoader className={className} />;
};
