import type { IFestivalEvent } from '../interfaces/IFestivalEvent';

export interface EventCardProps {
  event: IFestivalEvent;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}