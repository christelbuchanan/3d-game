import { ItemDefinition } from '@/src/game/types';

interface Props {
  items: ItemDefinition[];
  selectedItemId: string;
  onSelect: (id: string) => void;
}

export function BuildSidebar({ items, selectedItemId, onSelect }: Props) {
  return (
    <aside className="w-72 rounded-3xl bg-white/80 p-4 shadow-soft backdrop-blur">
      <h2 className="mb-3 text-lg font-semibold">Build Palette</h2>
      <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: '66vh' }}>
        {items.map((item) => {
          const selected = item.id === selectedItemId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full rounded-2xl border p-3 text-left transition ${
                selected ? 'border-emerald-400 bg-emerald-50' : 'border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-emerald-700">${item.price}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-xs text-slate-700">
        <p className="font-semibold">Controls</p>
        <p>• Drag to pan map</p>
        <p>• Mouse wheel to zoom</p>
        <p>• Right click or Esc to cancel tool</p>
        <p>• Drag with Path selected to paint</p>
      </div>
    </aside>
  );
}
