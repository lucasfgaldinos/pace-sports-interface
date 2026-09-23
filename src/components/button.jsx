export const Button = ({ children, type = 'button', isLoading, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`
          w-full h-10 rounded-xl bg-primary hover:bg-secondary cursor-pointer active:scale-95 text-pace-white transition-all
          ${isLoading && 'hover:cursor-not-allowed'}
        `}
      type={type}
    >
      {children}
    </button>
  );
};
