import { forwardRef, useId } from 'react';
import type { ComponentProps } from 'react';
import type { FieldError } from 'react-hook-form';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="text-offwhite text-sm font-medium">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`
            p-3 text-muted bg-zinc-700 rounded-lg border border-transparent
            focus:border-muted focus:outline-none
            placeholder:text-gray-400
            ${className ?? ''}
            ${rest.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...rest}
        />
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
