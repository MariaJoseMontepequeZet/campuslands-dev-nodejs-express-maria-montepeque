import { Router } from "express";
import escuderiasRoutes from "./escuderias.routes.js";
import pilotosRoutes from "./pilotos.routes.js";
import vueltasRoutes from "./vueltas.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        ok: true,
        requestId: req.id,
        resources: ["/api/escuderias", "/api/pilotos", "/api/vueltas"]
    });
});

router.use("/escuderias", escuderiasRoutes);
router.use("/pilotos", pilotosRoutes);
router.use("/vueltas", vueltasRoutes);

export default router;
