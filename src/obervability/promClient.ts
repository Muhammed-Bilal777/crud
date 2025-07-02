import client from "prom-client";
import si from "systeminformation";

// Export a single shared registry
export const registry = new client.Registry();

// Collect default process metrics
client.collectDefaultMetrics({ register: registry, prefix: "person_api_" });

// HTTP Request Counter (Optional here if already declared elsewhere)
export const reqCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  registers: [registry],
  labelNames: ["method", "route", "status"],
});

// System CPU Gauge
export const cpuUsageGauge = new client.Gauge({
  name: "system_cpu_usage_percent",
  help: "System CPU usage percentage",
  registers: [registry],
});

// System Memory Gauge
export const memoryUsageGauge = new client.Gauge({
  name: "system_memory_usage_percent",
  help: "System memory usage percentage",
  registers: [registry],
});

// Periodic system metric updates
setInterval(async () => {
  try {
    const cpu = await si.currentLoad();
    cpuUsageGauge.set(cpu.currentLoad); // Fix: lowercase `currentload`

    const mem = await si.mem();
    const usage = (mem.active / mem.total) * 100;
    memoryUsageGauge.set(usage);
  } catch (err) {
    console.error("Error collecting system metrics:", err);
  }
}, 5000);
