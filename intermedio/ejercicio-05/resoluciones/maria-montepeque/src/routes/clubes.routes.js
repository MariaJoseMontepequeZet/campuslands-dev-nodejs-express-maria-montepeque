import { Router } from "express";
import {
    listClubes,
    getClub,
    createClub,
    updateClub,
    deleteClub
} from "../controllers/clubes.controller.js";

const router = Router();

router.get("/", listClubes);
router.get("/:id", getClub);
router.post("/", createClub);
router.patch("/:id", updateClub);
router.delete("/:id", deleteClub);

export default router;
