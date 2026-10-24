import { Router } from "express";
import { listMarcas, getMarca } from "../controllers/marcas.controller.js";

const router = Router();

router.get("/", listMarcas);
router.get("/:id", getMarca);

export default router;
