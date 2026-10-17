import { getAvailabilityStatus, getAvailableSpots, getOccupancyPercent } from '../utils/availability';
import OccupancyBar from './OccupancyBar';
import { CalendarDays, Eye, MapPin, Star, Ticket, Trash2, Users } from 'lucide-react';
import type { EventCardProps } from '../props/EventCardProps';
import { formatDate, formatPrice } from '../utils/format';
import StatusBadge from './StatusBadge';

export default function EventCard({
  event,
  onToggleFavorite,
  onDelete,
  onViewDetails,
}: EventCardProps) {
  const availableSpots = getAvailableSpots(event);
  const status = getAvailabilityStatus(availableSpots);

  const cardBorder = event.isFavorite
    ? 'border-amber-400/70 shadow-lg shadow-amber-500/10'
    : 'border-slate-800 hover:border-fuchsia-500/50';

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-slate-900 p-5 transition ${cardBorder}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-tight text-white">{event.name}</h3>
          <p className="text-sm text-fuchsia-300">{event.artist}</p>
        </div>
        <span className="shrink-0 rounded-md bg-violet-500/15 px-2 py-1 text-xs font-medium text-violet-300">
          {event.genre}
        </span>
      </header>

      <ul className="space-y-2 text-sm text-slate-300">
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {event.stage}
        </li>
        <li className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {formatDate(event.date)} · {event.startTime}
        </li>
        <li className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {formatPrice(event.ticketPrice)}
        </li>
        <li className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {status === 'soldOut' ? 'Sin espacios disponibles' : `${availableSpots} espacios disponibles`}
        </li>
      </ul>

      <div className="space-y-3">
        <StatusBadge status={status} />
        <OccupancyBar percent={getOccupancyPercent(event)} status={status} />
      </div>

      <footer className="mt-auto flex items-center gap-2 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={() => onViewDetails(event.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Ver detalles
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(event.id)}
          aria-pressed={event.isFavorite}
          aria-label={event.isFavorite ? `Quitar ${event.name} de favoritos` : `Marcar ${event.name} como favorito`}
          title={event.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
          className="rounded-lg border border-slate-700 p-2 text-amber-300 transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          <Star className="h-5 w-5" fill={event.isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(event.id)}
          aria-label={`Eliminar ${event.name}`}
          title="Eliminar presentación"
          className="rounded-lg border border-slate-700 p-2 text-rose-300 transition hover:bg-rose-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          <Trash2 className="h-5 w-5" aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}