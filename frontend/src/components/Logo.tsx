interface LogoProps {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}

// Tooth mark with the Om Satyam name set as real text, so the name stays readable at any size.
const Logo = ({ tone = "light", size = "md", className = "" }: LogoProps) => {
  const dark = tone === "dark";
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex flex-shrink-0 items-center justify-center rounded-2xl ${
          dark ? "bg-white" : "bg-primary-soft"
        } ${lg ? "h-14 w-14" : "h-11 w-11"}`}
      >
        <img src="/logo-mark.png" alt="" className={lg ? "h-11 w-11" : "h-8 w-8"} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight ${dark ? "text-white" : "text-text"} ${
            lg ? "text-2xl" : "text-xl"
          }`}
        >
          Om <span className={dark ? "text-accent" : "text-primary"}>Satyam</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-white/60" : "text-text-secondary"
          }`}
        >
          Dental &amp; Surgical
        </span>
      </span>
    </span>
  );
};

export default Logo;
