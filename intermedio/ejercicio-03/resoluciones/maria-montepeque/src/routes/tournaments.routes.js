import { Router } from "express";
import { listTournaments, getTournament, createTournament } from "../controllers/tournaments.controller.js";

const router = Router();

router.get("/", listTournaments);
router.get("/:id", getTournament);
router.post("/", createTournament);

export default router;
