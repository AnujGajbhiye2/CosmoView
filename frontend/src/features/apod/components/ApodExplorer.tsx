import type { ReactElement } from 'react';
import { useState } from 'react';
import { useApod } from '../hooks/useApod';
import { MediaFrame } from '@/components/media/MediaFrame';

interface ApodExplorerProps {
  date: string;
}

export const ApodExplorer = ({ date }: ApodExplorerProps): ReactElement => {
  const { data } = useApod(date);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <MediaFrame
        title={data.title}
        mediaType={data.mediaType}
        imageUrl={data.hdImageUrl ?? data.imageUrl}
        fallbackLabel="This APOD entry does not include a displayable image. The metadata is still available in the side panel."
      />
      <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Astronomy Picture of the Day</p>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)]">
          {data.title}
        </h2>
        <p className="mt-4 text-sm uppercase tracking-[0.28em] text-[var(--color-text-faint)]">{data.date}</p>
        <p className={`mt-5 text-base leading-7 text-[var(--color-text-faint)] ${expanded ? '' : 'line-clamp-5'}`}>
          {data.explanation}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-medium text-[var(--color-glow)] transition-colors hover:text-[var(--color-glow-strong)]"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <dt className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Media type</dt>
            <dd className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.mediaType}</dd>
          </div>
          <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <dt className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Copyright</dt>
            <dd className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.copyright ?? 'NASA / Public domain'}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
};
