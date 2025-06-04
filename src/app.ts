import express from "express";
import personRoutes from "./routes/person.routes";

const app = express();

app.use(express.json());
app.use("/api/persons", personRoutes);

export default app;
