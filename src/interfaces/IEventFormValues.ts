export interface IEventFormValues {
  id: string;
  name: string;
  artist: string;
  description: string;
  genre: string;
  stage: string;
  date: string;
  startTime: string;
  duration: string;
  capacity: string;
  registered: string;
  ticketPrice: string;
}

export type EventFormErrors = Partial<Record<keyof IEventFormValues, string>>;