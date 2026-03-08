'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { ITEMS, ITEM_MAP } from '../data/items';
import { SAMPLE_STATE } from '../data/sampleState';
import { recalcMetrics } from '../systems/simulation';
import { canPlace, makePlacement, removeAt } from '../systems/placement';
import { GameState } from '../types';

const STORAGE_KEY = 'miniature-save';

const initialState: GameState = {
  funds: 1600,
  guests: 12,
  selectedItemId: 'path',
  mapWidth: 22,
  mapHeight: 22,
  hoveredTile: null,
  camera: { x: 0, y: -120, zoom: 1 },
  placements: [],
  metrics: { happiness: 55, cleanliness: 70, rating: 52, rideQueue: 0, litter: 0, attractionsCount: 0 },
  revenuePerMinute: 0,
  eventFeed: ['Welcome to Miniature. Start by painting paths.'],
  rideStatuses: [],
  toolMode: 'paint'
};

type Action =
  | { type: 'select'; itemId: string }
  | { type: 'hover'; tile: { x: number; y: number } | null }
  | { type: 'place'; x: number; y: number }
  | { type: 'simulate' }
  | { type: 'camera'; x: number; y: number; zoom: number }
  | { type: 'hydrate'; state: Partial<GameState> };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.state };
    case 'camera':
      return { ...state, camera: { x: action.x, y: action.y, zoom: action.zoom } };
    case 'select':
      return { ...state, selectedItemId: action.itemId, toolMode: action.itemId === 'bulldozer' ? 'bulldoze' : 'paint' };
    case 'hover':
      return { ...state, hoveredTile: action.tile };
    case 'place': {
      if (state.selectedItemId === 'bulldozer') {
        const removed = removeAt(state.placements, action.x, action.y);
        if (!removed.removed) return state;
        return {
          ...state,
          placements: removed.placements,
          eventFeed: [`${ITEM_MAP[removed.removed.itemId]?.name ?? 'Item'} removed with care.`, ...state.eventFeed].slice(0, 10)
        };
      }
      if (!canPlace(state, state.selectedItemId, action.x, action.y)) return state;
      const item = ITEM_MAP[state.selectedItemId];
      const placement = makePlacement(state.selectedItemId, action.x, action.y);
      return {
        ...state,
        funds: state.funds - item.price,
        placements: [...state.placements, placement],
        eventFeed: [`${item.name} placed at ${action.x},${action.y}.`, ...state.eventFeed].slice(0, 10)
      };
    }
    case 'simulate':
      return recalcMetrics(state);
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      dispatch({ type: 'hydrate', state: JSON.parse(raw) as Partial<GameState> });
    } else {
      dispatch({ type: 'hydrate', state: SAMPLE_STATE });
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'simulate' }), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selected = useMemo(() => ITEMS.find((item) => item.id === state.selectedItemId), [state.selectedItemId]);

  return { state, dispatch, selected, items: ITEMS };
}
