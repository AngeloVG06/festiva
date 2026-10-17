import type { IFestivalEvent } from '../interfaces/IFestivalEvent';

export interface EventDetailModalProps {
  event: IFestivalEvent;
  onClose: () => void;
}