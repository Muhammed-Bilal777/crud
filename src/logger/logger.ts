import winston from "winston";
import LokiTransport from "winston-loki";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: "http://loki:3100",
      labels: { job: "my-crud-operation" },
      json: true,
    }),
    new winston.transports.Console(), // optional for debugging
  ],
});

export default logger;
