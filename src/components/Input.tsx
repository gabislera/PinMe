import { forwardRef, useId } from 'react';
import type { ComponentProps } from 'react';
import type { FieldError } from 'react-hook-form';

type InputVariant = 'solid' | 'outlined';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: FieldError;
  variant?: InputVariant;
  icon?: React.ReactNode;
}

const variantClasses: Record<InputVariant, string> = {
  solid: 'bg-white dark:bg-dragon-800 border-dragon-200 dark:border-dragon-800',
  outlined: 'bg-transparent border-dragon-200 dark:border-dragon-700',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, variant = 'solid', icon, ...rest }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2 w-full relative">
        {label && (
          <label
            htmlFor={id}
            className="text-dragon-700 dark:text-dragon-tertiary text-sm font-medium"
          >
            {label}
          </label>
        )}
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          ref={ref}
          id={id}
          className={`
            p-3 text-dragon-700 dark:text-dragon-tertiary text-sm rounded-lg border
            focus:border-dragon-primary focus:outline-none
            placeholder:text-dragon-500 dark:placeholder:text-dragon-400 w-full
            ${icon ? 'pl-10' : ''}
            ${variantClasses[variant]}
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
