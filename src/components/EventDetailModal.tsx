import { getAvailabilityStatus, getAvailableSpots, getOccupancyPercent } from '../utils/availability';
import OccupancyBar from './OccupancyBar';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { EventDetailModalProps } from '../props/EventDetailModalProps';
import { formatDate, formatPrice } from '../utils/format';
import StatusBadge from './StatusBadge';

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const availableSpots = getAvailableSpots(event);
  const status = getAvailabilityStatus(availableSpots);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-detail-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="event-detail-title" className="text-2xl font-bold text-white">
              {event.name}
            </h2>
            <p className="text-fuchsia-300">{event.artist}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <p className="mb-5 text-slate-300">{event.description}</p>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">Género</dt>
            <dd className="text-slate-100">{event.genre}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Escenario</dt>
            <dd className="text-slate-100">{event.stage}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Fecha</dt>
            <dd className="text-slate-100">{formatDate(event.date)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Hora de inicio</dt>
            <dd className="text-slate-100">{event.startTime}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Duración</dt>
            <dd className="text-slate-100">{event.duration} minutos</dd>
          </div>
          <div>
            <dt className="text-slate-500">Precio de entrada</dt>
            <dd className="text-slate-100">{formatPrice(event.ticketPrice)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Capacidad</dt>
            <dd className="text-slate-100">{event.capacity} personas</dd>
          </div>
          <div>
            <dt className="text-slate-500">Personas registradas</dt>
            <dd className="text-slate-100">{event.registered}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Espacios disponibles</dt>
            <dd className="text-slate-100">{availableSpots}</dd>
          </div>
          <div>
            <dt className="mb-1 text-slate-500">Disponibilidad</dt>
            <dd>
              <StatusBadge status={status} />
            </dd>
          </div>
        <div className="mt-5">
          <OccupancyBar percent={getOccupancyPercent(event)} status={status} />
        </div>
        </dl>
      </div>
    </div>
  );
}