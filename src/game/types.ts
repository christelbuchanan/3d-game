export type ItemCategory = 'tool' | 'path' | 'attraction' | 'utility' | 'decoration' | 'commerce';

export type ToolMode = 'none' | 'paint' | 'bulldoze';

export interface ItemDefinition {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  footprint: { w: number; h: number };
  description: string;
  effects: Partial<ParkMetrics>;
  revenuePerMinute?: number;
  upkeepPerMinute?: number;
}

export interface PlacedItem {
  id: string;
  itemId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ParkMetrics {
  happiness: number;
  cleanliness: number;
  rating: number;
  rideQueue: number;
  litter: number;
  attractionsCount: number;
}

export interface GameState {
  funds: number;
  guests: number;
  selectedItemId: string;
  mapWidth: number;
  mapHeight: number;
  hoveredTile: { x: number; y: number } | null;
  camera: { x: number; y: number; zoom: number };
  placements: PlacedItem[];
  metrics: ParkMetrics;
  revenuePerMinute: number;
  eventFeed: string[];
  rideStatuses: { name: string; status: string }[];
  toolMode: ToolMode;
}
