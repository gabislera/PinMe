import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  title?: string;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({ title, isLoading, className, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`bg-primary hover:opacity-80 transition-all duration-300 text-white p-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {title || children}
    </button>
  );
};
