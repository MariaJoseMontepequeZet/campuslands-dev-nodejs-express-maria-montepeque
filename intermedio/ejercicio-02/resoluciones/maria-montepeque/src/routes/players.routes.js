import { Router } from "express";
import { listPlayers, getPlayer, createPlayer } from "../controllers/players.controller.js";

const router = Router();

router.get("/", listPlayers);
router.get("/:id", getPlayer);
router.post("/", createPlayer);

export default router;
