import paceSportsImg from '../assets/pace-sports-verde.png';

export const Footer = () => {
  return (
    <footer className="p-6 flex flex-col gap-16 items-center bg-neutral/20">
      <img className="max-w-90" src={paceSportsImg} alt="logo-pace-sports" />

      <div className="w-full max-w-5xl flex flex-col mx-auto gap-6">
        <hr className="w-[20%] text-primary/50 mx-auto" />
        <span className="text-center">&copy; 2026 - Pace Sports.</span>
      </div>
    </footer>
  );
};
