import type { IFestivalEvent } from '../interfaces/IFestivalEvent';

export const EVENTS_STORAGE_KEY = 'festiva:events';

export function loadEvents(fallback: IFestivalEvent[]): IFestivalEvent[] {
  try {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (stored === null) return fallback;

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as IFestivalEvent[]) : fallback;
  } catch {
    return fallback;
  }
}

export function saveEvents(events: IFestivalEvent[]): void {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch {
    console.warn('No se pudo guardar la información en localStorage.');
  }
}