import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'w-full h-10 rounded-xl flex items-center justify-center gap-3 item bg-primary hover:bg-secondary cursor-pointer active:scale-95 text-pace-white transition-all',
  variants: {
    variant: {
      secondary:
        'bg-transparent border border-dark hover:bg-neutral/10 text-dark',
    },
    size: {
      icon: 'w-fit h-auto p-2.5',
      fit: 'w-fit h-auto py-3 px-5',
    },
  },
});

export const Button = ({
  children,
  variant,
  size,
  type = 'button',
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      type={type}
      className={buttonVariants({ variant, size })}
    >
      {children}
    </button>
  );
};
