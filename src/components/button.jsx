export const Button = ({ children, type = 'button' }) => {
  return (
    <button
      className="w-full h-10 rounded-xl bg-primary hover:bg-secondary cursor-pointer active:scale-95 text-pace-white transition-all"
      type={type}
    >
      {children}
    </button>
  );
};
