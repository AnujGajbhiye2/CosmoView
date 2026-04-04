import type { ReactElement } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useAsteroidFeed } from '../hooks/useAsteroidFeed';

interface AsteroidAnalyticsProps {
  endDate: string;
  startDate: string;
}

const formatNumber = (value: number): string => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

const truncateName = (name: string): string => name.replace(/[()]/g, '').trim().slice(0, 22);

const tooltipStyle = {
  background: 'var(--color-panel)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.75rem',
  fontSize: '12px',
  color: 'var(--color-text-muted)'
};

const labelStyle = { color: 'var(--color-text-strong)', marginBottom: '2px' };
const rowsPerPage = 10;

type SortKey = 'name' | 'closeApproachDate' | 'velocityKph' | 'missDistanceKm' | 'diameterKmMax';
type SortDirection = 'asc' | 'desc';

const defaultDirectionByColumn: Record<SortKey, SortDirection> = {
  name: 'asc',
  closeApproachDate: 'asc',
  velocityKph: 'desc',
  missDistanceKm: 'asc',
  diameterKmMax: 'desc'
};

export const AsteroidAnalytics = ({ startDate, endDate }: AsteroidAnalyticsProps): ReactElement => {
  const { data } = useAsteroidFeed(startDate, endDate);
  const [sortKey, setSortKey] = useState<SortKey>('closeApproachDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const hazardousCount = data.asteroids.filter((asteroid) => asteroid.hazardous).length;
  const fastest = [...data.asteroids].sort((left, right) => right.velocityKph - left.velocityKph)[0] ?? null;
  const closest = [...data.asteroids].sort((left, right) => left.missDistanceKm - right.missDistanceKm)[0] ?? null;
  const largest = [...data.asteroids].sort((left, right) => right.diameterKmMax - left.diameterKmMax)[0] ?? null;
  const tableRows = [...data.asteroids].sort((left, right) => left.closeApproachDate.localeCompare(right.closeApproachDate));

  const sortedTableRows = useMemo(() => {
    const sortedRows = [...tableRows].sort((left, right) => {
      switch (sortKey) {
        case 'name':
          return left.name.localeCompare(right.name);
        case 'closeApproachDate':
          return left.closeApproachDate.localeCompare(right.closeApproachDate);
        case 'velocityKph':
          return left.velocityKph - right.velocityKph;
        case 'missDistanceKm':
          return left.missDistanceKm - right.missDistanceKm;
        case 'diameterKmMax':
          return left.diameterKmMax - right.diameterKmMax;
      }
    });

    return sortDirection === 'asc' ? sortedRows : sortedRows.reverse();
  }, [sortDirection, sortKey, tableRows]);

  const totalPages = Math.max(1, Math.ceil(sortedTableRows.length / rowsPerPage));
  const paginatedRows = useMemo(
    () => sortedTableRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [currentPage, sortedTableRows]
  );
  const visibleRangeStart = sortedTableRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const visibleRangeEnd = sortedTableRows.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, sortedTableRows.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortDirection, sortKey, startDate, endDate]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSort = (nextKey: SortKey): void => {
    if (sortKey === nextKey) {
      setSortDirection((currentDirection) => (currentDirection === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(defaultDirectionByColumn[nextKey]);
  };

  const renderSortIndicator = (column: SortKey): string => {
    if (sortKey !== column) {
      return '<>';
    }

    return sortDirection === 'asc' ? '^' : 'v';
  };

  const velocityData = tableRows.slice(0, 8).map((asteroid) => ({
    name: truncateName(asteroid.name),
    velocity: Math.round(asteroid.velocityKph),
    hazardous: asteroid.hazardous
  }));

  const scatterBase = tableRows.slice(0, 20).map((asteroid) => ({
    miss: Math.round(asteroid.missDistanceKm / 1000),
    diameter: parseFloat(asteroid.diameterKmMax.toFixed(3)),
    name: asteroid.name,
    hazardous: asteroid.hazardous
  }));
  const safeScatter = scatterBase.filter((point) => !point.hazardous);
  const hazardousScatter = scatterBase.filter((point) => point.hazardous);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-4">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Tracked objects</p>
            <InfoTooltip text="The number of near-Earth objects NASA returned for the selected date range." />
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-strong)]">{data.counts.total}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Total near-Earth objects reported by NASA for this date window.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Hazardous objects</p>
            <InfoTooltip text="NASA's potentially hazardous flag is a classification based on orbit and size. It does not mean an impact is predicted." />
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-alert)]">{hazardousCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            NASA has tagged these objects as potentially hazardous, not as impact predictions.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Fastest object</p>
            <InfoTooltip text="The object moving fastest relative to Earth at its closest approach in the selected date range." />
          </div>
          <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">{fastest?.name ?? 'Unavailable'}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {fastest ? `${formatNumber(fastest.velocityKph)} km/h` : 'No data'}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            This is the highest reported approach speed relative to Earth in this window.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Closest pass</p>
            <InfoTooltip text="The object with the smallest reported miss distance in the selected date range." />
          </div>
          <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">{closest?.name ?? 'Unavailable'}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {closest ? `${formatNumber(closest.missDistanceKm)} km` : 'No data'}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            This is the closest reported flyby distance to Earth in this range.
          </p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Velocity profile</p>
              <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
                Relative speed across the watch window
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-faint)]">
                Longer bars mean the object is moving faster relative to Earth, and red bars mark NASA-flagged hazardous objects.
              </p>
            </div>
            <p className="max-w-xs text-right text-sm leading-6 text-[var(--color-text-faint)]">
              Compare how fast each object is moving at close approach.
            </p>
          </div>
          <div className="mt-6">
            {velocityData.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-text-faint)]">No asteroid data for this range.</p>
            ) : (
              <ResponsiveContainer width="100%" height={Math.max(velocityData.length * 44, 160)}>
                <BarChart layout="vertical" data={velocityData} margin={{ left: 0, right: 48, top: 4, bottom: 4 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={148}
                    tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--color-panel-soft)' }}
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    formatter={(value: unknown) => [`${formatNumber(value as number)} km/h`, 'Velocity']}
                  />
                  <Bar
                    dataKey="velocity"
                    radius={[0, 6, 6, 0]}
                    label={{ position: 'right', fontSize: 11, fill: 'var(--color-text-faint)', formatter: (value: number) => formatNumber(value) }}
                  >
                    {velocityData.map((entry, index) => (
                      <Cell key={index} fill={entry.hazardous ? 'var(--color-alert)' : 'var(--color-glow-strong)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Risk matrix</p>
          <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
            Size vs. miss distance
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-faint)]">
            Points farther left are closer to Earth, points higher up are larger, and red points are NASA-flagged hazardous objects.
          </p>
          <div className="mt-4">
            {scatterBase.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-text-faint)]">No asteroid data for this range.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart margin={{ left: 8, right: 16, top: 8, bottom: 24 }}>
                  <XAxis
                    dataKey="miss"
                    name="Miss distance"
                    type="number"
                    tick={{ fontSize: 10, fill: 'var(--color-text-faint)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                    label={{ value: 'Miss dist (x1,000 km)', position: 'insideBottom', offset: -16, fontSize: 10, fill: 'var(--color-text-faint)' }}
                  />
                  <YAxis
                    dataKey="diameter"
                    name="Diameter"
                    type="number"
                    tick={{ fontSize: 10, fill: 'var(--color-text-faint)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                    label={{ value: 'Diameter (km)', angle: -90, position: 'insideLeft', offset: 12, fontSize: 10, fill: 'var(--color-text-faint)' }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: 'var(--color-border)' }}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const point = payload[0].payload as { name: string; miss: number; diameter: number };
                      return (
                        <div style={tooltipStyle} className="p-3">
                          <p style={labelStyle} className="font-medium">{point.name}</p>
                          <p>Miss: {formatNumber(point.miss * 1000)} km</p>
                          <p>Diameter: {point.diameter} km</p>
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    formatter={(value) => (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{value}</span>
                    )}
                  />
                  {safeScatter.length > 0 ? (
                    <Scatter name="Safe" data={safeScatter} fill="var(--color-glow-strong)" opacity={0.8} />
                  ) : null}
                  {hazardousScatter.length > 0 ? (
                    <Scatter name="Hazardous" data={hazardousScatter} fill="var(--color-alert)" opacity={0.9} />
                  ) : null}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-glow-strong)]">Inspection table</p>
            <h3 className="mt-4 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
              Raw close-approach view
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-faint)]">
              This is the per-object list for the selected date range. Click any sortable column to reorder it, and use the 10-row pages to scan the results more easily.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
              {startDate} to {endDate}
            </div>
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
                <th className="px-4">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => handleSort('name')} className="inline-flex cursor-pointer items-center gap-2">
                      Object
                      <span>{renderSortIndicator('name')}</span>
                    </button>
                    <InfoTooltip text="The asteroid name or catalog label NASA uses for that object." />
                  </div>
                </th>
                <th className="px-4">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => handleSort('closeApproachDate')} className="inline-flex cursor-pointer items-center gap-2">
                      Date
                      <span>{renderSortIndicator('closeApproachDate')}</span>
                    </button>
                    <InfoTooltip text="The reported date of the asteroid's close approach to Earth." />
                  </div>
                </th>
                <th className="px-4">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => handleSort('velocityKph')} className="inline-flex cursor-pointer items-center gap-2">
                      Velocity
                      <span>{renderSortIndicator('velocityKph')}</span>
                    </button>
                    <InfoTooltip text="Speed of the asteroid relative to Earth at its closest approach point, in kilometres per hour." />
                  </div>
                </th>
                <th className="px-4">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => handleSort('missDistanceKm')} className="inline-flex cursor-pointer items-center gap-2">
                      Miss distance
                      <span>{renderSortIndicator('missDistanceKm')}</span>
                    </button>
                    <InfoTooltip text="How close the asteroid's orbit passes to Earth's centre. Smaller = closer. The Moon is ~384,000 km away for reference." />
                  </div>
                </th>
                <th className="px-4">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => handleSort('diameterKmMax')} className="inline-flex cursor-pointer items-center gap-2">
                      Diameter max
                      <span>{renderSortIndicator('diameterKmMax')}</span>
                    </button>
                    <InfoTooltip text="Upper bound of the estimated physical size of the asteroid. NASA uses reflectance modelling to derive this range." />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((asteroid) => (
                <tr key={`${asteroid.id}-row`} className="rounded-[1.25rem] bg-[var(--color-panel-soft)] text-sm text-[var(--color-text-muted)]">
                  <td className="rounded-l-[1.25rem] px-4 py-4 text-[var(--color-text-strong)]">{asteroid.name}</td>
                  <td className="px-4 py-4">{asteroid.closeApproachDate}</td>
                  <td className="px-4 py-4">{formatNumber(asteroid.velocityKph)} km/h</td>
                  <td className="px-4 py-4">{formatNumber(asteroid.missDistanceKm)} km</td>
                  <td className="rounded-r-[1.25rem] px-4 py-4">{asteroid.diameterKmMax.toFixed(2)} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing {visibleRangeStart}-{visibleRangeEnd} of {sortedTableRows.length} objects
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {largest ? (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Largest object in range: <span className="text-[var(--color-text-strong)]">{largest.name}</span> at {largest.diameterKmMax.toFixed(2)} km maximum estimated diameter.
          </p>
        ) : null}
      </article>
    </section>
  );
};
