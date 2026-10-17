import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { AvailabilityStatus } from '../interfaces/AvailabilityStatus';
import type { StatusBadgeProps } from '../props/StatusBadgeProps';

interface StatusConfig {
  label: string;
  classes: string;
  Icon: LucideIcon;
}

const STATUS_CONFIG: Record<AvailabilityStatus, StatusConfig> = {
  available: {
    label: 'Disponible',
    classes: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/40',
    Icon: CheckCircle2,
  },
  low: {
    label: 'Pocos espacios',
    classes: 'bg-amber-500/15 text-amber-300 ring-amber-500/40',
    Icon: AlertTriangle,
  },
  soldOut: {
    label: 'Agotado',
    classes: 'bg-rose-500/15 text-rose-300 ring-rose-500/40',
    Icon: XCircle,
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes, Icon } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}