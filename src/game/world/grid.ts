import { PlacedItem } from '../types';

export function inBounds(x: number, y: number, mapWidth: number, mapHeight: number) {
  return x >= 0 && y >= 0 && x < mapWidth && y < mapHeight;
}

export function hasOverlap(x: number, y: number, width: number, height: number, placements: PlacedItem[]) {
  return placements.some((placed) =>
    x < placed.x + placed.width &&
    x + width > placed.x &&
    y < placed.y + placed.height &&
    y + height > placed.y
  );
}

export function footprintTiles(x: number, y: number, width: number, height: number) {
  const result: { x: number; y: number }[] = [];
  for (let yy = 0; yy < height; yy += 1) {
    for (let xx = 0; xx < width; xx += 1) {
      result.push({ x: x + xx, y: y + yy });
    }
  }
  return result;
}
