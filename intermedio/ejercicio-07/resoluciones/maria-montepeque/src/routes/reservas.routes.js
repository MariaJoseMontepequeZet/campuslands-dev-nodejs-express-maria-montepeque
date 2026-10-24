import { Router } from "express";
import { listReservas, createReserva } from "../controllers/reservas.controller.js";

const router = Router();

router.get("/", listReservas);
router.post("/", createReserva);

export default router;
