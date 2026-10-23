import { Router } from "express";
import { listLigas, getLiga } from "../controllers/ligas.controller.js";

const router = Router();

router.get("/", listLigas);
router.get("/:id", getLiga);

export default router;
