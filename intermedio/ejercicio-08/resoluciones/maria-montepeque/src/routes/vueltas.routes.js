import { Router } from "express";
import { listVueltas, createVuelta } from "../controllers/vueltas.controller.js";

const router = Router();

router.get("/", listVueltas);
router.post("/", createVuelta);

export default router;
