import { Router } from "express";
import heroesRoutes from "./heroes.routes.js";
import teamsRoutes from "./teams.routes.js";
import tournamentsRoutes from "./tournaments.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ ok: true, resources: ["/api/heroes", "/api/teams", "/api/tournaments"] });
});

router.use("/heroes", heroesRoutes);
router.use("/teams", teamsRoutes);
router.use("/tournaments", tournamentsRoutes);

export default router;
