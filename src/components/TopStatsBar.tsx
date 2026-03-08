import { ParkMetrics } from '@/src/game/types';

export function TopStatsBar({ funds, guests, metrics }: { funds: number; guests: number; metrics: ParkMetrics }) {
  const chips = [
    ['Funds', `$${Math.round(funds)}`],
    ['Guests', guests],
    ['Happiness', `${Math.round(metrics.happiness)}%`],
    ['Cleanliness', `${Math.round(metrics.cleanliness)}%`],
    ['Park Rating', `${Math.round(metrics.rating)}%`]
  ];
  return (
    <div className="rounded-3xl bg-white/85 p-3 shadow-soft backdrop-blur">
      <div className="grid grid-cols-5 gap-2">
        {chips.map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl bg-emerald-50 px-3 py-2 text-center">
            <div className="text-[11px] uppercase tracking-wide text-emerald-800/70">{label}</div>
            <div className="text-base font-semibold text-emerald-900">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
