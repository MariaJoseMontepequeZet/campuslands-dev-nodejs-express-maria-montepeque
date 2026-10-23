import express from "express";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true, message: "Ejercicio ejecutado correctamente", topic: "controladores limpios" });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
    res.status(404).json({ ok: false, message: `La ruta ${req.originalUrl} no existe` });
});

// unico lugar que arma la respuesta de error, los controladores solo lanzan AppError
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const body = {
        ok: false,
        message: error.statusCode ? error.message : "Error interno del servidor"
    };

    if (error.errors && error.errors.length > 0) {
        body.errors = error.errors;
    }

    if (!error.statusCode) {
        console.error(error.message);
    }

    res.status(statusCode).json(body);
});

export default app;
