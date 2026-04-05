import type { ReactElement } from 'react';
import { buildMissionBrief } from '../helpers/copilot';
import { useAiMissionBrief } from '../hooks/useAiMissionBrief';
import type { AiMissionBriefDto, ImageSearchDto, ImageSearchItemDto } from '~types/api';

interface ExplorerCopilotProps {
  query: string;
  results: ImageSearchDto;
  selectedItem: ImageSearchItemDto | null;
}

type AiState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: AiMissionBriefDto }
  | { kind: 'error'; code: string };

export const ExplorerCopilot = ({
  query,
  results,
  selectedItem
}: ExplorerCopilotProps): ReactElement => {
  const heuristic = buildMissionBrief(query, results, selectedItem);
  const { mutate, status, data: aiData, error } = useAiMissionBrief();

  const aiState: AiState =
    status === 'idle' ? { kind: 'idle' } :
    status === 'pending' ? { kind: 'loading' } :
    status === 'success' && aiData ? { kind: 'success', data: aiData } :
    { kind: 'error', code: (error as { response?: { data?: { error?: { code?: string } } } } | null)?.response?.data?.error?.code ?? 'UNKNOWN' };

  const isAiSuccess = aiState.kind === 'success' && aiData?.aiAvailable !== false;
  const briefToShow = isAiSuccess && aiData
    ? { summary: aiData.summary ?? heuristic.summary, signal: aiData.signal ?? heuristic.signal, prompts: aiData.prompts ?? heuristic.prompts }
    : heuristic;

  const showButton = aiState.kind !== 'success' || aiData?.aiAvailable === false;
  const isHidden = aiState.kind === 'success' && aiData?.aiAvailable === false;

  const handleEnhance = (): void => {
    mutate({
      query,
      totalHits: results.totalHits,
      selectedItem: selectedItem
        ? { title: selectedItem.title, description: selectedItem.description, dateCreated: selectedItem.dateCreated }
        : undefined
    });
  };

  return (
    <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Explorer Copilot</p>
        {isAiSuccess ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-glow-strong)] bg-[var(--color-panel-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-glow-strong)]">
            <span aria-hidden="true">✦</span> AI generated
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
        Mission brief for the current search
      </h3>
      <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{briefToShow.summary}</p>

      <div className="mt-6 rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Signal read</p>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{briefToShow.signal}</p>
      </div>

      <div className="mt-6 space-y-3">
        {briefToShow.prompts.map((prompt) => (
          <div key={prompt} className="rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <p className="text-sm leading-6 text-[var(--color-text-strong)]">{prompt}</p>
          </div>
        ))}
      </div>

      {!isHidden && showButton ? (
        <div className="mt-6">
          {aiState.kind === 'error' ? (
            <p className="mb-3 text-xs text-[var(--color-text-faint)]">
              {aiState.code === 'RATE_LIMITED'
                ? 'Rate limit reached — try again shortly.'
                : aiState.code === 'AI_EXPIRED'
                  ? 'AI feature has expired for this deployment.'
                  : 'AI enhancement unavailable — showing heuristic brief.'}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleEnhance}
            disabled={aiState.kind === 'loading'}
            className="cursor-pointer rounded-full border border-[var(--color-glow-strong)] bg-[var(--color-panel-soft)] px-5 py-2 text-sm font-semibold text-[var(--color-glow-strong)] transition hover:bg-[var(--color-panel)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {aiState.kind === 'loading' ? 'Generating…' : '✦ Enhance with AI'}
          </button>
        </div>
      ) : null}

      {!isAiSuccess ? (
        <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
          Lightweight bonus feature: local prompt synthesis, no external model dependency
        </p>
      ) : null}
    </article>
  );
};
