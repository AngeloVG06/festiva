import type { AvailabilityStatus } from '../interfaces/AvailabilityStatus';
import type { OccupancyBarProps } from '../props/OccupancyBarProps';

const BAR_COLORS: Record<AvailabilityStatus, string> = {
  available: 'bg-emerald-400',
  low: 'bg-amber-400',
  soldOut: 'bg-rose-400',
};

export default function OccupancyBar({ percent, status }: OccupancyBarProps) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>Ocupación</span>
        <span>{safePercent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Ocupación del evento"
        aria-valuenow={safePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 overflow-hidden rounded-full bg-slate-800"
      >
        <div
          className={`h-full rounded-full transition-all ${BAR_COLORS[status]}`}
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
}