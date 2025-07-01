"use strict";
// import { metrics } from "@opentelemetry/api";
// import app from "../app";
// const meter = metrics.getMeter("person-api");
// const reqCounter = meter.createCounter("person_api_requests_total");
// const errCounter = meter.createCounter("person_api_errors_total");
// app.use((req, res, next) => {
//   res.on("finish", () => {
//     reqCounter.add(1, { method: req.method, route: req.path });
//     if (res.statusCode >= 400) {
//       errCounter.add(1, { status: res.statusCode });
//     }
//   });
//   next();
// });
