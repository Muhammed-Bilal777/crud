"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqCounter = exports.register = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.register = new prom_client_1.default.Registry();
// collect node process metrics (CPU, memory, event loop)
prom_client_1.default.collectDefaultMetrics({ register: exports.register, prefix: "person_api_" });
// custom application counters
exports.reqCounter = new prom_client_1.default.Counter({
    name: "person_api_http_requests_total",
    help: "Total HTTP requests",
    registers: [exports.register],
    labelNames: ["method", "route", "code"],
});
