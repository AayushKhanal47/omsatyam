// Verifies a Cloudflare Turnstile token. When TURNSTILE_SECRET_KEY is not set the check is skipped,
// so local development and deployments without Turnstile keep working.
export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export const verifyTurnstile = async (token: unknown, remoteIp?: string): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("verifyTurnstile error:", error);
    return false;
  }
};
