import { Router } from "express";
import { listLuchadores, getLuchador } from "../controllers/luchadores.controller.js";

const router = Router();

router.get("/", listLuchadores);
router.get("/:id", getLuchador);

export default router;
