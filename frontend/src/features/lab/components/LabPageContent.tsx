import type { ReactElement } from 'react';
import { useState } from 'react';
import { SpaceLoader } from '@/components/feedback/SpaceLoader';
import {
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
import { getEndpointSample } from '@/features/lab/helpers/endpointSamples';
import { useDevEndpoints } from '../hooks/useDevEndpoints';

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

const featureHighlights = [
  {
    label: 'Performance',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    items: [
      'TTL-based memory cache per endpoint — APOD 1 h, EPIC 30 min, NeoWs 15 min',
      'React Query stale-while-revalidate keeps the UI snappy without redundant fetches',
      'All archive images load lazily with decoding="async" to stay off the main thread',
      'Rate limiter (60 req/min) guards the backend from accidental hammering',
      'Vite 8 + Rolldown pipeline delivers near-instant HMR in development',
    ],
  },
  {
    label: 'Accessibility',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <circle cx="12" cy="5" r="1" />
        <path d="M9 20l3-9 3 9M6 11h12" />
      </svg>
    ),
    items: [
      'Skip-to-main-content link appears on keyboard focus — no mouse required',
      'aria-current="page" marks the active nav link for screen readers',
      'aria-label on every icon-only button and the main nav landmark',
      'aria-pressed on EPIC frame selectors communicates toggle state',
      'role="status" + sr-only text on all skeleton loaders announces loading to assistive tech',
      'focus-visible rings and full keyboard navigation across all interactive elements',
    ],
  },
  {
    label: 'Dark / Light Mode',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    items: [
      'System-preference-aware default — respects prefers-color-scheme on first visit',
      'User choice persisted in localStorage — survives page reloads and tab restores',
      'Entire palette driven by CSS custom properties — no class-name duplication',
      'Smooth transition-colors on all theme-sensitive surfaces',
      'Toggle visible in both mobile header and desktop sidebar positions',
    ],
  },
  {
    label: 'AI Copilot',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
        <path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
      </svg>
    ),
    items: [
      'Explorer Copilot lives on the Library route alongside every search result set',
      'Synthesises the active query into a contextual "mission brief" from live results',
      'Generates 3 tailored follow-up exploration prompts based on what was found',
      '100 % local and heuristic-based — no external LLM API key required',
      'Designed as a UX enhancement layer on top of real NASA archive data',
    ],
  },
  {
    label: 'Error Handling',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    items: [
      'QueryErrorResetBoundary + ErrorBoundary wraps every data-dependent section',
      'Retry button on every error state — one click restores the live feed',
      'Backend returns structured { error: { code, message } } envelopes on all failures',
      'Zod validates env vars, query params, and NASA upstream responses at every layer',
      'NASA 7-day range constraint surfaced as a clear 400 VALIDATION_ERROR',
    ],
  },
  {
    label: 'Code Quality',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    items: [
      'Full TypeScript end-to-end — frontend and backend share zero any escapes',
      'Feature-based folder structure: api/ → hooks/ → components/ → helpers/',
      'Conventional Commits enforced across the entire git history',
      '24 backend unit tests (Vitest) + 7 Playwright e2e spec files',
      'GitHub Actions CI/CD: type check + unit tests gate every PR before deploy',
    ],
  },
] as const;

const additionalTouches = [
  { label: 'Sorting', detail: 'Asteroid table sortable by 5 columns — name, date, velocity, miss distance, diameter' },
  { label: 'Pagination', detail: '10 rows per page with previous / next controls' },
  { label: 'Debounced search', detail: '350 ms input delay before firing queries — typing stays responsive' },
  { label: 'Infinite scroll', detail: '"Load more" appends archive results while the detail panel stays stable on the right' },
  { label: 'APOD history', detail: 'Date picker navigates the full archive back to 16 June 1995' },
  { label: 'EPIC frames', detail: 'Frame-by-frame selector with centroid coordinates per capture' },
  { label: 'Range guard', detail: 'NASA 7-day NeoWs constraint enforced on both frontend and backend' },
  { label: 'Skeleton loaders', detail: 'Content-shaped shimmer placeholders on APOD, Earth, and Library — no spinners' },
  { label: 'Responsive', detail: 'Mobile-first layout tested at phone, tablet, and desktop breakpoints' },
  { label: 'Local e2e', detail: 'playwright webServer auto-starts the dev server pointed at localhost backend to avoid CORS' },
  { label: 'CI e2e', detail: 'Render health-check polling gates playwright from running before the new backend deploy is live' },
] as const;

