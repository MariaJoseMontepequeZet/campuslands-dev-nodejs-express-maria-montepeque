import { Router } from "express";
import { listDrops, getDrop, createDrop } from "../controllers/drops.controller.js";

const router = Router();

router.get("/", listDrops);
router.get("/:id", getDrop);
router.post("/", createDrop);

export default router;
