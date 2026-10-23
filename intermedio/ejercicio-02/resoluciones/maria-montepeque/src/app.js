import express from "express";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true, message: "Ejercicio ejecutado correctamente", topic: "routers modulares" });
});

// un solo use para toda la api, los routers se arman dentro
app.use("/api", apiRoutes);

app.use((req, res) => {
    res.status(404).json({ ok: false, message: `La ruta ${req.originalUrl} no existe` });
});

app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
});

export default app;
