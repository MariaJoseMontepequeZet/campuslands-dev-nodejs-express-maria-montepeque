import { Router } from "express";
import { listEscuderias, getEscuderia } from "../controllers/escuderias.controller.js";

const router = Router();

router.get("/", listEscuderias);
router.get("/:id", getEscuderia);

export default router;