export const LabPageContent = (): ReactElement => {
  const { data } = useDevEndpoints();
  const [activeEndpointIndex, setActiveEndpointIndex] = useState<number>(0);
  const [openHighlight, setOpenHighlight] = useState<string>('Performance');
  const activeEndpoint = data.endpoints[activeEndpointIndex] ?? null;
  const activeEndpointSample = activeEndpoint ? getEndpointSample(activeEndpoint.path) : null;

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

      {/* ── Hero ── */}
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

      {/* ── Architecture Notes ── */}
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

      {/* ── Project Highlights (accordion) ── */}
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <p>Project Highlights</p>
        </div>
        <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          What makes CosmoView tick.
        </h3>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          A categorised breakdown of the engineering and UX decisions that set this project apart. Click any category to expand it.
        </p>

        <div className="mt-6 divide-y divide-[var(--color-border)] rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)]">
          {featureHighlights.map(({ label, icon, items }) => {
            const isOpen = openHighlight === label;
            return (
              <div key={label}>
                <button
                  type="button"
                  onClick={() => setOpenHighlight(isOpen ? '' : label)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--color-panel)]"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
                    {icon}
                    <span>{label}</span>
                  </div>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 shrink-0 text-[var(--color-text-faint)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen ? (
                  <ul className="space-y-2 px-5 pb-5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--color-text-muted)]">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-glow)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Explorer Copilot deep-dive ── */}
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
            <path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
          </svg>
          <p>Explorer Copilot</p>
        </div>
        <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          Local AI feature — no model API required.
        </h3>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-faint)]">
          Explorer Copilot is a lightweight prompt synthesis layer that lives on the{' '}
          <span className="font-medium text-[var(--color-text-muted)]">/library</span> route. It reads the active search
          query, result set, and selected item, then assembles a contextual "mission brief" entirely in the browser — no
          external LLM call, no API key, no latency spike.
        </p>

        {/* Pipeline steps */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-text-faint)]">How it works</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Search query', body: 'User types a topic — e.g. "nebula". The debounced input commits and triggers the NASA image library fetch.' },
              { step: '02', title: 'Result set', body: 'The API returns up to 100 catalog items. The copilot reads totalHits and the first page of results.' },
              { step: '03', title: 'Selected item', body: 'User clicks a card. The copilot receives the item\'s title, description, and dateCreated for richer output.' },
              { step: '04', title: 'Mission brief', body: 'buildMissionBrief() assembles a summary, a signal read, and 3 follow-up prompts — all from string templates.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-4">
                <p className="font-[var(--font-display)] text-2xl tracking-[-0.04em] text-[var(--color-glow)]/40">{step}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-strong)]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Output breakdown — static example */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-text-faint)]">Output — example for query "nebula"</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">

            {/* Summary */}
            <div className="rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Summary</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                Searching for "nebula" surfaced 10,542 catalog hits. The current frame, "Horsehead Nebula Wide Field",
                was created on 2003-04-14 and suggests a useful line of inquiry around visual composition, mission
                context, and scientific subject matter.
              </p>
            </div>

            {/* Signal read */}
            <div className="rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Signal read</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                A Hubble Space Telescope image of the iconic Horsehead Nebula in Orion, captured in infrared light.
                The backlit pillar of gas and dust is roughly 3.5 light-years tall…
              </p>
            </div>

            {/* Follow-up prompts */}
            <div className="rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Follow-up prompts</p>
              <ol className="mt-3 space-y-3">
                {[
                  'Compare "Horsehead Nebula Wide Field" with today\'s APOD and note what kind of space storytelling each image supports.',
                  'Use the nebula search results to build a three-image mini exhibition around one scientific theme.',
                  'Read the description and ask what mission or instrument would make this frame more meaningful to a viewer.',
                ].map((prompt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--color-text-muted)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[0.65rem] font-bold text-[var(--color-glow)]">
                      {i + 1}
                    </span>
                    {prompt}
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>

        {/* Technical callout */}
        <div className="mt-6 flex items-start gap-3 rounded-[0.875rem] border border-[var(--color-border)] bg-[var(--color-panel-soft)] p-5">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-glow)]">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text-strong)]">Implementation note — </span>
            the entire copilot lives in{' '}
            <code className="rounded bg-black/10 px-1.5 py-0.5 text-xs">features/library/helpers/copilot.ts</code>
            {' '}as a pure function:{' '}
            <code className="rounded bg-black/10 px-1.5 py-0.5 text-xs">buildMissionBrief(query, results, selectedItem)</code>.
            {' '}It uses string interpolation and conditional branching only — no model, no fetch, no state. The{' '}
            <code className="rounded bg-black/10 px-1.5 py-0.5 text-xs">ExplorerCopilot</code>
            {' '}component calls it on every render and the output updates instantly as the user clicks through results.
          </p>
        </div>
      </section>

      {/* ── Loader preview ── */}
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

      {/* ── Live endpoint explorer ── */}
      <section className="grid gap-4 xl:grid-cols-12">
        <article className="xl:col-span-6 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)] max-h-[57rem] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--color-border)] hover:scrollbar-thumb-[var(--color-glow-strong)]">
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
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
                    aria-label="Previous endpoint"
                  >
                    <CarouselPrevIcon aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextEndpoint}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)]"
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
                {activeEndpointSample ? (
                  <div className="mt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">Sample output</p>
                      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                        static snapshot
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      Captured from the local backend and sanitized so the example stays stable while documenting the real response shape.
                    </p>
                    <pre className="mt-3 h-[18rem] w-full max-w-full overflow-auto rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-4 font-mono text-xs leading-6 text-[var(--color-text-strong)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      <code>{activeEndpointSample}</code>
                    </pre>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </article>

        <div className="space-y-4 xl:col-span-6">
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

      {/* ── Additional Touches ── */}
      <section className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <p>Additional Touches</p>
        </div>
        <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
          Smaller touches that add up.
        </h3>
        <p className="mt-3 text-base leading-7 text-[var(--color-text-faint)]">
          The polish layer — each one a deliberate decision rather than an afterthought.
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {additionalTouches.map(({ label, detail }) => (
            <div key={label} className="flex items-start gap-3">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-glow)]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <dt className="text-sm font-semibold text-[var(--color-text-strong)]">{label}</dt>
                <dd className="mt-0.5 text-sm leading-6 text-[var(--color-text-muted)]">{detail}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

    </div>
  );
};
