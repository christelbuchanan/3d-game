'use client';

import { useEffect } from 'react';
import { BuildSidebar } from '@/src/components/BuildSidebar';
import { IsometricMap } from '@/src/components/IsometricMap';
import { OperationsPanel } from '@/src/components/OperationsPanel';
import { TopStatsBar } from '@/src/components/TopStatsBar';
import { ITEM_MAP } from '@/src/game/data/items';
import { useGameState } from '@/src/game/store/useGameState';
import { canPlace } from '@/src/game/systems/placement';

export default function HomePage() {
  const { state, dispatch, items } = useGameState();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'select', itemId: 'path' });
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [dispatch]);

  useEffect(() => {
    const onContext = () => dispatch({ type: 'select', itemId: 'path' });
    window.addEventListener('contextmenu', onContext);
    return () => window.removeEventListener('contextmenu', onContext);
  }, [dispatch]);

  const canPlaceHover =
    state.hoveredTile && state.selectedItemId !== 'bulldozer'
      ? canPlace(state, state.selectedItemId, state.hoveredTile.x, state.hoveredTile.y)
      : true;

  return (
    <main className="h-screen p-4">
      <div className="mb-3">
        <TopStatsBar funds={state.funds} guests={state.guests} metrics={state.metrics} />
      </div>
      <div className="grid h-[calc(100vh-120px)] grid-cols-[288px_1fr_320px] gap-3">
        <BuildSidebar items={items} selectedItemId={state.selectedItemId} onSelect={(itemId) => dispatch({ type: 'select', itemId })} />

        <IsometricMap
          state={state}
          selectedCanPlace={canPlaceHover}
          onHover={(tile) => dispatch({ type: 'hover', tile })}
          onPlace={(x, y) => dispatch({ type: 'place', x, y })}
          onCamera={(x, y, zoom) => dispatch({ type: 'camera', x, y, zoom })}
        />

        <OperationsPanel state={state} />
      </div>
      <div className="pointer-events-none absolute right-6 top-4 text-xs text-emerald-900/70">Miniature • Current Tool: {ITEM_MAP[state.selectedItemId].name}</div>
    </main>
  );
}
