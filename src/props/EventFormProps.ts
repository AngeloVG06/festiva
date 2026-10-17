import type { IFestivalEvent } from '../interfaces/IFestivalEvent';

export interface EventFormProps {
  existingIds: number[];
  onAddEvent: (event: IFestivalEvent) => void;
}