export const TILE_WIDTH = 72;
export const TILE_HEIGHT = 36;

export function tileToScreen(x: number, y: number) {
  return {
    sx: (x - y) * (TILE_WIDTH / 2),
    sy: (x + y) * (TILE_HEIGHT / 2)
  };
}

export function screenToTile(px: number, py: number) {
  const tx = (py / (TILE_HEIGHT / 2) + px / (TILE_WIDTH / 2)) / 2;
  const ty = (py / (TILE_HEIGHT / 2) - px / (TILE_WIDTH / 2)) / 2;
  return { x: Math.floor(tx), y: Math.floor(ty) };
}
