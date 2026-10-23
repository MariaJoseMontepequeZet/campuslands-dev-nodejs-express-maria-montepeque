import { Router } from "express";
import { listWeapons, getWeapon } from "../controllers/weapons.controller.js";

const router = Router();

router.get("/", listWeapons);
router.get("/:id", getWeapon);

export default router;
