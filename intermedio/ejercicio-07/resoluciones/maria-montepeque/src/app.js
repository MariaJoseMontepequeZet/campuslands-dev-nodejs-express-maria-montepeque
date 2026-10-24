import express from "express";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true, message: "Ejercicio ejecutado correctamente", topic: "middleware de errores" });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
