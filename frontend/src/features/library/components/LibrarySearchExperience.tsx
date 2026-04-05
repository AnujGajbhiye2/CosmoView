import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArchiveIcon, ImageIcon, MediaUnavailableIcon, NoResultsIcon, SearchIcon } from '@/components/ui/icons';
import { useLibrarySearch } from '../hooks/useLibrarySearch';
import { ExplorerCopilot } from './ExplorerCopilot';
import type { ImageSearchDto } from '~types/api';

interface LibrarySearchExperienceProps {
  query: string;
}

export const LibrarySearchExperience = ({ query }: LibrarySearchExperienceProps): ReactElement => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useLibrarySearch(query);
  const [selectedId, setSelectedId] = useState<string | null>(data.pages[0]?.items[0]?.nasaId ?? null);
  const resultsPaneRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const aggregatedResults = useMemo<ImageSearchDto>(() => {
    const pages = data.pages;
    const lastPage = pages[pages.length - 1];

    return {
      items: pages.flatMap((page) => page.items),
      page: lastPage?.page ?? 1,
      pageSize: pages.reduce((total, page) => total + page.pageSize, 0),
      totalHits: pages[0]?.totalHits ?? 0,
      hasNextPage: lastPage?.hasNextPage ?? false
    };
  }, [data.pages]);

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void fetchNextPage();
        }
      },
      {
        root: resultsPaneRef.current,
        rootMargin: '180px 0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const selectedItem =
    aggregatedResults.items.find((item) => item.nasaId === selectedId) ?? aggregatedResults.items[0] ?? null;

  if (aggregatedResults.items.length === 0) {
    return (
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <NoResultsIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>No matching images</p>
        </div>
        <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          The archive did not return results for "{query}".
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
          Try a broader search term to recover a stronger result set.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
                <SearchIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                <p>Search results</p>
              </div>
              <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
                {aggregatedResults.totalHits.toLocaleString('en-US')} images for "{query}"
              </h3>
            </div>
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
              {aggregatedResults.items.length.toLocaleString('en-US')} loaded
            </div>
          </div>
        </article>

        <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-[0_24px_80px_var(--color-shadow)]">
          <div ref={resultsPaneRef} className="max-h-[73rem] overflow-y-auto pr-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {aggregatedResults.items.map((item) => {
                const isActive = item.nasaId === selectedItem?.nasaId;

                return (
                  <button
                    key={item.nasaId}
                    type="button"
                    onClick={() => setSelectedId(item.nasaId)}
                    className={`cursor-pointer overflow-hidden rounded-[0.875rem] border text-left shadow-[0_24px_80px_var(--color-shadow)] transition ${
                      isActive
                        ? 'border-[var(--color-glow-strong)] bg-[var(--color-panel)]'
                        : 'border-[var(--color-border)] bg-[var(--color-panel-soft)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    {item.previewImageUrl ? (
                      <img src={item.previewImageUrl} alt={item.title} loading="lazy" decoding="async" className="h-52 w-full object-cover" />
                    ) : (
                      <div className="flex h-52 flex-col items-center justify-center gap-3 bg-[var(--color-panel-strong)] px-4 text-center text-sm text-[var(--color-text-faint)]">
                        <MediaUnavailableIcon aria-hidden="true" className="h-8 w-8 text-[var(--color-glow-strong)]" />
                        <p>Preview unavailable</p>
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

            <div ref={loadMoreRef} className="flex flex-col items-center gap-4 px-2 py-6">
              {isFetchingNextPage ? (
                <p className="text-sm text-[var(--color-text-muted)]">Loading more archive results...</p>
              ) : null}
              {aggregatedResults.hasNextPage ? (
                <button
                  type="button"
                  onClick={() => void fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Load more results
                </button>
              ) : (
                <p className="text-sm text-[var(--color-text-faint)]">End of archive results for this search.</p>
              )}
            </div>
          </div>
        </article>
      </div>

      <div className="space-y-4">
        <article className="overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)]">
          {selectedItem?.originalImageUrl ? (
            <img src={selectedItem.originalImageUrl} alt={selectedItem.title} loading="eager" decoding="async" className="h-72 w-full object-cover" />
          ) : (
            <div className="flex h-72 flex-col items-center justify-center gap-3 bg-[var(--color-panel-strong)] px-6 text-center text-sm text-[var(--color-text-faint)]">
              <ImageIcon aria-hidden="true" className="h-10 w-10 text-[var(--color-glow-strong)]" />
              <p>Select an image to inspect it in detail</p>
            </div>
          )}
          <div className="p-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
              <ArchiveIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <p>Selected image</p>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
              {selectedItem?.title ?? 'Awaiting selection'}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
              {selectedItem?.description ?? 'Choose a result card to inspect its description and use the copilot panel to generate directions for deeper exploration.'}
            </p>
            {selectedItem ? (
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                  <dt className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">NASA ID</dt>
                  <dd className="mt-2 text-sm text-[var(--color-text-strong)]">{selectedItem.nasaId}</dd>
                </div>
                <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                  <dt className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Created</dt>
                  <dd className="mt-2 text-sm text-[var(--color-text-strong)]">{selectedItem.dateCreated}</dd>
                </div>
              </dl>
            ) : null}
          </div>
        </article>

        <ExplorerCopilot query={query} results={aggregatedResults} selectedItem={selectedItem} />
      </div>
    </section>
  );
};
