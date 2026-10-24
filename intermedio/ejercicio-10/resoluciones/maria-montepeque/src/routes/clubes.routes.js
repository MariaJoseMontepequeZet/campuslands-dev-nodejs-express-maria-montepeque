import { Router } from "express";
import { listClubes, getClub } from "../controllers/clubes.controller.js";

const router = Router();

router.get("/", listClubes);
router.get("/:id", getClub);

export default router;
