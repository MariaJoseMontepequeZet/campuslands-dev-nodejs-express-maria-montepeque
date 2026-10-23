import { Router } from "express";
import { listEstadios, getEstadio } from "../controllers/estadios.controller.js";

const router = Router();

router.get("/", listEstadios);
router.get("/:id", getEstadio);

export default router;
