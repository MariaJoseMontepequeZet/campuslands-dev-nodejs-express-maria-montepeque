import { Router } from "express";
import clubesRoutes from "./clubes.routes.js";
import torneosRoutes from "./torneos.routes.js";
import jugadoresRoutes from "./jugadores.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/clubes", "/api/torneos", "/api/jugadores"] });
});

router.use("/clubes", clubesRoutes);
router.use("/torneos", torneosRoutes);
router.use("/jugadores", jugadoresRoutes);

export default router;
