import client from "prom-client";
export const register = new client.Registry();

// collect node process metrics (CPU, memory, event loop)
client.collectDefaultMetrics({ register, prefix: "person_api_" });

// custom application counters
export const reqCounter = new client.Counter({
  name: "person_api_http_requests_total",
  help: "Total HTTP requests",
  registers: [register],
  labelNames: ["method", "route", "code"],
});
