import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

const SectionHeading = ({ eyebrow, title, description, action, align = "left", tone = "light" }: SectionHeadingProps) => {
  const dark = tone === "dark";
  return (
    <div
      className={`mb-10 flex flex-wrap items-end gap-6 ${
        align === "center" ? "flex-col items-center text-center" : "justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-accent" : "text-primary"}`}>
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
            dark ? "text-white" : "text-text"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/70" : "text-text-secondary"}`}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

export default SectionHeading;
