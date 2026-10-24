import { Router } from "express";
import { listGimnasios, getGimnasio } from "../controllers/gimnasios.controller.js";

const router = Router();

router.get("/", listGimnasios);
router.get("/:id", getGimnasio);

export default router;
