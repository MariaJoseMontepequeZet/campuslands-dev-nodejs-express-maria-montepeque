import { Router } from "express";
import talleresRoutes from "./talleres.routes.js";
import motosRoutes from "./motos.routes.js";
import repuestosRoutes from "./repuestos.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/talleres", "/api/motos", "/api/repuestos"] });
});

router.use("/talleres", talleresRoutes);
router.use("/motos", motosRoutes);
router.use("/repuestos", repuestosRoutes);

export default router;
