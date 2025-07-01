"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_loki_1 = __importDefault(require("winston-loki"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_loki_1.default({
            host: "http://loki:3100",
            labels: { job: "my-crud-operation" },
            json: true,
        }),
        new winston_1.default.transports.Console(), // optional for debugging
    ],
});
exports.default = logger;
