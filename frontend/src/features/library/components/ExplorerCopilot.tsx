import type { ReactElement } from 'react';
import { buildMissionBrief } from '../helpers/copilot';
import type { ImageSearchDto, ImageSearchItemDto } from '~types/api';

interface ExplorerCopilotProps {
  query: string;
  results: ImageSearchDto;
  selectedItem: ImageSearchItemDto | null;
}

export const ExplorerCopilot = ({
  query,
  results,
  selectedItem
}: ExplorerCopilotProps): ReactElement => {
  const missionBrief = buildMissionBrief(query, results, selectedItem);

  return (
    <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Explorer Copilot</p>
      <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
        Mission brief for the current search
      </h3>
      <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{missionBrief.summary}</p>

      <div className="mt-6 rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Signal read</p>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{missionBrief.signal}</p>
      </div>

      <div className="mt-6 space-y-3">
        {missionBrief.prompts.map((prompt) => (
          <div key={prompt} className="rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
            <p className="text-sm leading-6 text-[var(--color-text-strong)]">{prompt}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
        Lightweight bonus feature: local prompt synthesis, no external model dependency
      </p>
    </article>
  );
};
