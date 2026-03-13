'use client';

import { useMemo, useRef, useState } from 'react';
import { ITEM_MAP } from '@/src/game/data/items';
import { tileToScreen, screenToTile, TILE_HEIGHT, TILE_WIDTH } from '@/src/game/rendering/isometric';
import { GameState } from '@/src/game/types';

interface Props {
  state: GameState;
  onHover: (tile: { x: number; y: number } | null) => void;
  onPlace: (x: number, y: number) => void;
  onCamera: (x: number, y: number, zoom: number) => void;
  selectedCanPlace: boolean;
}

export function IsometricMap({ state, onHover, onPlace, onCamera, selectedCanPlace }: Props) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const [painting, setPainting] = useState(false);

  const mapTiles = useMemo(() => {
    const tiles: { x: number; y: number }[] = [];
    for (let y = 0; y < state.mapHeight; y += 1) {
      for (let x = 0; x < state.mapWidth; x += 1) tiles.push({ x, y });
    }
    return tiles;
  }, [state.mapHeight, state.mapWidth]);

  const toTile = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2 - state.camera.x) / state.camera.zoom;
    const py = (e.clientY - rect.top - 160 - state.camera.y) / state.camera.zoom;
    return screenToTile(px, py);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#f7f5eb] to-[#e8f0e7] shadow-soft">
      <svg
        className="h-full w-full"
        onPointerMove={(e: React.PointerEvent<SVGSVGElement>) => {
          if (dragging) {
            onCamera(dragStart.current.cx + (e.clientX - dragStart.current.x), dragStart.current.cy + (e.clientY - dragStart.current.y), state.camera.zoom);
            return;
          }
          const tile = toTile(e);
          onHover(tile);
          if (painting && state.selectedItemId === 'path') onPlace(tile.x, tile.y);
        }}
        onPointerLeave={() => onHover(null)}
        onPointerDown={(e: React.PointerEvent<SVGSVGElement>) => {
          if (e.button === 2) return;
          if (e.shiftKey || e.button === 1) {
            setDragging(true);
            dragStart.current = { x: e.clientX, y: e.clientY, cx: state.camera.x, cy: state.camera.y };
          } else {
            const tile = toTile(e);
            onPlace(tile.x, tile.y);
            if (state.selectedItemId === 'path') setPainting(true);
          }
        }}
        onPointerUp={() => {
          setDragging(false);
          setPainting(false);
        }}
        onWheel={(e: React.WheelEvent<SVGSVGElement>) => {
          e.preventDefault();
          const zoom = Math.max(0.55, Math.min(1.8, state.camera.zoom + (e.deltaY > 0 ? -0.08 : 0.08)));
          onCamera(state.camera.x, state.camera.y, zoom);
        }}
        onContextMenu={(e: React.MouseEvent<SVGSVGElement>) => e.preventDefault()}
      >
        <g transform={`translate(${520 + state.camera.x}, ${160 + state.camera.y}) scale(${state.camera.zoom})`}>
          {mapTiles.map((tile) => {
            const { sx, sy } = tileToScreen(tile.x, tile.y);
            const isHovered = state.hoveredTile?.x === tile.x && state.hoveredTile?.y === tile.y;
            return (
              <polygon
                key={`${tile.x}-${tile.y}`}
                points={`${sx},${sy} ${sx + TILE_WIDTH / 2},${sy + TILE_HEIGHT / 2} ${sx},${sy + TILE_HEIGHT} ${sx - TILE_WIDTH / 2},${sy + TILE_HEIGHT / 2}`}
                fill={isHovered ? (selectedCanPlace ? '#bde5c5' : '#f4b7b1') : (tile.x + tile.y) % 2 ? '#dcead5' : '#d2e1cc'}
                stroke="#b2c8ad"
                strokeWidth="1"
              />
            );
          })}

          {state.placements
            .slice()
            .sort((a, b) => a.y + a.height - (b.y + b.height))
            .map((placed) => {
              const { sx, sy } = tileToScreen(placed.x, placed.y);
              const item = ITEM_MAP[placed.itemId];
              return (
                <g key={placed.id}>
                  <polygon
                    points={`${sx},${sy + TILE_HEIGHT / 2} ${sx + (placed.width * TILE_WIDTH) / 2},${sy + (placed.width * TILE_HEIGHT) / 2 + TILE_HEIGHT / 2} ${sx + ((placed.width - placed.height) * TILE_WIDTH) / 2},${sy + ((placed.width + placed.height) * TILE_HEIGHT) / 2 + TILE_HEIGHT / 2} ${sx - (placed.height * TILE_WIDTH) / 2},${sy + (placed.height * TILE_HEIGHT) / 2 + TILE_HEIGHT / 2}`}
                    fill="#000"
                    opacity="0.08"
                  />
                  <rect
                    x={sx - 20}
                    y={sy - 22 - placed.height * 6}
                    width={40 + placed.width * 18}
                    height={26 + placed.height * 18}
                    rx="10"
                    fill={colorForItem(placed.itemId)}
                    stroke="#547965"
                  />
                  <text x={sx + 2} y={sy - 4} fontSize="10" textAnchor="middle" fill="#1f3f35">
                    {item?.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

          {state.hoveredTile && state.selectedItemId !== 'bulldozer' && (
            (() => {
              const item = ITEM_MAP[state.selectedItemId];
              const { sx, sy } = tileToScreen(state.hoveredTile.x, state.hoveredTile.y);
              return (
                <rect
                  x={sx - TILE_WIDTH / 2}
                  y={sy + 2}
                  width={item.footprint.w * TILE_WIDTH}
                  height={item.footprint.h * TILE_HEIGHT}
                  fill={selectedCanPlace ? '#6fbf8f55' : '#f05a5a55'}
                  stroke={selectedCanPlace ? '#2f8d5d' : '#c03737'}
                  strokeDasharray="5 4"
                />
              );
            })()
          )}
        </g>
      </svg>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl bg-white/85 px-3 py-1 text-xs shadow">
        {state.hoveredTile ? `Tile ${state.hoveredTile.x}, ${state.hoveredTile.y}` : 'Hover a tile'} • Tool: {ITEM_MAP[state.selectedItemId].name}
      </div>
    </div>
  );
}

function colorForItem(itemId: string) {
  const palette: Record<string, string> = {
    path: '#d6c9ae',
    ferris: '#f0bec0',
    carousel: '#f4d79b',
    coaster: '#b7c6ef',
    drop: '#d5b5f2',
    snack: '#ffddb1',
    restroom: '#b8ddf7',
    tree: '#9ccf9f',
    fountain: '#9fdde6',
    flowers: '#efbfd9',
    lamp: '#f4e08e',
    bench: '#d0b291'
  };
  return palette[itemId] ?? '#c9d2cb';
}
