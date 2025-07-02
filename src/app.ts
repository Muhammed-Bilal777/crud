import express from "express";
import personRoutes from "./routes/person.routes";
import { registry, reqCounter } from "./obervability/promClient"; // ✅ use the same one

const app = express();

// ─────────── Middleware to count requests ───────────
app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.originalUrl === "/metrics") return;

    reqCounter
      .labels(req.method, req.originalUrl.split("?")[0], String(res.statusCode))
      .inc();
  });
  next();
});

// ─────────── Metrics endpoint ───────────
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});

// ─────────── REST routes ───────────
app.use(express.json());
app.use("/api/persons", personRoutes);

export default app;
