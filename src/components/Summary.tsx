import { Music2, Star, Users, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SummaryProps } from '../props/SummaryProps';
import { getEventSummary } from '../utils/summary';

interface SummaryItem {
  label: string;
  value: string;
  Icon: LucideIcon;
  iconClasses: string;
}

export default function Summary({ events }: SummaryProps) {
  const summary = getEventSummary(events);

  const items: SummaryItem[] = [
    { label: 'Presentaciones', value: String(summary.totalEvents), Icon: Music2, iconClasses: 'text-fuchsia-300' },
    { label: 'Favoritas', value: String(summary.favoriteEvents), Icon: Star, iconClasses: 'text-amber-300' },
    { label: 'Agotadas', value: String(summary.soldOutEvents), Icon: XCircle, iconClasses: 'text-rose-300' },
    { label: 'Ocupación general', value: `${summary.occupancyPercent}%`, Icon: Users, iconClasses: 'text-cyan-300' },
  ];

  return (
    <section aria-label="Resumen del festival" className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ label, value, Icon, iconClasses }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
        >
          <Icon className={`h-8 w-8 ${iconClasses}`} aria-hidden="true" />
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}