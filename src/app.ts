import "../src/obervability/tracing";
import express from "express";
import personRoutes from "./routes/person.routes";
import client from "prom-client";

const app = express();

// ─────────── Prom‑client setup ───────────
export const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

export const reqCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  registers: [registry],
  labelNames: ["method", "route", "status"],
});

// ─────────── Middleware to count requests ───────────
app.use((req, res, next) => {
  res.on("finish", () => {
    // Skip Prometheus’ own scrape calls
    if (req.originalUrl === "/metrics") return;

    // Record using the *full* URL path (no query‑string)
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
