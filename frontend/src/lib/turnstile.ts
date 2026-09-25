// Cloudflare Turnstile site key. The bot check is skipped when this isn't set.
export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY || undefined;
