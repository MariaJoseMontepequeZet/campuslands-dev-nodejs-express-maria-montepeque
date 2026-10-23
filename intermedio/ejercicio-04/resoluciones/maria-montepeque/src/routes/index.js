import { Router } from "express";
import zonesRoutes from "./zones.routes.js";
import squadsRoutes from "./squads.routes.js";
import dropsRoutes from "./drops.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/zones", "/api/squads", "/api/drops"] });
});

router.use("/zones", zonesRoutes);
router.use("/squads", squadsRoutes);
router.use("/drops", dropsRoutes);

export default router;
