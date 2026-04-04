import type { ReactElement } from 'react';
import { useDevEndpoints } from '../hooks/useDevEndpoints';

const architectureNotes = [
  {
    title: 'Frontend',
    body: 'React 19 + Vite 8 with TanStack Router and TanStack Query. The UI is feature-organized, Suspense-driven, and consumes only the Express backend.'
  },
  {
    title: 'Backend',
    body: 'Node.js + Express + TypeScript. NASA API responses are validated and normalized behind typed service modules so the frontend never depends on raw NASA payloads.'
  },
  {
    title: 'Data flow',
    body: 'NASA Open APIs -> Express adapters -> normalized DTOs -> React Query cache -> route-level UI. This keeps secrets server-side and stabilizes the frontend contract.'
  }
] as const;

const stackItems = [
  'React 19',
  'Vite 8',
  'TypeScript',
  'Tailwind CSS v4',
  'TanStack Router',
  'TanStack Query',
  'Express',
  'Zod',
  'Axios'
] as const;

export const LabPageContent = (): ReactElement => {
  const { data } = useDevEndpoints();

  return (
    <div className="space-y-4">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-glow-strong)]">Build Lab</p>
        <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          The engineering notebook behind CosmoView.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">
          This page explains the stack, architecture, backend contract, and the route-level API surface. It is designed
          for reviewers who want the nerdy implementation story without digging through the whole repository first.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stackItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {architectureNotes.map((note) => (
          <article
            key={note.title}
            className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">{note.title}</p>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{note.body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Live backend catalog</p>
          <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
            Endpoint explorer
          </h3>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
            Pulled directly from `/dev/endpoints`, so this page reflects the backend API surface instead of duplicating it by hand.
          </p>
          <div className="mt-6 space-y-4">
            {data.endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--color-glow-strong)]/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--color-glow-strong)]">
                    {endpoint.method}
                  </span>
                  <code className="rounded-full bg-black/10 px-3 py-1 text-sm text-[var(--color-text-strong)]">{endpoint.path}</code>
                </div>
                <h4 className="mt-4 text-xl font-semibold text-[var(--color-text-strong)]">{endpoint.name}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{endpoint.description}</p>
                {endpoint.query ? (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Query params</p>
                    <div className="mt-3 space-y-2">
                      {Object.entries(endpoint.query).map(([key, value]) => (
                        <div key={key} className="rounded-[1rem] border border-[var(--color-border)] px-3 py-2 text-sm">
                          <span className="font-medium text-[var(--color-text-strong)]">{key}</span>
                          <span className="ml-3 text-[var(--color-text-muted)]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 space-y-2">
                  {endpoint.variations.map((variation) => (
                    <div key={variation.path} className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-3 py-3">
                      <p className="text-sm text-[var(--color-text-strong)]">{variation.description}</p>
                      <code className="mt-2 block text-xs text-[var(--color-text-faint)]">{variation.path}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-4">
          <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Request path</p>
            <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
              NASA -> Express -> React
            </h3>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
              <li>1. The React route requests data through a feature-specific API client.</li>
              <li>2. Express validates the request and forwards it to the relevant NASA adapter.</li>
              <li>3. NASA payloads are normalized into stable DTOs.</li>
              <li>4. React Query caches the result and the UI renders through Suspense boundaries.</li>
            </ol>
          </article>

          <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Why this structure</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
              <p>Backend secrets stay server-side and NASA quirks are isolated from the UI.</p>
              <p>Frontend routes stay focused on experience design instead of raw API plumbing.</p>
              <p>The `/dev/endpoints` contract makes the backend self-describing and easy to review.</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Runtime context</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Environment</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.environment}</p>
              </div>
              <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Base path</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.basePath}</p>
              </div>
              <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Total documented routes</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.endpoints.length}</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
