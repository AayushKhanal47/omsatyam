interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-11" }: LogoProps) => {
  return (
    <img
      src="/logo.png"
      alt="Om Satyam — Dental & Surgical Supply"
      className={`w-auto object-contain ${className}`}
    />
  );
};

export default Logo;