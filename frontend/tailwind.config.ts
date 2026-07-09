import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface, var(--bg))",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary, var(--text))",
        "text-h": "var(--text-h)",
        border: "var(--border)",
        "code-bg": "var(--code-bg)",
        accent: "var(--accent)",
        "accent-bg": "var(--accent-bg)",
        "accent-border": "var(--accent-border)",
        "social-bg": "var(--social-bg)",
        primary: "var(--accent)",
        success: "#10b981",
      },
      fontFamily: {
        sans: "var(--sans)",
        display: "var(--heading)",
        mono: "var(--mono)",
      },
      boxShadow: {
        sm: "var(--shadow)",
      },
    },
  },
  plugins: [],
} satisfies Config
