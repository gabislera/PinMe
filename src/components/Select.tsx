import { useId, type SelectHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

type SelectVariant = 'solid' | 'outlined';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
  wrapperClassName?: string;
  variant?: SelectVariant;
  error?: FieldError;
}

const variantClasses: Record<SelectVariant, string> = {
  solid: 'bg-zinc-800 border-zinc-700',
  outlined: 'bg-transparent border-border',
};

export const Select = ({
  options,
  label,
  className,
  wrapperClassName,
  variant = 'solid',
  error,
  ...props
}: SelectProps) => {
  const id = useId();

  return (
    <div className={`w-full flex flex-col gap-2 ${wrapperClassName ?? ''}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          {...props}
          className={`
            appearance-none w-full bg-transparent border border-border text-muted
            rounded-lg px-4 py-3 pr-10 text-sm transition-all duration-200
            focus:outline-none focus:border-muted
            placeholder:text-muted ${className ?? ''}
            ${variantClasses[variant]}
          `}
        >
          <option value="" disabled selected hidden>
            Selecione uma opção
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
