import type { IEventSummary } from '../interfaces/IEventSummary';
import type { IFestivalEvent } from '../interfaces/IFestivalEvent';
import { getAvailableSpots } from './availability';

export function getEventSummary(events: IFestivalEvent[]): IEventSummary {
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const totalRegistered = events.reduce((sum, event) => sum + event.registered, 0);

  return {
    totalEvents: events.length,
    favoriteEvents: events.filter((event) => event.isFavorite).length,
    soldOutEvents: events.filter((event) => getAvailableSpots(event) <= 0).length,
    occupancyPercent: totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0,
  };
}