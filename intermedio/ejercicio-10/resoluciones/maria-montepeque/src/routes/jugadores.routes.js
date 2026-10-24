import { Router } from "express";
import { listJugadores, getJugador } from "../controllers/jugadores.controller.js";

const router = Router();

router.get("/", listJugadores);
router.get("/:id", getJugador);

export default router;
