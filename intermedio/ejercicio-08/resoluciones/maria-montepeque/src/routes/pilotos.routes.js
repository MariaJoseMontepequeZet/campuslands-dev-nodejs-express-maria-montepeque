import { Router } from "express";
import { listPilotos, getPiloto } from "../controllers/pilotos.controller.js";

const router = Router();

router.get("/", listPilotos);
router.get("/:id", getPiloto);

export default router;
