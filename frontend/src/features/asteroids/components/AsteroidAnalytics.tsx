import type { ReactElement } from 'react';
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

export const AsteroidAnalytics = ({ startDate, endDate }: AsteroidAnalyticsProps): ReactElement => {
  const { data } = useAsteroidFeed(startDate, endDate);

  const hazardousCount = data.asteroids.filter((asteroid) => asteroid.hazardous).length;
  const fastest = [...data.asteroids].sort((left, right) => right.velocityKph - left.velocityKph)[0] ?? null;
  const closest = [...data.asteroids].sort((left, right) => left.missDistanceKm - right.missDistanceKm)[0] ?? null;
  const largest = [...data.asteroids].sort((left, right) => right.diameterKmMax - left.diameterKmMax)[0] ?? null;
  const tableRows = [...data.asteroids].sort((left, right) => left.closeApproachDate.localeCompare(right.closeApproachDate));

  const velocityData = tableRows.slice(0, 8).map((a) => ({
    name: truncateName(a.name),
    velocity: Math.round(a.velocityKph),
    hazardous: a.hazardous
  }));

  const scatterBase = tableRows.slice(0, 20).map((a) => ({
    miss: Math.round(a.missDistanceKm / 1000),
    diameter: parseFloat(a.diameterKmMax.toFixed(3)),
    name: a.name,
    hazardous: a.hazardous
  }));
  const safeScatter = scatterBase.filter((d) => !d.hazardous);
  const hazardousScatter = scatterBase.filter((d) => d.hazardous);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-4">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Tracked objects</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-strong)]">{data.counts.total}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Hazardous objects</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-alert)]">{hazardousCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Fastest object</p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">{fastest?.name ?? 'Unavailable'}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {fastest ? `${formatNumber(fastest.velocityKph)} km/h` : 'No data'}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_24px_80px_var(--color-shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Closest pass</p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">{closest?.name ?? 'Unavailable'}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {closest ? `${formatNumber(closest.missDistanceKm)} km` : 'No data'}
          </p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Velocity profile</p>
              <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
                Relative speed across the watch window
              </h3>
            </div>
            <p className="max-w-xs text-right text-sm leading-6 text-[var(--color-text-muted)]">
              Velocity (km/h) per close-approach object. Red bars indicate potentially hazardous asteroids.
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
                    formatter={(v: unknown) => [`${formatNumber(v as number)} km/h`, 'Velocity']}
                  />
                  <Bar dataKey="velocity" radius={[0, 6, 6, 0]} label={{ position: 'right', fontSize: 11, fill: 'var(--color-text-faint)', formatter: (v: number) => formatNumber(v) }}>
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
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Risk matrix</p>
          <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
            Size vs. miss distance
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Diameter (km) on the y-axis, miss distance (×1,000 km) on x-axis.
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
                    label={{ value: 'Miss dist (×1,000 km)', position: 'insideBottom', offset: -16, fontSize: 10, fill: 'var(--color-text-faint)' }}
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
                      const d = payload[0].payload as { name: string; miss: number; diameter: number };
                      return (
                        <div style={tooltipStyle} className="p-3">
                          <p style={labelStyle} className="font-medium">{d.name}</p>
                          <p>Miss: {formatNumber(d.miss * 1000)} km</p>
                          <p>Diameter: {d.diameter} km</p>
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
                  {safeScatter.length > 0 && (
                    <Scatter name="Safe" data={safeScatter} fill="var(--color-glow-strong)" opacity={0.8} />
                  )}
                  {hazardousScatter.length > 0 && (
                    <Scatter name="Hazardous" data={hazardousScatter} fill="var(--color-alert)" opacity={0.9} />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-[0_24px_80px_var(--color-shadow)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-glow-strong)]">Inspection table</p>
            <h3 className="mt-3 text-3xl font-[var(--font-display)] tracking-[-0.05em] text-[var(--color-text-strong)]">
              Raw close-approach view
            </h3>
          </div>
          <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel-soft)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
            {startDate} to {endDate}
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
                <th className="px-4">Object</th>
                <th className="px-4">Date</th>
                <th className="px-4">
                  <span className="inline-flex items-center">
                    Velocity
                    <InfoTooltip text="Speed of the asteroid relative to Earth at its closest approach point, in kilometres per hour." />
                  </span>
                </th>
                <th className="px-4">
                  <span className="inline-flex items-center">
                    Miss distance
                    <InfoTooltip text="How close the asteroid's orbit passes to Earth's centre. Smaller = closer. The Moon is ~384,000 km away for reference." />
                  </span>
                </th>
                <th className="px-4">
                  <span className="inline-flex items-center">
                    Diameter max
                    <InfoTooltip text="Upper bound of the estimated physical size of the asteroid. NASA uses reflectance modelling to derive this range." />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((asteroid) => (
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
        {largest ? (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Largest object in range: <span className="text-[var(--color-text-strong)]">{largest.name}</span> at{' '}
            {largest.diameterKmMax.toFixed(2)} km maximum estimated diameter.
          </p>
        ) : null}
      </article>
    </section>
  );
};
