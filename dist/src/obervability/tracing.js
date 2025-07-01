"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTelemetry = startTelemetry;
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const exporter_prometheus_1 = require("@opentelemetry/exporter-prometheus");
const zipkinExporter = new exporter_zipkin_1.ZipkinExporter({
    url: process.env.ZIPKIN_ENDPOINT ?? "http://zipkin:9411/api/v2/spans",
});
const promExporter = new exporter_prometheus_1.PrometheusExporter({ port: 9464, endpoint: "/metrics" }, () => console.log("✅ OTel /metrics on :9464/metrics"));
const sdk = new sdk_node_1.NodeSDK({
    serviceName: "person-api",
    traceExporter: zipkinExporter,
    metricReader: promExporter,
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
async function startTelemetry() {
    await sdk.start();
    console.log("📈 OpenTelemetry started");
}
