import { Router } from "express";
import { listTeams, getTeam } from "../controllers/teams.controller.js";

const router = Router();

router.get("/", listTeams);
router.get("/:id", getTeam);

export default router;
