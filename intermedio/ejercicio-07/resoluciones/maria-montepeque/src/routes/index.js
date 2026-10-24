import { Router } from "express";
import marcasRoutes from "./marcas.routes.js";
import vehiculosRoutes from "./vehiculos.routes.js";
import reservasRoutes from "./reservas.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/marcas", "/api/vehiculos", "/api/reservas"] });
});

router.use("/marcas", marcasRoutes);
router.use("/vehiculos", vehiculosRoutes);
router.use("/reservas", reservasRoutes);

export default router;
