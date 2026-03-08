import { ITEM_MAP } from '../data/items';
import { GameState, PlacedItem } from '../types';
import { hasOverlap, inBounds } from '../world/grid';

export function canPlace(state: GameState, itemId: string, x: number, y: number) {
  const item = ITEM_MAP[itemId];
  if (!item || itemId === 'bulldozer') return false;
  if (state.funds < item.price) return false;
  if (!inBounds(x, y, state.mapWidth, state.mapHeight)) return false;
  if (!inBounds(x + item.footprint.w - 1, y + item.footprint.h - 1, state.mapWidth, state.mapHeight)) return false;
  return !hasOverlap(x, y, item.footprint.w, item.footprint.h, state.placements);
}

export function makePlacement(itemId: string, x: number, y: number): PlacedItem {
  const item = ITEM_MAP[itemId];
  return {
    id: `${itemId}-${x}-${y}-${Date.now()}`,
    itemId,
    x,
    y,
    width: item.footprint.w,
    height: item.footprint.h
  };
}

export function removeAt(placements: PlacedItem[], x: number, y: number) {
  const idx = placements.findIndex((p) => x >= p.x && x < p.x + p.width && y >= p.y && y < p.y + p.height);
  if (idx === -1) return { removed: null, placements };
  const removed = placements[idx];
  const next = [...placements.slice(0, idx), ...placements.slice(idx + 1)];
  return { removed, placements: next };
}
