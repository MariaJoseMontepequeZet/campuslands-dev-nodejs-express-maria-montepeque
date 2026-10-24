import { Router } from "express";
import { listTorneos, getTorneo } from "../controllers/torneos.controller.js";

const router = Router();

router.get("/", listTorneos);
router.get("/:id", getTorneo);

export default router;
