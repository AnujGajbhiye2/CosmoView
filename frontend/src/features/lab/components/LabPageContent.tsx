import type { ComponentType, ReactElement } from 'react';
import type { SVGProps } from 'react';
import { useState } from 'react';
import { SpaceLoader } from '@/components/feedback/SpaceLoader';
import {
  ArchiveIcon,
  BackendIcon,
  CarouselNextIcon,
  CarouselPrevIcon,
  DataFlowIcon,
  EndpointIcon,
  FrontendIcon,
  LoadingIcon,
  SiExpress,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  TanStackIcon,
  AxiosIcon,
  ZodIcon
} from '@/components/ui/icons';
import { useDevEndpoints } from '../hooks/useDevEndpoints';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { color?: string; size?: number }>;

const architectureNotes = [
  {
    icon: FrontendIcon,
    title: 'Frontend',
    body: 'React 19 + Vite 8 with TanStack Router and TanStack Query. The UI is feature-organized, Suspense-driven, and consumes only the Express backend.'
  },
  {
    icon: BackendIcon,
    title: 'Backend',
    body: 'Node.js + Express + TypeScript. NASA API responses are validated and normalized behind typed service modules so the frontend never depends on raw NASA payloads.'
  },
  {
    icon: DataFlowIcon,
    title: 'Data flow',
    body: 'NASA Open APIs -> Express adapters -> normalized DTOs -> React Query cache -> route-level UI. This keeps secrets server-side and stabilizes the frontend contract.'
  }
] as const;

const stackItems = [
  { icon: SiReact, iconColor: '#61DAFB', label: 'React 19' },
  { icon: SiVite, iconColor: '#646CFF', label: 'Vite 8' },
  { icon: SiTypescript, iconColor: '#3178C6', label: 'TypeScript' },
  { icon: SiTailwindcss, iconColor: '#06B6D4', label: 'Tailwind CSS v4' },
  { icon: TanStackIcon, iconColor: '#FF6B3D', label: 'TanStack Router' },
  { icon: TanStackIcon, iconColor: '#FF6B3D', label: 'TanStack Query' },
  { icon: SiExpress, iconColor: '#7DD3FC', label: 'Express' },
  { icon: ZodIcon, iconColor: '#A78BFA', label: 'Zod' },
  { icon: AxiosIcon, iconColor: '#F97316', label: 'Axios' }
] as const;

export const LabPageContent = (): ReactElement => {
  const { data } = useDevEndpoints();
  const [activeEndpointIndex, setActiveEndpointIndex] = useState<number>(0);
  const activeEndpoint = data.endpoints[activeEndpointIndex] ?? null;

  const handlePreviousEndpoint = (): void => {
    setActiveEndpointIndex((currentIndex) =>
      currentIndex === 0 ? data.endpoints.length - 1 : currentIndex - 1
    );
  };

  const handleNextEndpoint = (): void => {
    setActiveEndpointIndex((currentIndex) =>
      currentIndex === data.endpoints.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_24px_80px_var(--color-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Build Lab</p>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-5xl">
          The engineering notebook behind CosmoView.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          This page explains the stack, architecture, backend contract, and the route-level API surface. It is designed
          for reviewers who want the nerdy implementation story without digging through the whole repository first.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stackItems.map(({ icon: Icon, iconColor, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" color={iconColor} size={14} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {architectureNotes.map((note) => (
          <article
            key={note.title}
            className="rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
              <note.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <p>{note.title}</p>
            </div>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{note.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <ArchiveIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>Library search notes</p>
        </div>
        <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          Search interaction improvements
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Input handling</p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
              Library queries now commit after a short debounce so typing stays responsive instead of triggering a new fetch
              on every effective keystroke.
            </p>
          </div>
          <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Result flow</p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
              Results now live inside a contained scroll pane and append with infinite loading, while the selected detail
              panel remains stable on the right.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <LoadingIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>Loader preview</p>
        </div>
        <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          Shared loading state
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">
          This is the same inline loader used by Suspense fallbacks on the data-heavy routes, shown here as a static preview
          so you can evaluate the motion and composition without forcing repeated reloads.
        </p>
        <div className="mt-6">
          <SpaceLoader
            className="min-h-[20rem]"
            title="Contacting mission control"
            message="Fetching the latest NASA telemetry and preparing your next view."
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
            <EndpointIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <p>Live backend catalog</p>
          </div>
          <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
            Endpoint explorer
          </h3>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
            Pulled directly from `/dev/endpoints`, so this page reflects the backend API surface instead of duplicating it by hand.
          </p>
          {activeEndpoint ? (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
                  {activeEndpointIndex + 1} / {data.endpoints.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousEndpoint}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
                    aria-label="Previous endpoint"
                  >
                    <CarouselPrevIcon aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextEndpoint}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
                    aria-label="Next endpoint"
                  >
                    <CarouselNextIcon aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--color-glow-strong)]/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--color-glow-strong)]">
                    {activeEndpoint.method}
                  </span>
                  <code className="rounded-full bg-black/10 px-3 py-1 text-sm text-[var(--color-text-strong)]">{activeEndpoint.path}</code>
                </div>
                <h4 className="mt-4 text-xl font-semibold text-[var(--color-text-strong)]">{activeEndpoint.name}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{activeEndpoint.description}</p>
                {activeEndpoint.query ? (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Query params</p>
                    <div className="mt-3 space-y-2">
                      {Object.entries(activeEndpoint.query).map(([key, value]) => (
                        <div key={key} className="rounded-[1rem] border border-[var(--color-border)] px-3 py-2 text-sm">
                          <span className="font-medium text-[var(--color-text-strong)]">{key}</span>
                          <span className="ml-3 text-[var(--color-text-muted)]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 space-y-2">
                  {activeEndpoint.variations.map((variation) => (
                    <div key={variation.path} className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-3 py-3">
                      <p className="text-sm text-[var(--color-text-strong)]">{variation.description}</p>
                      <code className="mt-2 block text-xs text-[var(--color-text-faint)]">{variation.path}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </article>

        <div className="space-y-4">
          <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
              <DataFlowIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <p>Request path</p>
            </div>
            <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
              {"NASA -> Express -> React"}
            </h3>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
              <li>1. The React route requests data through a feature-specific API client.</li>
              <li>2. Express validates the request and forwards it to the relevant NASA adapter.</li>
              <li>3. NASA payloads are normalized into stable DTOs.</li>
              <li>4. React Query caches the result and the UI renders through Suspense boundaries.</li>
            </ol>
          </article>

          <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
              <BackendIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <p>Why this structure</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
              <p>Backend secrets stay server-side and NASA quirks are isolated from the UI.</p>
              <p>Frontend routes stay focused on experience design instead of raw API plumbing.</p>
              <p>The `/dev/endpoints` contract makes the backend self-describing and easy to review.</p>
            </div>
          </article>

          <article className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
              <FrontendIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <p>Runtime context</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Environment</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.environment}</p>
              </div>
              <div className="rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Base path</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">{data.basePath}</p>
              </div>
              <div className="rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
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
