import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useLibrarySearch } from '../hooks/useLibrarySearch';
import { ExplorerCopilot } from './ExplorerCopilot';

interface LibrarySearchExperienceProps {
  page: number;
  query: string;
}

export const LibrarySearchExperience = ({ query, page }: LibrarySearchExperienceProps): ReactElement => {
  const { data } = useLibrarySearch(query, page);
  const [selectedId, setSelectedId] = useState<string | null>(data.items[0]?.nasaId ?? null);

  useEffect(() => {
    setSelectedId(data.items[0]?.nasaId ?? null);
  }, [data.items]);

  const selectedItem = data.items.find((item) => item.nasaId === selectedId) ?? data.items[0] ?? null;

  if (data.items.length === 0) {
    return (
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">No matching images</p>
        <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          The archive did not return results for "{query}" on page {page}.
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
          Try a broader search term or move back to an earlier page to recover a stronger result set.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Search results</p>
              <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
                {data.totalHits.toLocaleString('en-US')} images for "{query}"
              </h3>
            </div>
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
              Page {data.page}
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.items.map((item) => {
            const isActive = item.nasaId === selectedItem?.nasaId;

            return (
              <button
                key={item.nasaId}
                type="button"
                onClick={() => setSelectedId(item.nasaId)}
                className={`overflow-hidden rounded-[1.75rem] border text-left shadow-[0_24px_80px_var(--color-shadow)] transition ${
                  isActive
                    ? 'border-[var(--color-glow-strong)] bg-[var(--color-panel)]'
                    : 'border-[var(--color-border)] bg-[var(--color-panel-soft)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                {item.previewImageUrl ? (
                  <img src={item.previewImageUrl} alt={item.title} className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-[var(--color-panel-strong)] text-sm text-[var(--color-text-faint)]">
                    Preview unavailable
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">{item.dateCreated.slice(0, 10)}</p>
                  <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">{item.title}</h4>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--color-text-muted)]">
                    {item.description ?? 'This archive item does not include a description.'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]">
          {selectedItem?.originalImageUrl ? (
            <img src={selectedItem.originalImageUrl} alt={selectedItem.title} className="h-72 w-full object-cover" />
          ) : (
            <div className="flex h-72 items-center justify-center bg-[var(--color-panel-strong)] text-sm text-[var(--color-text-faint)]">
              Select an image to inspect it in detail
            </div>
          )}
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Selected image</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
              {selectedItem?.title ?? 'Awaiting selection'}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
              {selectedItem?.description ?? 'Choose a result card to inspect its description and use the copilot panel to generate directions for deeper exploration.'}
            </p>
            {selectedItem ? (
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                  <dt className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">NASA ID</dt>
                  <dd className="mt-2 text-sm text-[var(--color-text-strong)]">{selectedItem.nasaId}</dd>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                  <dt className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Created</dt>
                  <dd className="mt-2 text-sm text-[var(--color-text-strong)]">{selectedItem.dateCreated}</dd>
                </div>
              </dl>
            ) : null}
          </div>
        </article>

        <ExplorerCopilot query={query} results={data} selectedItem={selectedItem} />
      </div>
    </section>
  );
};
