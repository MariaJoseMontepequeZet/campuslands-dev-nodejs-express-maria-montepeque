import { Router } from "express";
import { listZones, getZone } from "../controllers/zones.controller.js";

const router = Router();

router.get("/", listZones);
router.get("/:id", getZone);

export default router;
