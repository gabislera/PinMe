import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  title?: string;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  title,
  isLoading,
  className,
  children,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`bg-dragon-primary hover:bg-dragon-secondary transition-all duration-300 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
        variant === 'outline' && 'border border-dragon-primary'
      } ${variant === 'ghost' && 'bg-transparent hover:bg-transparent'} ${size === 'sm' && 'p-2'} ${
        size === 'md' && 'p-3'
      } ${size === 'lg' && 'p-4'}`}
    >
      {title || children}
    </button>
  );
};
