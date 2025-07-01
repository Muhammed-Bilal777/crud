"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const promClient_1 = require("./obervability/promClient");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.on("finish", () => {
        promClient_1.reqCounter.labels(req.method, req.path, String(res.statusCode)).inc();
    });
    next();
});
app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", promClient_1.register.contentType);
    res.end(await promClient_1.register.metrics());
});
app.use(express_1.default.json());
app.use("/api/persons", person_routes_1.default);
exports.default = app;
