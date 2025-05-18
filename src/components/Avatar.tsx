interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export const Avatar = ({ name, size = 'md', className = '' }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full bg-dragon-primary text-white
        flex items-center justify-center font-medium
        ${className}
      `}
    >
      {initials}
    </div>
  );
};
