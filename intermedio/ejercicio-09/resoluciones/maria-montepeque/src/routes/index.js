import { Router } from "express";
import categoriasRoutes from "./categorias.routes.js";
import gimnasiosRoutes from "./gimnasios.routes.js";
import luchadoresRoutes from "./luchadores.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/categorias", "/api/gimnasios", "/api/luchadores"] });
});

router.use("/categorias", categoriasRoutes);
router.use("/gimnasios", gimnasiosRoutes);
router.use("/luchadores", luchadoresRoutes);

export default router;
