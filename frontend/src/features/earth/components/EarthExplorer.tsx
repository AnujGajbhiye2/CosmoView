import type { ReactElement } from 'react';
import { useState } from 'react';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { NavEarthIcon } from '@/components/ui/icons';
import { useEpic } from '../hooks/useEpic';

interface EarthExplorerProps {
  date: string;
}

export const EarthExplorer = ({ date }: EarthExplorerProps): ReactElement => {
  const { data } = useEpic(date);
  const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(data[0]?.identifier ?? null);
  const selectedImage = data.find((image) => image.identifier === selectedIdentifier) ?? data[0] ?? null;

  if (!selectedImage) {
    return (
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <NavEarthIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>EPIC natural imagery</p>
        </div>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)]">
          No EPIC imagery is currently available for {date}.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-faint)]">
          Try a nearby date. EPIC availability is uneven, so some calendar days do not return image sets.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <NavEarthIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>EPIC natural imagery</p>
        </div>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)]">
          Earth on {date}
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--color-text-faint)]">
          Browse the available frames for this date and inspect the corresponding observation metadata.
        </p>
        <div className="mt-6 grid gap-3 max-h-[32rem] overflow-auto pr-1">
          {data.map((image) => {
            const isActive = image.identifier === selectedImage.identifier;

            return (
              <button
                key={image.identifier}
                type="button"
                onClick={() => setSelectedIdentifier(image.identifier)}
                className={`rounded-[0.75rem] border p-4 text-left transition ${
                  isActive
                    ? 'border-[var(--color-glow-strong)] bg-[var(--color-glow-strong)]/10'
                    : 'border-[var(--color-border)] bg-[var(--color-panel-soft)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <p className="text-sm font-medium text-[var(--color-text-strong)]">{image.identifier}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{image.caption}</p>
              </button>
            );
          })}
        </div>
      </article>
      <article className="overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]">
        <img src={selectedImage.archiveUrl} alt={selectedImage.caption} loading="eager" decoding="async" className="h-80 w-full object-cover sm:h-[28rem]" />
        <div className="p-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
            <NavEarthIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <p>Selected frame</p>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
            {selectedImage.identifier}
          </h3>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-faint)]">{selectedImage.caption}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Timestamp</dt>
              <dd className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{selectedImage.date}</dd>
            </div>
            <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
              <dt className="flex items-center text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">
                Centroid
                <InfoTooltip text="The geographic center of the full-disk Earth image, expressed as latitude and longitude." />
              </dt>
              <dd className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">
                {selectedImage.centroidCoordinates
                  ? `${selectedImage.centroidCoordinates.lat.toFixed(2)}, ${selectedImage.centroidCoordinates.lon.toFixed(2)}`
                  : 'Unavailable'}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
};
