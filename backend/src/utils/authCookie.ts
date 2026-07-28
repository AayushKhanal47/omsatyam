export const getAuthCookieOptions = () => {
  const configuredSecure = process.env.COOKIE_SECURE;
  const secure =
    configuredSecure === undefined
      ? process.env.NODE_ENV === "production"
      : configuredSecure.toLowerCase() === "true";
  const sameSite: "none" | "lax" = secure ? "none" : "lax";

  return {
    httpOnly: true,
    secure,
    sameSite,
  };
};
