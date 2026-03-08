import { GameState } from '../types';

export const SAMPLE_STATE: Partial<GameState> = {
  funds: 1420,
  guests: 64,
  placements: [
    { id: 's1', itemId: 'path', x: 9, y: 9, width: 1, height: 1 },
    { id: 's2', itemId: 'path', x: 10, y: 9, width: 1, height: 1 },
    { id: 's3', itemId: 'path', x: 11, y: 9, width: 1, height: 1 },
    { id: 's4', itemId: 'path', x: 10, y: 10, width: 1, height: 1 },
    { id: 's5', itemId: 'carousel', x: 12, y: 8, width: 2, height: 2 },
    { id: 's6', itemId: 'snack', x: 11, y: 10, width: 1, height: 1 },
    { id: 's7', itemId: 'fountain', x: 9, y: 10, width: 1, height: 1 },
    { id: 's8', itemId: 'bench', x: 9, y: 8, width: 1, height: 1 },
    { id: 's9', itemId: 'tree', x: 8, y: 10, width: 1, height: 1 }
  ],
  eventFeed: ['Soft opening complete. Guests are pouring in.', 'Carousel wrapped a cycle with smiling guests.']
};
