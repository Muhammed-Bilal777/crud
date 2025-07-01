import "../src/obervability/tracing";
import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import logger from "./logger/logger";

dotenv.config();
const PORT = process.env.PORT || 4000;

(async () => {
  connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 API listening on :${PORT}`);
    logger.info("🚀 API listening on :${PORT}");
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    logger.info("server connection closed exiting");

    server.close(() => process.exit(0));
  });
})();
