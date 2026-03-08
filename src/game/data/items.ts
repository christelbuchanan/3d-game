import { ItemDefinition } from '../types';

export const ITEMS: ItemDefinition[] = [
  { id: 'path', name: 'Path', category: 'path', price: 8, footprint: { w: 1, h: 1 }, description: 'Connects guests and attractions.', effects: { rating: 0.2, cleanliness: 0.1 } },
  { id: 'bulldozer', name: 'Bulldozer', category: 'tool', price: 0, footprint: { w: 1, h: 1 }, description: 'Remove placed items cleanly.', effects: {} },
  { id: 'ferris', name: 'Ferris Wheel', category: 'attraction', price: 460, footprint: { w: 2, h: 2 }, description: 'Classic skyline favorite.', effects: { happiness: 7, rating: 4, attractionsCount: 1 }, revenuePerMinute: 62, upkeepPerMinute: 15 },
  { id: 'carousel', name: 'Carousel', category: 'attraction', price: 320, footprint: { w: 2, h: 2 }, description: 'Warm nostalgic centerpiece.', effects: { happiness: 5, rating: 3, attractionsCount: 1 }, revenuePerMinute: 48, upkeepPerMinute: 12 },
  { id: 'coaster', name: 'Pocket Coaster', category: 'attraction', price: 680, footprint: { w: 3, h: 2 }, description: 'Compact thrills in miniature.', effects: { happiness: 9, rating: 6, attractionsCount: 1 }, revenuePerMinute: 88, upkeepPerMinute: 20 },
  { id: 'drop', name: 'Drop Tower', category: 'attraction', price: 540, footprint: { w: 2, h: 2 }, description: 'Bold vertical excitement.', effects: { happiness: 8, rating: 5, attractionsCount: 1 }, revenuePerMinute: 70, upkeepPerMinute: 18 },
  { id: 'snack', name: 'Snack Stall', category: 'commerce', price: 120, footprint: { w: 1, h: 1 }, description: 'Quick treats for happy guests.', effects: { happiness: 3, cleanliness: -0.7 }, revenuePerMinute: 24, upkeepPerMinute: 4 },
  { id: 'restroom', name: 'Restroom', category: 'utility', price: 95, footprint: { w: 1, h: 1 }, description: 'Keeps comfort levels high.', effects: { happiness: 2.6, cleanliness: 3.4, rating: 1.5 } },
  { id: 'tree', name: 'Tree Grove', category: 'decoration', price: 28, footprint: { w: 1, h: 1 }, description: 'Adds shade and charm.', effects: { happiness: 1, rating: 1.4 } },
  { id: 'fountain', name: 'Fountain', category: 'decoration', price: 75, footprint: { w: 1, h: 1 }, description: 'Soothing centerpiece splash.', effects: { happiness: 2, rating: 2.5, cleanliness: 0.8 } },
  { id: 'flowers', name: 'Flower Bed', category: 'decoration', price: 22, footprint: { w: 1, h: 1 }, description: 'Colorful details guests love.', effects: { happiness: 0.8, rating: 1.1 } },
  { id: 'lamp', name: 'Park Lamp', category: 'utility', price: 18, footprint: { w: 1, h: 1 }, description: 'Soft glow for ambience.', effects: { happiness: 0.6, rating: 0.8 } },
  { id: 'bench', name: 'Bench', category: 'utility', price: 16, footprint: { w: 1, h: 1 }, description: 'A quick rest between rides.', effects: { happiness: 0.7, cleanliness: 0.4 } }
];

export const ITEM_MAP = Object.fromEntries(ITEMS.map((item) => [item.id, item]));
