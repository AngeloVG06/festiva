export interface IFestivalEvent {
  id: number;
  name: string;
  artist: string;
  description: string;
  genre: string;
  stage: string;
  date: string;
  startTime: string;
  duration: number;
  capacity: number;
  registered: number;
  ticketPrice: number;
  isFavorite: boolean;
}