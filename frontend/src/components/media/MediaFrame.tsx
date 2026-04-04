import type { ReactElement } from 'react';

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
      <div className="flex min-h-[22rem] items-center justify-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel-strong)] p-8 text-center text-sm text-[var(--color-text-faint)]">
        {fallbackLabel}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]">
      <img src={imageUrl} alt={title} loading="eager" decoding="async" className="h-full max-h-[44rem] w-full object-cover" />
    </div>
  );
};
