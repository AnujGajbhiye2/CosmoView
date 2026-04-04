import type { ReactElement } from 'react';
import { MediaUnavailableIcon } from '@/components/ui/icons';

interface MediaFrameProps {
  title: string;
  mediaType: string;
  imageUrl: string | null;
  fallbackLabel: string;
}

export const MediaFrame = ({
  title,
  mediaType,
  imageUrl,
  fallbackLabel
}: MediaFrameProps): ReactElement => {
  if (mediaType !== 'image' || !imageUrl) {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel-strong)] p-8 text-center text-sm text-[var(--color-text-faint)]">
        <MediaUnavailableIcon aria-hidden="true" className="h-10 w-10 text-[var(--color-glow-strong)]" />
        <p>{fallbackLabel}</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]">
      <img src={imageUrl} alt={title} loading="eager" decoding="async" className="h-full w-full object-cover" />
    </div>
  );
};
