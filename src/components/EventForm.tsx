import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import { GENRES } from '../data/genres';
import { STAGES } from '../data/initialEvents';
import type { EventFormErrors, IEventFormValues } from '../interfaces/IEventFormValues';
import type { EventFormProps } from '../props/EventFormProps';
import { EMPTY_FORM_VALUES, toFestivalEvent, validateEventForm } from '../utils/eventForm';
import FormField from './FormField';

const BASE_CONTROL_CLASSES =
  'w-full rounded-lg border bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-600 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400';

function getControlClasses(error?: string): string {
  const borderClasses = error ? 'border-rose-500' : 'border-slate-700 hover:border-slate-500';
  return `${BASE_CONTROL_CLASSES} ${borderClasses}`;
}

export default function EventForm({ existingIds, onAddEvent }: EventFormProps) {
  const [values, setValues] = useState<IEventFormValues>(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (
    changeEvent: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = changeEvent.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (hasSubmitted) {
      setErrors(validateEventForm(nextValues, existingIds));
    }
  };

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const validationErrors = validateEventForm(values, existingIds);
    setHasSubmitted(true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onAddEvent(toFestivalEvent(values));
    setValues(EMPTY_FORM_VALUES);
    setErrors({});
    setHasSubmitted(false);
  };

  return (
    <section
      aria-labelledby="event-form-title"
      className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 id="event-form-title" className="text-xl font-bold text-white">
        Registrar presentación
      </h2>
      <p className="mb-5 text-sm text-slate-400">Todos los campos son obligatorios.</p>

      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField id="form-id" label="ID" error={errors.id}>
          <input
            id="form-id"
            name="id"
            type="number"
            value={values.id}
            onChange={handleChange}
            aria-invalid={Boolean(errors.id)}
            aria-describedby={errors.id ? 'form-id-error' : undefined}
            className={getControlClasses(errors.id)}
          />
        </FormField>

        <FormField id="form-name" label="Nombre de la presentación" error={errors.name}>
          <input
            id="form-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'form-name-error' : undefined}
            className={getControlClasses(errors.name)}
          />
        </FormField>

        <FormField id="form-artist" label="Artista" error={errors.artist}>
          <input
            id="form-artist"
            name="artist"
            type="text"
            value={values.artist}
            onChange={handleChange}
            aria-invalid={Boolean(errors.artist)}
            aria-describedby={errors.artist ? 'form-artist-error' : undefined}
            className={getControlClasses(errors.artist)}
          />
        </FormField>

        <FormField id="form-genre" label="Género" error={errors.genre}>
          <select
            id="form-genre"
            name="genre"
            value={values.genre}
            onChange={handleChange}
            aria-invalid={Boolean(errors.genre)}
            aria-describedby={errors.genre ? 'form-genre-error' : undefined}
            className={getControlClasses(errors.genre)}
          >
            <option value="">Selecciona un género</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="form-stage" label="Escenario" error={errors.stage}>
          <select
            id="form-stage"
            name="stage"
            value={values.stage}
            onChange={handleChange}
            aria-invalid={Boolean(errors.stage)}
            aria-describedby={errors.stage ? 'form-stage-error' : undefined}
            className={getControlClasses(errors.stage)}
          >
            <option value="">Selecciona un escenario</option>
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="form-date" label="Fecha" error={errors.date}>
          <input
            id="form-date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'form-date-error' : undefined}
            className={getControlClasses(errors.date)}
          />
        </FormField>

        <FormField id="form-startTime" label="Hora de inicio" error={errors.startTime}>
          <input
            id="form-startTime"
            name="startTime"
            type="time"
            value={values.startTime}
            onChange={handleChange}
            aria-invalid={Boolean(errors.startTime)}
            aria-describedby={errors.startTime ? 'form-startTime-error' : undefined}
            className={getControlClasses(errors.startTime)}
          />
        </FormField>

        <FormField id="form-duration" label="Duración (minutos)" error={errors.duration}>
          <input
            id="form-duration"
            name="duration"
            type="number"
            value={values.duration}
            onChange={handleChange}
            aria-invalid={Boolean(errors.duration)}
            aria-describedby={errors.duration ? 'form-duration-error' : undefined}
            className={getControlClasses(errors.duration)}
          />
        </FormField>

        <FormField id="form-capacity" label="Capacidad" error={errors.capacity}>
          <input
            id="form-capacity"
            name="capacity"
            type="number"
            value={values.capacity}
            onChange={handleChange}
            aria-invalid={Boolean(errors.capacity)}
            aria-describedby={errors.capacity ? 'form-capacity-error' : undefined}
            className={getControlClasses(errors.capacity)}
          />
        </FormField>

        <FormField id="form-registered" label="Personas registradas" error={errors.registered}>
          <input
            id="form-registered"
            name="registered"
            type="number"
            value={values.registered}
            onChange={handleChange}
            aria-invalid={Boolean(errors.registered)}
            aria-describedby={errors.registered ? 'form-registered-error' : undefined}
            className={getControlClasses(errors.registered)}
          />
        </FormField>

        <FormField id="form-ticketPrice" label="Precio de entrada (₡)" error={errors.ticketPrice}>
          <input
            id="form-ticketPrice"
            name="ticketPrice"
            type="number"
            step="any"
            value={values.ticketPrice}
            onChange={handleChange}
            aria-invalid={Boolean(errors.ticketPrice)}
            aria-describedby={errors.ticketPrice ? 'form-ticketPrice-error' : undefined}
            className={getControlClasses(errors.ticketPrice)}
          />
        </FormField>

        <div className="sm:col-span-2 lg:col-span-3">
          <FormField id="form-description" label="Descripción" error={errors.description}>
            <textarea
              id="form-description"
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'form-description-error' : undefined}
              className={getControlClasses(errors.description)}
            />
            <p className="text-xs text-slate-500">{values.description.length}/200 caracteres (mínimo 20)</p>
          </FormField>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-fuchsia-600 px-5 py-2.5 font-semibold text-white transition hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
          >
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            Agregar presentación
          </button>
        </div>
      </form>
    </section>
  );
}