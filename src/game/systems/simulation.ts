import { ITEM_MAP } from '../data/items';
import { GameState } from '../types';

const REACTIONS = [
  'Guests are praising the park’s layout.',
  'Carousel wrapped a cycle with smiling guests.',
  'Snack Stall opened and guests noticed immediately.',
  'Fountain added an extra layer of charm to the park.',
  'Litter is building up near the main path.',
  'Guests want more attractions.',
  'The evening glow from lamps feels magical.',
  'Families are taking a break on nearby benches.'
];

export function recalcMetrics(state: GameState) {
  let happiness = 55;
  let cleanliness = 60;
  let rating = 50;
  let attractionsCount = 0;
  let revenuePerMinute = 0;
  let upkeep = 0;
  let pathTiles = 0;

  for (const placed of state.placements) {
    const item = ITEM_MAP[placed.itemId];
    if (!item) continue;
    if (placed.itemId === 'path') pathTiles += 1;
    happiness += item.effects.happiness ?? 0;
    cleanliness += item.effects.cleanliness ?? 0;
    rating += item.effects.rating ?? 0;
    attractionsCount += item.effects.attractionsCount ?? 0;
    revenuePerMinute += item.revenuePerMinute ?? 0;
    upkeep += item.upkeepPerMinute ?? 0;
  }

  const hasAttraction = attractionsCount > 0;
  const hasFlow = pathTiles >= 8;
  const guestDelta = hasAttraction && hasFlow ? 2 + Math.floor(happiness / 70) : -1;
  const guests = Math.max(0, state.guests + guestDelta);
  const queue = Math.max(0, Math.floor(guests * 0.35) + attractionsCount * 2);
  const litter = Math.max(0, Math.floor(guests / 6) - Math.floor(cleanliness / 12));

  happiness = Math.max(0, Math.min(100, happiness - litter * 0.5));
  cleanliness = Math.max(0, Math.min(100, cleanliness - Math.max(0, guests - pathTiles * 4) * 0.08));
  rating = Math.max(0, Math.min(100, rating + happiness * 0.15 + cleanliness * 0.08));

  const net = Math.round(revenuePerMinute - upkeep + guests * 0.5);
  const funds = Math.max(0, state.funds + net / 6);

  const rideStatuses = state.placements
    .filter((p) => ['ferris', 'carousel', 'coaster', 'drop'].includes(p.itemId))
    .map((ride) => {
      const roll = Math.random();
      let status = 'Running';
      if (roll > 0.8) status = 'Busy';
      else if (roll < 0.2) status = 'Quiet';
      if (!hasFlow) status = 'Needs path access';
      if (guests < 15) status = 'Low demand';
      return { name: ITEM_MAP[ride.itemId].name, status };
    });

  const maybeEvent = Math.random() > 0.7 ? REACTIONS[Math.floor(Math.random() * REACTIONS.length)] : null;
  const eventFeed = maybeEvent ? [maybeEvent, ...state.eventFeed].slice(0, 10) : state.eventFeed;

  return {
    ...state,
    funds,
    guests,
    revenuePerMinute: net,
    metrics: { happiness, cleanliness, rating, rideQueue: queue, litter, attractionsCount },
    rideStatuses,
    eventFeed
  };
}
