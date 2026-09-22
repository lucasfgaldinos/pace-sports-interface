export const Input = ({ label, placeholder, type, name, id }) => {
  return (
    <div className="w-full mb-4">
      <label className="font-medium text-label text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="h-10 w-full border-2 border-light-border text-dark rounded-xl px-3 mt-px placeholder:text-neutral focus:border-primary transition-colors"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};
