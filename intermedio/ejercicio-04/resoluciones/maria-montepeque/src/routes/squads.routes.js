import { Router } from "express";
import { listSquads, getSquad } from "../controllers/squads.controller.js";

const router = Router();

router.get("/", listSquads);
router.get("/:id", getSquad);

export default router;
