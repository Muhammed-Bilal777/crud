import { NodeSDK } from "@opentelemetry/sdk-node";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
const sdk = new NodeSDK({
  serviceName: "person-api",

  // Traces → Zipkin UI
  traceExporter: new ZipkinExporter({
    url: process.env.ZIPKIN_ENDPOINT ?? "http://zipkin:9411/api/v2/spans",
  }),

  // Metrics → Prometheus (exposes /metrics on port 9464)
  metricReader: new PrometheusExporter(
    { port: 9464, endpoint: "/metrics" },
    () => console.log("Prometheus scrape endpoint ready on :9464/metrics")
  ),

  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingRequestHook: (req) => {
        const ignorePaths = ["/metrics", "/health", "/favicon.ico"];
        return ignorePaths.includes(req.url || "");
      },
      ignoreOutgoingRequestHook: (options) => {
        // Loki push requests usually go to /loki/api/v1/push
        const path =
          typeof options === "string" ? options : options?.path || "";

        const hostname =
          typeof options === "string" ? "" : options?.hostname || "";

        return path.includes("/loki/api/v1/push") || hostname === "loki";
      },
    }),
  ],
});

sdk.start();
