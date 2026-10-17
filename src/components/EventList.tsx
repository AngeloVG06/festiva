import type { EventListProps } from '../props/EventListProps';
import EventCard from './EventCard';

export default function EventList({
  events,
  onToggleFavorite,
  onDelete,
  onViewDetails,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        No hay presentaciones registradas.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}