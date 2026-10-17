import type { IFestivalEvent } from '../interfaces/IFestivalEvent';
import type { AvailabilityStatus } from '../interfaces/AvailabilityStatus';

export const LOW_AVAILABILITY_THRESHOLD = 10;

export function getAvailableSpots(event: IFestivalEvent): number {
  return event.capacity - event.registered;
}

export function getAvailabilityStatus(availableSpots: number): AvailabilityStatus {
  if (availableSpots <= 0) return 'soldOut';
  if (availableSpots <= LOW_AVAILABILITY_THRESHOLD) return 'low';
  return 'available';
}

export function getOccupancyPercent(event: IFestivalEvent): number {
  if (event.capacity <= 0) return 0;
  return Math.round((event.registered / event.capacity) * 100);
}