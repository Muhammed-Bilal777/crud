"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracing_1 = require("./obervability/tracing");
(0, tracing_1.startTelemetry)();
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./logger/logger"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
(async () => {
    (0, db_1.connectDB)();
    const server = app_1.default.listen(PORT, () => {
        console.log(`🚀 API listening on :${PORT}`);
        logger_1.default.info("🚀 API listening on :${PORT}");
    });
    // Graceful shutdown
    process.on("SIGTERM", async () => {
        logger_1.default.info("server connection closed exiting");
        server.close(() => process.exit(0));
    });
})();
