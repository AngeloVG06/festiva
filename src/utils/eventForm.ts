import type { EventFormErrors, IEventFormValues } from '../interfaces/IEventFormValues';
import type { IFestivalEvent } from '../interfaces/IFestivalEvent';

export const EMPTY_FORM_VALUES: IEventFormValues = {
  id: '',
  name: '',
  artist: '',
  description: '',
  genre: '',
  stage: '',
  date: '',
  startTime: '',
  duration: '',
  capacity: '',
  registered: '',
  ticketPrice: '',
};

const INTEGER_PATTERN = /^-?\d+$/;

function isBlank(value: string): boolean {
  return value.trim() === '';
}

function isInteger(value: string): boolean {
  return INTEGER_PATTERN.test(value.trim());
}

function isNonNegativeNumber(value: string): boolean {
  return !isBlank(value) && !Number.isNaN(Number(value)) && Number(value) >= 0;
}

export function validateEventForm(
  values: IEventFormValues,
  existingIds: number[]
): EventFormErrors {
  const errors: EventFormErrors = {};

  // ID
  if (isBlank(values.id)) {
    errors.id = 'El ID es obligatorio.';
  } else if (!isInteger(values.id) || Number(values.id) <= 0) {
    errors.id = 'El ID debe ser un número entero mayor que 0.';
  } else if (existingIds.includes(Number(values.id))) {
    errors.id = 'Ya existe una presentación con ese ID.';
  }

  // Nombre
  if (isBlank(values.name)) {
    errors.name = 'El nombre es obligatorio.';
  } else if (values.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.';
  }

  // Artista
  if (isBlank(values.artist)) {
    errors.artist = 'El artista es obligatorio.';
  } else if (values.artist.trim().length < 2) {
    errors.artist = 'El artista debe tener al menos 2 caracteres.';
  }

  // Descripción
  const descriptionLength = values.description.trim().length;
  if (descriptionLength === 0) {
    errors.description = 'La descripción es obligatoria.';
  } else if (descriptionLength < 20 || descriptionLength > 200) {
    errors.description = 'La descripción debe tener entre 20 y 200 caracteres.';
  }

  // Género, escenario, fecha y hora
  if (isBlank(values.genre)) {
    errors.genre = 'Selecciona un género.';
  }
  if (isBlank(values.stage)) {
    errors.stage = 'Selecciona un escenario.';
  }
  if (isBlank(values.date)) {
    errors.date = 'La fecha es obligatoria.';
  }
  if (isBlank(values.startTime)) {
    errors.startTime = 'La hora de inicio es obligatoria.';
  }

  // Duración
  if (isBlank(values.duration)) {
    errors.duration = 'La duración es obligatoria.';
  } else if (
    !isInteger(values.duration) ||
    Number(values.duration) < 15 ||
    Number(values.duration) > 240
  ) {
    errors.duration = 'La duración debe ser un número entero entre 15 y 240 minutos.';
  }

  // Capacidad
  if (isBlank(values.capacity)) {
    errors.capacity = 'La capacidad es obligatoria.';
  } else if (!isInteger(values.capacity) || Number(values.capacity) <= 0) {
    errors.capacity = 'La capacidad debe ser un número entero mayor que 0.';
  }

  // Personas registradas
  const capacityIsValid = isInteger(values.capacity) && Number(values.capacity) > 0;
  if (isBlank(values.registered)) {
    errors.registered = 'Las personas registradas son obligatorias.';
  } else if (!isInteger(values.registered) || Number(values.registered) < 0) {
    errors.registered = 'Debe ser un número entero mayor o igual que 0.';
  } else if (capacityIsValid && Number(values.registered) > Number(values.capacity)) {
    errors.registered = 'No puede ser mayor que la capacidad.';
  }

  // Precio
  if (isBlank(values.ticketPrice)) {
    errors.ticketPrice = 'El precio es obligatorio.';
  } else if (!isNonNegativeNumber(values.ticketPrice)) {
    errors.ticketPrice = 'El precio debe ser un número mayor o igual que 0.';
  }

  return errors;
}

export function toFestivalEvent(values: IEventFormValues): IFestivalEvent {
  return {
    id: Number(values.id),
    name: values.name.trim(),
    artist: values.artist.trim(),
    description: values.description.trim(),
    genre: values.genre,
    stage: values.stage,
    date: values.date,
    startTime: values.startTime,
    duration: Number(values.duration),
    capacity: Number(values.capacity),
    registered: Number(values.registered),
    ticketPrice: Number(values.ticketPrice),
    isFavorite: false,
  };
}