import { Router } from "express";
import ligasRoutes from "./ligas.routes.js";
import estadiosRoutes from "./estadios.routes.js";
import clubesRoutes from "./clubes.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/ligas", "/api/estadios", "/api/clubes"] });
});

router.use("/ligas", ligasRoutes);
router.use("/estadios", estadiosRoutes);
router.use("/clubes", clubesRoutes);

export default router;
