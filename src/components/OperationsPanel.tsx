import { GameState } from '@/src/game/types';

export function OperationsPanel({ state }: { state: GameState }) {
  return (
    <aside className="w-80 rounded-3xl bg-white/85 p-4 shadow-soft backdrop-blur">
      <h2 className="mb-3 text-lg font-semibold">Live Operations</h2>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <Card title="Ride Queue" value={state.metrics.rideQueue} />
        <Card title="Revenue / min" value={`$${state.revenuePerMinute}`} />
        <Card title="Litter" value={state.metrics.litter} />
        <Card title="Attractions" value={state.metrics.attractionsCount} />
      </div>
      <section className="mt-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Guest reactions</h3>
        <div className="max-h-44 space-y-2 overflow-y-auto">
          {state.eventFeed.map((entry, idx) => (
            <p key={`${entry}-${idx}`} className="rounded-xl bg-emerald-50 p-2 text-xs text-slate-700">
              {entry}
            </p>
          ))}
        </div>
      </section>
      <section className="mt-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Ride status</h3>
        <div className="space-y-1">
          {state.rideStatuses.length === 0 && <p className="text-xs text-slate-500">Place attractions to view status.</p>}
          {state.rideStatuses.map((ride) => (
            <div key={ride.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-2 py-1 text-xs">
              <span>{ride.name}</span>
              <span className="font-medium text-emerald-700">{ride.status}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-emerald-50 p-2">
      <div className="text-[11px] uppercase tracking-wide text-slate-600">{title}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
