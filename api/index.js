// Vercel serverless entry. Imports the COMPILED backend (backend/dist), where
// tsc-alias has already rewritten the "@/..." path aliases to relative paths —
// @vercel/node does not resolve tsconfig path aliases at runtime, so we must
// point at the built JS. All /api/* requests are rewritten here (see
// vercel.json); Express keeps its own /api/... route prefixes.
const app = require("../backend/dist/app.js").default;
const { connectDB } = require("../backend/dist/config/db.js");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    res.status(503).json({ success: false, message: "Database unavailable" });
    return;
  }
  return app(req, res);
};
