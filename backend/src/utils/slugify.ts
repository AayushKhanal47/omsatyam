export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/[\s_-]+/g, "-") // collapse spaces/underscores into a hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
};