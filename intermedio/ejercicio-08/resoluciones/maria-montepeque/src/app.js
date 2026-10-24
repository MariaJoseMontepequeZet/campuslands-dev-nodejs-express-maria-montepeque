import express from "express";
import apiRoutes from "./routes/index.js";
import requestId from "./middlewares/request-id.js";
import requestLogger from "./middlewares/request-logger.js";

const app = express();

app.use(express.json());
app.use(requestId);
app.use(requestLogger);

app.get("/health", (req, res) => {
    res.json({
        ok: true,
        requestId: req.id,
        message: "Ejercicio ejecutado correctamente",
        topic: "middleware de request id"
    });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
    res.status(404).json({ ok: false, requestId: req.id, message: `La ruta ${req.originalUrl} no existe` });
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const body = {
        ok: false,
        requestId: req.id,
        message: error.statusCode ? error.message : "Error interno del servidor"
    };

    if (error.errors && error.errors.length > 0) {
        body.errors = error.errors;
    }

    if (!error.statusCode) {
        console.error(`[${req.id}]`, error.stack);
    }

    res.status(statusCode).json(body);
});

export default app;
