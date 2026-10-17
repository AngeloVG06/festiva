import type { FormFieldProps } from '../props/FormFieldProps';

export default function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}