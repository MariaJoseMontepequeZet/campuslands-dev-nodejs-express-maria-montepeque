import { Router } from "express";
import playersRoutes from "./players.routes.js";
import weaponsRoutes from "./weapons.routes.js";
import matchesRoutes from "./matches.routes.js";

const router = Router();

// este router solo junta los demas, cada recurso tiene su archivo
router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/players", "/api/weapons", "/api/matches"] });
});

router.use("/players", playersRoutes);
router.use("/weapons", weaponsRoutes);
router.use("/matches", matchesRoutes);

export default router;
