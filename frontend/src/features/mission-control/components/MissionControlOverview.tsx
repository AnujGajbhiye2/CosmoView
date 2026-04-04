import type { ReactElement } from 'react';
import { Link } from '@tanstack/react-router';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useMissionControlData } from '../hooks/useMissionControlData';

const formatCompactDate = (value: string): string =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(`${value}T00:00:00Z`));

export const MissionControlOverview = (): ReactElement => {
  const { apod, asteroidFeed, epicImages, libraryResults, asteroidRange } = useMissionControlData();

  const hazardousCount = asteroidFeed.asteroids.filter((asteroid) => asteroid.hazardous).length;
  const averageVelocity = asteroidFeed.asteroids.length
    ? Math.round(
        asteroidFeed.asteroids.reduce((sum, asteroid) => sum + asteroid.velocityKph, 0) / asteroidFeed.asteroids.length
      )
    : 0;
  const featuredEpic = epicImages[0] ?? null;
  const featuredSearch = libraryResults.items[0] ?? null;

  return (
    <section className="grid gap-4 lg:grid-cols-12">
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--color-panel-strong)] p-8 shadow-[0_28px_80px_var(--color-shadow)] lg:col-span-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-glow-soft),_transparent_34%)] opacity-80" />
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Live overview</p>
            <h2 className="mt-5 max-w-3xl font-[var(--font-display)] text-4xl tracking-[-0.06em] text-[var(--color-text-strong)] sm:text-6xl">
              Curated access to NASA's imagery, asteroid telemetry, and Earth observation streams.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-faint)] sm:text-lg">
              Mission Control turns the backend into a guided cockpit: one surface for visual discovery, one for
              analytical risk, and one for deep exploration.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="flex items-center text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">
                APOD
                <InfoTooltip text="Astronomy Picture of the Day — NASA's daily featured image or video of our universe, with a description written by a professional astronomer." />
              </p>
              <p className="mt-3 text-2xl font-semibold text-[var(--color-text-strong)]">{formatCompactDate(apod.date)}</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{apod.title}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="flex items-center text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">
                Hazardous objects
                <InfoTooltip text="Potentially Hazardous Asteroids (PHAs) — objects whose orbit brings them within 0.05 AU of Earth and whose diameter exceeds ~140 m." />
              </p>
              <p className="mt-3 text-2xl font-semibold text-[var(--color-text-strong)]">{hazardousCount}</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                In the {asteroidRange.startDate} to {asteroidRange.endDate} watch window.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="flex items-center text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">
                Library pulse
                <InfoTooltip text="Live count of results from NASA's image archive for the current teaser search term (default: 'nebula')." />
              </p>
              <p className="mt-3 text-2xl font-semibold text-[var(--color-text-strong)]">{libraryResults.totalHits}</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">Results available for the current nebula teaser.</p>
            </div>
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)] lg:col-span-4">
        {apod.imageUrl ? (
          <img src={apod.imageUrl} alt={apod.title} loading="eager" decoding="async" className="h-56 w-full object-cover" />
        ) : (
          <div className="flex h-56 items-center justify-center bg-[var(--color-panel-strong)] text-sm text-[var(--color-text-faint)]">
            Media preview unavailable
          </div>
        )}
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Today's frame</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">{apod.title}</h3>
          <p className="mt-3 line-clamp-5 text-sm leading-6 text-[var(--color-text-muted)]">{apod.explanation}</p>
          <Link
            to="/apod"
            className="mt-5 inline-flex rounded-full border border-[var(--color-glow-strong)]/30 bg-[var(--color-glow-strong)]/10 px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-glow-strong)]/50 hover:bg-[var(--color-glow-strong)]/16"
          >
            Explore APOD
          </Link>
        </div>
      </article>

      <article className="rounded-[2rem] border border-white/10 bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)] lg:col-span-4">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Asteroid watch</p>
        <div className="mt-6 grid gap-4">
          <div className="rounded-[1.5rem] border border-white/8 bg-[var(--color-panel-strong)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Tracked objects</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-text-strong)]">{asteroidFeed.counts.total}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-[var(--color-panel-strong)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Average velocity</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-text-strong)]">
              {averageVelocity.toLocaleString('en-US')} <span className="text-base text-[var(--color-text-faint)]">km/h</span>
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Highest-speed approach</p>
            <p className="mt-2 text-lg font-medium text-[var(--color-text-strong)]">
              {asteroidFeed.asteroids[0]?.name ?? 'Awaiting data'}
            </p>
          </div>
          <Link to="/asteroids" className="text-sm text-[var(--color-glow-strong)] hover:text-[var(--color-text-strong)]">
            Open analytics
          </Link>
        </div>
      </article>

      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--color-panel)] shadow-[0_24px_80px_var(--color-shadow)] lg:col-span-4">
        {featuredEpic?.archiveUrl ? (
          <img src={featuredEpic.archiveUrl} alt={featuredEpic.caption} loading="lazy" decoding="async" className="h-52 w-full object-cover" />
        ) : (
          <div className="flex h-52 items-center justify-center bg-[var(--color-panel-strong)] text-sm text-[var(--color-text-faint)]">
            Earth imagery unavailable
          </div>
        )}
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">EPIC preview</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
            Earth observation on {featuredEpic ? formatCompactDate(featuredEpic.date.slice(0, 10)) : '—'}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--color-text-muted)]">
            {featuredEpic?.caption ?? 'A curated Earth view will appear here once EPIC imagery is available for the selected day.'}
          </p>
          <Link to="/earth" className="mt-5 inline-flex text-sm text-[var(--color-glow-strong)] hover:text-[var(--color-text-strong)]">
            Open Earth explorer
          </Link>
        </div>
      </article>

      <article className="rounded-[2rem] border border-white/10 bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)] lg:col-span-4">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Library signal</p>
        <div className="mt-5 flex gap-4">
          {featuredSearch?.previewImageUrl ? (
            <img
              src={featuredSearch.previewImageUrl}
              alt={featuredSearch.title}
              loading="lazy"
              decoding="async"
              className="h-28 w-28 rounded-[1.5rem] object-cover"
            />
          ) : (
            <div className="h-28 w-28 rounded-[1.5rem] bg-[var(--color-panel-strong)]" />
          )}
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
              {featuredSearch?.title ?? 'Nebula search'}
            </h3>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--color-text-muted)]">
              {featuredSearch?.description ?? 'This panel becomes the gateway into the full NASA image library search experience.'}
            </p>
          </div>
        </div>
        <Link to="/library" className="mt-5 inline-flex text-sm text-[var(--color-glow-strong)] hover:text-[var(--color-text-strong)]">
          Search the archive
        </Link>
      </article>
    </section>
  );
};
