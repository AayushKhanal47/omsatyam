interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-14 sm:h-16" }: LogoProps) => {
  return (
    <img
      src="/logo.png"
      alt="Om Satyam — Dental & Surgical Supply"
      className={`w-auto object-contain max-h-full transition-all duration-200 ${className}`}
    />
  );
};

export default Logo;