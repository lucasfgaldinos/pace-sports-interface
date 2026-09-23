export const Input = ({
  label,
  placeholder,
  type = 'text',
  id,
  errorMessage = '',
  ...props
}) => {
  return (
    <div className="w-full mb-4">
      <label className="font-medium text-label text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        className="h-10 w-full border-2 border-light-border text-dark rounded-xl px-3 mt-px placeholder:text-neutral focus:border-primary transition-colors"
        type={type}
        id={id}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="h-0 text-pace-red text-[10px] tracking-wide">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
