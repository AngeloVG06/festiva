import type { AvailabilityStatus } from '../interfaces/AvailabilityStatus';

export interface OccupancyBarProps {
  percent: number;
  status: AvailabilityStatus;
}